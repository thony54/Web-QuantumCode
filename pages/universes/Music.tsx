import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, User } from 'lucide-react';
import GooeyButton from '../../components/ui/GooeyButton';
import HudCorners from '../../components/ui/HudCorners';
import SectionLabel from '../../components/ui/SectionLabel';
import MusicPlayer from '../../components/universes/MusicPlayer';
import { SEO } from '../../components/SEO';
import { useUniverseTravel } from '../../components/universes/UniverseTransition';
import { band, projects, tracks } from '../../lib/music';
import './universes.css';

const Music: React.FC = () => {
  const { travel } = useUniverseTravel();
  const [params, setParams] = useSearchParams();
  const sharedSlug = params.get('pista');

  // The album covers must be seen clean (pixel art above all): no full-screen scanline/noise layers over them
  useEffect(() => {
    document.documentElement.classList.add('no-screen-fx');
    return () => document.documentElement.classList.remove('no-screen-fx');
  }, []);

  // A shared link (?pista=…) lands directly on the player
  useEffect(() => {
    if (!sharedSlug) return;
    const id = window.setTimeout(() => document.getElementById('escucha')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    return () => window.clearTimeout(id);
    // Only on first load: later changes come from the visitor picking a track
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keepLinkInSync = useCallback((slug: string) => setParams({ pista: slug }, { replace: true }), [setParams]);

  const spectrum = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => ({
        d: 0.55 + ((i * 37) % 17) * 0.07,
        delay: -(((i * 13) % 11) * 0.1),
        h: 35 + ((i * 29) % 60),
      })),
    []
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SEO
        title="Universo Música | Nuestra banda y proyectos | Quantum Code"
        description="Conoce a la banda de Quantum Code, los proyectos en los que hemos participado y escucha nuestra música. Compártela con quien quieras."
        canonicalUrl="/universos/musica"
      />

      {/* ───────── Header ───────── */}
      <header className="relative overflow-hidden border-b border-white/10 pt-32 pb-0 md:pt-44">
        {/* Album art behind the title, under a dark veil so the text stays readable */}
        <img
          src="/assets/images/music-hero.webp"
          alt=""
          aria-hidden="true"
          width={1024}
          height={470}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,0,0,0.75),transparent_70%)]" />
        <div className="absolute inset-0 border-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1000px] max-w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.14),transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
            <span>
              QC://universos/<span className="text-white">musica</span>
              <span className="animate-pulse text-neon-blue">_</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
              SONIC_LAB
            </span>
          </div>

          <div className="relative px-4 py-10 sm:px-10 sm:py-14 lg:px-14">
            <HudCorners className="border-neon-blue/60" size="w-5 h-5 sm:w-6 sm:h-6" />
            <button
              type="button"
              onClick={() => travel('/')}
              className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} /> Volver a Quantum Code
            </button>
            <h1 className="font-display text-[clamp(2rem,6.5vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
              UNIVERSO
              <br />
              <span className="text-neon-blue">SONORO</span>
            </h1>
            <p className="mt-8 max-w-2xl border-l border-neon-blue pl-5 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
              // BANDA_ACTIVA <br />
              Nuestra música y los proyectos en los que hemos dejado huella. Escucha, comparte y súbele el volumen.
            </p>
            <a
              href="#escucha"
              className="mt-8 inline-flex items-center gap-2 border border-gold px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-black"
            >
              Escuchar ahora <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Decorative spectrum */}
        <div aria-hidden="true" className="relative mt-4 flex h-24 items-end gap-[3px] px-1 opacity-70">
          {spectrum.map((b, i) => (
            <span
              key={i}
              className="eq-bar flex-1 bg-gradient-to-t from-neon-blue via-gold to-neon-pink"
              style={{ height: `${b.h}%`, ['--d' as string]: `${b.d}s`, ['--delay' as string]: `${b.delay}s` }}
            />
          ))}
        </div>
      </header>

      {/* ───────── 01 La banda ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="01" as="h2" className="mb-12">La banda</SectionLabel>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="relative border border-white/15 bg-black p-6 sm:p-10 lg:col-span-7">
            <HudCorners className="border-neon-blue/60" size="w-4 h-4" />
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-blue">{band.tagline}</p>
            <h3 className="font-display text-[clamp(1.75rem,4.8vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
              {band.name}
            </h3>
            <div className="mt-8 space-y-4 border-l border-gold pl-5 text-sm leading-relaxed text-gray-400 sm:text-base">
              {band.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <ul className="space-y-3 lg:col-span-5" aria-label="Integrantes">
            {band.members.map((m, i) => (
              <li key={m.name} className="group relative flex items-center gap-5 border border-white/10 bg-black p-4 transition-colors hover:border-neon-blue/50">
                <HudCorners className="border-white/15 group-hover:border-neon-blue" />
                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-white/15 bg-white/[0.03] text-gray-600">
                  {m.photo ? <img src={m.photo} alt="" className="h-full w-full object-cover" loading="lazy" /> : <User size={26} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg font-bold uppercase tracking-tight text-white">{m.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">{m.role}</span>
                </span>
                <span className="font-mono text-[10px] text-gray-600">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 02 Escucha ───────── */}
      <section id="escucha" className="scroll-mt-24 border-y border-white/10 bg-dark-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="02" as="h2" className="mb-4">Escucha</SectionLabel>
          <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
            Reproduce aquí y comparte cada tema con su propio enlace.
          </p>
          <MusicPlayer tracks={tracks} initialSlug={sharedSlug} onSelect={keepLinkInSync} cover={band.cover} artist={band.name} />
        </div>
      </section>

      {/* ───────── 03 Arte de disco ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="03" as="h2" className="mb-12">Arte de disco</SectionLabel>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* The cover is shown clean: nothing over the image */}
          <div className="relative w-full max-w-md border border-white/15 bg-black p-3 sm:p-4 lg:col-span-5 lg:max-w-none">
            <HudCorners className="border-neon-blue/60" size="w-5 h-5" />
            <img
              src="/assets/images/alien-disco-1024.webp"
              srcSet="/assets/images/alien-disco-560.webp 560w, /assets/images/alien-disco-1024.webp 1024w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              width={1024}
              height={1024}
              alt="Portada del disco Neural Transición: un alien gris de ojos enormes y negros come una rebanada de pizza con una mano, sobre un fondo de remolinos de nebulosa, estrellas y planetas en blanco y negro, en estilo pixel art."
              loading="lazy"
              decoding="async"
              draggable={false}
              className="block aspect-square h-auto w-full bg-neutral-950 object-cover"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-blue">Quantum Code Music // Disco</p>
            {/* Sized by the column width: "TRANSICIÓN" is ≈11.6 em in Syne Black */}
            <div className="[container-type:inline-size]">
              <h3 className="font-display text-[clamp(1.5rem,7.7cqw,3.75rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
                Neural
                <br />
                Transición
              </h3>
            </div>
            <p className="mt-8 max-w-xl border-l border-gold pl-5 text-sm leading-relaxed text-gray-400 sm:text-base">
              Diseño de portada del disco Neural Transición, de Quantum Code Music.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 04 Proyectos ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="04" as="h2" className="mb-4">Proyectos</SectionLabel>
        <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
          Algunos de los proyectos en los que hemos participado.
        </p>

        <ol className="border-l border-white/15">
          {projects.map((p, i) => (
            <li key={`${p.year}-${i}`} className="group relative grid grid-cols-1 gap-x-10 gap-y-3 py-8 pl-8 md:grid-cols-[9rem_1fr] md:pl-12">
              <span aria-hidden="true" className="absolute -left-[5px] top-11 h-2.5 w-2.5 bg-gold transition-transform group-hover:scale-150" />
              <span className="text-outline font-display text-5xl font-black leading-none tracking-tighter sm:text-6xl">{p.year}</span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">{p.title}</h3>
                  <span className="border border-neon-blue/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-neon-blue">{p.kind}</span>
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{p.role}</p>
                {p.description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">{p.description}</p>}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-gold">
                    Ver proyecto <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-black py-24 md:py-32">
        <div className="absolute inset-0 border-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            <HudCorners className="border-neon-blue/60" size="w-6 h-6" />
            <h2 className="mb-10 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              ¿TIENES UNA <br /> IDEA SONORA?
            </h2>
            <GooeyButton
              label="Hablemos"
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

export default Music;
