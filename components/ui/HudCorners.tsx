import React from 'react';

interface HudCornersProps {
    /** Border color classes for the brackets, e.g. "border-white/20 group-hover:border-gold" */
    className?: string;
    /** Width/height classes for each bracket */
    size?: string;
}

/** Four HUD-style corner brackets. Place inside a `relative` parent. */
const HudCorners: React.FC<HudCornersProps> = ({ className = 'border-white/25', size = 'w-3 h-3' }) => {
    const base = `pointer-events-none absolute z-20 ${size} transition-colors duration-300 ${className}`;
    return (
        <>
            <span aria-hidden="true" className={`${base} top-0 left-0 border-t border-l`} />
            <span aria-hidden="true" className={`${base} top-0 right-0 border-t border-r`} />
            <span aria-hidden="true" className={`${base} bottom-0 left-0 border-b border-l`} />
            <span aria-hidden="true" className={`${base} bottom-0 right-0 border-b border-r`} />
        </>
    );
};

export default HudCorners;
