import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Video, PenTool, Globe, Cpu, Atom, Plus, Hexagon, Heart } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

const backgroundImages = [
   '/assets/images/FONDO1.jpg',
   '/assets/images/FONDO2.jpg'
];

const Home: React.FC = () => {
   const [currentBgIndex, setCurrentBgIndex] = useState(0);
   const [currentTestimonial, setCurrentTestimonial] = useState(0);

   const testimonials = [
      {
         quote: "Excelente servicio y calidad!",
         author: "María Perez",
         role: "Actriz"
      },
      {
         quote: "Si hablamos de aplicar criterios de accesibilidad, eres el mejor el ello! Saludos, recomendado Karter...",
         author: "Pablo Garcia",
         role: "Diseño grafico"
      },
      {
         quote: "Como nuestro 'Director de Comunicación' tenemos un pilar fundamental con nosotros! POR NUESTROS DERECHOS, AQUI ESTAMOS!",
         author: "Fundación Arupo",
         role: "ONG"
      }
   ];

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
   }, [testimonials.length]);

   // Scroll Animation Hooks
   const { scrollY } = useScroll();

   // Background Transforms (Deep Dive)
   const heroScale = useTransform(scrollY, [0, 500], [1, 1.5]);
   const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
   const heroBlur = useTransform(scrollY, [0, 500], ["0px", "10px"]);

   // Text Transforms (Gate Open)
   const textLeftX = useTransform(scrollY, [0, 300], [0, -200]);
   const textRightX = useTransform(scrollY, [0, 300], [0, 200]);
   const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
   const contentBlur = useTransform(scrollY, [0, 300], ["0px", "5px"]);

   // Parallax Elements
   const alienY = useTransform(scrollY, [0, 500], [0, -300]);
   const saturnY = useTransform(scrollY, [0, 500], [0, -150]);
   const solarRotate = useTransform(scrollY, [0, 1000], [0, 45]);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      }, 5000); // Cambia cada 5 segundos

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="w-full bg-black text-white overflow-hidden">

         {/* Hero Section - Poster Style */}
         <section className="relative min-h-screen flex flex-col justify-center px-4 pt-20 border-b border-white/10 overflow-hidden perspective-1000">
            {/* Background Carousel */}
            <motion.div
               className="absolute inset-0 z-0"
               style={{ scale: heroScale, opacity: heroOpacity, filter: `blur(${heroBlur})` }}
            >
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
            </motion.div>

            <div className="absolute inset-0 border-grid opacity-30 z-10 pointer-events-none"></div>

            {/* Floating Decorations */}
            <motion.img
               src="/assets/images/alien.svg"
               alt="Alien"
               className="absolute top-20 right-[5%] md:right-[10%] w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-80 z-20 pointer-events-none"
               animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               style={{ y: alienY }}
            />
            <motion.img
               src="/assets/images/saturno.svg"
               alt="Saturno"
               className="absolute bottom-32 left-[5%] w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 opacity-60 z-20 pointer-events-none"
               animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               style={{ y: saturnY }}
            />
            <motion.img
               src="/assets/images/sistemasolar.svg"
               alt="Sistema Solar"
               className="absolute top-1/3 -left-10 sm:left-[-50px] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-20 z-0 pointer-events-none blur-sm"
               animate={{ rotate: 360 }}
               transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
               style={{ rotate: solarRotate }}
            />

            {/* Abstract Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gold/10 via-neon-blue/5 to-transparent rounded-full blur-[100px] pointer-events-none z-10"></div>

            <div className="max-w-7xl mx-auto w-full relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-20">

               <div className="lg:col-span-8">
                  <RevealOnScroll>
                     <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-blue/30 rounded-full text-neon-blue text-xs font-mono mb-8 bg-neon-blue/5 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                        SYSTEM READY // V.3.0
                     </div>
                  </RevealOnScroll>

                  <div className="w-full px-4 overflow-hidden" style={{ perspective: "1000px" }}>
                     <h1 className="font-display font-black text-[7vw] md:text-[6vw] lg:text-[5.5rem] leading-[0.9] tracking-tighter mb-8 mix-blend-difference text-left flex flex-wrap">
                        <motion.span
                           className="block relative overflow-hidden"
                           style={{ x: textLeftX, opacity: textOpacity, filter: `blur(${contentBlur})` }}
                        >
                           <GlitchText text="QUANTUM" />
                        </motion.span>
                        <motion.span
                           className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 ml-4"
                           style={{ x: textRightX, opacity: textOpacity, filter: `blur(${contentBlur})` }}
                        >
                           CODE
                        </motion.span>
                     </h1>
                  </div>

                  <RevealOnScroll delay={0.4}>
                     <motion.p
                        className="font-mono text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed border-l border-gold pl-6 py-2 bg-black/30 backdrop-blur-sm"
                        style={{ opacity: textOpacity }}
                     >
                        AGENCIA MULTIDISCIPLINARIA DE DISEÑO, DESARROLLO Y PRODUCCIÓN AUDIOVISUAL.
                        <br /><span className="text-white">CONSTRUYENDO EL FUTURO DESDE EL VACÍO.</span>
                     </motion.p>
                  </RevealOnScroll>
               </div>

               <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
                  <div className="w-full h-px bg-white/20 mb-8"></div>

                  <div className="flex flex-col gap-4 w-full">
                     <RevealOnScroll delay={0.6} width="100%">
                        <Link to="/servicios" className="group w-full border border-white/20 p-4 hover:bg-white hover:text-black transition-all duration-300 flex justify-between items-center backdrop-blur-sm bg-black/20">
                           <span className="font-mono text-sm uppercase tracking-widest">Explorar Servicios</span>
                           <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                        </Link>
                     </RevealOnScroll>
                     <RevealOnScroll delay={0.7} width="100%">
                        <Link to="/contacto" className="group w-full bg-gold text-black p-4 font-bold uppercase tracking-widest hover:bg-white transition-colors flex justify-between items-center clip-corner shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                           <span>Iniciar Protocolo</span>
                           <Plus className="group-hover:rotate-90 transition-transform" size={18} />
                        </Link>
                     </RevealOnScroll>
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
                     <RevealOnScroll>
                        <GlitchText text="CAPACIDADES" as="h2" className="font-display font-bold text-5xl md:text-6xl text-white mb-2" />
                     </RevealOnScroll>
                     <RevealOnScroll delay={0.2}>
                        <p className="font-mono text-gold text-xs uppercase tracking-[0.3em]">/// Classified Files</p>
                     </RevealOnScroll>
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
                  ].map((service, index) => (
                     <RevealOnScroll key={service.id} delay={index * 0.1} width="100%">
                        <div className="bg-black p-8 group hover:bg-neutral-900 transition-colors relative overflow-hidden h-full">
                           <div className="absolute top-4 right-4 font-mono text-xs text-gray-700 group-hover:text-gold transition-colors">FIG.{service.id}</div>
                           <service.icon className="w-8 h-8 text-gray-500 mb-6 group-hover:text-neon-blue transition-colors" />
                           <h3 className="font-display font-bold text-2xl mb-2">{service.title}</h3>
                           <p className="text-gray-500 font-mono text-xs leading-relaxed">{service.desc}</p>
                           <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                     </RevealOnScroll>
                  ))}
               </div>
            </div>
         </section>

         {/* Social Responsibility / Arupo */}
         <section className="py-24 bg-black border-b border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="relative z-10 order-2 md:order-1">
                  <RevealOnScroll>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gold/10 rounded-full border border-gold/20">
                           <Heart className="text-gold w-6 h-6" />
                        </div>
                        <span className="font-mono text-gold text-xs uppercase tracking-[0.2em] border border-gold/30 px-3 py-1 rounded-full">Responsabilidad Social</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-none">
                        CÓDIGO <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">HUMANO</span>
                     </h2>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.2}>
                     <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        La innovación real incluye a todos. Orgullosamente aliados con <strong className="text-white">Fundación Arupo</strong>, somos la <span className="text-gold">primera agencia digital en Ecuador</span> que integra criterios de accesibilidad nativa como estándar.
                     </p>
                     <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-6">
                        <p className="text-gray-500 font-mono text-sm">
                           /// PRIORIDAD DE ACCESIBILIDAD: NIVEL A+
                        </p>
                        <p className="text-gray-500 font-mono text-sm">
                           /// IMPACTO: ELIMINANDO BARRERAS DIGITALES
                        </p>
                     </div>
                  </RevealOnScroll>
               </div>

               <div className="relative order-1 md:order-2">
                  <RevealOnScroll delay={0.3}>
                     {/* Image Frame */}
                     <div className="aspect-[4/3] relative group overflow-hidden border border-white/10 bg-dark-card">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10 opactiy-60"></div>
                        <img
                           src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
                           alt="Accesibilidad Digital"
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                        />

                        {/* Overlay Tech Elements */}
                        <div className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur border border-white/20">
                           <Hexagon className="text-gold w-6 h-6 animate-pulse" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black to-transparent">
                           <h3 className="text-2xl font-display font-bold text-white">FUNDACIÓN ARUPO</h3>
                           <p className="text-xs font-mono text-gold uppercase tracking-wider mt-1">Partnership Oficial 2024</p>
                        </div>
                     </div>
                  </RevealOnScroll>
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

               <div className="min-h-[200px] flex flex-col justify-center">
                  <AnimatePresence mode='wait'>
                     <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                     >
                        <RevealOnScroll width="100%">
                           <h2 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight mb-8 max-w-4xl mx-auto">
                              "{testimonials[currentTestimonial].quote}"
                           </h2>
                        </RevealOnScroll>
                        <div className="flex items-center justify-center gap-4">
                           <div className="h-px w-12 bg-gray-700"></div>
                           <div className="flex flex-col items-center">
                              <cite className="font-mono text-sm text-gold uppercase not-italic font-bold">{testimonials[currentTestimonial].author}</cite>
                              <span className="font-mono text-xs text-gray-500 uppercase">{testimonials[currentTestimonial].role}</span>
                           </div>
                           <div className="h-px w-12 bg-gray-700"></div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>

               {/* Indicators */}
               <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                     <button
                        key={idx}
                        onClick={() => setCurrentTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'bg-gold w-6' : 'bg-gray-700 hover:bg-gray-500'}`}
                     />
                  ))}
               </div>
            </div>
         </section>

         {/* Big Footer CTA */}
         <section className="min-h-[50vh] flex flex-col items-center justify-center bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
               <h2 className="text-[20vw] font-display font-black text-white leading-none tracking-tighter">START</h2>
            </div>

            <div className="relative z-10 text-center px-4 w-full">
               <RevealOnScroll width="100%">
                  <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">¿LISTO PARA LA <br /> EVOLUCIÓN?</h2>
               </RevealOnScroll>
               <RevealOnScroll delay={0.2} width="100%">
                  <Link to="/contacto" className="inline-block bg-white text-black font-bold font-mono text-sm py-4 px-10 uppercase tracking-widest hover:bg-gold transition-colors clip-corner">
                     Iniciar Transmisión
                  </Link>
               </RevealOnScroll>
            </div>
         </section>

      </div>
   );
};

export default Home;