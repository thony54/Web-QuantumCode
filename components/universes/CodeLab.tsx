import React, { useId, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import HudCorners from '../ui/HudCorners';

/**
 * "Laboratorio de código": style a button and watch its CSS and its accessibility (WCAG contrast) change live.
 * The contrast ratio and the AA/AAA verdicts are the real WCAG 2.x formulas, not decoration.
 */

const SWATCHES = [
  { name: 'Verde', hex: '#00FF41' },
  { name: 'Cian', hex: '#00F0FF' },
  { name: 'Dorado', hex: '#D4AF37' },
  { name: 'Naranja', hex: '#FF6B00' },
  { name: 'Rojo', hex: '#FF003C' },
  { name: 'Blanco', hex: '#FFFFFF' },
];

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};

/** WCAG relative luminance */
const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* Tiny CSS "syntax highlighting" */
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-gray-400">{children}</span>;
const Prop: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-neon-blue">{children}</span>;
const Val: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-gold">{children}</span>;
const Com: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-gray-500">{children}</span>;

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, unit, onChange }) => {
  const id = useId();
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-sm tabular-nums text-neon-green">
          {value}
          {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value}${unit}`}
        className="code-range w-full"
      />
    </div>
  );
};

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void; hint: string }> = ({
  label,
  checked,
  onChange,
  hint,
}) => {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#00FF41]"
      />
      <label htmlFor={id} className="cursor-pointer">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-gray-300">{label}</span>
        <span className="mt-1 block font-mono text-[11px] leading-relaxed text-gray-500">{hint}</span>
      </label>
    </div>
  );
};

const CodeLab: React.FC = () => {
  const [bg, setBg] = useState('#00FF41');
  const [textColor, setTextColor] = useState<'#000000' | '#FFFFFF'>('#000000');
  const [radius, setRadius] = useState(12);
  const [glow, setGlow] = useState(18);
  const [lift, setLift] = useState(true);
  const [focusRing, setFocusRing] = useState(true);
  const [copied, setCopied] = useState(false);
  const pickerId = useId();

  const ratio = useMemo(() => contrast(bg, textColor), [bg, textColor]);
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;
  const large = ratio >= 3;

  const glowCss = glow > 0 ? `0 0 ${glow}px ${bg}99` : 'none';
  const ratioText = `${ratio.toFixed(1)}:1`;

  const cssText = [
    '.boton {',
    `  background: ${bg};`,
    `  color: ${textColor};`,
    `  border-radius: ${radius}px;`,
    `  box-shadow: ${glowCss};`,
    ...(lift ? ['  transition: transform .2s;'] : []),
    '}',
    ...(lift ? ['.boton:hover { transform: translateY(-3px); }'] : []),
    '.boton:focus-visible {',
    ...(focusRing ? ['  outline: 3px solid #fff;', '  outline-offset: 3px;'] : ['  outline: none; /* ¡no lo hagas! */']),
    '}',
    `/* contraste ${ratioText} · ${aaa ? 'cumple AAA' : aa ? 'cumple AA' : 'NO cumple AA'} */`,
  ].join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cssText);
    } catch {
      const area = document.createElement('textarea');
      area.value = cssText;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const verdict = (ok: boolean, label: string) => (
    <li
      className={`flex items-center justify-between border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] ${
        ok ? 'border-neon-green/40 text-neon-green' : 'border-neon-pink/40 text-neon-pink'
      }`}
    >
      <span>{label}</span>
      <span aria-label={ok ? 'cumple' : 'no cumple'}>{ok ? '✔ Cumple' : '✖ No cumple'}</span>
    </li>
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="space-y-7 border border-white/10 bg-black p-6 sm:p-8 lg:col-span-4">
        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">Color de fondo</legend>
          <div className="flex flex-wrap items-center gap-2">
            {SWATCHES.map((s) => (
              <button
                key={s.hex}
                type="button"
                onClick={() => setBg(s.hex)}
                aria-label={`${s.name} ${s.hex}`}
                aria-pressed={bg.toLowerCase() === s.hex.toLowerCase()}
                className={`h-9 w-9 border-2 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  bg.toLowerCase() === s.hex.toLowerCase() ? 'scale-110 border-white' : 'border-white/20 hover:scale-105'
                }`}
                style={{ background: s.hex }}
              />
            ))}
            <label htmlFor={pickerId} className="sr-only">
              Elegir otro color
            </label>
            <input
              id={pickerId}
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value.toUpperCase())}
              className="h-9 w-12 cursor-pointer border-2 border-white/20 bg-transparent p-0"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">Color del texto</legend>
          <div className="grid grid-cols-2 gap-2">
            {(['#000000', '#FFFFFF'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setTextColor(c)}
                aria-pressed={textColor === c}
                className={`border px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  textColor === c ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-white/20 text-gray-400 hover:border-white/50'
                }`}
              >
                {c === '#000000' ? 'Negro' : 'Blanco'}
              </button>
            ))}
          </div>
        </fieldset>

        <Slider label="Borde redondeado" value={radius} min={0} max={32} unit="px" onChange={setRadius} />
        <Slider label="Resplandor" value={glow} min={0} max={40} unit="px" onChange={setGlow} />

        <div className="space-y-4 border-t border-white/10 pt-6">
          <Toggle label="Se eleva al pasar el ratón" checked={lift} onChange={setLift} hint="Pequeña animación de respuesta." />
          <Toggle
            label="Anillo de foco visible"
            checked={focusRing}
            onChange={setFocusRing}
            hint="Quien navega con teclado necesita ver dónde está. Prueba a pulsar Tab sobre el botón."
          />
        </div>
      </div>

      {/* Preview + verdict */}
      <div className="space-y-6 lg:col-span-4">
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border border-white/10 bg-[#050505] p-6">
          <div aria-hidden="true" className="absolute inset-0 border-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
          <HudCorners className="border-neon-green/60" size="w-4 h-4" />
          <button
            type="button"
            className={`code-lab-btn relative px-9 py-4 font-display text-lg font-black uppercase tracking-tight ${lift ? 'code-lab-btn--lift' : ''} ${
              focusRing ? 'code-lab-btn--ring' : 'code-lab-btn--noring'
            }`}
            style={{ background: bg, color: textColor, borderRadius: radius, boxShadow: glowCss }}
          >
            Hablemos
          </button>
        </div>

        <div>
          <p className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
            <span>Contraste (WCAG)</span>
            <span className="font-display text-2xl font-black tracking-tight text-white" role="status" aria-live="polite">
              {ratioText}
            </span>
          </p>
          <ul className="space-y-2">
            {verdict(aa, 'Texto normal · AA (4.5)')}
            {verdict(aaa, 'Texto normal · AAA (7)')}
            {verdict(large, 'Texto grande · AA (3)')}
          </ul>
        </div>
      </div>

      {/* Code */}
      <div className="lg:col-span-4">
        <div className="flex h-full flex-col border border-white/10 bg-black">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
              <span aria-hidden="true" className="flex gap-1.5">
                <i className="h-2 w-2 rounded-full bg-neon-pink/70" />
                <i className="h-2 w-2 rounded-full bg-gold/70" />
                <i className="h-2 w-2 rounded-full bg-neon-green/70" />
              </span>
              boton.css
            </span>
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-neon-green hover:text-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {copied ? <Check size={13} className="text-neon-green" /> : <Copy size={13} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="flex-1 overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-gray-300 sm:text-[13px]" aria-label="Código CSS generado">
            <code>
              <Val>.boton</Val> <P>{'{'}</P>
              {'\n  '}
              <Prop>background</Prop>
              <P>: </P>
              <Val>{bg}</Val>
              <P>;</P>
              {'\n  '}
              <Prop>color</Prop>
              <P>: </P>
              <Val>{textColor}</Val>
              <P>;</P>
              {'\n  '}
              <Prop>border-radius</Prop>
              <P>: </P>
              <Val>{radius}px</Val>
              <P>;</P>
              {'\n  '}
              <Prop>box-shadow</Prop>
              <P>: </P>
              <Val>{glowCss}</Val>
              <P>;</P>
              {lift && (
                <>
                  {'\n  '}
                  <Prop>transition</Prop>
                  <P>: </P>
                  <Val>transform .2s</Val>
                  <P>;</P>
                </>
              )}
              {'\n'}
              <P>{'}'}</P>
              {lift && (
                <>
                  {'\n'}
                  <Val>.boton:hover</Val> <P>{'{ '}</P>
                  <Prop>transform</Prop>
                  <P>: </P>
                  <Val>translateY(-3px)</Val>
                  <P>{'; }'}</P>
                </>
              )}
              {'\n'}
              <Val>.boton:focus-visible</Val> <P>{'{'}</P>
              {'\n  '}
              <Prop>outline</Prop>
              <P>: </P>
              <Val>{focusRing ? '3px solid #fff' : 'none'}</Val>
              <P>;</P>
              {focusRing ? (
                <>
                  {'\n  '}
                  <Prop>outline-offset</Prop>
                  <P>: </P>
                  <Val>3px</Val>
                  <P>;</P>
                </>
              ) : (
                <>
                  {' '}
                  <Com>/* ¡no lo hagas! */</Com>
                </>
              )}
              {'\n'}
              <P>{'}'}</P>
              {'\n'}
              <Com>{`/* contraste ${ratioText} · ${aaa ? 'cumple AAA' : aa ? 'cumple AA' : 'NO cumple AA'} */`}</Com>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeLab;
