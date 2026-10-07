import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import HudCorners from './HudCorners';

interface PageHeaderProps {
    /** Breadcrumb segment shown as QC://<path> */
    path: string;
    /** Section number, e.g. "02" */
    index: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Small status items for the bottom bar */
    meta?: string[];
    backgroundImage?: { src: string; srcSet?: string };
}

/** HUD-style hero shared by the inner pages (Servicios, Nosotros, Contacto). */
const PageHeader: React.FC<PageHeaderProps> = ({ path, index, title, description, meta, backgroundImage }) => (
    <header className="relative overflow-hidden border-b border-white/10 pt-32 pb-14 md:pt-44 md:pb-20">
        {backgroundImage && (
            <img
                src={backgroundImage.src}
                srcSet={backgroundImage.srcSet}
                sizes="100vw"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-dark" />
        <div className="absolute inset-0 border-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[1000px] max-w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14),transparent_65%)]" />
        {/* Scan line: the wrapper is as tall as the header and only its transform animates */}
        <div aria-hidden="true" className="hud-scan pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
                <span>
                    QC://<span className="text-white">{path}</span>
                    <span className="animate-pulse text-gold">_</span>
                </span>
                <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
                    SEC_{index}
                </span>
            </div>

            <div className="relative px-4 py-10 sm:px-10 sm:py-14 lg:px-14">
                <HudCorners className="border-gold/60" size="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="flex items-start gap-8">
                    <span aria-hidden="true" className="hidden select-none font-display text-8xl font-black leading-[0.8] text-white/[0.06] lg:block">
                        {index}
                    </span>
                    <div className="min-w-0 flex-1">
                        <RevealOnScroll width="100%">
                            {/* Sized so the longest single words (SERVICIOS, PROYECTO, QUANTUM) fit from 360px up */}
                            <h1 className="font-display text-[clamp(2rem,6.5vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
                                {title}
                            </h1>
                        </RevealOnScroll>
                        {description && (
                            <RevealOnScroll delay={0.2} width="100%">
                                <div className="mt-8 max-w-2xl border-l border-gold pl-5 font-mono text-sm leading-relaxed text-gray-400 sm:text-base">
                                    {description}
                                </div>
                            </RevealOnScroll>
                        )}
                    </div>
                </div>
            </div>

            {meta && meta.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    {meta.map((item) => (
                        <span key={item} className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-neon-blue" />
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </header>
);

export default PageHeader;
