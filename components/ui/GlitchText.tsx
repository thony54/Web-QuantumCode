import React from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'h2' }) => {
    return (
        <Component className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-blue animate-glitch-1 clip-path-1" aria-hidden="true">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-pink animate-glitch-2 clip-path-2" aria-hidden="true">
                {text}
            </span>
        </Component>
    );
};

export default GlitchText;
