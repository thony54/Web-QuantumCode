import React, { useId, useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import HudCorners from '../ui/HudCorners';
import { briefNeeds, briefTimes, briefTypes, whatsAppLink } from '../../lib/development';

/**
 * "Cuéntanos tu proyecto": the visitor picks what they need and gets a ready-to-send WhatsApp message.
 * Nothing is stored or sent from the site itself: the message only leaves when they press the WhatsApp button.
 */

const chip =
  'block cursor-pointer select-none border border-white/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-300 transition-colors hover:border-neon-green/70 peer-checked:border-neon-green peer-checked:bg-neon-green peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white';

const BriefBuilder: React.FC = () => {
  const uid = useId();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleNeed = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const message = [
    `Hola Quantum Code, ${name.trim() ? `soy ${name.trim()}.` : 'quisiera cotizar un proyecto.'}`,
    type && `Quiero cotizar: ${type}.`,
    needs.length > 0 && `Necesito: ${needs.join(', ').toLowerCase()}.`,
    time && `Plazo: ${time.toLowerCase()}.`,
    reference.trim() && `Referencia: ${reference.trim()}.`,
  ]
    .filter(Boolean)
    .join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const area = document.createElement('textarea');
      area.value = message;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const field =
    'w-full border border-white/20 bg-black px-4 py-3 font-mono text-sm text-white placeholder:text-gray-600 focus-visible:border-neon-green focus-visible:outline-none';

  return (
    <div className="relative grid grid-cols-1 gap-8 border border-white/10 bg-black p-6 text-left sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
      <HudCorners className="border-neon-green/60" size="w-5 h-5" />

      <div className="space-y-7 lg:col-span-7">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
            Tu nombre (opcional)
          </label>
          <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="¿Cómo te llamas?" />
        </div>

        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">¿Qué necesitas?</legend>
          <div className="flex flex-wrap gap-2">
            {briefTypes.map((t) => (
              <div key={t}>
                <input id={`${uid}-t-${t}`} type="radio" name={`${uid}-type`} className="peer sr-only" checked={type === t} onChange={() => setType(t)} />
                <label htmlFor={`${uid}-t-${t}`} className={chip}>
                  {t}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">Incluye (elige las que quieras)</legend>
          <div className="flex flex-wrap gap-2">
            {briefNeeds.map((n) => (
              <div key={n}>
                <input id={`${uid}-n-${n}`} type="checkbox" className="peer sr-only" checked={needs.includes(n)} onChange={() => toggleNeed(n)} />
                <label htmlFor={`${uid}-n-${n}`} className={chip}>
                  {n}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">¿Para cuándo?</legend>
          <div className="flex flex-wrap gap-2">
            {briefTimes.map((t) => (
              <div key={t}>
                <input id={`${uid}-w-${t}`} type="radio" name={`${uid}-time`} className="peer sr-only" checked={time === t} onChange={() => setTime(t)} />
                <label htmlFor={`${uid}-w-${t}`} className={chip}>
                  {t}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${uid}-ref`} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
            Algo que te guste como referencia (opcional)
          </label>
          <input id={`${uid}-ref`} value={reference} onChange={(e) => setReference(e.target.value)} className={field} placeholder="Un enlace o el nombre de un sitio" />
        </div>
      </div>

      <div className="lg:col-span-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">Tu mensaje</p>
        <pre className="min-h-[9rem] whitespace-pre-wrap break-words border border-white/10 bg-[#050505] p-4 font-mono text-[13px] leading-relaxed text-gray-300" aria-live="polite">
          {message}
        </pre>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-gray-500">
          No guardamos nada: el mensaje solo sale cuando pulsas el botón de WhatsApp.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {type ? (
            <a
              href={whatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-neon-green bg-neon-green px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle size={15} /> Enviar por WhatsApp
            </a>
          ) : (
            <span
              role="note"
              className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-600"
            >
              <MessageCircle size={15} /> Elige qué necesitas
            </span>
          )}
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {copied ? <Check size={14} className="text-neon-green" /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar mensaje'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BriefBuilder;
