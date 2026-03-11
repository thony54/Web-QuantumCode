import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Video, PenTool, Globe, Cpu, Atom, Plus, Hexagon, Heart, Play } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import GooeyButton from '../components/ui/GooeyButton';

const backgroundImages = [
   '/assets/images/FONDO1.jpg',
   '/assets/images/FONDO2.jpg'
];

// Moved outside component so the reference never changes between renders
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
      quote: "Como nuestro 'Director de Comunicación' tenemos un pilar fundamental con nosotros! POR NUESTROS DERECHOS, AQUÍ ESTAMOS!",
      author: "Fundación Arupo",
      role: "ONG"
   }
];

const brandsList = [
   'Agendas Juveniles Imbabura.png',
   'Connexo.png',
   'DAEZ DIGITAL WEB.webp',
   'EasyXplorer.svg',
   'Fundacion Arupo.png',
   'GIZ Ecuador.png',
   'Semilla Solar (Sobre negro).png',
   'Voluntariado Fundación Arupo.svg',
   'Yellow House.svg',
   'logo-ema1.png',
   'Photoroom-20241002_165721.png',
   'Recurso 1ARUPOCTI LOGO.png',
   'fssCapa 1-2TP.png',
   'NUEVO.jpg',
   '243854290_6675469512494860_5734317204627001245_n.png',
   '278681821_3243250795947059_8224958622463429401_n.jpg',
   '348453140_652881669997057_2673307103294144083_n.png',
   '418462740_346730618138087_8329027722032067481_n.jpg',
   '494671808_985412743749459_8552937234668465118_n.jpg',
];

/** Lazy-load YouTube: shows thumbnail until user clicks play */
const YouTubeFacade: React.FC<{ videoId: string }> = ({ videoId }) => {
   const [active, setActive] = useState(false);
   const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

   if (active) {
      return (
         <iframe
            className="absolute top-0 left-0 w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
         />
      );
   }

   return (
      <button
         type="button"
         onClick={() => setActive(true)}
         className="absolute inset-0 w-full h-full group flex items-center justify-center cursor-pointer"
         aria-label="Reproducir video"
      >
         <img
            src={thumbUrl}
            alt="Portada del video"
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
         />
         <div className="relative z-10 w-16 h-16 rounded-full bg-black/70 border-2 border-white/50 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
            <Play className="text-white w-6 h-6 ml-1" fill="white" />
         </div>
      </button>
   );
};

interface CapabilityService {
   icon: React.ElementType;
   title: string;
   id: string;
   desc: string;
   accent: string;
}

const cardVariants = {
   hidden: { opacity: 0, y: 28 },
   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const CapabilityCard: React.FC<{ service: CapabilityService }> = ({ service }) => {
   const cardRef = useRef<HTMLDivElement>(null);
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
   const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

   const spotlight = useMotionTemplate`radial-gradient(180px circle at ${springX}px ${springY}px, ${service.accent}18, transparent 80%)`;

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
   };

   return (
      <motion.div variants={cardVariants}>
         <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden h-full flex flex-col p-6 bg-black border border-white/[0.06] cursor-default group"
            whileHover={{ y: -5, borderColor: `${service.accent}40` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
         >
            {/* Mouse-tracking spotlight */}
            <motion.div
               className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{ background: spotlight }}
            />

            {/* Top shimmer line */}
            <div
               className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out z-10"
               style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
            />

            {/* Ghost number */}
            <span className="absolute -bottom-2 -right-1 font-display font-black text-[5.5rem] leading-none select-none pointer-events-none text-white/[0.03] group-hover:text-white/[0.06] transition-all duration-500 group-hover:scale-105 origin-bottom-right z-0">
               {service.id}
            </span>

            {/* Icon container */}
            <div className="relative w-10 h-10 mb-5 flex items-center justify-center z-10">
               <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md"
                  style={{ backgroundColor: service.accent }}
               />
               <service.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300 relative z-10" />
            </div>

            {/* File label */}
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-700 mb-2 relative z-10">
               FILE_{service.id}
            </p>

            {/* Title */}
            <h3 className="font-display font-bold text-lg text-white mb-3 leading-tight relative z-10">
               {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 font-mono text-[11px] leading-relaxed flex-1 group-hover:text-gray-400 transition-colors duration-300 relative z-10">
               {service.desc}
            </p>

            {/* Bottom accent */}
            <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/5 relative z-10">
               <div
                  className="w-2 h-2 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: service.accent }}
               />
               <span
                  className="font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: service.accent }}
               >
                  Ver más
               </span>
            </div>
         </motion.div>
      </motion.div>
   );
};

const Home: React.FC = () => {

   const [currentBgIndex, setCurrentBgIndex] = useState(0);
   const [currentTestimonial, setCurrentTestimonial] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
   }, []);

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
                        AGENCIA MULTIDISCIPLINARIA DE PRODUCCIÓN AUDIOVISUAL, DISEÑO Y DESARROLLO.
                        <br /><span className="text-white">CONSTRUYENDO EL FUTURO DESDE EL VACÍO.</span>
                     </motion.p>
                  </RevealOnScroll>
               </div>

               <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
                  <div className="w-full h-px bg-white/20 mb-8"></div>

                  <div className="flex flex-col gap-4 w-full">
                     <RevealOnScroll delay={0.6} width="100%">
                        <GooeyButton
                           label="Explorar Servicios"
                           href="/servicios"
                           icon={<ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />}
                           className="w-full border border-white/20 hover:border-white transition-colors h-14"
                           colors={[1, 2, 3, 4]}
                        />
                     </RevealOnScroll>
                     <RevealOnScroll delay={0.7} width="100%">
                        <GooeyButton
                           label="Iniciar Protocolo"
                           href="/contacto"
                           variant="gold"
                           icon={<Plus className="group-hover:rotate-90 transition-transform" size={18} />}
                           className="w-full bg-gold text-black h-14"
                           colors={[4]}
                        />
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

         {/* Brands Carousel */}
         <section className="py-12 border-b border-white/10 bg-black overflow-hidden relative flex flex-col items-center">
            <p className="font-mono text-xs text-gray-500 tracking-[0.2em] mb-8">/// MARCAS ASOCIADAS</p>
            <div className="w-full relative flex overflow-hidden group">
               {/* Fade overlays for the edges */}
               <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
               <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

               {/* Marquee Container */}
               <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
                  {/* First Set */}
                  <div className="flex gap-16 md:gap-24 items-center px-8 md:px-12">
                     {brandsList.map((brand, idx) => (
                        <div key={`brand-1-${idx}`} className="w-32 h-16 md:w-40 md:h-20 flex-shrink-0 flex items-center justify-center">
                           <img
                              src={`/assets/brands/${brand}`}
                              alt={`Brand ${idx}`}
                              className="max-w-full max-h-full object-contain brightness-0 invert opacity-50 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
                           />
                        </div>
                     ))}
                  </div>
                  {/* Duplicate Set for Seamless Loop */}
                  <div className="flex gap-16 md:gap-24 items-center px-8 md:px-12">
                     {brandsList.map((brand, idx) => (
                        <div key={`brand-2-${idx}`} className="w-32 h-16 md:w-40 md:h-20 flex-shrink-0 flex items-center justify-center">
                           <img
                              src={`/assets/brands/${brand}`}
                              alt={`Brand ${idx}`}
                              className="max-w-full max-h-full object-contain brightness-0 invert opacity-50 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Services "File" Layout */}
         <section className="py-24 border-b border-white/10 bg-dark-card relative">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex items-end justify-between mb-16 relative">
                  <div>
                     <RevealOnScroll>
                        <GlitchText text="CAPACIDADES" as="h2" className="font-display font-bold text-5xl md:text-6xl text-white mb-2" />
                     </RevealOnScroll>
                     <RevealOnScroll delay={0.2}>
                        <p className="font-mono text-gold text-xs uppercase tracking-[0.3em]">/// Lo que construimos</p>
                     </RevealOnScroll>
                  </div>
                  <Atom className="text-white/20 w-24 h-24 absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 animate-spin-slow pointer-events-none" />
               </div>

               <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                  variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
               >
                  {[
                     { icon: Globe, title: "ACCESIBILIDAD", id: "01", desc: "Accesibilidad digital nativa como estándar en cada proyecto.", accent: "#00BFFF" },
                     { icon: Video, title: "AUDIOVISUAL", id: "02", desc: "Producción audiovisual y Cine de alta fidelidad.", accent: "#D4AF37" },
                     { icon: PenTool, title: "DISEÑO", id: "03", desc: "Diseño gráfico, identidad visual y dirección de arte.", accent: "#FF6B9D" },
                     { icon: Zap, title: "FOTOGRAFÍA", id: "04", desc: "Fotografía profesional para marcas y contenido.", accent: "#A78BFA" },
                     { icon: Cpu, title: "DESARROLLO", id: "05", desc: "Desarrollo web, plataformas digitales y tecnología.", accent: "#00BFFF" },
                     { icon: Code, title: "PROGRAMACIÓN", id: "06", desc: "Software a medida, APIs y automatización.", accent: "#34D399" },
                     { icon: Atom, title: "MÚSICA", id: "07", desc: "Producción musical, audio y post-producción sonora.", accent: "#FF6B9D" },
                     { icon: Heart, title: "SOCIAL MEDIA", id: "08", desc: "Community manager, estrategia y gestión de redes sociales.", accent: "#D4AF37" }
                  ].map((service) => (
                     <CapabilityCard key={service.id} service={service} />
                  ))}
               </motion.div>
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
                     <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        La innovación real incluye a todos. Orgullosamente aliados con <strong className="text-white">Fundación Arupo</strong>, somos la <span className="text-gold">primera agencia digital en Ecuador</span> que integra criterios de accesibilidad nativa como estándar.
                     </p>
                     <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Actualmente producimos el documental <strong className="text-white">"Voces de Resiliencia"</strong>, una obra que visibiliza historias de movilidad humana y discapacidad junto a Fundación Arupo. Además, incluimos en nuestra web un clip exclusivo del proyecto como muestra de nuestro compromiso audiovisual y social.
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

               <div className="relative order-1 md:order-2 w-full">
                  <RevealOnScroll delay={0.3} width="100%">
                     {/* Image Frame */}
                     <div className="w-full aspect-[4/3] relative group overflow-hidden border border-white/10 bg-dark-card">
                        {/* Lazy-loaded YouTube facade */}
                        <YouTubeFacade videoId="R10MXgw13co" />


                        {/* Overlay Tech Elements */}
                        <div className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur border border-white/20">
                           <Hexagon className="text-gold w-6 h-6 animate-pulse" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black to-transparent pointer-events-none">
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
                  <GooeyButton
                     label="Iniciar Transmisión"
                     href="/contacto"
                     className="bg-white text-black py-4 px-10 h-16 inline-block mx-auto"
                     colors={[1, 2, 3, 4]}
                  />
               </RevealOnScroll>
            </div>
         </section>

      </div>
   );
};

export default Home;