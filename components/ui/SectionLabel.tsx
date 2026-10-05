import React from 'react';

interface SectionLabelProps {
    index: string;
    children: React.ReactNode;
    className?: string;
    as?: 'p' | 'h2' | 'h3';
}

/** Mono "01 // LABEL ————" heading used to number the sections of inner pages. */
const SectionLabel: React.FC<SectionLabelProps> = ({ index, children, className = '', as: Component = 'p' }) => (
    <Component className={`flex items-center gap-4 font-mono text-[10px] sm:text-xs font-normal uppercase tracking-[0.3em] ${className}`}>
        <span className="text-gold shrink-0">{index} //</span>
        <span className="text-gray-400 shrink-0">{children}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </Component>
);

export default SectionLabel;
