import React from 'react';
import { Atom, User } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

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
          <RevealOnScroll>
            <h1 className="text-[2rem] leading-none sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight sm:tracking-normal">
              SOMOS <br /><GlitchText text="QUANTUM CODE" className="text-gold" />
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl text-gray-300">Exploradores digitales. Creadores de realidades. Arquitectos del futuro.</p>
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
            {[
              { name: 'KARTER', role: 'FUNDADOR', image: '/assets/images/karter.png' },
              { name: 'EMA', role: 'DISEÑADOR', image: '/assets/images/ema.png' }
            ].map((member, idx) => (
              <div key={idx} className="group bg-dark-card border border-white/5 overflow-hidden relative">
                <div className="aspect-[3/4] bg-gray-900 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80 object-center"
                  />
                  <div className="absolute inset-0 bg-neon-blue/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-white font-bold text-2xl font-display">{member.name}</h3>
                  <p className="text-gold text-sm font-mono uppercase tracking-widest mt-2">
                    {member.role}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;