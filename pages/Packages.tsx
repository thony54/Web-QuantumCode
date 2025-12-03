import React from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Packages: React.FC = () => {
  return (
    <div className="pt-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-4">PAQUETES <span className="text-gold">QUANTUM</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Selecciona la configuración de energía que tu proyecto necesita. Desde soluciones esenciales hasta dominio total del multiverso.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Level 1 */}
          <div className="bg-dark-card border border-white/10 p-8 flex flex-col hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-300 font-display mb-2">NIVEL ESTELAR</h3>
            <div className="text-3xl font-bold text-white mb-6">Básico</div>
            <p className="text-sm text-gray-400 mb-8 border-b border-white/5 pb-8">Para startups y exploradores que inician su viaje digital.</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Diseño Web Responsive', 'Hosting Básico (1 año)', 'Integración RRSS', 'Formulario de Contacto', 'Optimización Básica'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-neon-blue mr-3" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contacto" className="w-full py-3 border border-white text-white text-center font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              Seleccionar
            </Link>
          </div>

          {/* Level 2 */}
          <div className="bg-black border border-gold p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold text-black text-xs font-bold px-4 py-1 uppercase tracking-widest">
              Recomendado
            </div>
            <h3 className="text-xl font-bold text-gold font-display mb-2">NEXO INTERDIMENSIONAL</h3>
            <div className="text-3xl font-bold text-white mb-6">Intermedio</div>
            <p className="text-sm text-gray-400 mb-8 border-b border-white/5 pb-8">Para negocios en expansión que buscan impactar múltiples realidades.</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Todo en Nivel Estelar', 'SEO Avanzado', 'Blog / Noticias', 'Animaciones CSS/JS', 'Diseño de Newsletter', 'Soporte Prioritario'].map((item, i) => (
                <li key={i} className="flex items-center text-white text-sm">
                  <Check className="w-4 h-4 text-gold mr-3" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contacto" className="w-full py-3 bg-gold text-black text-center font-bold uppercase tracking-wider hover:bg-white transition-colors">
              Seleccionar
            </Link>
          </div>

          {/* Level 3 */}
          <div className="bg-dark-card border border-white/10 p-8 flex flex-col hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold text-neon-pink font-display mb-2">HIPERREALIDAD TOTAL</h3>
            <div className="text-3xl font-bold text-white mb-6">Premium</div>
            <p className="text-sm text-gray-400 mb-8 border-b border-white/5 pb-8">Dominio total del mercado con herramientas de vanguardia.</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Todo en Nexo', 'E-commerce Completo', 'Pasarela de Pagos', 'Dashboard Administrativo', 'Producción de Video Promo', 'Marketing (1 mes)'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-neon-pink mr-3" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contacto" className="w-full py-3 border border-white text-white text-center font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              Seleccionar
            </Link>
          </div>
        </div>

        {/* Special Pack */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-neon-blue/30 rounded-lg p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20 animate-pulse">
            <Star size={100} className="text-white" />
          </div>
          <div className="md:flex items-center justify-between relative z-10">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                 <Zap className="text-gold" />
                 <h3 className="text-3xl md:text-4xl font-display font-black text-white italic">MAESTRO DEL MULTIVERSO</h3>
              </div>
              <p className="text-lg text-gray-300 mt-4 mb-6 md:mb-0">
                Solución personalizada de grado empresarial. Branding completo, Desarrollo de Software a medida, Campaña Publicitaria 360° y Gigantografías. El límite es la imaginación.
              </p>
            </div>
            <div className="md:w-1/3 text-right">
              <Link to="/contacto" className="inline-block bg-white text-black font-bold py-4 px-8 rounded-none skew-x-[-10deg] hover:scale-105 transition-transform">
                <span className="inline-block skew-x-[10deg]">CONSULTAR PERSONALIZADO</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;