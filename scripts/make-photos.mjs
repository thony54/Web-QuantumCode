/**
 * Prepara las fotos del Universo Fotografía.  Uso:  npm run fotos
 *
 *   fotos-originales/<categoria>/mi-foto.jpg   →   public/assets/photography/mi-foto-{800,1600,2400}.webp
 *                                                 lib/photos.generated.ts  (lista que lee la web)
 *
 * - El NOMBRE DE LA CARPETA es la categoría (retrato, eventos, producto, documental…).
 * - Se corrige la rotación y se crean 3 tamaños .webp ligeros por foto.
 * - Se BORRAN todos los metadatos (GPS, número de serie, nombre del dueño…): solo se guardan
 *   cámara, lente y ajustes (ISO, apertura, velocidad) para mostrarlos en la web.
 * - Los originales NUNCA se suben a git (la carpeta está ignorada); solo las versiones ligeras.
 * - Es incremental: solo procesa lo nuevo o lo que cambió, y borra lo que ya no existe.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import exifr from 'exifr';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'fotos-originales');
const OUT = path.join(ROOT, 'public', 'assets', 'photography');
const MANIFEST = path.join(ROOT, 'lib', 'photos.generated.ts');
const CACHE = path.join(SRC, '.cache.json');

/** Lado largo (px) de cada versión. Nunca se amplía una foto pequeña. */
const LONG_EDGES = [800, 1600, 2400];
const QUALITY = 80;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif']);

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const exists = (p) => fs.access(p).then(() => true, () => false);

async function listSources() {
  const found = [];
  const walk = async (dir, category) => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // La carpeta de primer nivel manda; las subcarpetas se aplanan dentro de ella
        await walk(full, category ?? (slugify(entry.name) || 'otros'));
      } else if (EXT.has(path.extname(entry.name).toLowerCase())) {
        found.push({ file: full, category: category ?? 'otros' });
      } else if (!/\.(md|txt|json)$/i.test(entry.name)) {
        console.log(`  · se ignora ${path.relative(SRC, full)} (formato no compatible: usa JPG, PNG, WEBP, TIFF o AVIF)`);
      }
    }
  };
  await walk(SRC, null);
  return found;
}

const round = (n, d = 1) => Number(n.toFixed(d));

function formatShutter(t) {
  if (!t) return undefined;
  if (t >= 1) return `${round(t, 1)} s`;
  return `1/${Math.round(1 / t)}`;
}

async function readExif(file) {
  try {
    const x = await exifr.parse(file, {
      pick: ['Make', 'Model', 'LensModel', 'FocalLength', 'FNumber', 'ExposureTime', 'ISO', 'DateTimeOriginal'],
      gps: false,
    });
    if (!x) return {};
    const make = (x.Make ?? '').trim();
    const model = (x.Model ?? '').trim();
    const camera = model.toLowerCase().startsWith(make.toLowerCase()) ? model : `${make} ${model}`.trim();
    return {
      camera: camera || undefined,
      lens: x.LensModel?.trim() || undefined,
      focal: x.FocalLength ? `${Math.round(x.FocalLength)} mm` : undefined,
      aperture: x.FNumber ? `f/${round(x.FNumber)}` : undefined,
      shutter: formatShutter(x.ExposureTime),
      iso: x.ISO ? Number(Array.isArray(x.ISO) ? x.ISO[0] : x.ISO) : undefined,
      taken: x.DateTimeOriginal instanceof Date ? x.DateTimeOriginal.toISOString().slice(0, 10) : undefined,
    };
  } catch {
    return {};
  }
}

const compact = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== ''));

async function processOne(source, id, previous) {
  const stat = await fs.stat(source.file);
  const sig = `${stat.size}-${Math.round(stat.mtimeMs)}`;
  if (previous?.sig === sig && previous.entry.sizes.every((w) => previous.files?.includes(`${id}-${w}.webp`))) {
    const stillThere = await Promise.all(previous.entry.sizes.map((w) => exists(path.join(OUT, `${id}-${w}.webp`))));
    if (stillThere.every(Boolean)) return { sig, entry: { ...previous.entry, category: source.category }, files: previous.files, reused: true };
  }

  const meta = await sharp(source.file).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const w0 = swap ? meta.height : meta.width;
  const h0 = swap ? meta.width : meta.height;
  const long0 = Math.max(w0, h0);

  const edges = LONG_EDGES.filter((e) => e < long0);
  edges.push(Math.min(long0, LONG_EDGES[LONG_EDGES.length - 1]));
  const uniqueEdges = [...new Set(edges)].sort((a, b) => a - b);

  const sizes = [];
  const files = [];
  let width = w0;
  let height = h0;
  for (const edge of uniqueEdges) {
    const scale = edge / long0;
    const w = Math.max(1, Math.round(w0 * scale));
    const h = Math.max(1, Math.round(h0 * scale));
    const name = `${id}-${w}.webp`;
    await sharp(source.file)
      .rotate() // aplica la orientación del EXIF; sharp quita el resto de metadatos por defecto
      .resize(w, h, { fit: 'fill' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(OUT, name));
    sizes.push(w);
    files.push(name);
    if (edge === uniqueEdges[uniqueEdges.length - 1]) {
      width = w;
      height = h;
    }
  }

  const stats = await sharp(source.file).rotate().resize(64).stats();
  const hex = (n) => Math.round(n).toString(16).padStart(2, '0');
  const color = `#${hex(stats.dominant.r)}${hex(stats.dominant.g)}${hex(stats.dominant.b)}`;
  const exif = compact(await readExif(source.file));

  return {
    sig,
    files,
    entry: {
      id,
      category: source.category,
      w: width,
      h: height,
      sizes,
      color,
      ...(Object.keys(exif).length ? { exif } : {}),
    },
  };
}

async function main() {
  if (!(await exists(SRC))) {
    await fs.mkdir(SRC, { recursive: true });
    console.log('Creé la carpeta fotos-originales/. Pon tus fotos dentro de subcarpetas (una por categoría) y vuelve a correr: npm run fotos');
    return;
  }
  await fs.mkdir(OUT, { recursive: true });

  const cache = (await exists(CACHE)) ? JSON.parse(await fs.readFile(CACHE, 'utf8')) : {};
  const sources = await listSources();
  const taken = new Set();
  const results = [];
  const nextCache = {};
  let made = 0;
  let reused = 0;

  for (const source of sources.sort((a, b) => a.file.localeCompare(b.file))) {
    const base = slugify(path.parse(source.file).name) || 'foto';
    let id = base;
    for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
    taken.add(id);

    try {
      const res = await processOne(source, id, cache[id]);
      results.push(res.entry);
      nextCache[id] = { sig: res.sig, files: res.files ?? cache[id]?.files, entry: res.entry };
      if (res.reused) reused++;
      else {
        made++;
        console.log(`  ✓ ${path.relative(SRC, source.file)}  →  ${id}  (${res.entry.w}×${res.entry.h}, ${res.entry.category})`);
      }
    } catch (err) {
      console.log(`  ✗ ${path.relative(SRC, source.file)}: ${err.message}`);
    }
  }

  // Borra versiones de fotos que ya no están en fotos-originales/
  const keep = new Set(results.flatMap((r) => r.sizes.map((w) => `${r.id}-${w}.webp`)));
  let removed = 0;
  for (const name of await fs.readdir(OUT)) {
    if (/-\d+\.webp$/.test(name) && !keep.has(name)) {
      await fs.rm(path.join(OUT, name));
      removed++;
    }
  }

  // Más recientes primero (fecha de la toma); sin fecha, por nombre
  for (const r of results) delete r.lqip; // entradas antiguas de la caché
  results.sort((a, b) => (b.exif?.taken ?? '').localeCompare(a.exif?.taken ?? '') || a.id.localeCompare(b.id));

  const body = `/**\n * GENERADO por scripts/make-photos.mjs (npm run fotos). NO editar a mano: se sobrescribe.\n * Los títulos, textos y fotos destacadas se editan en lib/photography.ts.\n */\n\nexport interface PhotoExif {\n  camera?: string;\n  lens?: string;\n  focal?: string;\n  aperture?: string;\n  shutter?: string;\n  iso?: number;\n  taken?: string;\n}\n\nexport interface GeneratedPhoto {\n  /** Nombre del archivo en minúsculas y sin espacios; también va en el enlace ?foto=… */\n  id: string;\n  /** Nombre de la carpeta en fotos-originales/ */\n  category: string;\n  /** Tamaño de la versión más grande */\n  w: number;\n  h: number;\n  /** Anchos disponibles: /assets/photography/<id>-<ancho>.webp */\n  sizes: number[];\n  /** Color dominante, para el fondo mientras carga */\n  color: string;\n  exif?: PhotoExif;\n}\n\nexport const generatedPhotos: GeneratedPhoto[] = ${JSON.stringify(results, null, 2)};\n`;
  await fs.writeFile(MANIFEST, body, 'utf8');
  await fs.writeFile(CACHE, JSON.stringify(nextCache), 'utf8');

  console.log(`\nListo: ${results.length} foto(s) — ${made} procesadas, ${reused} sin cambios, ${removed} archivos viejos borrados.`);
  const cats = [...new Set(results.map((r) => r.category))];
  if (cats.length) console.log(`Categorías: ${cats.join(', ')}`);
  console.log('Recuerda: fotos de personas (sobre todo menores de edad) solo con su permiso.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
