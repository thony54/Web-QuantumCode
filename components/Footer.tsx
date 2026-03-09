import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import Galaxy from './Galaxy';

const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8 relative overflow-hidden font-mono">
      {/* Galaxy background */}
      <div className="absolute inset-0">
        <Galaxy
          mouseInteraction={true}
          mouseRepulsion={false}
          density={0.7}
          glowIntensity={0.18}
          saturation={0.9}
          hueShift={210}
          twinkleIntensity={0.4}
          rotationSpeed={0.02}
          repulsionStrength={0}
          autoCenterRepulsion={0}
          starSpeed={0.3}
          speed={0.6}
          transparent={true}
          style={{ opacity: 0.55 }}
        />
      </div>
      {/* Subtle vignette to blend galaxy edges with black */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 100%, transparent 30%, black 85%)'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 border-b border-white/10 pb-12">
          <div className="max-w-md">
            <div className="flex items-center space-x-2 mb-8">
              <img src="/assets/images/favicon.svg" alt="Quantum Code Logo" className="h-8 w-8" />
              <span className="font-display font-bold text-2xl text-white tracking-tighter">
                QUANTUM<span className="text-gold">CODE</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans">
              AGENCIA MULTIDISCIPLINARIA DE PRODUCCIÓN AUDIOVISUAL, DISEÑO Y DESARROLLO.<br />
              <span className="text-gray-500">Transformamos ideas complejas en sistemas digitales sólidos con accesibilidad digital nativa.</span>
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/quantumcode.art/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold hover:bg-gold/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/quantumcodeart/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold hover:bg-gold/10 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://wa.me/593963038666" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold hover:bg-gold/10 transition-all">
                <WhatsappIcon />
              </a>
            </div>
          </div>


        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest border-l-2 border-gold pl-3">Navegación</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/servicios" className="text-gray-400 hover:text-white flex items-center group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-gold">-</span> Servicios</Link></li>
              <li><Link to="/portafolio" className="text-gray-400 hover:text-white flex items-center group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-gold">-</span> Portafolio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest border-l-2 border-neon-blue pl-3">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terminos" className="text-gray-400 hover:text-white flex items-center group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-neon-blue">-</span> Términos de Servicio</Link></li>
              <li><Link to="/privacidad" className="text-gray-400 hover:text-white flex items-center group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-neon-blue">-</span> Política de Privacidad</Link></li>
              <li><Link to="/seguridad" className="text-gray-400 hover:text-white flex items-center group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-neon-blue">-</span> Protocolos de Seguridad</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white flex items-center group"><span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-neon-blue">-</span> Política de Cookies</Link></li>
            </ul>
          </div>
          <div className="col-span-2">
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest border-l-2 border-neon-pink pl-3">Datos de Contacto</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <span className="block text-gray-600 text-[10px] uppercase">Email</span>
                global@quantumcode.art
              </div>
              <div>
                <span className="block text-gray-600 text-[10px] uppercase">Frecuencia</span>
                +593 96 303 8666
              </div>
              <div>
                <span className="block text-gray-600 text-[10px] uppercase">Ubicación</span>
                Ibarra, Ecuador
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600">
          <p>ID: 994-221-00 // © {new Date().getFullYear()} Quantum Code</p>
          <p>Diseñado por <a href="https://www.emavisual.art/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Ema</a> // Ejecutando el Código Cuántico</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;