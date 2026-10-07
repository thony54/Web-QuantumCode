import React, { useEffect, useRef, useState } from 'react';
import { Accessibility, Gamepad2, Globe, LayoutDashboard, Smartphone } from 'lucide-react';
import type { DevProject, ProjectKind } from '../../lib/development';
import type { ProjectShot, ProjectShots } from '../../lib/projects.generated';

export type DeviceMode = 'ambos' | 'pc' | 'movil';

/** Signature colour of each project type (placeholders, chips and the card accent) */
export const kindColor: Record<ProjectKind, string> = {
  web: '#00FF41',
  app: '#00F0FF',
  crm: '#D4AF37',
  accesibilidad: '#FFFFFF',
  videojuego: '#FF003C',
};

export const shotUrl = (s: ProjectShot, width?: number) => {
  const w = width ? s.sizes.find((x) => x >= width) ?? s.sizes[s.sizes.length - 1] : s.sizes[s.sizes.length - 1];
  return `${s.src}-${w}.webp`;
};
export const shotSrcSet = (s: ProjectShot) => s.sizes.map((w) => `${s.src}-${w}.webp ${w}w`).join(', ');

const hostOf = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

/* ───────────────────────── placeholder art ("captura próximamente") ───────────────────────── */

const kindIcon = { web: Globe, app: Smartphone, crm: LayoutDashboard, accesibilidad: Accessibility, videojuego: Gamepad2 } as const;

/** A wireframe of the kind of project, drawn with plain boxes. Used wherever a real screenshot is still missing. */
export const PlaceholderArt: React.FC<{ kind: ProjectKind; device: 'pc' | 'movil'; label?: string }> = ({ kind, device, label = 'Captura próximamente' }) => {
  const color = kindColor[kind];
  const Icon = kindIcon[kind];
  const bar = 'rounded-sm bg-white/[0.07]';
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#070707] p-3 sm:p-4" aria-hidden="true">
      <div className="absolute inset-0 border-grid opacity-30" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl" style={{ background: `${color}22` }} />
      {device === 'pc' ? (
        <div className="relative flex min-h-0 flex-1 gap-3">
          {kind === 'crm' && (
            <div className="hidden w-1/5 shrink-0 flex-col gap-2 sm:flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`h-2 ${bar}`} style={i === 1 ? { background: `${color}55` } : undefined} />
              ))}
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-8 rounded-sm" style={{ background: `${color}88` }} />
              <span className={`h-1.5 w-10 ${bar}`} />
              <span className={`h-1.5 w-10 ${bar}`} />
              <span className="ml-auto h-3 w-12 rounded-sm" style={{ background: `${color}33` }} />
            </div>
            {kind === 'crm' ? (
              <>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-10 flex-1 rounded-sm border border-white/10 bg-white/[0.04]" />
                  ))}
                </div>
                <div className="flex flex-1 items-end gap-1.5">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `${color}${i % 2 ? '44' : '77'}` }} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-1 items-center justify-center rounded-sm border border-white/10 bg-white/[0.03]">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: `${color}99` }} strokeWidth={1.3} />
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-6 flex-1 rounded-sm border border-white/10 bg-white/[0.04]" />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="h-2 w-10 rounded-sm" style={{ background: `${color}88` }} />
            <span className={`h-2 w-4 ${bar}`} />
          </div>
          <div className="flex flex-1 items-center justify-center rounded-sm border border-white/10 bg-white/[0.03]">
            <Icon className="h-7 w-7" style={{ color: `${color}99` }} strokeWidth={1.3} />
          </div>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-5 rounded-sm border border-white/10 bg-white/[0.04]" />
          ))}
        </div>
      )}
      <p className={`relative mt-3 text-center font-mono uppercase text-gray-500 ${device === 'movil' ? 'text-[8px] tracking-[0.12em]' : 'text-[9px] tracking-[0.25em] sm:text-[10px]'}`}>{label}</p>
    </div>
  );
};

/* ───────────────────────── real screenshot (scrollable inside the frame) ───────────────────────── */

const ScrollShot: React.FC<{ shot: ProjectShot; alt: string; sizes: string; device: 'pc' | 'movil' }> = ({ shot, alt, sizes, device }) => (
  <div
    className="no-scrollbar h-full w-full overflow-y-auto bg-[#0b0b0b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neon-green"
    tabIndex={0}
    role="region"
    aria-label={`Captura de la versión para ${device === 'pc' ? 'computador' : 'celular'}. Usa las flechas del teclado para desplazarte.`}
  >
    <img
      src={shotUrl(shot, 720)}
      srcSet={shotSrcSet(shot)}
      sizes={sizes}
      width={shot.w}
      height={shot.h}
      alt={alt}
      decoding="async"
      draggable={false}
      className="block h-auto w-full"
    />
  </div>
);

/* ───────────────────────── live site, scaled into the frame ───────────────────────── */

const ScaledIframe: React.FC<{ url: string; baseWidth: number; title: string }> = ({ url, baseWidth, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setBox({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = box.w ? box.w / baseWidth : 1;
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-white">
      {box.w > 0 && (
        <iframe
          src={url}
          title={title}
          width={baseWidth}
          height={Math.ceil(box.h / scale)}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{ border: 0, transform: `scale(${scale})`, transformOrigin: '0 0' }}
        />
      )}
    </div>
  );
};

/* ───────────────────────── frames ───────────────────────── */

interface FrameProps {
  project: DevProject;
  shots: ProjectShot[];
  index: number;
  live: boolean;
}

const PcFrame: React.FC<FrameProps> = ({ project, shots, index, live }) => {
  const shot = shots[index];
  const address = (live && hostOf(project.liveUrl)) || hostOf(project.liveUrl) || project.title;
  return (
    <div className="overflow-hidden rounded-lg border border-white/20 bg-[#101010] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-neon-pink/70" />
          <i className="h-2 w-2 rounded-full bg-gold/70" />
          <i className="h-2 w-2 rounded-full bg-neon-green/70" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-white/[0.06] px-3 py-1 text-center font-mono text-[10px] tracking-[0.1em] text-gray-400">{address}</span>
      </div>
      <div className="relative aspect-[16/10]">
        {live && project.liveUrl ? (
          <ScaledIframe url={project.liveUrl} baseWidth={1440} title={`${project.title} — vista de computador`} />
        ) : shot ? (
          <ScrollShot key={shot.src} shot={shot} alt={`${project.title}: captura en computador ${index + 1}`} sizes="(min-width: 1024px) 700px, 100vw" device="pc" />
        ) : (
          <PlaceholderArt kind={project.kind} device="pc" />
        )}
      </div>
    </div>
  );
};

const PhoneFrame: React.FC<FrameProps> = ({ project, shots, index, live }) => {
  const shot = shots[index];
  return (
    <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c1c1c] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.7)] ring-1 ring-white/20 sm:rounded-[2rem]">
      <div aria-hidden="true" className="flex h-5 items-center justify-center bg-black">
        <span className="h-1.5 w-12 rounded-full bg-[#1c1c1c]" />
      </div>
      <div className="relative aspect-[9/17.5]">
        {live && project.liveUrl ? (
          <ScaledIframe url={project.liveUrl} baseWidth={390} title={`${project.title} — vista de celular`} />
        ) : shot ? (
          <ScrollShot key={shot.src} shot={shot} alt={`${project.title}: captura en celular ${index + 1}`} sizes="(min-width: 1024px) 260px, 60vw" device="movil" />
        ) : (
          <PlaceholderArt kind={project.kind} device="movil" />
        )}
      </div>
      <div aria-hidden="true" className="flex h-4 items-center justify-center bg-black">
        <span className="h-1 w-14 rounded-full bg-white/30" />
      </div>
    </div>
  );
};

/** Little "1 2 3" switcher shown when a device has several screenshots */
const ShotSwitcher: React.FC<{ caption: string; label: string; count: number; index: number; onChange: (i: number) => void }> = ({
  caption,
  label,
  count,
  index,
  onChange,
}) =>
  count > 1 ? (
    <div className="flex items-center gap-2" role="group" aria-label={`Capturas de ${label}`}>
      <span aria-hidden="true" className="mr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
        {caption}
      </span>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-pressed={i === index}
          aria-label={`Captura ${i + 1} de ${count} en ${label}`}
          onClick={() => onChange(i)}
          className={`h-8 w-8 border font-mono text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            i === index ? 'border-neon-green bg-neon-green text-black' : 'border-white/20 text-gray-400 hover:border-white/60'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  ) : null;

/* ───────────────────────── showcase ───────────────────────── */

interface ShowcaseProps {
  project: DevProject;
  shots?: ProjectShots;
  mode: DeviceMode;
  live: boolean;
}

/** The project seen on a laptop and on a phone. Key it by project so the shot indexes restart. */
const DeviceShowcase: React.FC<ShowcaseProps> = ({ project, shots, mode, live }) => {
  const [pcIndex, setPcIndex] = useState(0);
  const [movilIndex, setMovilIndex] = useState(0);
  const pc = shots?.pc ?? [];
  const movil = shots?.movil ?? [];

  const switchers = (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-start">
      {mode !== 'movil' && <ShotSwitcher caption="PC" label="computador" count={pc.length} index={pcIndex} onChange={setPcIndex} />}
      {mode !== 'pc' && <ShotSwitcher caption="Móvil" label="celular" count={movil.length} index={movilIndex} onChange={setMovilIndex} />}
    </div>
  );

  if (mode === 'pc') {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <PcFrame project={project} shots={pc} index={pcIndex} live={live} />
        {switchers}
      </div>
    );
  }

  if (mode === 'movil') {
    return (
      <div className="mx-auto w-[min(17rem,70vw)]">
        <PhoneFrame project={project} shots={movil} index={movilIndex} live={live} />
        <div className="[&>div]:justify-center">{switchers}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-8 sm:block sm:pb-12">
        <div className="relative w-full sm:pr-[14%]">
          <PcFrame project={project} shots={pc} index={pcIndex} live={live} />
          <div className="hidden sm:absolute sm:-bottom-12 sm:right-0 sm:block sm:w-[24%]">
            <PhoneFrame project={project} shots={movil} index={movilIndex} live={live} />
          </div>
        </div>
        <div className="w-[min(14rem,60vw)] sm:hidden">
          <PhoneFrame project={project} shots={movil} index={movilIndex} live={live} />
        </div>
      </div>
      {switchers}
    </div>
  );
};

export default DeviceShowcase;
