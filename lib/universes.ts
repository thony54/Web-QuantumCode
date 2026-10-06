import { Music, Clapperboard, Code, PenTool, Camera, Accessibility, LucideIcon } from 'lucide-react';

/** Each kind has its own "magic" screen transition (see UniverseTransition). */
export type TransitionKind = 'sound' | 'comic' | 'quantum' | 'shutter';

export interface Universe {
  slug: string;
  path: string;
  name: string;
  /** Mono label shown in menus: QC://… */
  code: string;
  tagline: string;
  /** Signature colour of the universe (used by menus and transitions) */
  accent: string;
  icon: LucideIcon;
  transition: TransitionKind;
  /** false = shown in the menu as "PRONTO" and not clickable yet */
  ready: boolean;
  /** Warms the route chunk so the page is there when the transition ends */
  preload?: () => Promise<unknown>;
}

export const universes: Universe[] = [
  {
    slug: 'musica',
    path: '/universos/musica',
    name: 'Música',
    code: 'SONIC_LAB',
    tagline: 'Estudio de producción musical propia',
    accent: '#00F0FF',
    icon: Music,
    transition: 'sound',
    ready: true,
    preload: () => import('../pages/universes/Music'),
  },
  {
    slug: 'audiovisual',
    path: '/universos/audiovisual',
    name: 'Audiovisual',
    code: 'PANEL_ZERO',
    tagline: 'Series, cortos y documentales',
    accent: '#D4AF37',
    icon: Clapperboard,
    transition: 'comic',
    ready: true,
    preload: () => import('../pages/universes/Audiovisual'),
  },
  {
    slug: 'desarrollo',
    path: '/universos/desarrollo',
    name: 'Desarrollo',
    code: 'CODE_CORE',
    tagline: 'Programación y tecnología',
    accent: '#00FF41',
    icon: Code,
    transition: 'quantum',
    ready: false,
  },
  {
    slug: 'diseno',
    path: '/universos/diseno',
    name: 'Diseño',
    code: 'FORM_FORGE',
    tagline: 'Diseño gráfico e identidad',
    accent: '#FF003C',
    icon: PenTool,
    transition: 'quantum',
    ready: false,
  },
  {
    slug: 'fotografia',
    path: '/universos/fotografia',
    name: 'Fotografía',
    code: 'LIGHT_VAULT',
    tagline: 'Luz, lente y archivo visual',
    accent: '#FF6B00',
    icon: Camera,
    transition: 'shutter',
    ready: true,
    preload: () => import('../pages/universes/Photography'),
  },
  {
    slug: 'accesibilidad',
    path: '/universos/accesibilidad',
    name: 'Accesibilidad',
    code: 'CODIGO_HUMANO',
    tagline: 'Tecnología para todas las personas',
    accent: '#FFFFFF',
    icon: Accessibility,
    transition: 'quantum',
    ready: false,
  },
];

export const UNIVERSES_ROOT = '/universos';

export const isUniversePath = (pathname: string) =>
  pathname === UNIVERSES_ROOT || pathname.startsWith(`${UNIVERSES_ROOT}/`);
