import { Bot, Gamepad2, Globe, Layers, ShoppingCart, Accessibility, LucideIcon } from 'lucide-react';

/**
 * ✏️ CONTENIDO DEL UNIVERSO DESARROLLO (CODE_CORE) — todo lo que cambia con el tiempo se edita AQUÍ.
 *
 * CÓMO AGREGAR LAS CAPTURAS DE UN PROYECTO (guía completa en proyectos-originales/LEEME.md):
 *   1. Pon las capturas en  proyectos-originales/<slug-del-proyecto>/  llamadas  pc-1.png, pc-2.png…  y  movil-1.png…
 *   2. Corre  npm run proyectos
 *   3. Listo: el proyecto muestra su marco de PC y de móvil. Aquí abajo solo editas los textos.
 *
 * Las descripciones de proyectos son por ahora lo mínimo (el nombre de cada uno): cámbialas por las reales.
 * Los textos de servicios salen de lo que ya dice la web ("arquitectura robusta y código limpio",
 * "accesibilidad digital nativa", "software a medida, APIs y automatización"…).
 */

/* ───────────────────────────── Servicios ───────────────────────────── */

export interface DevService {
  title: string;
  line: string;
  points: string[];
  icon: LucideIcon;
}

export const devServices: DevService[] = [
  {
    title: 'Sitios y landing pages',
    line: 'Desde una landing page hasta un sitio completo: rápido, claro y accesible.',
    points: ['Diseño a medida', 'SEO técnico', 'Animación con criterio'],
    icon: Globe,
  },
  {
    title: 'Aplicaciones web y móviles',
    line: 'Arquitectura robusta y código limpio para productos que crecen.',
    points: ['React / Next.js', 'Apps móviles', 'CMS personalizados'],
    icon: Layers,
  },
  {
    title: 'Tiendas y plataformas',
    line: 'Plataformas digitales y comercio en línea listos para vender.',
    points: ['E-commerce', 'Pagos y catálogos', 'Plataformas a medida'],
    icon: ShoppingCart,
  },
  {
    title: 'CRM y software a medida',
    line: 'Sistemas, APIs y automatización pensados para tu forma de trabajar.',
    points: ['CRM y paneles de gestión', 'APIs e integraciones', 'Automatización de procesos'],
    icon: Bot,
  },
  {
    title: 'Accesibilidad digital',
    line: 'La accesibilidad no es un extra: es nuestro estándar en cada proyecto.',
    points: ['Auditorías', 'Diseño y código accesibles', 'Widget de accesibilidad propio'],
    icon: Accessibility,
  },
  {
    title: 'Videojuegos',
    line: 'Mundos interactivos con identidad propia, desde el código hasta la banda sonora.',
    points: ['Diseño de juego', 'Programación', 'Música original'],
    icon: Gamepad2,
  },
];

/* ───────────────────────────── Skills ───────────────────────────── */

export interface Skill {
  /** Nombre del archivo en /public/assets/skills/<id>.svg */
  id: string;
  name: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

/** Sin años de experiencia a propósito (decisión del usuario). Para agregar una tecnología: pon su .svg en /public/assets/skills/. */
export const devSkills: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { id: 'html', name: 'HTML' },
      { id: 'css', name: 'CSS' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'typescript', name: 'TypeScript' },
      { id: 'tailwind', name: 'Tailwind CSS' },
      { id: 'shadcn', name: 'shadcn/ui' },
      { id: 'react', name: 'React' },
      { id: 'astro', name: 'Astro' },
      { id: 'nextjs', name: 'Next.js' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { id: 'python', name: 'Python' },
      { id: 'django', name: 'Django' },
      { id: 'nodejs', name: 'Node.js' },
      { id: 'express', name: 'Express' },
      { id: 'java', name: 'Java' },
      { id: 'docker', name: 'Docker' },
    ],
  },
  {
    title: 'Bases de datos',
    skills: [
      { id: 'postgresql', name: 'PostgreSQL' },
      { id: 'mysql', name: 'MySQL' },
      { id: 'prisma', name: 'Prisma' },
    ],
  },
  {
    title: 'Control de versiones',
    skills: [
      { id: 'git', name: 'Git' },
      { id: 'github', name: 'GitHub' },
    ],
  },
  {
    title: 'Móvil',
    skills: [
      { id: 'kotlin', name: 'Kotlin' },
      { id: 'flutter', name: 'Flutter' },
    ],
  },
];

/* ───────────────────────────── Proyectos ───────────────────────────── */

export type ProjectKind = 'app' | 'web' | 'crm' | 'accesibilidad' | 'videojuego';

/** Cómo se llama cada tipo: en la etiqueta de la tarjeta (singular) y en el filtro (plural) */
export const projectKinds: Record<ProjectKind, { label: string; plural: string }> = {
  app: { label: 'App', plural: 'Apps' },
  web: { label: 'Sitio web', plural: 'Sitios web' },
  crm: { label: 'CRM', plural: 'CRM y sistemas' },
  accesibilidad: { label: 'Accesibilidad', plural: 'Accesibilidad' },
  videojuego: { label: 'Videojuego', plural: 'Videojuegos' },
};

export interface DevProject {
  /**
   * Identificador: es el nombre de la CARPETA de capturas en proyectos-originales/ y el que va en el enlace
   * /universos/desarrollo?proyecto=<slug>. Minúsculas, sin espacios ni tildes.
   */
  slug: string;
  title: string;
  /** Cliente u organización, si aplica */
  org?: string;
  /** Quién lo hizo, en orden de importancia (opcional). Con `url`, el nombre es un enlace. Ej.: [{ name: 'Quantum Code' }, { name: 'EmaVisual', url: 'https://…' }] */
  madeBy?: { name: string; url?: string }[];
  kind: ProjectKind;
  description: string;
  status?: 'En producción' | 'Código abierto' | 'En desarrollo';
  /** Lo que hace, en frases cortas (opcional) */
  features?: string[];
  /** Tecnologías usadas: ids de devSkills (opcional; si no se sabe, déjalo vacío) */
  stack?: string[];
  links?: { label: string; url: string }[];
  /**
   * Dirección pública del proyecto (opcional). Si la pones, el visor ofrece "Ver en vivo" para ver el sitio real
   * en marco de PC y de móvil (algunos sitios bloquean ser mostrados dentro de otra página: en ese caso
   * hay un botón para abrirlo en otra pestaña).
   */
  liveUrl?: string;
}

export const devProjects: DevProject[] = [
  {
    slug: 'quantum-code-web',
    title: 'Quantum Code Studio',
    org: 'Esta web',
    madeBy: [{ name: 'Quantum Code' }, { name: 'EmaVisual', url: 'https://www.emavisual.art/' }],
    kind: 'web',
    description:
      'El sitio del estudio: un multiverso de áreas con transiciones propias, reproductor de música, galería de fotos, laboratorio de código y proyectos para ver en computador y en celular.',
    status: 'En producción',
    stack: ['react', 'typescript', 'tailwind'],
    links: [{ label: 'quantumcode.art', url: 'https://www.quantumcode.art' }],
  },
  { slug: 'connexo-clients', title: 'Connexo Clients', org: 'Connexo', kind: 'app', description: 'Aplicación para los clientes de Connexo.' },
  { slug: 'connexo-sellers', title: 'Connexo Sellers', org: 'Connexo', kind: 'app', description: 'Aplicación para los vendedores de Connexo.' },
  { slug: 'easyxplorer-web', title: 'EasyXplorer', org: 'EasyXplorer', kind: 'web', description: 'Sitio web de EasyXplorer.' },
  { slug: 'fundacion-arupo-web', title: 'Fundación Arupo', org: 'Fundación Arupo', kind: 'web', description: 'Sitio web de Fundación Arupo.' },
  { slug: 'connexo-ecuador-web', title: 'Connexo Ecuador', org: 'Connexo', kind: 'web', description: 'Sitio web de Connexo Ecuador.' },
  { slug: 'koda-app', title: 'KODA', org: 'KODA', kind: 'app', description: 'Aplicación KODA.' },
  { slug: 'arupo-medtrack', title: 'Arupo MedTrack', org: 'Arupo', kind: 'app', description: 'Aplicación Arupo MedTrack.' },
  {
    slug: 'crm-arupo',
    title: 'CRM Centro Terapéutico Integral Arupo',
    org: 'Arupo',
    kind: 'crm',
    description: 'Sistema CRM del Centro Terapéutico Integral Arupo.',
  },
  {
    slug: 'centro-terapeutico-arupo-web',
    title: 'Centro Terapéutico Integral Arupo',
    org: 'Arupo',
    kind: 'web',
    description: 'Sitio web del Centro Terapéutico Integral Arupo.',
  },
  {
    slug: 'widget-accesibilidad',
    title: 'Widget de accesibilidad',
    org: 'Connexo × Fundación Arupo',
    kind: 'accesibilidad',
    description:
      'Un panel de accesibilidad que se instala en cualquier sitio con una sola línea: contraste, tamaño de texto y más. Hecho junto a Fundación Arupo y publicado como código abierto.',
    status: 'Código abierto',
    links: [
      { label: 'npm', url: 'https://www.npmjs.com/package/connexo-accessibility-widget' },
      { label: 'GitHub', url: 'https://github.com/fundacionarupo/accessibility-widget' },
    ],
  },
  {
    slug: 'project-chaos-dominion',
    title: 'Project Chaos Dominion',
    org: 'Quantum Code Studio',
    kind: 'videojuego',
    description: 'Nuestro videojuego en desarrollo. Los temas «Latency» y «Player One» de la sección de música son suyos.',
    status: 'En desarrollo',
  },
  { slug: 'web-hoteleria', title: 'Web para hotelería', kind: 'web', description: 'Sitio web para hoteles.' },
  { slug: 'web-restaurantes', title: 'Web para restaurantes', kind: 'web', description: 'Sitio web para restaurantes.' },
];

/* ───────────────────────────── Proceso ───────────────────────────── */

export interface DevStep {
  /** Hash corto falso, solo para el aspecto de "git log" */
  hash: string;
  title: string;
  text: string;
}

export const devProcess: DevStep[] = [
  { hash: 'a1f3c9e', title: 'Descubrimiento', text: 'Entendemos tu objetivo, a tus usuarios y qué debe lograr el proyecto.' },
  { hash: '7b2d40a', title: 'Arquitectura y diseño', text: 'Definimos la estructura técnica y la interfaz antes de escribir código.' },
  { hash: 'c85e1f7', title: 'Construcción', text: 'Desarrollamos por entregas, con código limpio y revisiones frecuentes.' },
  { hash: '3e90b6d', title: 'Pruebas y accesibilidad', text: 'Probamos en distintos dispositivos y con teclado y lectores de pantalla.' },
  { hash: 'f04a2c8', title: 'Lanzamiento', text: 'Publicamos y comprobamos que todo funcione en producción.' },
  { hash: '19d7e5b', title: 'Mantenimiento y mejora', text: 'Seguimos contigo: ajustes, nuevas funciones y cuidado del sistema.' },
];

/** Lo que cuidamos en cada proyecto (principios, no promesas de plazo ni de precio) */
export const devCare: { title: string; text: string }[] = [
  { title: 'Responsive', text: 'Se ve y funciona bien en computador, tablet y celular.' },
  { title: 'Accesible', text: 'Pensado para que lo pueda usar todo el mundo, desde el diseño.' },
  { title: 'Rápido', text: 'Cuidamos el peso y la velocidad desde el principio.' },
  { title: 'Mantenible', text: 'Código ordenado, para que crecer sea fácil.' },
];

/* ───────────────────────────── Brief ───────────────────────────── */

export const briefTypes = ['Sitio web', 'Landing page', 'Aplicación', 'CRM o sistema', 'Tienda en línea', 'Otro'];
export const briefNeeds = [
  'Diseño a medida',
  'Panel de administración',
  'Usuarios y roles',
  'Pagos en línea',
  'Integraciones / APIs',
  'Notificaciones',
  'Accesibilidad',
  'Varios idiomas',
];
export const briefTimes = ['Lo antes posible', 'En 1 a 3 meses', 'Sin prisa, quiero conversar'];

/** Mensaje base del WhatsApp del estudio (el mismo número del footer) */
export const WHATSAPP_NUMBER = '593963038666';
export const whatsAppLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
export const devWhatsApp = whatsAppLink('Hola Quantum Code, quiero cotizar un proyecto de desarrollo.');

/** Líneas que escribe la terminal de la portada */
export const heroTerminal: { kind: 'cmd' | 'ok' | 'info'; text: string }[] = [
  { kind: 'cmd', text: 'quantum init mi-proyecto' },
  { kind: 'ok', text: 'arquitectura limpia' },
  { kind: 'ok', text: 'accesible por defecto' },
  { kind: 'ok', text: 'rápido de verdad' },
  { kind: 'cmd', text: 'quantum deploy --prod' },
  { kind: 'info', text: 'en producción. Listo para usarse.' },
];
