import { Building2, Camera, HeartHandshake, Package, UserRound, LucideIcon } from 'lucide-react';
import { generatedPhotos, GeneratedPhoto } from './photos.generated';

/**
 * ✏️ CONTENIDO DEL UNIVERSO FOTOGRAFÍA — todo lo que cambia con el tiempo se edita AQUÍ.
 *
 * CÓMO SUBIR FOTOS (guía completa en fotos-originales/LEEME.md):
 *   1. Pon tus fotos en  fotos-originales/<categoria>/foto.jpg  (la carpeta es la categoría).
 *   2. Corre  npm run fotos  (crea las versiones ligeras y borra los datos privados).
 *   3. Listo: aparecen solas en la galería. Aquí abajo solo editas títulos, textos y destacadas.
 *
 * Mientras no haya fotos reales, la web muestra fotogramas de muestra ("por revelar").
 * Los textos de servicios y proceso son una PRIMERA PROPUESTA: ajústalos a lo que de verdad ofreces.
 */

/** Cómo se llama cada carpeta de categoría en la web. Si creas una carpeta nueva, se muestra con su nombre en mayúscula inicial. */
export const CATEGORY_LABELS: Record<string, string> = {
  retrato: 'Retrato',
  eventos: 'Eventos',
  producto: 'Producto',
  documental: 'Documental',
  cultura: 'Cultura',
  orgullo: 'Orgullo',
  naturaleza: 'Naturaleza',
  paisaje: 'Paisaje',
  arquitectura: 'Arquitectura',
  gastronomia: 'Gastronomía',
  moda: 'Moda',
  otros: 'Otros',
};

export interface PhotoNote {
  /** Título que se ve en la foto. Si no lo pones, se muestra el nombre del archivo. */
  title?: string;
  /** Descripción corta que aparece al abrir la foto */
  caption?: string;
  /** Texto alternativo para lectores de pantalla (describe lo que se VE en la foto). Muy recomendable. */
  alt?: string;
  /** true = esta foto se usa de fondo OSCURECIDO en la portada del universo (por defecto ninguna: las fotos se ven limpias) */
  featured?: boolean;
  /** true = la foto se queda en la carpeta pero no se muestra */
  hidden?: boolean;
}

/**
 * Notas por foto. La clave es el nombre del archivo en minúsculas, sin espacios ni extensión
 * (por ejemplo "Maria Estudio.JPG" → 'maria-estudio'). Ejemplo:
 *
 *   'maria-estudio': { title: 'María en el estudio', caption: 'Sesión de marca personal, luz natural.', featured: true },
 */
export const PHOTO_NOTES: Record<string, PhotoNote> = {
  'baile-comunitario': { title: 'Baile comunitario', alt: 'Mujeres mayores bailando de la mano durante un evento comunitario al aire libre' },
  'corona-y-banda': { title: 'Corona y banda', alt: 'Mujer mayor con corona y banda bailando frente a un mural' },
  'dibujo-a-marcador': { title: 'Dibujo a marcador', alt: 'Mano dibujando con un marcador sobre una hoja de trazos de colores' },
  'catrina-entre-flores': { title: 'Catrina entre flores', alt: 'Persona con maquillaje de calavera, sombrero oscuro y flores iluminadas' },
  'catrina-turquesa': { title: 'Catrina turquesa', alt: 'Catrina con sombrero amarillo y vestido turquesa decorado con luces' },
  'catrina-mirada': { title: 'Mirada de catrina', alt: 'Primer plano de una catrina con maquillaje de calavera y sombrero amarillo' },
  'catrina-de-noche': { title: 'Catrina de noche', alt: 'Catrina con luces sobre un fondo oscuro azul y violeta' },
  'danza-andina': { title: 'Danza andina', alt: 'Pareja bailando con trajes tradicionales: falda azul con pliegues y pañuelo naranja' },
  'bailarina-panolon-azul': { title: 'Pañolón azul', alt: 'Bailarina con pañolón azul y falda amarilla en una calle' },
  'farol-en-la-niebla': { title: 'Farol en la niebla', alt: 'Farol encendido entre cables y niebla al atardecer' },
  'valle-desde-lo-alto': { title: 'Valle desde lo alto', alt: 'Valle con cultivos y un pueblo visto desde lo alto, con montañas al fondo' },
  'luces-de-freno': { title: 'Luces de freno', alt: 'Luces de freno de un vehículo en una vía al anochecer' },
  'naranja-entre-ramas': { title: 'Naranja entre ramas', alt: 'Naranja iluminada entre ramas oscuras' },
  'salpicadura': { title: 'Salpicadura', alt: 'Salpicadura de agua sobre una superficie oscura' },
  'liquen-y-corteza': { title: 'Liquen y corteza', alt: 'Primer plano de liquen sobre una corteza o roca' },
  'reinado-trans-ibarra-2024': { title: 'Reinado Trans Ibarra', alt: 'Artista con vestuario brillante y brazos abiertos en un escenario con luces moradas', caption: 'Reinado Trans, Pride Ibarra 2024.' },
  'pride-quito-2024-marcha': { title: 'Marcha del Orgullo', alt: 'Persona con una blusa bordada y una falda blanca en la marcha del Orgullo', caption: 'Pride Quito 2024.' },
  'pride-quito-2024-bandera-trans': { title: 'Bandera trans', alt: 'Persona levantando una tela con los colores de la bandera trans en la marcha', caption: 'Pride Quito 2024.' },
  'pride-quito-2024-brillos': { title: 'Brillos', alt: 'Mujer con maquillaje brillante y lentes de sol mirando a cámara', caption: 'Pride Quito 2024.' },
  'pride-quito-2024-alas-moradas': { title: 'Alas moradas', alt: 'Persona con peluca morada y grandes alas moradas', caption: 'Pride Quito 2024.' },
  'suculentas': { title: 'Suculentas', alt: 'Suculentas y piedras en una maceta' },
  'pieza-artesanal': { title: 'Pieza artesanal', alt: 'Pieza artesanal amarilla con decoración floral' },
  'conserva-y-galletas': { title: 'Conserva y galletas', alt: 'Frasco de conserva con galletas sobre una bandeja de madera' },
  'frutos-secos': { title: 'Frutos secos', alt: 'Bolsas de frutos secos con etiqueta, en una canasta' },
  'bocados-de-platano': { title: 'Bocados de plátano', alt: 'Canastas de plátano rellenas servidas en una bandeja' },
  'aji-en-conserva': { title: 'Ají en conserva', alt: 'Frascos de ají en conserva con etiqueta rosada' },
  'en-preparacion': { title: 'En preparación', alt: 'Mano untando salsa sobre una tortilla con una cuchara de madera' },
  'conservas-artesanales': { title: 'Conservas artesanales', alt: 'Frascos de conserva alineados sobre una repisa de madera' },
};

/**
 * Orden de la galería "Todas": los ids de esta lista van primero, en este orden (mezclados a propósito para que
 * ninguna categoría se amontone). Las fotos que no estén aquí van después, de la más reciente a la más antigua.
 */
export const PHOTO_ORDER: string[] = [
  'baile-comunitario',
  'catrina-turquesa',
  'pride-quito-2024-alas-moradas',
  'suculentas',
  'valle-desde-lo-alto',
  'danza-andina',
  'reinado-trans-ibarra-2024',
  'conservas-artesanales',
  'naranja-entre-ramas',
  'corona-y-banda',
  'catrina-de-noche',
  'pride-quito-2024-bandera-trans',
  'aji-en-conserva',
  'farol-en-la-niebla',
  'bailarina-panolon-azul',
  'frutos-secos',
  'salpicadura',
  'pride-quito-2024-marcha',
  'catrina-entre-flores',
  'bocados-de-platano',
  'luces-de-freno',
  'dibujo-a-marcador',
  'pride-quito-2024-brillos',
  'conserva-y-galletas',
  'catrina-mirada',
  'liquen-y-corteza',
  'pieza-artesanal',
  'en-preparacion',
];

/* ───────────────────────────── Servicios y proceso ───────────────────────────── */

export interface PhotoService {
  title: string;
  line: string;
  points: string[];
  icon: LucideIcon;
}

export const photoServices: PhotoService[] = [
  {
    title: 'Retrato y marca personal',
    line: 'Una imagen que se parece a ti y trabaja por ti.',
    points: ['Perfiles profesionales y redes', 'Equipos y directivos', 'Artistas y creadores'],
    icon: UserRound,
  },
  {
    title: 'Eventos y cobertura',
    line: 'Cada momento importante, contado en imágenes.',
    points: ['Conferencias y lanzamientos', 'Actividades institucionales', 'Celebraciones y encuentros'],
    icon: Camera,
  },
  {
    title: 'Producto y contenido',
    line: 'Tu producto, con la luz que merece.',
    points: ['Catálogo y tienda en línea', 'Contenido para redes', 'Gastronomía y marcas locales'],
    icon: Package,
  },
  {
    title: 'Documental y causas',
    line: 'Historias de personas y organizaciones, con respeto y cercanía.',
    points: ['Fundaciones y proyectos sociales', 'Informes y memorias visuales', 'Archivo para campañas'],
    icon: HeartHandshake,
  },
  {
    title: 'Institucional y espacios',
    line: 'Lugares y equipos presentados con claridad y carácter.',
    points: ['Espacios y fachadas', 'Retratos corporativos', 'Material para web e informes'],
    icon: Building2,
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const photoProcess: ProcessStep[] = [
  { title: 'Brief', text: 'Hablamos de tu objetivo, el uso que tendrán las fotos y las referencias que te gustan.' },
  { title: 'Preparación', text: 'Elegimos locación, luz y plan de tomas para llegar sabiendo qué buscamos.' },
  { title: 'Sesión', text: 'Fotografiamos con calma y dirección cercana: tú solo tienes que ser tú.' },
  { title: 'Selección y revelado', text: 'Curamos las mejores tomas y las trabajamos con color y retoque coherentes.' },
  { title: 'Entrega', text: 'Recibes tus fotos listas para web, redes e impresión, en una galería privada.' },
];

/* ───────────────────────────── Fotos ───────────────────────────── */

export interface Photo extends GeneratedPhoto {
  title: string;
  alt: string;
  caption?: string;
  categoryLabel: string;
  featured: boolean;
  /** Número de fotograma, "01", "02"… según el orden de la galería */
  frame: string;
}

const titleCase = (slug: string) => slug.replace(/-+/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

export const categoryLabel = (slug: string) => CATEGORY_LABELS[slug] ?? titleCase(slug);

/** Names straight from a camera (DSC02476, IMG_0042…) make bad titles. */
const isCameraName = (id: string) => /^(dsc|img|dcim|pxl|mvimg|p\d{3}|_dsc|dji|gopr)[-_]?\d+/i.test(id) || /^\d{6,}$/.test(id);

const buildPhotos = (): Photo[] => {
  const visible = generatedPhotos.filter((p) => !PHOTO_NOTES[p.id]?.hidden);
  const rank = (id: string) => {
    const i = PHOTO_ORDER.indexOf(id);
    return i === -1 ? PHOTO_ORDER.length : i;
  };
  const ordered = [...visible].sort((a, b) => rank(a.id) - rank(b.id)); // stable: the rest keep the generated order
  return ordered.map((p, i) => {
    const note = PHOTO_NOTES[p.id] ?? {};
    const label = categoryLabel(p.category);
    const title = note.title ?? (isCameraName(p.id) ? 'Sin título' : titleCase(p.id));
    return {
      ...p,
      title,
      alt: note.alt ?? `${label}: ${title}`,
      caption: note.caption,
      categoryLabel: label,
      featured: !!note.featured,
      frame: String(i + 1).padStart(2, '0'),
    };
  });
};

export const photos: Photo[] = buildPhotos();

/** Categories that really have photos, in the order they first appear, with their count */
export const photoCategories = (list: Photo[] = photos) => {
  const counts = new Map<string, number>();
  list.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
  return [...counts.entries()].map(([slug, count]) => ({ slug, label: categoryLabel(slug), count }));
};

export const photoSrc = (p: Pick<Photo, 'id' | 'sizes'>, width?: number) => {
  const w = width ? p.sizes.find((s) => s >= width) ?? p.sizes[p.sizes.length - 1] : p.sizes[p.sizes.length - 1];
  return `/assets/photography/${p.id}-${w}.webp`;
};

export const photoSrcSet = (p: Pick<Photo, 'id' | 'sizes'>) =>
  p.sizes.map((w) => `/assets/photography/${p.id}-${w}.webp ${w}w`).join(', ');

/** Link that opens straight on one photo */
export const photoLink = (id: string) => `https://www.quantumcode.art/universos/fotografia?foto=${encodeURIComponent(id)}`;

/** Message of the "reserva tu sesión" button (WhatsApp of the studio, same number as the footer) */
export const photoWhatsApp = `https://wa.me/593963038666?text=${encodeURIComponent(
  'Hola Quantum Code, quiero cotizar una sesión de fotografía.'
)}`;
