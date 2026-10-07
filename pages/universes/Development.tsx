import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import GooeyButton from '../../components/ui/GooeyButton';
import HudCorners from '../../components/ui/HudCorners';
import SectionLabel from '../../components/ui/SectionLabel';
import BriefBuilder from '../../components/universes/BriefBuilder';
import CodeLab from '../../components/universes/CodeLab';
import ProjectGallery from '../../components/universes/ProjectGallery';
import { SEO } from '../../components/SEO';
import { useUniverseTravel } from '../../components/universes/UniverseTransition';
import { devCare, devProcess, devProjects, devServices, devSkills, devWhatsApp, heroTerminal } from '../../lib/development';
import { projectShots } from '../../lib/projects.generated';
import './universes.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Types the hero terminal line by line, then starts over. With reduced motion it just shows everything. */
const useTerminal = () => {
  const last = heroTerminal.length - 1;
  const [pos, setPos] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (reducedMotion()) {
      setPos({ line: last, chars: heroTerminal[last].text.length });
      return;
    }
    let cancelled = false;
    let timer = 0;
    const step = (line: number, chars: number) => {
      if (cancelled) return;
      setPos({ line, chars });
      const current = heroTerminal[line];
      if (chars < current.text.length) {
        timer = window.setTimeout(() => step(line, chars + 1), current.kind === 'cmd' ? 48 : 20);
      } else if (line < last) {
        timer = window.setTimeout(() => step(line + 1, 0), current.kind === 'cmd' ? 520 : 280);
      } else {
        timer = window.setTimeout(() => step(0, 0), 5000);
      }
    };
    step(0, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [last]);

  return pos;
};

const glyph = {
  cmd: <span className="text-neon-green">$</span>,
  ok: <span className="text-neon-green">✔</span>,
  info: <span className="text-gold">▲</span>,
};

const Terminal: React.FC = () => {
  const pos = useTerminal();
  return (
    <div className="relative border border-white/15 bg-black/80 backdrop-blur-sm">
      <HudCorners className="border-neon-green/60" size="w-3.5 h-3.5" />
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-neon-pink/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-gold/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-neon-green/80" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">quantum — terminal</span>
      </div>
      <p className="sr-only">Una terminal que muestra cómo creamos un proyecto: arquitectura limpia, accesible por defecto, rápido y en producción.</p>
      <div aria-hidden="true" className="min-h-[13.5rem] space-y-2 p-4 font-mono text-[13px] leading-relaxed sm:p-5 sm:text-sm">
        {heroTerminal.slice(0, pos.line + 1).map((l, i) => {
          const text = i < pos.line ? l.text : l.text.slice(0, pos.chars);
          const typing = i === pos.line;
          return (
            <p key={i} className={l.kind === 'cmd' ? 'text-white' : l.kind === 'info' ? 'text-gold' : 'text-gray-300'}>
              {glyph[l.kind]} {text}
              {typing && <span className="term-cursor ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-neon-green" />}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const Development: React.FC = () => {
  const { travel } = useUniverseTravel();
  const [params, setParams] = useSearchParams();
  const sharedSlug = params.get('proyecto');

  // Project captures must be seen clean: no scanline/noise layers over them while this page is open
  useEffect(() => {
    document.documentElement.classList.add('no-screen-fx');
    return () => document.documentElement.classList.remove('no-screen-fx');
  }, []);

  // A shared link (?proyecto=…) lands on the projects section
  useEffect(() => {
    if (!sharedSlug) return;
    const id = window.setTimeout(() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    return () => window.clearTimeout(id);
    // Only on first load: later changes come from the visitor opening projects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keepLinkInSync = useCallback((slug: string | null) => setParams(slug ? { proyecto: slug } : {}, { replace: true }), [setParams]);

  return (
    <div className="min-h-screen bg-[#030504] text-white">
      <SEO
        title="Universo Desarrollo | Web, Apps, CRM y Accesibilidad | Quantum Code Studio"
        description="Desarrollo web, apps, CRM, software a medida y accesibilidad digital de Quantum Code Studio. Mira nuestros proyectos en computador y celular y cuéntanos el tuyo."
        canonicalUrl="/universos/desarrollo"
      />

      {/* ───────── Header ───────── */}
      <header className="relative overflow-hidden border-b border-white/10 pb-16 pt-32 md:pb-24 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 border-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1000px] max-w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,255,65,0.12),transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
            <span>
              QC://universos/<span className="text-white">desarrollo</span>
              <span className="animate-pulse text-neon-green">_</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
              CODE_CORE
            </span>
          </div>

          <div className="relative px-4 py-8 sm:px-10 sm:py-12 lg:px-14">
            <HudCorners className="border-neon-green/60" size="w-5 h-5 sm:w-6 sm:h-6" />
            <button
              type="button"
              onClick={() => travel('/')}
              className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} /> Volver a Quantum Code
            </button>

            {/* One word on one line: its size follows the box width */}
            <div className="[container-type:inline-size]">
              <h1 className="font-display text-[clamp(1.4rem,8.4cqw,6rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
                DESARROLLO
              </h1>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <p className="max-w-xl border-l border-neon-green pl-5 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
                  Sitios, apps, CRM y software a medida. Arquitectura robusta, código limpio y accesibilidad digital nativa en cada proyecto.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#proyectos"
                    className="inline-flex items-center gap-2 border border-neon-green bg-neon-green px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-neon-green"
                  >
                    Ver proyectos <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="#brief"
                    className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
                  >
                    Cotizar un proyecto <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── 01 Qué construimos ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="01" as="h2" className="mb-4">Qué construimos</SectionLabel>
        <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
          De una página sencilla a un sistema completo.
        </p>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {devServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="group relative flex flex-col border border-white/10 bg-black p-6 transition-colors hover:border-neon-green/60 sm:p-7">
                <HudCorners className="border-white/15 group-hover:border-neon-green" />
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center border border-neon-green/40 text-neon-green">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{s.line}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-gray-500">
                      <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-neon-green" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ───────── 02 Proyectos ───────── */}
      <section id="proyectos" className="scroll-mt-24 border-y border-white/10 bg-dark-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="02" as="h2" className="mb-4">Proyectos</SectionLabel>
          <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
            Apps, sitios y sistemas que hemos construido. Abre uno y míralo en computador y en celular.
          </p>
          <ProjectGallery projects={devProjects} shots={projectShots} initialSlug={sharedSlug} onOpenChange={keepLinkInSync} />
        </div>
      </section>

      {/* ───────── 03 Skills ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="03" as="h2" className="mb-4">Skills</SectionLabel>
        <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
          Las tecnologías que manejamos.
        </p>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
          {devSkills.map((group, gi) => (
            <section
              key={group.title}
              aria-labelledby={`skills-${gi}`}
              className={gi === 0 ? 'md:col-span-7' : gi === 1 ? 'md:col-span-5' : 'md:col-span-4'}
            >
              <h3 id={`skills-${gi}`} className="mb-6 flex items-center gap-3 font-display text-lg font-bold uppercase tracking-tight text-white">
                <span aria-hidden="true" className="h-1 w-5 bg-neon-green" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-7">
                {group.skills.map((s) => (
                  <li key={s.id} className="group flex w-[4.5rem] flex-col items-center gap-3 text-center">
                    <img
                      src={`/assets/skills/${s.id}.svg`}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-14 w-14 rounded-xl transition-transform duration-300 group-hover:-translate-y-1"
                    />
                    <span className="font-mono text-[11px] leading-tight text-gray-300">{s.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* ───────── 04 Laboratorio de código ───────── */}
      <section id="laboratorio" className="scroll-mt-24 border-y border-white/10 bg-dark-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="04" as="h2" className="mb-4">Laboratorio de código</SectionLabel>
          <p className="mb-12 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
            Diseña un botón y mira su código y su accesibilidad cambiar en vivo. El contraste se calcula con la fórmula real de WCAG.
          </p>
          <CodeLab />
        </div>
      </section>

      {/* ───────── 05 Proceso ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="05" as="h2" className="mb-4">Proceso</SectionLabel>
        <p className="mb-14 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
          Cada proyecto, paso a paso.
        </p>

        <ol className="border-l border-white/15">
          {devProcess.map((s, i) => (
            <li key={s.hash} className="group relative grid grid-cols-1 gap-x-10 gap-y-2 py-6 pl-8 md:grid-cols-[11rem_1fr] md:pl-12">
              <span aria-hidden="true" className="absolute -left-[5px] top-9 h-2.5 w-2.5 bg-neon-green transition-transform group-hover:scale-150" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                <span className="text-gold">{s.hash}</span>
                <span className="ml-3 text-gray-600">{i === 0 ? 'init' : `#${String(i + 1).padStart(2, '0')}`}</span>
              </span>
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">En cada proyecto cuidamos</p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {devCare.map((c) => (
              <li key={c.title} className="border border-white/10 bg-black p-5">
                <span aria-hidden="true" className="mb-4 block h-1 w-6 bg-neon-green" />
                <span className="block font-display text-lg font-bold uppercase tracking-tight text-white">{c.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-gray-400">{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Brief + CTA ───────── */}
      <section id="brief" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-dark-card py-24 md:py-32">
        <div aria-hidden="true" className="absolute inset-0 border-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-6 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
              ¿TIENES UNA IDEA <br /> QUE COMPILAR?
            </h2>
            <p className="mx-auto max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-500">
              Cuéntanos qué necesitas y armamos el mensaje por ti.
            </p>
          </div>

          <BriefBuilder />

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <GooeyButton label="Hablemos" href="/contacto" className="inline-block h-16 bg-white px-10 py-4 text-black" colors={[1, 2, 3, 4]} />
            <a
              href={devWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 items-center gap-3 border border-white/30 px-8 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-neon-green hover:text-neon-green"
            >
              <MessageCircle size={18} /> Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Development;
