import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'h2' }) => {
    return (
        <Component className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-blue opacity-0 group-hover:opacity-70 animate-glitch-1 clip-path-1 transition-opacity duration-300" aria-hidden="true">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-pink opacity-0 group-hover:opacity-70 animate-glitch-2 clip-path-2 transition-opacity duration-300 delay-75" aria-hidden="true">
                {text}
            </span>
        </Component>
    );
};

export default GlitchText;
