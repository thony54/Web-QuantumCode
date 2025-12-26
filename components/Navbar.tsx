import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Atom, Radio } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Portafolio', path: '/portafolio' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Contacto', path: '/contacto' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="w-full border-b border-white/5 bg-black/50 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <span>System: Quantum_OS_v2.4</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div> SERVER: ONLINE</span>
            <span>LAT: 00.000 / LON: 00.000</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img src="/assets/images/favicon.svg" alt="Quantum Code Logo" className="h-10 w-10 group-hover:brightness-110 transition-all duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-pink rounded-full animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tighter text-white leading-none">
                QUANTUM
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.3em] text-gold leading-none">
                CODE AGENCY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-1 border-r border-white/10 px-6 mr-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:text-white group ${location.pathname === item.path ? 'text-white' : 'text-gray-500'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"></span>
                  )}
                  <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </div>
            <Link
              to="/contacto"
              className="group relative px-6 py-2 bg-transparent border border-white/20 text-white font-mono text-xs uppercase tracking-widest overflow-hidden hover:border-gold transition-colors"
            >
              <div className="absolute inset-0 w-0 bg-gold transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="flex items-center gap-2">
                <Radio size={14} className="group-hover:animate-pulse" />
                Iniciar_Misión
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold transition-colors focus:outline-none p-2 border border-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-neutral-950 pt-32 px-6 h-screen w-screen">
          <div className="border-l border-white/10 pl-6 space-y-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className="block group"
              >
                <span className="text-gray-600 font-mono text-xs mb-1 block">0{idx + 1}</span>
                <span className={`text-3xl sm:text-4xl font-display font-black uppercase tracking-tighter ${location.pathname === item.path ? 'text-gold' : 'text-white'
                  }`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link
              to="/contacto"
              className="block mt-12 py-4 border-t border-b border-white/20 text-center font-mono text-gold uppercase tracking-widest"
            >
              [ INICIAR_MISIÓN ]
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;