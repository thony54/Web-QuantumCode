import React, { useId, useState } from 'react';
import { RotateCcw, Sun } from 'lucide-react';
import HudCorners from '../ui/HudCorners';

/**
 * "Laboratorio de luz": the exposure triangle you can touch.
 * Aperture → background blur, shutter → motion blur on the ball, ISO → grain,
 * and the three together → how much light reaches the "sensor" (the EV meter).
 */

const APERTURES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16];
const SHUTTERS = [1 / 30, 1 / 60, 1 / 125, 1 / 250, 1 / 500, 1 / 1000, 1 / 2000, 1 / 4000];
const ISOS = [100, 200, 400, 800, 1600, 3200, 6400];

/** Scene brightness in EV at ISO 100 (an overcast day). f/4 · 1/500 · ISO 100 is the "correct" exposure. */
const SCENE_EV = 13;
const START = { ap: 3, sh: 4, iso: 0 };

/** Background blur (px) per aperture stop and horizontal motion blur (px) per shutter stop */
const BG_BLUR = [11, 8, 5.5, 3.5, 2, 1, 0.4, 0];
const MOTION_BLUR = [24, 14, 7, 3.5, 1.5, 0.5, 0, 0];

const fmtShutter = (t: number) => `1/${Math.round(1 / t)}`;

const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const NOISE = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

const exposure = (ap: number, sh: number, iso: number) =>
  SCENE_EV - (Math.log2((APERTURES[ap] * APERTURES[ap]) / SHUTTERS[sh]) - Math.log2(ISOS[iso] / 100));

const fmtOffset = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : '±'}${Math.abs(v).toFixed(1)}`;

const verdict = (offset: number) => {
  if (Math.abs(offset) < 0.4) return { text: 'Exposición correcta', tone: 'text-neon-green' };
  if (offset > 0) return { text: offset > 2 ? 'Muy sobreexpuesta · se quema' : 'Sobreexpuesta · demasiada luz', tone: 'text-gold' };
  return { text: offset < -2 ? 'Muy subexpuesta · casi negro' : 'Subexpuesta · poca luz', tone: 'text-neon-blue' };
};

interface RowProps {
  label: string;
  value: string;
  hint: string;
  min: string;
  max: string;
  index: number;
  count: number;
  onChange: (i: number) => void;
}

const Row: React.FC<RowProps> = ({ label, value, hint, min, max, index, count, onChange }) => {
  const id = useId();
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-2xl font-black tabular-nums tracking-tight text-neon-orange">
          {value}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={count - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={value}
        className="lab-range w-full"
      />
      <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-gray-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <p className="mt-2 min-h-[2.5em] font-mono text-[11px] leading-relaxed text-gray-500">{hint}</p>
    </div>
  );
};

const ExposureLab: React.FC = () => {
  const [ap, setAp] = useState(START.ap);
  const [sh, setSh] = useState(START.sh);
  const [iso, setIso] = useState(START.iso);

  const offset = exposure(ap, sh, iso);
  const v = verdict(offset);
  const brightness = Math.min(3.2, Math.max(0.14, 2 ** (Math.max(-3.2, Math.min(3.2, offset)) / 2.2)));
  const wash = Math.max(0, Math.min(0.85, (offset - 1.2) / 4));
  const crush = Math.max(0, Math.min(0.8, (-offset - 1.6) / 4));
  const grain = Math.min(0.75, (Math.log2(ISOS[iso] / 100) / 6) * 0.75);
  const needle = ((Math.max(-3, Math.min(3, offset)) + 3) / 6) * 100;

  /** Move only the ISO to the value that leaves the exposure closest to correct */
  const balance = () => {
    let best = iso;
    let bestErr = Math.abs(offset);
    ISOS.forEach((_, i) => {
      const err = Math.abs(exposure(ap, sh, i));
      if (err < bestErr - 0.001) {
        best = i;
        bestErr = err;
      }
    });
    setIso(best);
  };

  const reset = () => {
    setAp(START.ap);
    setSh(START.sh);
    setIso(START.iso);
  };

  const bgHint =
    ap <= 1 ? 'Muy abierta: el fondo se deshace en luces suaves. Ideal para retratos.' : ap <= 4 ? 'Profundidad media: el fondo se distingue pero no compite.' : 'Cerrada: todo queda nítido, de la pelota al fondo. Ideal para paisajes y arquitectura.';
  const shHint =
    sh <= 1 ? 'Lenta: el movimiento deja una estela. Útil para dar sensación de velocidad… o para fallar la foto.' : sh <= 3 ? 'Media: un poco de movimiento sobrevive en la imagen.' : 'Rápida: congela el movimiento, como en el deporte.';
  const isoHint =
    iso <= 1 ? 'Limpio: la imagen sale pulida. Úsalo siempre que haya luz.' : iso <= 3 ? 'Algo de grano: aceptable para interiores y eventos.' : 'Alto: sirve con poca luz, a cambio de grano y menos detalle.';

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Preview */}
      <div className="lg:col-span-7">
        <div className="relative">
          <HudCorners className="border-neon-orange/70" size="w-5 h-5" />
          <div
            role="img"
            aria-label={`Escena de prueba con apertura f/${APERTURES[ap]}, velocidad ${fmtShutter(SHUTTERS[sh])} e ISO ${ISOS[iso]}. ${v.text}.`}
            className="relative aspect-[16/10] overflow-hidden bg-black"
          >
            <div className="absolute inset-0" style={{ filter: `brightness(${brightness.toFixed(3)})` }}>
              {/* Background: sky, skyline and lights (blur = aperture) */}
              <div className="absolute inset-0 scale-[1.12]" style={{ filter: `blur(${BG_BLUR[ap]}px)` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a4a] via-[#6a4a62] to-[#e08a4a]" />
                {[
                  { l: '2%', w: '13%', h: '46%' },
                  { l: '14%', w: '10%', h: '62%' },
                  { l: '24%', w: '14%', h: '40%' },
                  { l: '40%', w: '9%', h: '70%' },
                  { l: '50%', w: '15%', h: '48%' },
                  { l: '66%', w: '11%', h: '58%' },
                  { l: '78%', w: '13%', h: '42%' },
                  { l: '90%', w: '10%', h: '66%' },
                ].map((b, i) => (
                  <span
                    key={i}
                    className="absolute bottom-0 bg-[#0d0d14]"
                    style={{
                      left: b.l,
                      width: b.w,
                      height: b.h,
                      backgroundImage: 'radial-gradient(#ffd37a 1.2px, transparent 1.6px)',
                      backgroundSize: '12px 14px',
                    }}
                  />
                ))}
                {[
                  { x: '8%', y: '22%', c: '#FF6B00', s: 26 },
                  { x: '31%', y: '14%', c: '#D4AF37', s: 20 },
                  { x: '56%', y: '26%', c: '#00F0FF', s: 28 },
                  { x: '74%', y: '12%', c: '#FF003C', s: 22 },
                  { x: '88%', y: '30%', c: '#D4AF37', s: 24 },
                  { x: '44%', y: '8%', c: '#FF6B00', s: 18 },
                ].map((l, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full"
                    style={{ left: l.x, top: l.y, width: l.s, height: l.s, background: l.c, boxShadow: `0 0 12px ${l.c}` }}
                  />
                ))}
                <span className="absolute inset-x-0 bottom-0 h-[14%] bg-[#07070a]" />
              </div>

              {/* Subject: a ball passing by (motion blur = shutter) */}
              <svg width="0" height="0" aria-hidden="true" className="absolute">
                <filter id="lab-motion" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation={`${MOTION_BLUR[sh]} 0`} />
                </filter>
              </svg>
              <div className="lab-pass absolute bottom-[10%] left-0 h-[26%] w-[16%]" style={{ filter: 'url(#lab-motion)' }}>
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                  <circle cx="50" cy="50" r="46" fill="#f4f1ea" />
                  <path d="M50 4v92M4 50h92" stroke="#1a1a1a" strokeWidth="5" fill="none" />
                  <path d="M17 17c20 14 46 14 66 0M17 83c20-14 46-14 66 0" stroke="#1a1a1a" strokeWidth="5" fill="none" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#1a1a1a" strokeWidth="4" />
                </svg>
              </div>
            </div>

            {/* Over/under exposure and grain sit above the brightness filter */}
            <span aria-hidden="true" className="absolute inset-0 bg-white" style={{ opacity: wash }} />
            <span aria-hidden="true" className="absolute inset-0 bg-black" style={{ opacity: crush }} />
            <span
              aria-hidden="true"
              className="absolute inset-0 mix-blend-overlay"
              style={{ backgroundImage: NOISE, backgroundSize: '180px 180px', opacity: grain }}
            />

            {/* Viewfinder data */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white [text-shadow:0_1px_3px_#000]">
              <span>M · f/{APERTURES[ap]} · {fmtShutter(SHUTTERS[sh])} · ISO {ISOS[iso]}</span>
              <span className={v.tone}>EV {fmtOffset(offset)}</span>
            </div>
          </div>
        </div>

        {/* Exposure meter */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 text-gray-500">
              <Sun size={13} /> Exposímetro
            </span>
            <span className={v.tone} role="status" aria-live="polite">
              {v.text}
            </span>
          </div>
          <div
            role="meter"
            aria-label="Exposímetro"
            aria-valuemin={-3}
            aria-valuemax={3}
            aria-valuenow={Math.max(-3, Math.min(3, Number(offset.toFixed(1))))}
            aria-valuetext={`${fmtOffset(offset)} pasos de luz`}
            className="relative h-8 border border-white/15 bg-black"
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-[18%] -translate-x-1/2 bg-neon-green/10" />
            {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
              <span
                key={t}
                aria-hidden="true"
                className={`absolute bottom-0 w-px bg-white/30 ${t === 0 ? 'h-full bg-white/50' : 'h-2'}`}
                style={{ left: `${((t + 3) / 6) * 100}%` }}
              />
            ))}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-0.5 bg-neon-orange shadow-[0_0_10px_#FF6B00] transition-[left] duration-200"
              style={{ left: `${needle}%` }}
            />
          </div>
          <div aria-hidden="true" className="mt-1 flex justify-between font-mono text-[9px] tracking-[0.2em] text-gray-600">
            <span>−3</span>
            <span>−2</span>
            <span>−1</span>
            <span>0</span>
            <span>+1</span>
            <span>+2</span>
            <span>+3</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-8 border border-white/10 bg-black p-6 sm:p-8 lg:col-span-5">
        <Row
          label="Apertura"
          value={`f/${APERTURES[ap]}`}
          hint={bgHint}
          min="f/1.4 · abierta"
          max="f/16 · cerrada"
          index={ap}
          count={APERTURES.length}
          onChange={setAp}
        />
        <Row
          label="Velocidad"
          value={fmtShutter(SHUTTERS[sh])}
          hint={shHint}
          min="1/30 · lenta"
          max="1/4000 · rápida"
          index={sh}
          count={SHUTTERS.length}
          onChange={setSh}
        />
        <Row
          label="ISO"
          value={String(ISOS[iso])}
          hint={isoHint}
          min="100 · limpio"
          max="6400 · grano"
          index={iso}
          count={ISOS.length}
          onChange={setIso}
        />
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={balance}
            className="border border-neon-orange px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neon-orange transition-colors hover:bg-neon-orange hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Equilibrar con ISO
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 border border-white/20 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-300 transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <RotateCcw size={13} /> Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExposureLab;
