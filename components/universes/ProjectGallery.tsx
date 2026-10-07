import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Columns2, ExternalLink, MessageCircle, Monitor, Radio, Smartphone, X } from 'lucide-react';
import HudCorners from '../ui/HudCorners';
import ShareMenu from './ShareMenu';
import DeviceShowcase, { DeviceMode, kindColor, PlaceholderArt, shotSrcSet, shotUrl } from './DeviceShowcase';
import { useModal } from './useModal';
import { DevProject, ProjectKind, projectKinds, devSkills, whatsAppLink } from '../../lib/development';
import type { ProjectShots } from '../../lib/projects.generated';

type ShotsMap = Record<string, ProjectShots>;

const skillName = new Map(devSkills.flatMap((g) => g.skills.map((s) => [s.id, s.name] as const)));

const statusStyle: Record<string, string> = {
  'En producción': 'border-neon-green/50 text-neon-green',
  'Código abierto': 'border-neon-blue/50 text-neon-blue',
  'En desarrollo': 'border-gold/60 text-gold',
};

/** Syne Black is ≈1.13 em per letter: size the title so its longest word fills at most ~88 % of the column */
const titleCqw = (title: string) => Math.min(11, 88 / (Math.max(...title.split(/\s+/).map((w) => w.length)) * 1.13));

const projectLink = (slug: string) => `https://www.quantumcode.art/universos/desarrollo?proyecto=${encodeURIComponent(slug)}`;

const LinkOut: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  const cls =
    'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-green';
  return url.startsWith('/') ? (
    <Link to={url} className={cls}>
      {label} <ArrowUpRight size={13} />
    </Link>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cls}>
      {label} <ArrowUpRight size={13} />
    </a>
  );
};

/* ───────────────────────── card ───────────────────────── */

const Thumb: React.FC<{ project: DevProject; shots?: ProjectShots }> = ({ project, shots }) => {
  const pc = shots?.pc[0];
  const movil = shots?.movil[0];

  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#070707]">
      {pc ? (
        <img
          src={shotUrl(pc, 720)}
          srcSet={shotSrcSet(pc)}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          width={pc.w}
          height={pc.h}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-top"
        />
      ) : movil || project.kind === 'app' ? (
        <div className="flex h-full items-center justify-center py-3">
          <div className="aspect-[9/16] h-full overflow-hidden rounded-xl border-2 border-[#262626] bg-black">
            {movil ? (
              <img
                src={shotUrl(movil, 390)}
                srcSet={shotSrcSet(movil)}
                sizes="200px"
                width={movil.w}
                height={movil.h}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <PlaceholderArt kind={project.kind} device="movil" label="Próximamente" />
            )}
          </div>
        </div>
      ) : (
        <PlaceholderArt kind={project.kind} device="pc" />
      )}
    </div>
  );
};

const Card: React.FC<{ project: DevProject; shots?: ProjectShots; onOpen: (slug: string) => void }> = ({ project, shots, onOpen }) => {
  const color = kindColor[project.kind];
  const hasPc = !!shots?.pc.length;
  const hasMovil = !!shots?.movil.length;
  return (
    <button
      type="button"
      onClick={() => onOpen(project.slug)}
      aria-label={`Ver el proyecto ${project.title}`}
      className="group relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-black text-left transition-colors hover:border-[var(--c)] focus-visible:border-[var(--c)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c)]"
      style={{ ['--c' as string]: color }}
    >
      <HudCorners className="border-white/10 group-hover:border-[var(--c)]" />
      <Thumb project={project} shots={shots} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ borderColor: `${color}66`, color }}>
            {projectKinds[project.kind].label}
          </span>
          {project.status && (
            <span className={`border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${statusStyle[project.status]}`}>{project.status}</span>
          )}
        </div>
        <h3 className="font-display text-lg font-black uppercase leading-tight tracking-tight text-white sm:text-xl">{project.title}</h3>
        {project.org && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">{project.org}</p>}
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-400">{project.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="flex items-center gap-3 text-gray-500" aria-hidden="true">
            <Monitor size={15} className={hasPc ? 'text-white' : 'opacity-40'} />
            <Smartphone size={15} className={hasMovil ? 'text-white' : 'opacity-40'} />
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300 transition-colors group-hover:text-[var(--c)]">
            Ver proyecto <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </button>
  );
};

/* ───────────────────────── viewer ───────────────────────── */

const modeOptions: { id: DeviceMode; label: string; icon: React.ReactNode }[] = [
  { id: 'ambos', label: 'Ambos', icon: <Columns2 size={14} /> },
  { id: 'pc', label: 'PC', icon: <Monitor size={14} /> },
  { id: 'movil', label: 'Móvil', icon: <Smartphone size={14} /> },
];

const ViewerBody: React.FC<{ project: DevProject; shots?: ProjectShots }> = ({ project, shots }) => {
  const hasPc = !!shots?.pc.length;
  const hasMovil = !!shots?.movil.length;
  // Only one kind of screenshot (e.g. a desktop app): show just that frame and no switcher. With none yet, show both placeholders.
  const only: DeviceMode | null = hasPc && !hasMovil ? 'pc' : !hasPc && hasMovil ? 'movil' : null;
  const [picked, setMode] = useState<DeviceMode>('ambos');
  const mode = project.liveUrl ? picked : only ?? picked;
  const [live, setLive] = useState(false);
  const color = kindColor[project.kind];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-12">
      <div className="lg:col-span-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Ver en" className={`flex border border-white/20 ${only && !project.liveUrl ? 'hidden' : ''}`}>
            {modeOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={mode === o.id}
                onClick={() => setMode(o.id)}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white ${
                  mode === o.id ? 'bg-neon-green text-black' : 'text-gray-300 hover:bg-white/[0.06]'
                }`}
              >
                {o.icon}
                {o.label}
              </button>
            ))}
          </div>
          {project.liveUrl && (
            <button
              type="button"
              aria-pressed={live}
              onClick={() => setLive((v) => !v)}
              className={`flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                live ? 'border-neon-pink bg-neon-pink/10 text-neon-pink' : 'border-white/20 text-gray-300 hover:border-neon-green hover:text-neon-green'
              }`}
            >
              <Radio size={14} /> {live ? 'Ver capturas' : 'Ver en vivo'}
            </button>
          )}
        </div>

        <DeviceShowcase project={project} shots={shots} mode={mode} live={live} />

        {project.liveUrl && live && (
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] leading-relaxed text-gray-500">
            Se muestra el sitio real. Si no aparece, es que el sitio no permite verse dentro de otra página:
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gray-300 hover:text-neon-green">
              ábrelo en otra pestaña <ExternalLink size={12} />
            </a>
          </p>
        )}
      </div>

      <aside className="mt-12 min-w-0 [container-type:inline-size] lg:col-span-4 lg:mt-0">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: `${color}66`, color }}>
            {projectKinds[project.kind].label}
          </span>
          {project.status && (
            <span className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyle[project.status]}`}>{project.status}</span>
          )}
        </div>
        <h2
          className="font-display font-black uppercase leading-[1.05] tracking-tight text-white [overflow-wrap:anywhere]"
          style={{ fontSize: `clamp(1.3rem, ${titleCqw(project.title).toFixed(2)}cqw, 2.5rem)` }}
        >
          {project.title}
        </h2>
        {project.org && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">{project.org}</p>}
        <p className="mt-6 border-l pl-5 text-sm leading-relaxed text-gray-300 sm:text-base" style={{ borderColor: color }}>
          {project.description}
        </p>

        {project.features && project.features.length > 0 && (
          <ul className="mt-6 space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0" style={{ background: color }} />
                {f}
              </li>
            ))}
          </ul>
        )}

        {project.stack && project.stack.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">Tecnologías</p>
            <ul className="flex flex-wrap gap-3">
              {project.stack.map((id) => (
                <li key={id} className="flex items-center gap-2 border border-white/10 py-1 pl-1 pr-3">
                  <img src={`/assets/skills/${id}.svg`} alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
                  <span className="font-mono text-[11px] text-gray-300">{skillName.get(id) ?? id}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
            {project.links.map((l) => (
              <LinkOut key={l.url} {...l} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          <a
            href={whatsAppLink(`Hola Quantum Code, vi el proyecto «${project.title}» en su web y quiero algo parecido. ¿Podemos conversar?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neon-green bg-neon-green px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle size={15} /> Quiero algo así
          </a>
          <ShareMenu
            title={project.title}
            url={projectLink(project.slug)}
            text={`${project.title} — Desarrollo por Quantum Code Studio`}
            placement="top"
            className="h-[46px]"
          />
        </div>
      </aside>
    </div>
  );
};

interface ViewerProps {
  list: DevProject[];
  index: number;
  shots: ShotsMap;
  onIndex: (i: number) => void;
  onClose: () => void;
}

const Viewer: React.FC<ViewerProps> = ({ list, index, shots, onIndex, onClose }) => {
  const project = list[index];
  const go = useCallback((delta: number) => onIndex((index + delta + list.length) % list.length), [index, list.length, onIndex]);
  const { dialogRef, closeRef } = useModal({ onClose, onPrev: () => go(-1), onNext: () => go(1) });

  const nav =
    'flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-neon-green hover:text-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-green';

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Proyecto ${index + 1} de ${list.length}: ${project.title}`}
      className="fixed inset-0 z-[110] overflow-y-auto bg-[#030504]"
    >
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[#030504]/95 px-3 py-3 backdrop-blur sm:px-6">
        <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 sm:text-xs">
          <span className="text-neon-green">PROYECTO {String(index + 1).padStart(2, '0')}</span> / {String(list.length).padStart(2, '0')}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {list.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Proyecto anterior" className={nav}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Proyecto siguiente" className={nav}>
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar" className={nav}>
            <X size={20} />
          </button>
        </div>
      </div>
      <ViewerBody key={project.slug} project={project} shots={shots[project.slug]} />
    </div>,
    document.body
  );
};

/* ───────────────────────── gallery ───────────────────────── */

interface ProjectGalleryProps {
  projects: DevProject[];
  shots: ShotsMap;
  /** Project to open on first render (shared link) */
  initialSlug?: string | null;
  /** Called when the viewer opens/changes/closes, to keep the URL in sync */
  onOpenChange?: (slug: string | null) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, shots, initialSlug, onOpenChange }) => {
  const [filter, setFilter] = useState<'all' | ProjectKind>('all');
  const [openSlug, setOpenSlug] = useState<string | null>(() => (initialSlug && projects.some((p) => p.slug === initialSlug) ? initialSlug : null));

  const kinds = useMemo(() => {
    const counts = new Map<ProjectKind, number>();
    projects.forEach((p) => counts.set(p.kind, (counts.get(p.kind) ?? 0) + 1));
    return [...counts.entries()].map(([kind, count]) => ({ kind, count }));
  }, [projects]);

  const list = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.kind === filter)), [filter, projects]);
  const openIndex = openSlug ? list.findIndex((p) => p.slug === openSlug) : -1;

  const change = useCallback(
    (slug: string | null) => {
      setOpenSlug(slug);
      onOpenChange?.(slug);
    },
    [onOpenChange]
  );

  // A shared project may belong to another type than the active filter
  useEffect(() => {
    if (openSlug && openIndex === -1) setFilter('all');
  }, [openSlug, openIndex]);

  return (
    <div>
      <div className="mb-8">
        <div role="group" aria-label="Filtrar por tipo de proyecto" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ id: 'all' as const, label: 'Todos', count: projects.length }, ...kinds.map((k) => ({ id: k.kind, label: projectKinds[k.kind].plural, count: k.count }))].map((c) => {
            const on = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c.id)}
                className={`shrink-0 border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-green ${
                  on ? 'border-neon-green bg-neon-green text-black' : 'border-white/20 text-gray-300 hover:border-neon-green hover:text-neon-green'
                }`}
              >
                {c.label} <span className={on ? 'text-black/60' : 'text-gray-600'}>{String(c.count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Mostrando {list.length} de {projects.length} proyectos
      </p>

      <ul key={filter} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Card project={p} shots={shots[p.slug]} onOpen={change} />
          </li>
        ))}
      </ul>

      {openIndex >= 0 && <Viewer list={list} index={openIndex} shots={shots} onIndex={(i) => change(list[i].slug)} onClose={() => change(null)} />}
    </div>
  );
};

export default ProjectGallery;
