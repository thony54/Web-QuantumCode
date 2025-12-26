import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

const portfolioData: PortfolioItem[] = [
  { id: 1, title: 'RAT UNIVERSE', category: 'Web', imageUrl: '/assets/images/rat-universe.jpeg' },
  { id: 2, title: 'ALIEN PROFILE', category: 'Design', imageUrl: '/assets/images/perfilalien.jpg' },
  { id: 3, title: 'KOTO', category: 'Audiovisual', imageUrl: '/assets/images/koto.jpg' },
  { id: 4, title: 'TIWWTM', category: 'Branding', imageUrl: '/assets/images/TIWWTM.jpg' },
  { id: 5, title: 'VOID E-COMMERCE', category: 'Web', imageUrl: 'https://images.unsplash.com/photo-1555421689-492a1880deb6?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'GLITCH MAGAZINE', category: 'Design', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=800&auto=format&fit=crop' },
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Design' | 'Web' | 'Audiovisual' | 'Branding'>('All');

  const filteredItems = filter === 'All'
    ? portfolioData
    : portfolioData.filter(item => item.category === filter);

  return (
    <div className="pt-20 bg-dark min-h-screen">
      <div className="bg-black py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <RevealOnScroll width="100%">
            <div className="flex justify-center w-full">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight text-center">
                ARCHIVO <GlitchText text="VISUAL" className="text-neon-blue" as="span" />
              </h1>
            </div>
          </RevealOnScroll>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Design', 'Web', 'Audiovisual', 'Branding'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-wider border transition-all duration-300 ${filter === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/20 hover:border-gold hover:text-gold'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden aspect-[4/3] bg-gray-900 cursor-pointer">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                <h3 className="text-2xl font-display font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                <span className="text-gold font-mono text-sm uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</span>
                <div className="mt-6 w-12 h-1 bg-neon-blue"></div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 pointer-events-none transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;