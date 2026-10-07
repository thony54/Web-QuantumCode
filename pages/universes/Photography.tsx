import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Battery, MessageCircle } from 'lucide-react';
import GooeyButton from '../../components/ui/GooeyButton';
import HudCorners from '../../components/ui/HudCorners';
import SectionLabel from '../../components/ui/SectionLabel';
import ExposureLab from '../../components/universes/ExposureLab';
import PhotoGallery from '../../components/universes/PhotoGallery';
import { SEO } from '../../components/SEO';
import { useUniverseTravel } from '../../components/universes/UniverseTransition';
import { universes } from '../../lib/universes';
import { photoProcess, photos, photoServices, photoSrc, photoWhatsApp } from '../../lib/photography';
import './universes.css';

/** Points of the frame where the autofocus box "hunts" while nobody moves the mouse */
const FOCUS_SPOTS = [
  { x: 70, y: 46 },
  { x: 34, y: 60 },
  { x: 58, y: 34 },
  { x: 80, y: 64 },
  { x: 44, y: 44 },
];

/** Exposure readouts shown at the top of the viewfinder, one after another */
const READOUTS = [
  { f: 'f/2.8', t: '1/250', iso: '100' },
  { f: 'f/4', t: '1/500', iso: '200' },
  { f: 'f/1.8', t: '1/125', iso: '100' },
  { f: 'f/5.6', t: '1/1000', iso: '400' },
];

const BOKEH = [
  { x: '8%', y: '18%', s: 150, c: 'rgba(255,107,0,0.28)', b: 22, dx: 24, dy: -18, t: 15 },
  { x: '72%', y: '8%', s: 210, c: 'rgba(212,175,55,0.2)', b: 30, dx: -30, dy: 22, t: 18 },
  { x: '86%', y: '56%', s: 120, c: 'rgba(0,240,255,0.16)', b: 20, dx: -16, dy: -24, t: 13 },
  { x: '48%', y: '66%', s: 180, c: 'rgba(255,107,0,0.16)', b: 28, dx: 20, dy: 16, t: 17 },
  { x: '24%', y: '74%', s: 90, c: 'rgba(255,0,60,0.18)', b: 16, dx: -12, dy: -20, t: 12 },
  { x: '60%', y: '30%', s: 70, c: 'rgba(212,175,55,0.3)', b: 12, dx: 14, dy: 12, t: 11 },
];

/** Hole of the lens iris (scale) for each readout aperture */
const IRIS_SCALE: Record<string, number> = { 'f/1.8': 0.86, 'f/2.8': 0.68, 'f/4': 0.52, 'f/5.6': 0.38 };

const octagon = (r: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');

/** Decorative lens whose diaphragm opens and closes with the aperture shown in the readout. */
const Lens: React.FC<{ aperture: string }> = ({ aperture }) => (
  <svg viewBox="-200 -200 400 400" aria-hidden="true" className="h-full w-full">
    <defs>
      <radialGradient id="lens-glass" cx="42%" cy="38%" r="75%">
        <stop offset="0" stopColor="#16324a" />
        <stop offset="0.55" stopColor="#07101a" />
        <stop offset="1" stopColor="#000" />
      </radialGradient>
      <radialGradient id="lens-body" cx="50%" cy="50%" r="50%">
        <stop offset="0.9" stopColor="#131313" />
        <stop offset="1" stopColor="#242424" />
      </radialGradient>
      <mask id="lens-iris" maskUnits="userSpaceOnUse" x="-100" y="-100" width="200" height="200">
        <rect x="-100" y="-100" width="200" height="200" fill="#fff" />
        <polygon
          className="iris-hole"
          points={octagon(100)}
          fill="#000"
          style={{ transform: `scale(${IRIS_SCALE[aperture] ?? 0.6})` }}
        />
      </mask>
      <path id="lens-arc" d="M -160 0 a 160 160 0 1 1 320 0 a 160 160 0 1 1 -320 0" />
    </defs>

    <circle r="198" fill="url(#lens-body)" stroke="#2c2c2c" strokeWidth="2" />
    <circle r="186" fill="none" stroke="#2a2a2a" strokeWidth="14" strokeDasharray="2.2 5" />
    <g className="lens-spin">
      <text fill="#D4AF37" fontFamily="JetBrains Mono, monospace" fontSize="11.5" letterSpacing="5" opacity="0.85">
        <textPath href="#lens-arc">QUANTUM CODE · LIGHT VAULT · 50 mm · 1:1.4 · QUANTUM CODE · LIGHT VAULT · 50 mm · 1:1.4 ·</textPath>
      </text>
    </g>
    <circle r="140" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    <circle r="132" fill="none" stroke="#FF6B00" strokeOpacity="0.55" strokeWidth="2" />
    <circle r="124" fill="url(#lens-glass)" stroke="#000" strokeWidth="3" />

    {/* What the sensor sees through the opening */}
    <circle r="96" fill="url(#lens-glass)" />
    <circle cx="-30" cy="-26" r="9" fill="#FF6B00" opacity="0.5" />
    <circle cx="34" cy="22" r="6" fill="#00F0FF" opacity="0.4" />
    <circle cx="8" cy="40" r="4" fill="#FF003C" opacity="0.45" />

    {/* Diaphragm blades: everything outside the hole */}
    <g mask="url(#lens-iris)">
      <circle r="100" fill="#0d0d0d" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="0" y1="-12" x2="0" y2="-100" stroke="#2f2f2f" strokeWidth="1.5" transform={`rotate(${i * 45 + 22.5}) translate(14 0)`} />
      ))}
      <circle r="100" fill="none" stroke="#3a3a3a" strokeWidth="2" />
    </g>

    {/* Glass reflections */}
    <path d="M -88 -58 A 108 108 0 0 1 -40 -100" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
    <path d="M 70 84 A 108 108 0 0 1 28 104" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Photography: React.FC = () => {
  const { travel } = useUniverseTravel();
  const [params, setParams] = useSearchParams();
  const sharedId = params.get('foto');
  const featured = useMemo(() => photos.find((p) => p.featured), []);
  const audiovisual = universes.find((u) => u.slug === 'audiovisual');

  /* ── Viewfinder ── */
  const frameRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState(FOCUS_SPOTS[0]);
  const [locked, setLocked] = useState(true);
  const [readout, setReadout] = useState(0);
  const [shots, setShots] = useState(0);
  const [flashKey, setFlashKey] = useState(0);
  const lockTimer = useRef<number | undefined>(undefined);
  const pointerSeen = useRef(false);

  const focusAt = useCallback((x: number, y: number) => {
    setSpot({ x, y });
    setLocked(false);
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => setLocked(true), 420);
  }, []);

  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0;
    const id = window.setInterval(() => {
      setReadout((r) => (r + 1) % READOUTS.length);
      if (!pointerSeen.current) {
        i = (i + 1) % FOCUS_SPOTS.length;
        focusAt(FOCUS_SPOTS[i].x, FOCUS_SPOTS[i].y);
      }
    }, 3200);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(lockTimer.current);
    };
  }, [focusAt]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reducedMotion()) return;
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    pointerSeen.current = true;
    focusAt(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  };

  const onFrameClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    setShots((n) => n + 1);
    if (!reducedMotion()) setFlashKey((k) => k + 1);
    navigator.vibrate?.(12);
  };

  /* ── No full-screen effect layers (scanlines…) over the photos while this page is open ── */
  useEffect(() => {
    document.documentElement.classList.add('no-screen-fx');
    return () => document.documentElement.classList.remove('no-screen-fx');
  }, []);

  /* ── Shared photo link (?foto=…) ── */
  useEffect(() => {
    if (!sharedId) return;
    const id = window.setTimeout(() => document.getElementById('archivo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    return () => window.clearTimeout(id);
    // Only on first load: later changes come from the visitor opening photos
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keepLinkInSync = useCallback(
    (id: string | null) => setParams(id ? { foto: id } : {}, { replace: true }),
    [setParams]
  );

  const read = READOUTS[readout];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SEO
        title="Universo Fotografía | Retrato, Eventos y Documental | Quantum Code Studio"
        description="Fotografía de Quantum Code Studio: retrato, eventos, producto y documental. Mira el archivo, juega con la luz en nuestro laboratorio y reserva tu sesión."
        canonicalUrl="/universos/fotografia"
      />

      {/* ───────── Header · viewfinder ───────── */}
      <header
        ref={frameRef}
        onPointerMove={onPointerMove}
        onClick={onFrameClick}
        className="relative overflow-hidden border-b border-white/10 pb-0 pt-32 md:pt-44"
      >
        {featured ? (
          <img
            src={photoSrc(featured, 1600)}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {BOKEH.map((b, i) => (
              <span
                key={i}
                className="bokeh"
                style={{
                  left: b.x,
                  top: b.y,
                  width: b.s,
                  height: b.s,
                  background: b.c,
                  ['--b' as string]: `${b.b}px`,
                  ['--dx' as string]: `${b.dx}px`,
                  ['--dy' as string]: `${b.dy}px`,
                  ['--t' as string]: `${b.t}s`,
                  ['--delay' as string]: `${-i * 2.3}s`,
                }}
              />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,0,0,0.8),transparent_70%)]" />

        {/* Rule-of-thirds grid */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute inset-y-0 left-1/3 w-px bg-white/[0.07]" />
          <span className="absolute inset-y-0 left-2/3 w-px bg-white/[0.07]" />
          <span className="absolute inset-x-0 top-1/3 h-px bg-white/[0.07]" />
          <span className="absolute inset-x-0 top-2/3 h-px bg-white/[0.07]" />
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute right-[-9%] top-[66%] hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-35 lg:block xl:right-[2%] xl:h-[32rem] xl:w-[32rem] xl:opacity-40">
          <Lens aperture={READOUTS[readout].f} />
        </div>

        {/* Autofocus box */}
        <div aria-hidden="true" className="vf-focus" data-locked={locked} style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
          <i />
          <i />
          <i />
          <i />
          <span className="absolute -top-5 left-0 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.25em]">
            {locked ? 'AF-S ● LOCK' : 'AF-S …'}
          </span>
        </div>

        {/* Shutter flash */}
        {flashKey > 0 && <span key={flashKey} aria-hidden="true" className="vf-flash pointer-events-none absolute inset-0 z-10 bg-white" />}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
            <span>
              QC://universos/<span className="text-white">fotografia</span>
              <span className="animate-pulse text-neon-orange">_</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-orange" />
              LIGHT_VAULT
            </span>
          </div>

          {/* Camera readout */}
          <div
            aria-hidden="true"
            className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/10 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]"
          >
            <span className="text-neon-orange">M</span>
            <span className="tabular-nums text-white">{read.t}</span>
            <span className="tabular-nums text-white">{read.f}</span>
            <span className="tabular-nums">ISO {read.iso}</span>
            <span className="relative hidden h-3 w-32 sm:block">
              <span className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
              {[0, 25, 50, 75, 100].map((t) => (
                <span key={t} className={`absolute top-1/2 w-px -translate-y-1/2 bg-white/40 ${t === 50 ? 'h-3' : 'h-1.5'}`} style={{ left: `${t}%` }} />
              ))}
              <span className="vf-needle absolute top-0 h-3 w-0.5 bg-neon-orange" style={{ left: '50%' }} />
            </span>
            <span className="ml-auto flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-pink motion-safe:[animation:vf-rec_1.4s_ease-in-out_infinite]" />
              RAW+J · {String(shots).padStart(4, '0')}
              <Battery size={14} className="text-neon-green" />
            </span>
          </div>

          <div className="relative px-4 py-8 sm:px-10 sm:py-12 lg:px-14">
            <HudCorners className="border-neon-orange/70" size="w-5 h-5 sm:w-6 sm:h-6" />
            <button
              type="button"
              onClick={() => travel('/')}
              className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} /> Volver a Quantum Code
            </button>
            {/* One word on one line: its size follows the box width (Syne Black is ≈1.1 em per letter) */}
            <div className="[container-type:inline-size]">
              <h1 className="font-display text-[clamp(1.4rem,9cqw,6rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
                FOTOGRAFÍA
              </h1>
            </div>
            <p className="mt-8 max-w-2xl border-l border-neon-orange pl-5 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
              Retrato, eventos, producto y documental con ojo de estudio. Cada imagen, pensada, capturada y revelada con intención.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#archivo"
                className="inline-flex items-center gap-2 border border-neon-orange bg-neon-orange px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-neon-orange"
              >
                Ver el archivo <ArrowUpRight size={14} />
              </a>
              <a
                href={photoWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
              >
                Reservar sesión <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <p aria-hidden="true" className="pb-5 pt-2 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-gray-600">
            Toca el visor para disparar
          </p>
        </div>
      </header>

      {/* ───────── 01 Archivo ───────── */}
      <section id="archivo" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="01" as="h2" className="mb-4">Archivo</SectionLabel>
        <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
          Una selección de nuestro trabajo. Abre una foto para verla en grande y compartirla.
        </p>
        <PhotoGallery photos={photos} initialId={sharedId} onOpenChange={keepLinkInSync} />
      </section>

      {/* ───────── 02 Servicios ───────── */}
      <section className="border-y border-white/10 bg-dark-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="02" as="h2" className="mb-4">Servicios</SectionLabel>
          <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
            Qué podemos fotografiar contigo.
          </p>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photoServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="group relative flex flex-col border border-white/10 bg-black p-6 transition-colors hover:border-neon-orange/60 sm:p-7">
                  <HudCorners className="border-white/15 group-hover:border-neon-orange" />
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-neon-orange/40 text-neon-orange">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-[10px] text-gray-600">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{s.line}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-gray-500">
                        <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-neon-orange" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}

            {/* Cross-universe combo */}
            <li className="relative flex flex-col justify-between border border-neon-orange bg-neon-orange p-6 text-black sm:p-7">
              <div>
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-black/60">+ Estudio multidisciplinario</p>
                <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight">Foto + video + sonido + diseño</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-black/75">
                  Todo en un mismo equipo: una sola dirección creativa para tu proyecto, de la sesión a la pieza final.
                </p>
              </div>
              {audiovisual && (
                <button
                  type="button"
                  onClick={() => travel(audiovisual.path, audiovisual)}
                  onMouseEnter={() => void audiovisual.preload?.()}
                  className="mt-8 inline-flex items-center gap-2 self-start border-2 border-black px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-neon-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Ver universo audiovisual <ArrowUpRight size={14} />
                </button>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* ───────── 03 Laboratorio de luz ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="03" as="h2" className="mb-4">Laboratorio de luz</SectionLabel>
        <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
          Fotografiar es decidir cuánta luz entra. Mueve los tres controles del triángulo de exposición y mira qué le pasa a la imagen.
        </p>
        <ExposureLab />
      </section>

      {/* ───────── 04 Proceso ───────── */}
      <section className="border-y border-white/10 bg-dark-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="04" as="h2" className="mb-4">Proceso</SectionLabel>
          <p className="mb-14 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
            De la idea a las fotos en tus manos.
          </p>

          <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden="true" className="absolute left-[19px] top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-neon-orange/60 to-transparent lg:hidden" />
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-neon-orange/60 to-transparent lg:block" />
            {photoProcess.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 lg:block">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border border-neon-orange bg-black font-mono text-xs font-bold text-neon-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="lg:mt-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative overflow-hidden bg-black py-24 md:py-32">
        <div className="absolute inset-0 border-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            <HudCorners className="border-neon-orange/70" size="w-6 h-6" />
            <h2 className="mb-6 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              ¿TIENES ALGO <br /> QUE MERECE <br className="sm:hidden" /> SER VISTO?
            </h2>
            <p className="mx-auto mb-10 max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
              Cuéntanos qué necesitas y armamos la sesión.
            </p>
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <GooeyButton
                label="Hablemos"
                href="/contacto"
                className="inline-block h-16 bg-white px-10 py-4 text-black"
                colors={[1, 2, 3, 4]}
              />
              <a
                href={photoWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 items-center gap-3 border border-white/30 px-8 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-neon-green hover:text-neon-green"
              >
                <MessageCircle size={18} /> Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Photography;
