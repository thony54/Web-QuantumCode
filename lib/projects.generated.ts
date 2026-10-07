/**
 * GENERADO por scripts/make-projects.mjs (npm run proyectos). NO editar a mano: se sobrescribe.
 * Los textos de cada proyecto se editan en lib/development.ts.
 */

export interface ProjectShot {
  /** Ruta sin ancho ni extensión: <src>-<ancho>.webp */
  src: string;
  /** Tamaño de la versión más grande */
  w: number;
  h: number;
  /** Anchos disponibles */
  sizes: number[];
}

export interface ProjectShots {
  pc: ProjectShot[];
  movil: ProjectShot[];
}

/** Capturas por proyecto (la clave es el nombre de la carpeta en proyectos-originales/) */
export const projectShots: Record<string, ProjectShots> = {};
