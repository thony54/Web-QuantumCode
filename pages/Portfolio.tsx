import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '../types';
import GlitchText from '../components/ui/GlitchText';
import PageHeader from '../components/ui/PageHeader';
import SectionLabel from '../components/ui/SectionLabel';
import HudCorners from '../components/ui/HudCorners';
import { SEO } from '../components/SEO';

const portfolioData: PortfolioItem[] = [
  { id: 1, title: 'RAT UNIVERSE', category: 'Web', imageUrl: '/assets/images/rat-universe.webp' },
  { id: 2, title: 'ALIEN PROFILE', category: 'Design', imageUrl: '/assets/images/perfilalien.webp' },
  { id: 3, title: 'KOTO', category: 'Audiovisual', imageUrl: '/assets/images/koto.webp' },
  { id: 4, title: 'TIWWTM', category: 'Branding', imageUrl: '/assets/images/TIWWTM.webp' },
  { id: 5, title: 'VOID E-COMMERCE', category: 'Web', imageUrl: 'https://images.unsplash.com/photo-1555421689-492a1880deb6?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'GLITCH MAGAZINE', category: 'Design', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=800&auto=format&fit=crop' },
];

type Filter = 'All' | PortfolioItem['category'];
const filters: Filter[] = ['All', 'Design', 'Web', 'Audiovisual', 'Branding'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Shown instead of an image that failed to load: a TV test pattern with a "no signal" readout. */
const SignalLost: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-dark-card">
    <div aria-hidden="true" className="absolute inset-0 flex opacity-25">
      {['bg-white', 'bg-gold', 'bg-neon-blue', 'bg-neon-green', 'bg-neon-pink', 'bg-neon-orange', 'bg-gold-dim'].map((color) => (
        <span key={color} className={`flex-1 ${color}`} />
      ))}
    </div>
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
    <div aria-hidden="true" className="absolute inset-0 bg-scanlines opacity-70" />
    <div aria-hidden="true" className="signal-sweep pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
    <div className="relative z-10 px-6 text-center -translate-y-6">
      <p className="mb-3 font-mono text-[10px] tracking-[0.4em] text-neon-pink">
        <span className="animate-pulse">●</span> NO SIGNAL
      </p>
      <p className="font-display text-2xl md:text-3xl font-black text-white/85">
        <GlitchText text="SEÑAL PERDIDA" as="span" />
      </p>
      <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-gray-500">ERR_404 // ARCHIVO NO ENCONTRADO</p>
    </div>
  </div>
);

const PortfolioCard: React.FC<{ item: PortfolioItem; featured: boolean }> = ({ item, featured }) => {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Covers images that already failed before React attached the error handler
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden border border-white/10 bg-dark-card hover:border-gold/50 transition-colors duration-300 ${featured ? 'sm:col-span-2 sm:row-span-2' : ''}`}
    >
      {failed ? (
        <SignalLost />
      ) : (
        <img
          ref={imgRef}
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

      {/* Hover scan sweep */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/3 -translate-y-full bg-gradient-to-b from-transparent via-neon-blue/15 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:translate-y-[300%] group-hover:opacity-100" />

      <div className="absolute inset-3">
        <HudCorners className="border-white/30 group-hover:border-gold" size="w-4 h-4" />
      </div>

      <div className="absolute top-6 left-6 right-6 z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
        <span className="text-white/70">#{pad(item.id)}</span>
        <span className="border border-white/20 bg-black/70 px-2 py-1 text-gold">{item.category}</span>
      </div>

      <figcaption className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
        <h3 className={`font-display font-bold leading-tight text-white ${featured ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
          {item.title}
        </h3>
        <div className="mt-4 h-px w-10 bg-neon-blue transition-all duration-500 group-hover:w-24" />
      </figcaption>
    </motion.figure>
  );
};

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');

  const filteredItems = filter === 'All'
    ? portfolioData
    : portfolioData.filter(item => item.category === filter);

  const countFor = (f: Filter) => (f === 'All' ? portfolioData.length : portfolioData.filter(item => item.category === f).length);

  return (
    <div className="bg-dark min-h-screen text-white">
      <SEO
        title="Archivo Visual & Portafolio | Quantum Code"
        description="Explora nuestro archivo visual. Trabajos recientes en Diseño Web, Branding, Producción Audiovisual y UI/UX por Quantum Code."
        canonicalUrl="/portafolio"
      />

      <PageHeader
        path="portafolio"
        index="03"
        // Explicit break: otherwise the line count changes when the web font swaps in (layout shift)
        title={<>ARCHIVO <br /><GlitchText text="VISUAL" className="text-neon-blue" as="span" /></>}
        meta={[`${pad(portfolioData.length)} REGISTROS`, `${pad(filters.length - 1)} CATEGORÍAS`]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center">
          <SectionLabel index="01" as="h2" className="flex-1">Archivo</SectionLabel>

          {/* Filters */}
          <div className="flex flex-wrap gap-1 border border-white/10 bg-black p-1 self-start">
            {filters.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-pressed={active}
                  className={`relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${active ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  {active && (
                    <motion.span
                      layoutId="portfolio-filter"
                      className="absolute inset-0 bg-gold"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {cat} <span className={active ? 'text-black/60' : 'text-gray-600'}>{pad(countFor(cat))}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px] md:auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <PortfolioCard key={item.id} item={item} featured={i === 0 && filteredItems.length > 2} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;
