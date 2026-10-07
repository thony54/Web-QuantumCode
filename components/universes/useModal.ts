import { useEffect, useRef } from 'react';

interface ModalOptions {
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Behaviour of a full-screen dialog: locks the page scroll, moves the focus in and gives it back on close,
 * closes with Escape (unless a menu inside is open), ← → for previous/next and a Tab loop inside the dialog.
 */
export const useModal = ({ onClose, onPrev, onNext }: ModalOptions) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Always the latest handlers, without re-subscribing the key listener on every render
  const handlers = useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const typing = (e.target as HTMLElement)?.matches?.('input, textarea, select');
      if (e.key === 'Escape') {
        // A share menu closes itself with Escape: don't close the dialog at the same time
        if (dialog.querySelector('[role="menu"]')) return;
        handlers.current.onClose();
      } else if (e.key === 'ArrowRight' && !typing && !(e.target as HTMLElement)?.closest?.('[role="region"]')) handlers.current.onNext?.();
      else if (e.key === 'ArrowLeft' && !typing && !(e.target as HTMLElement)?.closest?.('[role="region"]')) handlers.current.onPrev?.();
      else if (e.key === 'Tab') {
        // Only what is really on screen (hidden buttons would break the loop)
        const focusables = Array.from<HTMLElement>(
          dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
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
  }, []);

  return { dialogRef, closeRef };
};
