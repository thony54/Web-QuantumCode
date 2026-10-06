import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HudCorners from '../ui/HudCorners';
import { isUniversePath, universes, Universe } from '../../lib/universes';
import { useUniverseTravel } from './UniverseTransition';

/** One row of the cascade. Locked universes are visible but inert. */
const UniverseRow: React.FC<{ universe: Universe; index: number; onPick: (u: Universe) => void }> = ({
  universe,
  index,
  onPick,
}) => {
  const Icon = universe.icon;
  const content = (
    <>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center border transition-colors"
        style={{ borderColor: `${universe.accent}66`, color: universe.accent }}
      >
        <Icon size={18} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-tight text-white">
          {universe.name}
          {!universe.ready && (
            <span className="border border-white/20 px-1.5 py-0.5 font-mono text-[8px] font-normal tracking-[0.2em] text-gray-500">
              PRONTO
            </span>
          )}
        </span>
        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
          {universe.tagline}
        </span>
      </span>
      <span className="font-mono text-[10px] text-gray-600">0{index + 1}</span>
    </>
  );

  return (
    <motion.li
      role="none"
      initial={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
    >
      {universe.ready ? (
        <button
          type="button"
          role="menuitem"
          onClick={() => onPick(universe)}
          onMouseEnter={() => void universe.preload?.()}
          onFocus={() => void universe.preload?.()}
          className="group flex w-full items-center gap-4 border-b border-white/5 px-4 py-3 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.07] focus-visible:outline-none"
        >
          {content}
        </button>
      ) : (
        <div
          role="menuitem"
          aria-disabled="true"
          className="flex w-full cursor-not-allowed items-center gap-4 border-b border-white/5 px-4 py-3 opacity-45"
        >
          {content}
        </div>
      )}
    </motion.li>
  );
};

/** "Universos" tab of the desktop navbar with its cascading list of capability areas. */
const UniversesMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { travel } = useUniverseTravel();
  const inUniverse = isUniversePath(location.pathname);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (universe: Universe) => {
    setOpen(false);
    travel(universe.path, universe);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full border px-4 py-[0.6em] font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
          inUniverse || open
            ? 'border-gold bg-gold text-black'
            : 'border-white/20 text-white hover:border-gold'
        }`}
      >
        Universos
        <ChevronDown size={13} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full z-50 mt-4 w-[22rem] origin-top-right border border-white/15 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <HudCorners className="border-gold/70" size="w-3 h-3" />
            <p className="border-b border-white/10 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500">
              QC://<span className="text-white">universos</span> — elige una dimensión
            </p>
            <ul role="menu" aria-label="Universos de Quantum Code">
              {universes.map((u, i) => (
                <UniverseRow key={u.slug} universe={u} index={i} onPick={pick} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UniversesMenu;
