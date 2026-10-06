/**
 * ✏️ CONTENIDO DEL UNIVERSO MÚSICA — todo lo que cambia con el tiempo se edita AQUÍ.
 *
 * Reales: los 8 temas (archivos en /public/assets/audio) y la portada. Los NOMBRES de los temas (en inglés)
 * son provisionales, pendientes de reemplazar. Los textos marcados PLACEHOLDER son de muestra:
 * bio, integrantes y proyectos.
 */

/** How a track is played. `soon` shows a "próximamente" state. */
export type TrackSource =
  /** Own audio file, streamed by the site's player (no download button). Put it in /public/assets/audio/ (ASCII names, no spaces). */
  | { kind: 'file'; src: string }
  /** Platform player (loaded only when the visitor asks for it). `url` is the normal public link of the song. */
  | { kind: 'embed'; provider: 'spotify' | 'soundcloud' | 'youtube'; url: string }
  | { kind: 'soon' };

export interface Track {
  /** Used in the shareable link: /universos/musica?pista=<slug> (lowercase, no spaces) */
  slug: string;
  title: string;
  year?: string;
  /** Length as shown in the list, e.g. "4:07" */
  duration?: string;
  description?: string;
  source: TrackSource;
  /** Where to listen to the FULL song (YouTube, Spotify, a paid/unlock page...). Shows a button in the player when set. */
  fullLink?: { label: string; url: string };
}

export interface Member {
  name: string;
  role: string;
  /** Optional photo in /public/assets/images/ */
  photo?: string;
}

export interface Project {
  year: string;
  title: string;
  /** What the band / you did in it */
  role: string;
  /** e.g. "Álbum", "Festival", "Banda sonora", "Colaboración" */
  kind: string;
  description?: string;
  link?: string;
}

export const band = {
  name: 'QUANTUM CODE', // el nombre sale en la portada
  cover: '/assets/images/quantum-code-uncontained.webp',
  tagline: 'Género · Ciudad · Año de formación', // PLACEHOLDER
  bio: [
    'Aquí va la historia de la banda: cómo nació, qué suena y qué la hace distinta. Dos o tres frases bastan.', // PLACEHOLDER
    'Un segundo párrafo opcional: influencias, el momento actual, hacia dónde van.', // PLACEHOLDER
  ],
  members: [
    { name: 'Integrante 01', role: 'Rol / instrumento' }, // PLACEHOLDER
    { name: 'Integrante 02', role: 'Rol / instrumento' }, // PLACEHOLDER
    { name: 'Integrante 03', role: 'Rol / instrumento' }, // PLACEHOLDER
  ] as Member[],
};

/**
 * Where the audio files are served from. The files are NOT in git (see .gitignore): locally they live in
 * public/assets/audio; in production set VITE_AUDIO_BASE_URL (Vercel > Settings > Environment Variables)
 * to the address of the storage that hosts them. Without it, production shows the tracks as "próximamente".
 */
/**
 * The site only ever serves 30-second PREVIEWS (files named NN-slug-preview.mp3). The full songs are NOT published
 * anywhere: they stay on the owner's computer (audio-completo/, ignored by git). Never upload full tracks to the
 * public store; a future premium unlock must serve them from a private store.
 */
const AUDIO_BASE = import.meta.env.VITE_AUDIO_BASE_URL?.replace(/\/$/, '') ?? (import.meta.env.DEV ? '/assets/audio' : '');
const audio = (file: string): TrackSource => (AUDIO_BASE ? { kind: 'file', src: `${AUDIO_BASE}/${file}` } : { kind: 'soon' });

export const tracks: Track[] = [
  { slug: 'neural-awakening', title: 'Neural Awakening', year: '2026', duration: '4:07', source: audio('01-neural-awakening-preview.mp3') }, // provisional title
  { slug: 'synapse', title: 'Synapse', year: '2026', duration: '3:39', source: audio('02-synapse-preview.mp3') }, // provisional title
  { slug: 'threshold', title: 'Threshold', year: '2026', duration: '4:14', source: audio('03-threshold-preview.mp3') }, // provisional title
  { slug: 'latency', title: 'Latency', year: '2026', duration: '3:17', source: audio('04-latency-preview.mp3') }, // provisional title
  { slug: 'quantum-pulse', title: 'Quantum Pulse', year: '2026', duration: '4:38', source: audio('05-quantum-pulse-preview.mp3') }, // provisional title
  { slug: 'digital-echo', title: 'Digital Echo', year: '2026', duration: '2:45', source: audio('06-digital-echo-preview.mp3') }, // provisional title
  { slug: 'data-horizon', title: 'Data Horizon', year: '2026', duration: '3:36', source: audio('07-data-horizon-preview.mp3') }, // provisional title
  { slug: 'latent-code', title: 'Latent Code', year: '2026', duration: '4:46', source: audio('08-latent-code-preview.mp3') }, // provisional title
];

export const projects: Project[] = [
  { year: '2026', title: 'Proyecto por revelar', role: 'Tu rol en el proyecto', kind: 'Colaboración', description: 'Una línea sobre el proyecto y lo que aportó la banda.' }, // PLACEHOLDER
  { year: '2025', title: 'Proyecto por revelar', role: 'Tu rol en el proyecto', kind: 'Banda sonora', description: 'Una línea sobre el proyecto y lo que aportó la banda.' }, // PLACEHOLDER
  { year: '2024', title: 'Proyecto por revelar', role: 'Tu rol en el proyecto', kind: 'Festival', description: 'Una línea sobre el proyecto y lo que aportó la banda.' }, // PLACEHOLDER
];

/* ───────── Helpers (no hace falta tocar nada de aquí hacia abajo) ───────── */

export interface EmbedInfo {
  src: string;
  /** Fixed height (px) for audio players, or `ratio` for video */
  height?: number;
  ratio?: string;
  providerLabel: string;
}

const youtubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null;
    return u.searchParams.get('v') ?? u.pathname.match(/\/(?:embed|shorts)\/([\w-]+)/)?.[1] ?? null;
  } catch {
    return null;
  }
};

/** Turns the normal public link of a song into the URL of its official embedded player. */
export const embedInfo = (source: Extract<TrackSource, { kind: 'embed' }>): EmbedInfo | null => {
  const { provider, url } = source;
  if (provider === 'spotify') {
    const src = url.replace('open.spotify.com/', 'open.spotify.com/embed/').replace('/embed/embed/', '/embed/');
    return { src, height: /\/(track|episode)\//.test(src) ? 152 : 352, providerLabel: 'Spotify' };
  }
  if (provider === 'soundcloud') {
    return {
      src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23d4af37&auto_play=false&show_teaser=false&visual=false`,
      height: 166,
      providerLabel: 'SoundCloud',
    };
  }
  const id = youtubeId(url);
  return id ? { src: `https://www.youtube-nocookie.com/embed/${id}`, ratio: '16 / 9', providerLabel: 'YouTube' } : null;
};

export const trackShareUrl = (slug: string) => `${window.location.origin}/universos/musica?pista=${encodeURIComponent(slug)}`;
