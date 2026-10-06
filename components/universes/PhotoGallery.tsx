import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Aperture, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import HudCorners from '../ui/HudCorners';
import ShareMenu from './ShareMenu';
import { Photo, photoCategories, photoLink, photoSrc, photoSrcSet } from '../../lib/photography';

/* ───────────────────────── helpers ───────────────────────── */

const mq = (q: string) => window.matchMedia(q).matches;

/** 2 columns on phones, 3 from tablets, 4 on very wide screens */
const useColumns = (count: number) => {
  const read = () => (mq('(min-width: 1536px)') && count >= 12 ? 4 : mq('(min-width: 640px)') ? 3 : 2);
  const [cols, setCols] = useState(read);
  useEffect(() => {
    const lists = ['(min-width: 640px)', '(min-width: 1536px)'].map((q) => window.matchMedia(q));
    const on = () => setCols(read());
    lists.forEach((l) => l.addEventListener('change', on));
    on();
    return () => lists.forEach((l) => l.removeEventListener('change', on));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return cols;
};

/** Masonry: each item goes to the shortest column (heights known from the aspect ratio), so reading order stays left → right. */
const toColumns = <T extends { w: number; h: number }>(items: T[], cols: number): T[][] => {
  const columns: T[][] = Array.from({ length: cols }, () => []);
  const heights = new Array<number>(cols).fill(0);
  items.forEach((item) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(item);
    heights[shortest] += item.h / item.w;
  });
  return columns;
};

/* ───────────────────────── tile ───────────────────────── */

/** The photo and nothing else: no overlays, blur layers, zoom or captions in front of it. */
const Tile: React.FC<{ photo: Photo; priority: boolean; onOpen: (id: string) => void }> = ({ photo, priority, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(photo.id)}
    aria-label={`Abrir foto ${photo.frame}: ${photo.title}, ${photo.categoryLabel}`}
    title={photo.title}
    className="relative block w-full overflow-hidden border border-white/10 bg-black transition-colors hover:border-neon-orange focus-visible:border-neon-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-orange"
    style={{ aspectRatio: `${photo.w} / ${photo.h}`, backgroundColor: photo.color }}
  >
    <img
      src={photoSrc(photo, 800)}
      srcSet={photoSrcSet(photo)}
      sizes="(min-width: 1536px) 25vw, (min-width: 640px) 33vw, 50vw"
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover"
    />
  </button>
);

/* ───────────────────────── lightbox ───────────────────────── */

interface LightboxProps {
  list: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ list, index, onIndex, onClose }) => {
  const photo = list[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  // Keyed by photo: arriving at a new photo starts "not loaded" with no reset effect
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const loaded = loadedId === photo.id;

  const go = useCallback(
    (delta: number) => onIndex((index + delta + list.length) % list.length),
    [index, list.length, onIndex]
  );

  // Scroll lock + focus handling (the opener gets the focus back on close)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      html.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  // Warm the neighbours so ← → feels instant
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const n = list[(i + list.length) % list.length];
      if (n && n.id !== photo.id) new Image().src = photoSrc(n, 1600);
    });
  }, [index, list, photo.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // The share menu closes itself with Escape; don't close the viewer at the same time
        if (dialogRef.current?.querySelector('[role="menu"]')) return;
        onClose();
      } else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Home') onIndex(0);
      else if (e.key === 'End') onIndex(list.length - 1);
      else if (e.key === 'Tab' && dialogRef.current) {
        // Only what is actually on screen (the phone-only arrows are display:none on desktop)
        const focusables = Array.from<HTMLElement>(
          dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
        ).filter((el) => el.getClientRects().length > 0);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, list.length, onClose, onIndex]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
  };

  const exif = photo.exif;
  const chips = [
    exif?.camera && { icon: <Camera size={12} />, text: exif.camera },
    exif?.lens && { text: exif.lens, wide: true },
    exif?.focal && { text: exif.focal },
    exif?.aperture && { text: exif.aperture },
    exif?.shutter && { text: exif.shutter },
    exif?.iso && { text: `ISO ${exif.iso}` },
  ].filter(Boolean) as { icon?: React.ReactNode; text: string; wide?: boolean }[];

  const iconBtn =
    'flex h-11 w-11 items-center justify-center border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-neon-orange hover:text-neon-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-orange';

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Visor de fotografías — foto ${index + 1} de ${list.length}`}
      className="fixed inset-0 z-[110] flex flex-col bg-black"
    >
      <div className="relative z-10 flex items-center justify-between gap-3 px-3 py-3 sm:px-6">
        <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 sm:text-xs">
          <span className="text-neon-orange">FRAME {String(index + 1).padStart(2, '0')}</span> / {String(list.length).padStart(2, '0')}
          <span className="hidden sm:inline"> · {photo.categoryLabel}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <ShareMenu
            title={photo.title}
            url={photoLink(photo.id)}
            text={`${photo.title} — Fotografía por Quantum Code Studio`}
            className="h-11 bg-black/60 backdrop-blur-sm"
          />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar visor" className={iconBtn}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pan-y select-none px-2 sm:px-16"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipe.current = null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {!loaded && (
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-neon-orange">
            <Aperture size={36} className="animate-spin [animation-duration:2.4s]" />
          </span>
        )}
        <img
          key={photo.id}
          src={photoSrc(photo, 1600)}
          srcSet={photoSrcSet(photo)}
          sizes="100vw"
          alt={photo.alt}
          draggable={false}
          onLoad={() => setLoadedId(photo.id)}
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) setLoadedId(photo.id);
          }}
          className={`h-full w-full object-contain ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className={`${iconBtn} absolute left-2 top-1/2 hidden -translate-y-1/2 sm:flex`}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className={`${iconBtn} absolute right-2 top-1/2 hidden -translate-y-1/2 sm:flex`}
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-3 px-3 pb-4 pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-6 sm:pb-6">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-black uppercase leading-tight tracking-tight text-white sm:text-2xl">{photo.title}</h2>
          {photo.caption && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-400">{photo.caption}</p>}
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          {list.length > 1 && (
            <div className="flex items-center gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={iconBtn}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className={iconBtn}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
          {chips.length > 0 && (
            <ul className="flex flex-wrap justify-end gap-1.5" aria-label="Datos de la toma">
              {chips.map((c) => (
                <li
                  key={c.text}
                  className={`items-center gap-1.5 border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-300 ${c.wide ? 'hidden sm:flex' : 'flex'}`}
                >
                  {c.icon}
                  {c.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ───────────────────────── placeholders ("por revelar") ───────────────────────── */

const SAMPLE_FRAMES = [
  { w: 3, h: 2, c1: '#FF6B00', c2: '#D4AF37', cat: 'Retrato' },
  { w: 2, h: 3, c1: '#00F0FF', c2: '#FF6B00', cat: 'Eventos' },
  { w: 1, h: 1, c1: '#D4AF37', c2: '#FF003C', cat: 'Producto' },
  { w: 4, h: 5, c1: '#FF003C', c2: '#FF6B00', cat: 'Documental' },
  { w: 3, h: 2, c1: '#00FF41', c2: '#00F0FF', cat: 'Naturaleza' },
  { w: 2, h: 3, c1: '#FF6B00', c2: '#00F0FF', cat: 'Retrato' },
  { w: 16, h: 9, c1: '#D4AF37', c2: '#00F0FF', cat: 'Eventos' },
  { w: 4, h: 5, c1: '#00F0FF', c2: '#FF003C', cat: 'Producto' },
  { w: 1, h: 1, c1: '#FF6B00', c2: '#D4AF37', cat: 'Documental' },
];

const SETTINGS = ['f/1.8 · 1/250 · ISO 100', 'f/2.8 · 1/500 · ISO 200', 'f/4 · 1/125 · ISO 400', 'f/5.6 · 1/1000 · ISO 100'];

const SampleGallery: React.FC = () => {
  const cols = useColumns(SAMPLE_FRAMES.length);
  const frames = useMemo(() => SAMPLE_FRAMES.map((f, i) => ({ ...f, i })), []);
  const columns = useMemo(() => toColumns(frames, cols), [frames, cols]);

  return (
    <div>
      <p className="mb-8 border-l border-neon-orange pl-4 font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-gray-400">
        // ARCHIVO EN REVELADO <br />
        <span className="text-gray-500">Estamos preparando las primeras series. Estos fotogramas son de muestra.</span>
      </p>
      <div role="img" aria-label="Fotogramas de muestra: las primeras fotos llegan pronto" className="flex items-start gap-3 sm:gap-4">
        {columns.map((col, ci) => (
          <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
            {col.map((f) => (
              <div
                key={f.i}
                aria-hidden="true"
                className="photo-in relative w-full overflow-hidden border border-white/10 bg-[#0a0a0a]"
                style={{ aspectRatio: `${f.w} / ${f.h}`, ['--i' as string]: f.i }}
              >
                <span
                  className="absolute inset-0 scale-105 blur-[2px]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 22% 30%, ${f.c1}55 0 9%, transparent 10%), radial-gradient(circle at 70% 24%, ${f.c2}44 0 6%, transparent 7%), radial-gradient(circle at 58% 66%, ${f.c1}33 0 13%, transparent 14%), radial-gradient(circle at 18% 78%, ${f.c2}33 0 7%, transparent 8%), radial-gradient(circle at 86% 80%, ${f.c1}44 0 5%, transparent 6%), linear-gradient(145deg, #140a03, #050505 70%)`,
                  }}
                />
                <HudCorners className="border-white/25" size="w-4 h-4" />
                <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
                  FRAME {String(f.i + 1).padStart(2, '0')}
                </span>
                <span className="absolute right-2 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">{f.cat}</span>
                <Aperture className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white/25" strokeWidth={1.2} />
                <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neon-orange">● Por revelar</span>
                <span className="absolute bottom-2 right-2 hidden font-mono text-[9px] tracking-[0.12em] text-gray-500 sm:block">
                  {SETTINGS[f.i % SETTINGS.length]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────── gallery ───────────────────────── */

interface PhotoGalleryProps {
  photos: Photo[];
  /** Photo to open on first render (from the shared link) */
  initialId?: string | null;
  /** Called when the viewer opens/changes/closes, to keep the URL in sync */
  onOpenChange?: (id: string | null) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, initialId, onOpenChange }) => {
  const [filter, setFilter] = useState<string>(() => 'all');
  const [openId, setOpenId] = useState<string | null>(() => (initialId && photos.some((p) => p.id === initialId) ? initialId : null));

  const categories = useMemo(() => photoCategories(photos), [photos]);
  const list = useMemo(() => (filter === 'all' ? photos : photos.filter((p) => p.category === filter)), [filter, photos]);
  const cols = useColumns(list.length);
  const columns = useMemo(() => toColumns(list, cols), [list, cols]);
  const openIndex = openId ? list.findIndex((p) => p.id === openId) : -1;

  const change = useCallback(
    (id: string | null) => {
      setOpenId(id);
      onOpenChange?.(id);
    },
    [onOpenChange]
  );

  // The shared photo may belong to another category than the active filter
  useEffect(() => {
    if (openId && openIndex === -1) setFilter('all');
  }, [openId, openIndex]);

  if (photos.length === 0) return <SampleGallery />;

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex items-center gap-4">
          <div role="group" aria-label="Filtrar por categoría" className="no-scrollbar -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ slug: 'all', label: 'Todas', count: photos.length }, ...categories].map((c) => {
              const on = filter === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c.slug)}
                  className={`shrink-0 border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-orange ${
                    on ? 'border-neon-orange bg-neon-orange text-black' : 'border-white/20 text-gray-300 hover:border-neon-orange hover:text-neon-orange'
                  }`}
                >
                  {c.label} <span className={on ? 'text-black/60' : 'text-gray-600'}>{String(c.count).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        Mostrando {list.length} de {photos.length} fotos
      </p>

      <div key={filter} className="flex items-start gap-3 sm:gap-4">
        {columns.map((col, ci) => (
          <div key={ci} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
            {col.map((p) => (
              <Tile key={p.id} photo={p} priority={list.indexOf(p) < 4} onOpen={change} />
            ))}
          </div>
        ))}
      </div>

      {openIndex >= 0 && (
        <Lightbox list={list} index={openIndex} onIndex={(i) => change(list[i].id)} onClose={() => change(null)} />
      )}
    </div>
  );
};

export default PhotoGallery;
