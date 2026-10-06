/**
 * GENERADO por scripts/make-photos.mjs (npm run fotos). NO editar a mano: se sobrescribe.
 * Los títulos, textos y fotos destacadas se editan en lib/photography.ts.
 */

export interface PhotoExif {
  camera?: string;
  lens?: string;
  focal?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  taken?: string;
}

export interface GeneratedPhoto {
  /** Nombre del archivo en minúsculas y sin espacios; también va en el enlace ?foto=… */
  id: string;
  /** Nombre de la carpeta en fotos-originales/ */
  category: string;
  /** Tamaño de la versión más grande */
  w: number;
  h: number;
  /** Anchos disponibles: /assets/photography/<id>-<ancho>.webp */
  sizes: number[];
  /** Color dominante, para el fondo mientras carga */
  color: string;
  exif?: PhotoExif;
}

export const generatedPhotos: GeneratedPhoto[] = [
  {
    "id": "aji-en-conserva",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#180808"
  },
  {
    "id": "bailarina-panolon-azul",
    "category": "cultura",
    "w": 1600,
    "h": 2400,
    "sizes": [
      533,
      1067,
      1600
    ],
    "color": "#080808"
  },
  {
    "id": "baile-comunitario",
    "category": "documental",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#080808"
  },
  {
    "id": "bocados-de-platano",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#080808"
  },
  {
    "id": "catrina-de-noche",
    "category": "cultura",
    "w": 1600,
    "h": 2400,
    "sizes": [
      533,
      1067,
      1600
    ],
    "color": "#080808"
  },
  {
    "id": "catrina-entre-flores",
    "category": "cultura",
    "w": 1600,
    "h": 2400,
    "sizes": [
      533,
      1067,
      1600
    ],
    "color": "#080808"
  },
  {
    "id": "catrina-mirada",
    "category": "cultura",
    "w": 1600,
    "h": 2400,
    "sizes": [
      533,
      1067,
      1600
    ],
    "color": "#080808"
  },
  {
    "id": "catrina-turquesa",
    "category": "cultura",
    "w": 1600,
    "h": 2400,
    "sizes": [
      533,
      1067,
      1600
    ],
    "color": "#080808"
  },
  {
    "id": "conserva-y-galletas",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#e8d8e8"
  },
  {
    "id": "conservas-artesanales",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#c8a8b8"
  },
  {
    "id": "corona-y-banda",
    "category": "documental",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#b89878"
  },
  {
    "id": "danza-andina",
    "category": "cultura",
    "w": 1600,
    "h": 2400,
    "sizes": [
      533,
      1067,
      1600
    ],
    "color": "#080808"
  },
  {
    "id": "dibujo-a-marcador",
    "category": "documental",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#e8e8e8"
  },
  {
    "id": "en-preparacion",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#987888"
  },
  {
    "id": "farol-en-la-niebla",
    "category": "paisaje",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#181828"
  },
  {
    "id": "frutos-secos",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#382828"
  },
  {
    "id": "liquen-y-corteza",
    "category": "naturaleza",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "luces-de-freno",
    "category": "paisaje",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "naranja-entre-ramas",
    "category": "naturaleza",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "pieza-artesanal",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#c8b8e8"
  },
  {
    "id": "pride-quito-2024-alas-moradas",
    "category": "orgullo",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#e8e8e8"
  },
  {
    "id": "pride-quito-2024-bandera-trans",
    "category": "orgullo",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "pride-quito-2024-brillos",
    "category": "orgullo",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "pride-quito-2024-marcha",
    "category": "orgullo",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "reinado-trans-ibarra-2024",
    "category": "orgullo",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#482858"
  },
  {
    "id": "salpicadura",
    "category": "naturaleza",
    "w": 1080,
    "h": 719,
    "sizes": [
      800,
      1080
    ],
    "color": "#080808"
  },
  {
    "id": "suculentas",
    "category": "producto",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#c8c8d8"
  },
  {
    "id": "valle-desde-lo-alto",
    "category": "paisaje",
    "w": 2400,
    "h": 1600,
    "sizes": [
      800,
      1600,
      2400
    ],
    "color": "#f8f8f8"
  }
];
