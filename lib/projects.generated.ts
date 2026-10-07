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
export const projectShots: Record<string, ProjectShots> = {
  "arupo-medtrack": {
    "pc": [
      {
        "src": "/assets/projects/arupo-medtrack/pc-1",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/arupo-medtrack/pc-2",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/arupo-medtrack/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      },
      {
        "src": "/assets/projects/arupo-medtrack/movil-2",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      }
    ]
  },
  "centro-terapeutico-arupo-web": {
    "pc": [
      {
        "src": "/assets/projects/centro-terapeutico-arupo-web/pc-1",
        "w": 1440,
        "h": 722,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/centro-terapeutico-arupo-web/pc-2",
        "w": 1440,
        "h": 716,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/centro-terapeutico-arupo-web/pc-3",
        "w": 1440,
        "h": 715,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": []
  },
  "connexo-clients": {
    "pc": [
      {
        "src": "/assets/projects/connexo-clients/pc-1",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/connexo-clients/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      }
    ]
  },
  "connexo-ecuador-web": {
    "pc": [
      {
        "src": "/assets/projects/connexo-ecuador-web/pc-1",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/connexo-ecuador-web/pc-2",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/connexo-ecuador-web/pc-3",
        "w": 1440,
        "h": 1150,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/connexo-ecuador-web/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      },
      {
        "src": "/assets/projects/connexo-ecuador-web/movil-2",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      },
      {
        "src": "/assets/projects/connexo-ecuador-web/movil-3",
        "w": 780,
        "h": 2300,
        "sizes": [
          390,
          780
        ]
      }
    ]
  },
  "connexo-sellers": {
    "pc": [
      {
        "src": "/assets/projects/connexo-sellers/pc-1",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/connexo-sellers/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      }
    ]
  },
  "easyxplorer-web": {
    "pc": [
      {
        "src": "/assets/projects/easyxplorer-web/pc-1",
        "w": 1440,
        "h": 714,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/easyxplorer-web/pc-2",
        "w": 1440,
        "h": 714,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/easyxplorer-web/pc-3",
        "w": 1440,
        "h": 714,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/easyxplorer-web/pc-4",
        "w": 1440,
        "h": 714,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/easyxplorer-web/movil-1",
        "w": 780,
        "h": 1431,
        "sizes": [
          390,
          780
        ]
      },
      {
        "src": "/assets/projects/easyxplorer-web/movil-2",
        "w": 780,
        "h": 1431,
        "sizes": [
          390,
          780
        ]
      }
    ]
  },
  "fundacion-arupo-web": {
    "pc": [
      {
        "src": "/assets/projects/fundacion-arupo-web/pc-1",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/fundacion-arupo-web/pc-2",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/fundacion-arupo-web/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      },
      {
        "src": "/assets/projects/fundacion-arupo-web/movil-2",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      }
    ]
  },
  "koda-app": {
    "pc": [
      {
        "src": "/assets/projects/koda-app/pc-1",
        "w": 1440,
        "h": 778,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/koda-app/pc-2",
        "w": 1440,
        "h": 780,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": []
  },
  "project-chaos-dominion": {
    "pc": [
      {
        "src": "/assets/projects/project-chaos-dominion/pc-1",
        "w": 1440,
        "h": 810,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": []
  },
  "quantum-code-web": {
    "pc": [
      {
        "src": "/assets/projects/quantum-code-web/pc-1",
        "w": 1440,
        "h": 900,
        "sizes": [
          720,
          1440
        ]
      },
      {
        "src": "/assets/projects/quantum-code-web/pc-2",
        "w": 1440,
        "h": 7678,
        "sizes": [
          720,
          1440
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/quantum-code-web/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      },
      {
        "src": "/assets/projects/quantum-code-web/movil-2",
        "w": 756,
        "h": 16000,
        "sizes": [
          390,
          756
        ]
      }
    ]
  },
  "widget-accesibilidad": {
    "pc": [
      {
        "src": "/assets/projects/widget-accesibilidad/pc-1",
        "w": 1280,
        "h": 800,
        "sizes": [
          720,
          1280
        ]
      }
    ],
    "movil": [
      {
        "src": "/assets/projects/widget-accesibilidad/movil-1",
        "w": 780,
        "h": 1688,
        "sizes": [
          390,
          780
        ]
      }
    ]
  }
};
