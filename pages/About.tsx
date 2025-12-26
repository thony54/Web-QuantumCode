import React, { useState } from 'react';
import { Atom, User, Instagram, Globe } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

interface Social {
  type: 'instagram' | 'tiktok' | 'web' | 'connexo';
  url: string;
}

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  hoverImage: string;
  socials: Social[];
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image, hoverImage, socials }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSocialIcon = (type: Social['type']) => {
    switch (type) {
      case 'instagram':
        return <Instagram size={18} />;
      case 'tiktok':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        );
      case 'web':
        return <Globe size={18} />;
      case 'connexo':
        return <img src="/assets/images/connexo-icon.png" alt="Connexo" className="w-[18px] h-[18px] object-contain" />;
    }
  };

  return (
    <div
      className="group bg-dark-card border border-white/5 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] bg-gray-900 relative overflow-hidden">
        <img
          src={isHovered ? hoverImage : image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 object-center"
        />
        <div className="absolute inset-0 bg-neon-blue/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-white font-bold text-2xl font-display">{name}</h3>
        <p className="text-gold text-sm font-mono uppercase tracking-widest mt-2 mb-4">
          {role}
        </p>
        <div className="flex justify-center gap-4">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            >
              {getSocialIcon(social.type)}
            </a>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};


const About: React.FC = () => {
  return (
    <div className="pt-20 bg-dark min-h-screen">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop" alt="Space" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-dark z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <RevealOnScroll width="100%">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight text-center">
                SOMOS <br /><GlitchText text="QUANTUM CODE" className="text-gold" />
              </h1>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2} width="100%">
            <p className="text-xl text-gray-300 text-center mx-auto max-w-2xl">Exploradores digitales. Creadores de realidades. Arquitectos del futuro.</p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-6 border-l-4 border-neon-blue pl-4">NUESTRA HISTORIA</h2>
            <div className="prose prose-invert text-gray-400">
              <p className="mb-4">
                Nacidos en la singularidad del ciberespacio, Quantum Code surgió como una respuesta a la uniformidad digital. En un mundo donde todo parece igual, nosotros decidimos mirar hacia las estrellas y traer de vuelta lo extraordinario.
              </p>
              <p className="mb-4">
                Comenzamos como un pequeño nodo de resistencia creativa, experimentando con códigos y píxeles en un sótano iluminado por neón. Hoy, somos una fuerza interdimensional que colabora con marcas visionarias para romper las barreras de lo posible.
              </p>
              <p>
                Creemos que cada clic cuenta una historia y que cada píxel tiene el potencial de inspirar una emoción.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue to-neon-pink opacity-20 blur-xl"></div>
            <div className="relative bg-black border border-white/10 p-2">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" alt="Cyberpunk office" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Team / Essence */}
      <div className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-white mb-16">EQUIPO <span className="text-neon-green">MULTIVERSAL</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TeamMemberCard
              name="KARTER"
              role="Fundador y Director"
              image="/assets/images/karter.png"
              hoverImage="/assets/images/karter-alien.png"
              socials={[
                { type: 'instagram', url: 'https://www.instagram.com/karter_code' },
                { type: 'tiktok', url: 'https://www.tiktok.com/@karter_code' },
                { type: 'connexo', url: 'https://app.connexo.tech/KarterCode' }
              ]}
            />
            <TeamMemberCard
              name="EMA"
              role="Co-fundador y Diseñador"
              image="/assets/images/ema.png"
              hoverImage="/assets/images/ema-alien.png"
              socials={[
                { type: 'instagram', url: 'https://instagram.com/ema.visual' },
                { type: 'web', url: 'https://www.emavisual.art/' },
                { type: 'connexo', url: 'https://app.connexo.tech/ema' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;