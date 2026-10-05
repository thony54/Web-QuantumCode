import React, { useRef } from 'react';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    /** RGB triplet of the glow, e.g. "212,175,55" */
    color?: string;
}

/**
 * Card with a soft glow that follows the cursor. The position goes through CSS variables
 * (no React re-render, no springs), so it costs one repaint of the card per mouse move.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', color = '212,175,55' }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    return (
        <div ref={ref} onMouseMove={handleMouseMove} className={`group relative overflow-hidden ${className}`}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(${color}, 0.12), transparent 70%)` }}
            />
            {children}
        </div>
    );
};

export default SpotlightCard;
