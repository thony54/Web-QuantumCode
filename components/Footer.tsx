import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8 relative overflow-hidden font-mono">
      {/* Grid Background */}
      <div className="absolute inset-0 border-grid opacity-20 pointer-events-none"></div>

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
                // SYSTEM_STATUS: OPERATIONAL <br />
              Agencia creativa interdimensional especializada en diseño post-apocalíptico y desarrollo web de alta fidelidad. Decodificamos el caos para construir el futuro.
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

          <div className="mt-12 md:mt-0">
            <h3 className="text-gold text-xs uppercase tracking-[0.2em] mb-6">Suscríbete al feed</h3>
            <form className="flex border-b border-white/30 pb-2 max-w-sm group focus-within:border-gold transition-colors">
              <input
                type="email"
                placeholder="INGRESA TU EMAIL"
                className="bg-transparent border-none text-white w-full focus:outline-none text-sm placeholder-gray-600"
              />
              <button className="text-white hover:text-gold uppercase text-xs font-bold tracking-widest flex items-center">
                Enviar <ArrowUpRight size={14} className="ml-1" />
              </button>
            </form>
            <p className="text-gray-600 text-[10px] mt-4 uppercase max-w-xs">
              Al unirte aceptas recibir transmisiones cifradas y ofertas interdimensionales.
            </p>
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
              <li><a href="#" className="text-gray-400 hover:text-white">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Protocolos de Seguridad</a></li>
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
                Multiverso Digital, Sector 7G
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