import React, { useEffect, useRef, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

interface ShareMenuProps {
  title: string;
  url: string;
  /** Short message that goes with the link */
  text: string;
  className?: string;
  /** Where the popover opens relative to the button */
  placement?: 'top' | 'bottom';
}

const itemClass =
  'block w-full px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.08] focus-visible:outline-none';

/**
 * "Compartir" button. On phones that support it, opens the native share sheet;
 * everywhere else, a small menu with WhatsApp, X, Facebook, Telegram and "copy link".
 */
const ShareMenu: React.FC<ShareMenuProps> = ({ title, url, text, className = '', placement = 'bottom' }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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

  const onClick = async () => {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (touch && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url });
      } catch {
        /* the visitor closed the share sheet */
      }
      return;
    }
    setOpen((v) => !v);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers without the async clipboard API
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'Telegram', href: `https://t.me/share/url?url=${u}&text=${t}` },
  ];

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Compartir ${title}`}
        className={`flex items-center gap-2 border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-300 transition-colors hover:border-gold hover:text-gold ${className}`}
      >
        <Share2 size={14} />
        <span className="hidden sm:inline">Compartir</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={`Compartir ${title}`}
          className={`absolute right-0 z-30 w-52 border border-white/20 bg-black shadow-[0_10px_40px_rgba(0,0,0,0.8)] ${
            placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {links.map((l) => (
            <a
              key={l.label}
              role="menuitem"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              {l.label}
            </a>
          ))}
          <button type="button" role="menuitem" onClick={copy} className={`${itemClass} flex items-center gap-2 border-t border-white/10`}>
            {copied ? <Check size={14} className="text-neon-green" /> : <Link2 size={14} />}
            {copied ? 'Enlace copiado' : 'Copiar enlace'}
          </button>
        </div>
      )}
      <span className="sr-only" role="status">{copied ? 'Enlace copiado al portapapeles' : ''}</span>
    </div>
  );
};

export default ShareMenu;
