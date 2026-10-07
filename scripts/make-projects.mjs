/**
 * Prepara las capturas de los proyectos del Universo Desarrollo.  Uso:  npm run proyectos
 *
 *   proyectos-originales/<proyecto>/pc-1.png      →  public/assets/projects/<proyecto>/pc-1-{720,1440}.webp
 *   proyectos-originales/<proyecto>/movil-1.png   →  public/assets/projects/<proyecto>/movil-1-{390,780}.webp
 *                                                    lib/projects.generated.ts  (lista que lee la web)
 *
 * - <proyecto> es el nombre de la carpeta: debe ser uno de los de proyectos-originales/LEEME.md.
 * - Los archivos que empiezan con "pc" son la vista de computador; con "movil", la de celular.
 *   Puedes poner varios (pc-1, pc-2, movil-1, movil-2…): se muestran en ese orden.
 * - Las capturas largas (página completa) se aceptan: en la web se pueden desplazar dentro del marco.
 * - Se borran los metadatos y los originales NUNCA se suben a git (la carpeta está ignorada).
 * - Es incremental: solo procesa lo nuevo y borra lo que ya no existe.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'proyectos-originales');
const OUT = path.join(ROOT, 'public', 'assets', 'projects');
const MANIFEST = path.join(ROOT, 'lib', 'projects.generated.ts');
const CACHE = path.join(SRC, '.cache.json');

/** Anchos de salida (px) por tipo de captura; nunca se amplía una captura pequeña. */
const WIDTHS = { pc: [720, 1440], movil: [390, 780] };
const QUALITY = 82;
/** WebP no admite más de 16383 px de alto */
const MAX_HEIGHT = 16000;
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff']);

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const exists = (p) => fs.access(p).then(() => true, () => false);
const natural = (a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' });

/** pc-1.png, PC 2.jpg, desktop.png… → 'pc'   |   movil-1.png, móvil.png, mobile-2.png… → 'movil' */
const deviceOf = (file) => {
  const name = slugify(path.parse(file).name);
  if (/^(pc|desktop|escritorio|computador|laptop)/.test(name)) return 'pc';
  if (/^(movil|mobile|celular|telefono|phone)/.test(name)) return 'movil';
  return null;
};

async function processOne(file, project, device, n, previous) {
  const stat = await fs.stat(file);
  const sig = `${stat.size}-${Math.round(stat.mtimeMs)}-${WIDTHS[device].join('.')}`;
  const base = `${device}-${n}`;
  if (previous?.sig === sig && previous.files) {
    const still = await Promise.all(previous.files.map((f) => exists(path.join(OUT, project, f))));
    if (still.every(Boolean)) return { sig, files: previous.files, shot: previous.shot, reused: true };
  }

  const meta = await sharp(file, { limitInputPixels: false }).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const w0 = swap ? meta.height : meta.width;
  const h0 = swap ? meta.width : meta.height;

  const targets = WIDTHS[device].filter((w) => w < w0);
  targets.push(Math.min(w0, WIDTHS[device][WIDTHS[device].length - 1]));
  const widths = [...new Set(targets)].sort((a, b) => a - b);

  await fs.mkdir(path.join(OUT, project), { recursive: true });
  const files = [];
  const sizes = [];
  let top = { w: w0, h: h0 };
  for (const target of widths) {
    let w = target;
    let h = Math.round((h0 * target) / w0);
    if (h > MAX_HEIGHT) {
      w = Math.max(1, Math.round((w * MAX_HEIGHT) / h));
      h = MAX_HEIGHT;
    }
    const name = `${base}-${w}.webp`;
    await sharp(file, { limitInputPixels: false })
      .rotate()
      .resize(w, h, { fit: 'fill' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(OUT, project, name));
    files.push(name);
    sizes.push(w);
    top = { w, h };
  }
  return { sig, files, shot: { src: `/assets/projects/${project}/${base}`, w: top.w, h: top.h, sizes } };
}

async function main() {
  if (!(await exists(SRC))) {
    await fs.mkdir(SRC, { recursive: true });
    console.log('Creé la carpeta proyectos-originales/. Lee proyectos-originales/LEEME.md y vuelve a correr: npm run proyectos');
    return;
  }
  await fs.mkdir(OUT, { recursive: true });

  const cache = (await exists(CACHE)) ? JSON.parse(await fs.readFile(CACHE, 'utf8')) : {};
  const nextCache = {};
  const result = {};
  let made = 0;
  let reused = 0;

  const folders = (await fs.readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory() && !d.name.startsWith('.'));
  for (const folder of folders.sort((a, b) => natural(a.name, b.name))) {
    const project = slugify(folder.name);
    if (!project) continue;
    const names = (await fs.readdir(path.join(SRC, folder.name))).filter((f) => !f.startsWith('.')).sort(natural);
    const entry = { pc: [], movil: [] };
    const counters = { pc: 0, movil: 0 };

    for (const name of names) {
      const full = path.join(SRC, folder.name, name);
      if (!EXT.has(path.extname(name).toLowerCase())) {
        if (!/\.(md|txt|json)$/i.test(name)) console.log(`  · se ignora ${folder.name}/${name} (formato no compatible)`);
        continue;
      }
      const device = deviceOf(name);
      if (!device) {
        console.log(`  · se ignora ${folder.name}/${name}: el nombre debe empezar con "pc" o "movil" (ej. pc-1.png, movil-1.png)`);
        continue;
      }
      counters[device]++;
      const key = `${project}/${device}-${counters[device]}`;
      try {
        const res = await processOne(full, project, device, counters[device], cache[key]);
        entry[device].push(res.shot);
        nextCache[key] = { sig: res.sig, files: res.files, shot: res.shot };
        if (res.reused) reused++;
        else {
          made++;
          console.log(`  ✓ ${folder.name}/${name}  →  ${device}-${counters[device]}  (${res.shot.w}×${res.shot.h})`);
        }
      } catch (err) {
        console.log(`  ✗ ${folder.name}/${name}: ${err.message}`);
      }
    }
    if (entry.pc.length || entry.movil.length) result[project] = entry;
  }

  // Borra lo que ya no está en proyectos-originales/
  const keep = new Set(Object.entries(result).flatMap(([p, e]) => [...e.pc, ...e.movil].flatMap((s) => s.sizes.map((w) => `${p}/${path.basename(s.src)}-${w}.webp`))));
  let removed = 0;
  for (const dir of await fs.readdir(OUT, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const f of await fs.readdir(path.join(OUT, dir.name))) {
      if (!keep.has(`${dir.name}/${f}`)) {
        await fs.rm(path.join(OUT, dir.name, f));
        removed++;
      }
    }
    if ((await fs.readdir(path.join(OUT, dir.name))).length === 0) await fs.rmdir(path.join(OUT, dir.name));
  }

  const body = `/**\n * GENERADO por scripts/make-projects.mjs (npm run proyectos). NO editar a mano: se sobrescribe.\n * Los textos de cada proyecto se editan en lib/development.ts.\n */\n\nexport interface ProjectShot {\n  /** Ruta sin ancho ni extensión: <src>-<ancho>.webp */\n  src: string;\n  /** Tamaño de la versión más grande */\n  w: number;\n  h: number;\n  /** Anchos disponibles */\n  sizes: number[];\n}\n\nexport interface ProjectShots {\n  pc: ProjectShot[];\n  movil: ProjectShot[];\n}\n\n/** Capturas por proyecto (la clave es el nombre de la carpeta en proyectos-originales/) */\nexport const projectShots: Record<string, ProjectShots> = ${JSON.stringify(result, null, 2)};\n`;
  await fs.writeFile(MANIFEST, body, 'utf8');
  await fs.writeFile(CACHE, JSON.stringify(nextCache), 'utf8');

  const total = Object.values(result).reduce((n, e) => n + e.pc.length + e.movil.length, 0);
  console.log(`\nListo: ${total} captura(s) en ${Object.keys(result).length} proyecto(s) — ${made} procesadas, ${reused} sin cambios, ${removed} archivos viejos borrados.`);
  for (const [p, e] of Object.entries(result)) console.log(`  ${p}: ${e.pc.length} de PC, ${e.movil.length} de móvil`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
