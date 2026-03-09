import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Radio } from 'lucide-react';
import { NavItem } from '../types';
import GooeyNav from './GooeyNav';
import GooeyButton from './ui/GooeyButton';

const navItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Portafolio', path: '/portafolio' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Contacto', path: '/contacto' },
];

/** Map navItems to the shape GooeyNav expects */
const gooeyItems = navItems.map((item) => ({
  label: item.label,
  href: item.path,
}));

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /** Resolve the active nav index from the current pathname */
  const activeIndex = (() => {
    const exact = navItems.findIndex((i) => i.path === location.pathname);
    if (exact !== -1) return exact;
    // Fallback: match by prefix (e.g. /servicios/foo → Servicios)
    const prefix = navItems.findIndex(
      (i) => i.path !== '/' && location.pathname.startsWith(i.path)
    );
    return prefix !== -1 ? prefix : 0;
  })();

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      {/* Top status bar */}
      <div className="w-full border-b border-white/5 bg-black/50 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <span>System: Quantum_OS_v2.4</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>{' '}
              SERVER: ONLINE
            </span>
            <span>LAT: 47°9′S / LON: 126°43′O</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/assets/images/favicon.svg"
                alt="Quantum Code Logo"
                className="h-10 w-10 group-hover:brightness-110 transition-all duration-300"
              />
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

          {/* Desktop Nav — GooeyNav */}
          <div className="hidden md:flex items-center gap-6">
            <GooeyNav
              items={gooeyItems}
              initialActiveIndex={activeIndex}
              particleCount={21}
              particleDistances={[90, 10]}
              particleR={100}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              onNavigate={(href: string) => navigate(href)}
            />

            {/* CTA Button */}
            <GooeyButton
              label="Iniciar_Misión"
              href="/contacto"
              icon={<Radio size={14} className="group-hover:animate-pulse" />}
              className="border border-white/20 font-mono text-xs uppercase tracking-widest hover:border-gold transition-colors"
              animationTime={600}
              colors={[1, 2, 3, 4]}
            />
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
              <Link key={item.path} to={item.path} className="block group">
                <span className="text-gray-600 font-mono text-xs mb-1 block">
                  0{idx + 1}
                </span>
                <span
                  className={`text-3xl sm:text-4xl font-display font-black uppercase tracking-tighter ${location.pathname === item.path ? 'text-gold' : 'text-white'
                    }`}
                >
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