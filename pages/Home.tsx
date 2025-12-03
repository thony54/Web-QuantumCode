import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Video, PenTool, Globe, Cpu, Atom, Plus, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const backgroundImages = [
   '/assets/images/FONDO1.jpg',
   '/assets/images/FONDO2.jpg'
];

const Home: React.FC = () => {
   const [currentBgIndex, setCurrentBgIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      }, 5000); // Cambia cada 5 segundos

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="w-full bg-black text-white overflow-hidden">

         {/* Hero Section - Poster Style */}
         <section className="relative min-h-screen flex flex-col justify-center px-4 pt-20 border-b border-white/10 overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
               <AnimatePresence mode='wait'>
                  <motion.div
                     key={currentBgIndex}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 0.4 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 2 }}
                     className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                     style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
                  />
               </AnimatePresence>
               <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"></div>
            </div>

            <div className="absolute inset-0 border-grid opacity-30 z-10 pointer-events-none"></div>

            {/* Floating Decorations */}
            <motion.img
               src="/assets/images/alien.svg"
               alt="Alien"
               className="absolute top-20 right-[10%] w-24 h-24 md:w-32 md:h-32 opacity-80 z-20 pointer-events-none"
               animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
               src="/assets/images/saturno.svg"
               alt="Saturno"
               className="absolute bottom-32 left-[5%] w-32 h-32 md:w-48 md:h-48 opacity-60 z-20 pointer-events-none"
               animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.img
               src="/assets/images/sistemasolar.svg"
               alt="Sistema Solar"
               className="absolute top-1/3 left-[-50px] w-64 h-64 opacity-20 z-0 pointer-events-none blur-sm"
               animate={{ rotate: 360 }}
               transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />

            {/* Abstract Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gold/10 via-neon-blue/5 to-transparent rounded-full blur-[100px] pointer-events-none z-10"></div>

            <div className="max-w-7xl mx-auto w-full relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-20">

               <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-blue/30 rounded-full text-neon-blue text-xs font-mono mb-8 bg-neon-blue/5 backdrop-blur-sm">
                     <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                     SYSTEM READY // V.3.0
                  </div>

                  <h1 className="font-display font-black text-7xl md:text-9xl leading-[0.85] tracking-tighter mb-8 mix-blend-difference">
                     QUANTUM <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">CODE</span>
                  </h1>

                  <p className="font-mono text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed border-l border-gold pl-6 py-2 bg-black/30 backdrop-blur-sm">
                     AGENCIA MULTIDISCIPLINARIA DE DISEÑO, DESARROLLO Y PRODUCCIÓN AUDIOVISUAL.
                     <br /><span className="text-white">CONSTRUYENDO EL FUTURO DESDE EL VACÍO.</span>
                  </p>
               </div>

               <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
                  <div className="w-full h-px bg-white/20 mb-8"></div>

                  <div className="flex flex-col gap-4 w-full">
                     <Link to="/servicios" className="group w-full border border-white/20 p-4 hover:bg-white hover:text-black transition-all duration-300 flex justify-between items-center backdrop-blur-sm bg-black/20">
                        <span className="font-mono text-sm uppercase tracking-widest">Explorar Servicios</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                     </Link>
                     <Link to="/contacto" className="group w-full bg-gold text-black p-4 font-bold uppercase tracking-widest hover:bg-white transition-colors flex justify-between items-center clip-corner shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <span>Iniciar Protocolo</span>
                        <Plus className="group-hover:rotate-90 transition-transform" size={18} />
                     </Link>
                  </div>
               </div>
            </div>

            {/* Decorative Specs */}
            <div className="absolute bottom-10 left-8 font-mono text-[10px] text-gray-500 hidden md:block z-30">
               COORD: 45.922 / -12.004 <br />
               SEC: A-99
            </div>
            <div className="absolute top-32 right-8 font-mono text-[10px] text-gray-500 hidden md:block text-right z-30">
               MEMORY: 98% <br />
               CPU: OPTIMIZED
            </div>
         </section>

         {/* Services "File" Layout */}
         <section className="py-24 border-b border-white/10 bg-dark-card relative">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex items-end justify-between mb-16">
                  <div>
                     <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-2">CAPACIDADES</h2>
                     <p className="font-mono text-gold text-xs uppercase tracking-[0.3em]">/// Classified Files</p>
                  </div>
                  <Atom className="text-white/20 w-24 h-24 absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 animate-spin-slow pointer-events-none" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                  {[
                     { icon: PenTool, title: "DISEÑO", id: "01", desc: "UI/UX, Interfaces, Gráfico." },
                     { icon: Globe, title: "WEB DEV", id: "02", desc: "Full Stack, Web3, E-commerce." },
                     { icon: Video, title: "MEDIA", id: "03", desc: "VFX, Motion, Edición 4K." },
                     { icon: Zap, title: "MARKETING", id: "04", desc: "Growth Hacking, SEO, Ads." },
                     { icon: Code, title: "BRANDING", id: "05", desc: "Identidad Visual, Naming." },
                     { icon: Cpu, title: "ART", id: "06", desc: "Ilustración Digital, 3D." }
                  ].map((service) => (
                     <div key={service.id} className="bg-black p-8 group hover:bg-neutral-900 transition-colors relative overflow-hidden">
                        <div className="absolute top-4 right-4 font-mono text-xs text-gray-700 group-hover:text-gold transition-colors">FIG.{service.id}</div>
                        <service.icon className="w-8 h-8 text-gray-500 mb-6 group-hover:text-neon-blue transition-colors" />
                        <h3 className="font-display font-bold text-2xl mb-2">{service.title}</h3>
                        <p className="text-gray-500 font-mono text-xs leading-relaxed">{service.desc}</p>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Horizontal Scroll / Marquee Style Section for Packages */}
         <section className="py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                     <h2 className="text-6xl md:text-8xl font-display font-black text-outline mb-6">ACCESO</h2>
                     <h3 className="text-4xl font-display font-bold text-white mb-6">NIVELES DE SERVICIO</h3>
                     <p className="font-mono text-gray-400 text-sm mb-8 leading-loose border-l border-neon-pink pl-4">
                        SELECCIONA TU CONFIGURACIÓN.<br />
                        DESDE LA MATERIA OSCURA HASTA LA LUZ PURA.<br />
                        SOLUCIONES ESCALABLES.
                     </p>
                     <Link to="/paquetes" className="inline-flex items-center gap-3 font-mono text-gold uppercase text-xs tracking-widest hover:text-white transition-colors">
                        <Hexagon size={12} className="fill-current" />
                        Ver Todos los Paquetes
                     </Link>
                  </div>

                  <div className="relative">
                     {/* Card Stack Effect */}
                     <div className="absolute top-0 left-0 w-full h-full border border-white/10 bg-dark-card rotate-6 z-0"></div>
                     <div className="absolute top-0 left-0 w-full h-full border border-white/10 bg-dark-card -rotate-3 z-10"></div>

                     <div className="relative z-20 bg-black border border-gold/50 p-8 clip-corner">
                        <div className="flex justify-between items-start mb-8">
                           <div>
                              <span className="bg-gold text-black text-[10px] font-bold px-2 py-1 uppercase font-mono">Recomendado</span>
                              <h4 className="text-2xl font-display font-bold text-white mt-4">NEXO INTERDIMENSIONAL</h4>
                           </div>
                           <div className="text-gold font-mono text-xl">$???</div>
                        </div>
                        <ul className="space-y-3 font-mono text-xs text-gray-400 mb-8">
                           <li className="flex items-center gap-2"><div className="w-1 h-1 bg-neon-green"></div> SEO AVANZADO</li>
                           <li className="flex items-center gap-2"><div className="w-1 h-1 bg-neon-green"></div> BLOG / NOTICIAS</li>
                           <li className="flex items-center gap-2"><div className="w-1 h-1 bg-neon-green"></div> ANIMACIONES CSS</li>
                        </ul>
                        <button className="w-full py-3 border border-white/20 hover:bg-gold hover:text-black hover:border-gold transition-all uppercase font-bold text-xs tracking-widest">
                           Adquirir
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Testimonial Glitch */}
         <section className="py-32 bg-dark-card border-y border-white/10 relative">
            <div className="max-w-5xl mx-auto px-4 text-center">
               <div className="mb-8 flex justify-center">
                  <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center relative">
                     <div className="absolute inset-0 border border-gold rounded-full animate-ping opacity-20"></div>
                     <Globe className="text-white" />
                  </div>
               </div>
               <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-8">
                  "UNA EXPERIENCIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">EXTRAORDINARIA</span>.
                  QUANTUM CODE REESCRIBIÓ NUESTRO CÓDIGO GENÉTICO DIGITAL."
               </h2>
               <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gray-700"></div>
                  <cite className="font-mono text-xs text-gold uppercase not-italic">Thony Karter // CEO Nexus</cite>
                  <div className="h-px w-12 bg-gray-700"></div>
               </div>
            </div>
         </section>

         {/* Big Footer CTA */}
         <section className="min-h-[50vh] flex flex-col items-center justify-center bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
               <h2 className="text-[20vw] font-display font-black text-white leading-none tracking-tighter">START</h2>
            </div>

            <div className="relative z-10 text-center px-4">
               <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">¿LISTO PARA LA <br /> EVOLUCIÓN?</h2>
               <Link to="/contacto" className="inline-block bg-white text-black font-bold font-mono text-sm py-4 px-10 uppercase tracking-widest hover:bg-gold transition-colors clip-corner">
                  Iniciar Transmisión
               </Link>
            </div>
         </section>

      </div>
   );
};

export default Home;