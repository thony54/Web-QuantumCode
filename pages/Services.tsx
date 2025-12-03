import React from 'react';
import { Layers, Monitor, Camera, Megaphone, PenTool, Layout, Image, HardDrive, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

const Services: React.FC = () => {
  const servicesList = [
    {
      title: "Diseño Gráfico & UI/UX",
      id: "01",
      desc: "Interfaces intuitivas y piezas gráficas que comunican la esencia de tu marca en cualquier dimensión.",
      icon: PenTool,
      features: ["Logotipos", "Manual de Marca", "Prototipado", "Diseño de Interfaces"]
    },
    {
      title: "Desarrollo Web",
      id: "02",
      desc: "Arquitectura robusta y código limpio. Desde landing pages hasta sistemas complejos.",
      icon: Monitor,
      features: ["React / Next.js", "E-commerce", "Web Apps", "CMS Personalizados"]
    },
    {
      title: "Producción Audiovisual",
      id: "03",
      desc: "Narrativa visual cinematográfica. Contamos tu historia con movimiento y sonido de alta fidelidad.",
      icon: Camera,
      features: ["Comerciales", "Videos Corporativos", "Fotografía", "Drone"]
    },
    {
      title: "Marketing Digital",
      id: "04",
      desc: "Estrategias de crecimiento acelerado. Posicionamos tu señal en el ruido del mercado.",
      icon: Megaphone,
      features: ["SEO / SEM", "Social Media", "Email Marketing", "Analytics"]
    },
    {
      title: "Branding",
      id: "05",
      desc: "Construcción de identidad corporativa con ADN único y memorable.",
      icon: Layers,
      features: ["Naming", "Identidad Verbal", "Papelería", "Merchandising"]
    },
    {
      title: "Gigantografía",
      id: "06",
      desc: "Impresión de gran formato para dominar el espacio físico.",
      icon: Image,
      features: ["Vallas", "Vinilos", "Lonas", "Instalaciones"]
    },
  ];

  return (
    <div className="pt-20 bg-dark min-h-screen text-white">
      {/* Header */}
      <div className="py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-4 relative z-10 flex flex-col md:flex-row items-end gap-8 overflow-hidden">
          <RevealOnScroll>
            <h1 className="text-xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black leading-none text-white mix-blend-screen break-words tracking-tighter sm:tracking-normal">
              <GlitchText text="SERVICIOS" />
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="font-mono text-sm text-gray-400 max-w-md border-l border-gold pl-4 mb-4">
                 // CATALOG_ID: 2024 <br />
              Soluciones integrales para la era digital. Desplegamos tecnología y creatividad para materializar tu visión.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
          {servicesList.map((service, idx) => (
            <div key={idx} className="bg-black p-8 md:p-12 group relative overflow-hidden hover:bg-white/5 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-gold" />
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="font-mono text-xs text-gray-600 border border-gray-800 p-2 h-fit w-fit">
                  REF: {service.id}
                </div>

                <div className="flex-grow">
                  <h3 className="text-3xl font-display font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-8 max-w-2xl font-light">{service.desc}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs font-mono text-gold/80">
                        <span className="mr-2 text-gray-600">[+]</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <service.icon className="w-16 h-16 text-gray-800 group-hover:text-white transition-colors opacity-50" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Banner */}
      <div className="py-20 border-t border-white/10 text-center bg-dark-card">
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mb-12">Stack Tecnológico</p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40">
          {['REACT', 'NEXT.JS', 'TAILWIND', 'ADOBE', 'FIGMA', 'THREE.JS'].map((tech) => (
            <span key={tech} className="text-4xl font-display font-bold text-transparent text-outline hover:text-white hover:text-outline-none transition-all cursor-crosshair">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;