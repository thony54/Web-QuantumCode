import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { TransitionKind, Universe } from '../../lib/universes';

interface ActiveTravel {
  kind: TransitionKind;
  accent: string;
  label: string;
}

interface TravelApi {
  /** Go to a path with a universe's signature transition. Without a universe: the "return to base" wipe. */
  travel: (to: string, universe?: Universe) => void;
}

const TravelContext = createContext<TravelApi>({ travel: () => undefined });

export const useUniverseTravel = () => useContext(TravelContext);

/** Every transition covers the screen fully between COVER_FROM and COVER_TO (seconds). */
const DURATION = 1.2;
const TIMES = [0, 0.35, 0.65, 1];
const NAVIGATE_AT = 700; // ms: in the middle of the fully covered window (0.62s – 0.78s)
const END_AT = 1500; // ms: > DURATION + the largest stagger delay (0.2s)

const SoundWipe: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="absolute inset-0 flex bg-black/0">
    {Array.from({ length: 20 }, (_, i) => (
      <motion.div
        key={i}
        className="h-full flex-1"
        style={{ background: `linear-gradient(to top, ${accent}, #D4AF37 60%, #FF003C)` }}
        initial={{ scaleY: 0, transformOrigin: '50% 100%' }}
        animate={{
          scaleY: [0, 1, 1, 0],
          transformOrigin: ['50% 100%', '50% 100%', '50% 0%', '50% 0%'],
        }}
        transition={{ duration: DURATION, times: TIMES, delay: ((i * 7) % 20) * 0.01, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const comicColors = ['#D4AF37', '#FFFFFF', '#FF003C', '#D4AF37', '#00F0FF'];

const ComicWipe: React.FC = () => (
  <div className="absolute inset-0">
    {comicColors.map((color, i) => {
      const fromTop = i % 2 === 0;
      return (
        <motion.div
          key={i}
          className="halftone absolute -top-[10%] h-[120%] border-x-[4px] border-black"
          style={{ left: `${i * 20 - 4}%`, width: '28%', background: color, color: 'rgba(0,0,0,0.35)', skewX: -12 }}
          initial={{ y: fromTop ? '-110%' : '110%' }}
          animate={{ y: [fromTop ? '-110%' : '110%', '0%', '0%', fromTop ? '110%' : '-110%'] }}
          transition={{ duration: DURATION, times: TIMES, delay: i * 0.05, ease: 'easeInOut' }}
        />
      );
    })}
    <motion.span
      className="absolute left-1/2 top-1/2 font-display text-[clamp(4rem,18vw,12rem)] font-black uppercase leading-none text-black [-webkit-text-stroke:3px_#fff] [text-shadow:8px_8px_0_#000]"
      style={{ x: '-50%', y: '-50%' }}
      initial={{ opacity: 0, scale: 0.3, rotate: -8 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.1, 1, 1.5], rotate: [-8, -6, -6, -3] }}
      transition={{ duration: DURATION, times: TIMES, ease: 'easeOut' }}
    >
      ¡WHAM!
    </motion.span>
  </div>
);

const QuantumWipe: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="absolute inset-0 flex flex-col">
    {Array.from({ length: 6 }, (_, i) => (
      <motion.div
        key={i}
        className="relative w-full flex-1 border-b border-black/60"
        style={{ background: i % 2 ? '#0a0a0a' : accent }}
        initial={{ x: i % 2 ? '100%' : '-100%' }}
        animate={{ x: [i % 2 ? '100%' : '-100%', '0%', '0%', i % 2 ? '-100%' : '100%'] }}
        transition={{ duration: DURATION, times: TIMES, delay: i * 0.03, ease: 'easeInOut' }}
      >
        <span className="absolute inset-x-0 bottom-0 h-px bg-neon-blue/70" />
      </motion.div>
    ))}
  </div>
);

/** Camera iris: eight blades close on the centre, a flash fires at the click, then they open on the new page. */
const IRIS_OPEN = '62vmax';

const ShutterWipe: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="absolute inset-0">
    <motion.div
      className="absolute inset-0"
      initial={{ rotate: -14 }}
      animate={{ rotate: [-14, 0, 0, 14] }}
      transition={{ duration: DURATION, times: TIMES, ease: 'easeInOut' }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${i * 45}deg)` }}>
          <motion.div
            className="absolute"
            style={{
              left: '-150vmax',
              top: 0,
              width: '300vmax',
              height: '150vmax',
              background: 'linear-gradient(180deg, #2a2a2a 0%, #0b0b0b 6%, #050505 100%)',
              borderTop: `2px solid ${accent}`,
            }}
            initial={{ y: IRIS_OPEN }}
            animate={{ y: [IRIS_OPEN, '0vmax', '0vmax', IRIS_OPEN] }}
            transition={{ duration: DURATION, times: TIMES, ease: 'easeInOut' }}
          />
        </div>
      ))}
    </motion.div>
    <motion.div
      className="absolute inset-0 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.92, 0, 0] }}
      transition={{ duration: DURATION, times: [0, 0.4, 0.48, 0.66, 1] }}
    />
  </div>
);

const TransitionOverlay: React.FC<{ travel: ActiveTravel }> = ({ travel }) => (
  <div aria-hidden="true" className="fixed inset-0 z-[120] overflow-hidden">
    {travel.kind === 'sound' && <SoundWipe accent={travel.accent} />}
    {travel.kind === 'comic' && <ComicWipe />}
    {travel.kind === 'quantum' && <QuantumWipe accent={travel.accent} />}
    {travel.kind === 'shutter' && <ShutterWipe accent={travel.accent} />}
    {travel.kind !== 'comic' && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: DURATION, times: TIMES }}
      >
        <span className="bg-black px-5 py-3 font-mono text-[11px] uppercase tracking-[0.4em] text-white sm:text-sm">
          {travel.label}
          <span className="animate-pulse text-gold">_</span>
        </span>
      </motion.div>
    )}
  </div>
);

export const UniverseTransitionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<ActiveTravel | null>(null);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const travel = useCallback(
    (to: string, universe?: Universe) => {
      if (busy.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(to);
        return;
      }
      busy.current = true;
      setActive({
        kind: universe?.transition ?? 'quantum',
        accent: universe?.accent ?? '#D4AF37',
        label: universe ? `Entrando a // universo ${universe.name}` : 'Regresando a // quantum code',
      });
      timers.current.push(window.setTimeout(() => navigate(to), NAVIGATE_AT));
      timers.current.push(
        window.setTimeout(() => {
          setActive(null);
          busy.current = false;
        }, END_AT)
      );
    },
    [navigate]
  );

  const api = useMemo(() => ({ travel }), [travel]);

  return (
    <TravelContext.Provider value={api}>
      {children}
      {active && <TransitionOverlay travel={active} />}
    </TravelContext.Provider>
  );
};
