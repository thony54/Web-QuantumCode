import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clapperboard, Film, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import GooeyButton from '../../components/ui/GooeyButton';
import HudCorners from '../../components/ui/HudCorners';
import SectionLabel from '../../components/ui/SectionLabel';
import { SEO } from '../../components/SEO';
import { useUniverseTravel } from '../../components/universes/UniverseTransition';
import './universes.css';

type Cssc = React.CSSProperties & { ['--c']?: string };
const accent = (c: string): Cssc => ({ ['--c']: c });

const SHORTS = [
  { frame: '024', tc: '00:00:01:00', color: '#D4AF37' },
  { frame: '048', tc: '00:00:02:00', color: '#00F0FF' },
  { frame: '072', tc: '00:00:03:00', color: '#FF003C' },
  { frame: '096', tc: '00:00:04:00', color: '#00FF41' },
];

/** Characters and illustrations of the series' universes. Add one here to show it in section 02. */
const CHARACTERS = [
  {
    name: 'KOTO',
    kind: 'Personaje de TIWWTM',
    note: 'Es la muerte misma.',
    src: '/assets/images/koto.webp',
    size: 626,
    color: '#D4AF37',
    alt: 'KOTO, personaje de TIWWTM: un niño de pelo oscuro sentado en su cama, con las manos en las mejillas, rodeado de monstruos de ojos amarillos que lo observan desde las paredes.',
  },
  {
    name: 'RAT UNIVERSE',
    kind: 'Crossover de TIWWTM',
    note: '',
    src: '/assets/images/rat-universe.webp',
    size: 1024,
    color: '#FF003C',
    alt: 'Ilustración de una rata monstruosa de piel oscura y arrugada que muerde un planeta rojo; al fondo, otro planeta con anillos sobre un cielo verde.',
  },
];

const DOCS = [
  { no: '01', color: '#00F0FF', line: 'Historias reales, contadas con la elegancia del cine.' },
  { no: '02', color: '#D4AF37', line: 'Personas, territorios y causas en primer plano.' },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Running SMPTE-style timecode (24 fps) for the "slate" panel */
const useTimecode = () => {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    const id = window.setInterval(() => setMs(performance.now() - start), 80);
    return () => window.clearInterval(id);
  }, []);
  const frames = Math.floor((ms / 1000) * 24) % 24;
  const secs = Math.floor(ms / 1000) % 60;
  const mins = Math.floor(ms / 60000) % 60;
  return `00:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
};

const Statusbadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="border-2 border-black bg-white px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black">
    {children}
  </span>
);

const Audiovisual: React.FC = () => {
  const { travel } = useUniverseTravel();
  const timecode = useTimecode();

  // The series cover must be seen clean: no full-screen scanline/noise layers over it while this page is open
  useEffect(() => {
    document.documentElement.classList.add('no-screen-fx');
    return () => document.documentElement.classList.remove('no-screen-fx');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Universo Audiovisual | The Incredible World Within the Multiverse | Quantum Code Studio"
        description="Universo audiovisual de Quantum Code Studio: The Incredible World Within the Multiverse, nuestra serie animada estrella de terror cósmico en 12 capítulos, y Granjas, una nueva serie en escritura, ambas escritas por Karter Code. Además, personajes, cortometrajes y documentales."
        canonicalUrl="/universos/audiovisual"
      />

      {/* ───────── Cover ───────── */}
      <header className="relative overflow-hidden border-b-4 border-white pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="halftone-lg pointer-events-none absolute -right-20 -top-20 h-[34rem] w-[34rem] text-gold/25 [mask-image:radial-gradient(circle,black_10%,transparent_70%)]" />
        <div className="halftone-lg pointer-events-none absolute -bottom-32 -left-24 h-[28rem] w-[28rem] text-neon-pink/20 [mask-image:radial-gradient(circle,black_10%,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
            <span>
              QC://universos/<span className="text-white">audiovisual</span>
              <span className="animate-pulse text-gold">_</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-pink" />
              PANEL_ZERO
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Title panel */}
            <div className="comic-panel p-6 sm:p-10 lg:col-span-7 lg:p-12" style={accent('#D4AF37')}>
              <HudCorners className="border-gold/80" size="w-5 h-5" />
              <button
                type="button"
                onClick={() => travel('/')}
                className="comic-caption mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                <ArrowLeft size={13} /> Volver a Quantum Code
              </button>
              {/* Never wider than the panel: "VISUAL" is ≈5.7 em, so the size also follows the panel width (1024–1260 px) */}
              <div className="[container-type:inline-size]">
                <h1
                  className="comic-title font-display text-[clamp(2.25rem,min(9vw,16.2cqw),6.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white"
                  style={accent('#D4AF37')}
                >
                  AUDIO
                  <br />
                  VISUAL
                </h1>
              </div>
              <p className="comic-caption mt-10 inline-block max-w-lg px-4 py-3 font-mono text-xs font-bold uppercase leading-relaxed tracking-wide sm:text-sm">
                Series animadas, cortometrajes y documentales. Un universo de viñetas, luz y movimiento.
              </p>
            </div>

            {/* Side panels */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div className="comic-panel halftone relative flex min-h-[200px] items-center justify-center overflow-hidden bg-neon-pink text-black/30" style={accent('#FF003C')}>
                <Clapperboard aria-hidden="true" className="absolute -bottom-6 -right-4 h-44 w-44 text-black/40" strokeWidth={1.2} />
                <div className="comic-balloon comic-pop px-8 py-6 text-center" style={accent('#000')}>
                  <span className="font-display text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">¡Acción!</span>
                </div>
              </div>

              <div className="comic-panel flex min-h-[200px] flex-col justify-between p-5" style={accent('#00F0FF')}>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  <span>ESCENA 01 · TOMA 01</span>
                  <span className="flex items-center gap-2 text-neon-pink">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-neon-pink" /> REC
                  </span>
                </div>
                <p className="font-mono text-3xl font-bold tabular-nums tracking-widest text-neon-blue lg:text-4xl" aria-hidden="true">
                  {timecode}
                </p>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  <span>24 FPS</span>
                  <span>2.39 : 1</span>
                  <span>QC_CAM_A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── 01 Series ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="01" as="h2" className="mb-14">Series animadas</SectionLabel>

        {/* The star series: the cover is shown clean, with nothing over it */}
        <motion.article
          className="comic-panel overflow-hidden hover:transform-none"
          style={accent('#D4AF37')}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex items-center bg-black lg:col-span-8">
              <img
                src="/assets/images/tiwwtm-portada-1200.webp"
                srcSet="/assets/images/tiwwtm-portada-1200.webp 1200w, /assets/images/tiwwtm-portada-2245.webp 2245w"
                sizes="(min-width: 1024px) 66vw, 100vw"
                width={2245}
                height={1063}
                alt="Portada de la serie The Incredible World Within the Multiverse: el título en letras amarillas y blancas sobre un planeta rojo y una nebulosa."
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block h-auto w-full"
              />
            </div>

            <div className="flex flex-col justify-between border-t-[3px] border-white bg-black p-6 sm:p-8 lg:col-span-4 lg:border-l-[3px] lg:border-t-0">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <Statusbadge>Serie estrella</Statusbadge>
                  <Statusbadge>12 capítulos</Statusbadge>
                  <Statusbadge>Terror cósmico</Statusbadge>
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">Serie animada</p>
                {/* Sized by the column width: "MULTIVERSE" (≈11.6 em in Syne Black) must fit between 1024 and 1440 px */}
                <div className="[container-type:inline-size]">
                  <h3 className="font-display text-[clamp(1.1rem,7.8cqw,1.875rem)] font-black uppercase leading-[1.05] tracking-tight text-white">
                    The Incredible World Within the Multiverse
                  </h3>
                </div>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">TIWWTM</p>
                <p className="mt-6 text-sm leading-relaxed text-gray-300">
                  La serie estrella de Quantum Code: doce capítulos animados de terror cósmico escritos por Karter Code.
                </p>
              </div>

              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  Escrita por <span className="text-white">Karter Code</span>
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">● En producción</p>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Granjas: still being written. Its concept art is shown clean too (on phones the art comes first) */}
        <motion.article
          className="comic-panel mt-12 overflow-hidden hover:transform-none"
          style={accent('#00FF41')}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="order-2 flex flex-col justify-between border-t-[3px] border-white bg-black p-6 sm:p-8 lg:order-1 lg:col-span-7 lg:border-r-[3px] lg:border-t-0 lg:p-10">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  <Statusbadge>Nueva serie</Statusbadge>
                  <Statusbadge>Terror cósmico</Statusbadge>
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">Serie animada</p>
                <div className="[container-type:inline-size]">
                  <h3 className="font-display text-[clamp(1.5rem,11cqw,3.75rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
                    Granjas
                  </h3>
                </div>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-300">
                  Una nueva serie animada de terror cósmico, escrita por Karter Code. Todavía está en escritura: este es su arte conceptual.
                </p>
              </div>

              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  Escrita por <span className="text-white">Karter Code</span>
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-green">● En escritura</p>
              </div>
            </div>

            <div className="order-1 bg-black lg:order-2 lg:col-span-5">
              <img
                src="/assets/images/granjas-arte-896.webp"
                srcSet="/assets/images/granjas-arte-600.webp 600w, /assets/images/granjas-arte-896.webp 896w"
                sizes="(min-width: 1024px) 42vw, 100vw"
                width={896}
                height={1200}
                alt="Arte conceptual de la serie Granjas: esferas geodésicas unidas por tuberías y raíces, flotando en un cielo cósmico; dentro de cada una hay mundos y criaturas extrañas, y la del centro brilla en rojo."
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </motion.article>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="comic-caption px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={accent('#00F0FF')}>
            Más series en camino
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Nuevas historias // próximamente en pantalla</p>
        </div>
      </section>

      {/* ───────── 02 Characters and art ───────── */}
      <section className="border-t-4 border-white bg-black py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="02" as="h2" className="mb-14">Personajes y arte</SectionLabel>

          {/* The art is shown clean: the caption sits below it, never over it */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {CHARACTERS.map((c, i) => (
              <motion.figure
                key={c.name}
                className="comic-panel overflow-hidden hover:transform-none"
                style={accent(c.color)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={c.src}
                  width={c.size}
                  height={c.size}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="block aspect-square h-auto w-full bg-neutral-950 object-cover"
                />
                <figcaption className="border-t-[3px] border-white bg-black p-5 sm:p-6">
                  <div className="mb-3">
                    <Statusbadge>{c.kind}</Statusbadge>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-3xl">{c.name}</h3>
                  {c.note && <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">{c.note}</p>}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 03 Shorts ───────── */}
      <section className="relative overflow-hidden border-y-4 border-white bg-dark-card py-20 md:py-28">
        <div className="halftone-lg pointer-events-none absolute -right-24 top-0 h-80 w-80 text-white/[0.06] [mask-image:radial-gradient(circle,black_10%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="03" as="h2" className="mb-14">Cortometrajes</SectionLabel>

          {/* Film strip */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[760px] bg-black py-3" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 14px, #1a1a1a 14px 24px)', backgroundSize: '100% 10px', backgroundRepeat: 'repeat-x' }}>
              <div className="grid grid-cols-4 gap-3 bg-black px-3 py-4">
                {SHORTS.map((f) => (
                  <div key={f.frame} className="group relative aspect-video overflow-hidden border-2 border-white/80 bg-neutral-950 transition-colors hover:border-[var(--c)]" style={accent(f.color)}>
                    <div className="halftone absolute inset-0 opacity-40 transition-opacity group-hover:opacity-80" style={{ color: f.color, maskImage: 'linear-gradient(135deg, black, transparent 70%)', WebkitMaskImage: 'linear-gradient(135deg, black, transparent 70%)' }} />
                    <Film aria-hidden="true" className="absolute right-3 top-3 h-6 w-6 text-white/40" />
                    <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.25em] text-gray-400">FRAME {f.frame}</span>
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] tabular-nums tracking-[0.2em]" style={{ color: f.color }}>{f.tc}</span>
                    <span className="absolute bottom-3 right-3"><Statusbadge>Corto</Statusbadge></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="comic-balloon px-6 py-3" style={accent('#D4AF37')}>
              <span className="font-display text-base font-black uppercase tracking-tight sm:text-lg">Historias breves, impacto largo.</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 sm:ml-6">Cortos en desarrollo // próximamente en pantalla</p>
          </div>
        </div>
      </section>

      {/* ───────── 04 Docs ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="04" as="h2" className="mb-14">Documentales</SectionLabel>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {DOCS.map((d, i) => (
            <motion.article
              key={d.no}
              className="comic-panel relative flex min-h-[320px] flex-col justify-between overflow-hidden p-6 sm:p-8"
              style={accent(d.color)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="halftone-lg pointer-events-none absolute inset-0 opacity-[0.12]" style={{ color: d.color, maskImage: 'linear-gradient(200deg, black, transparent 60%)', WebkitMaskImage: 'linear-gradient(200deg, black, transparent 60%)' }} />
              <HudCorners className="border-white/30" size="w-4 h-4" />
              <div className="relative flex items-start justify-between">
                <span className="comic-caption px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em]">Documental {d.no}</span>
                <Video aria-hidden="true" className="h-7 w-7" style={{ color: d.color }} />
              </div>
              <div className="relative mt-16">
                <p className="comic-caption mb-4 inline-block px-3 py-2 font-mono text-[11px] font-bold uppercase leading-snug tracking-wide">
                  Narrador: {d.line}
                </p>
                <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tighter text-white sm:text-4xl">
                  Título por revelar
                </h3>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: d.color }}>● En desarrollo</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative overflow-hidden border-t-4 border-white bg-black py-24 md:py-32">
        <div className="halftone-lg pointer-events-none absolute inset-0 text-gold/10 [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_65%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="comic-balloon comic-pop mx-auto mb-14 inline-block px-8 py-8 sm:px-14" style={accent('#D4AF37')}>
            <h2 className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl">
              ¿TIENES UNA <br /> HISTORIA?
            </h2>
          </div>
          <div>
            <GooeyButton
              label="Hagámosla cine"
              href="/contacto"
              className="mx-auto inline-block h-16 bg-white px-10 py-4 text-black"
              colors={[1, 2, 3, 4]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audiovisual;
