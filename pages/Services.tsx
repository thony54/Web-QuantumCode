import React from 'react';
import { Layers, Monitor, Camera, Megaphone, PenTool, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import VelocityText from '../components/ui/VelocityText';
import GooeyButton from '../components/ui/GooeyButton';
import PageHeader from '../components/ui/PageHeader';
import SectionLabel from '../components/ui/SectionLabel';
import SpotlightCard from '../components/ui/SpotlightCard';
import HudCorners from '../components/ui/HudCorners';
import { SEO } from '../components/SEO';

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

const skillsRowA = ['ACCESIBILIDAD DIGITAL', 'PRODUCCIÓN AUDIOVISUAL', 'DISEÑO GRÁFICO', 'FOTOGRAFÍA PROFESIONAL', 'DESARROLLO Y TECNOLOGÍA'];
const skillsRowB = ['PROGRAMACIÓN', 'MÚSICA', 'AUDIOVISUAL', 'COMMUNITY MANAGEMENT', 'SOCIAL MEDIA'];

const SkillItem: React.FC<{ label: string }> = ({ label }) => (
  <span className="flex items-center gap-12 md:gap-24">
    <span className="text-4xl md:text-6xl font-display font-bold text-outline hover:text-white transition-colors duration-300 cursor-crosshair">
      {label}
    </span>
    <span aria-hidden="true" className="text-gold/60 text-2xl md:text-3xl">/</span>
  </span>
);

const Services: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen text-white">
      <SEO
        title="Nuestros Servicios Digitales y Creativos | Quantum Code"
        description="Soluciones integrales para la era digital: Desarrollo Web, Diseño UI/UX, Producción Audiovisual, Marketing y Gigantografía."
        canonicalUrl="/servicios"
      />

      <PageHeader
        path="servicios"
        index="02"
        title={<GlitchText text="SERVICIOS" as="span" />}
        description={
          <>
            // CATALOG_ID: 2024 <br />
            Soluciones integrales para la era digital. Desplegamos tecnología y creatividad para materializar tu visión.
          </>
        }
        meta={[`${String(servicesList.length).padStart(2, '0')} MÓDULOS`, 'SYSTEM: ONLINE']}
      />

      {/* Module index */}
      <nav aria-label="Índice de servicios" className="border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar">
          {servicesList.map((service) => (
            <a
              key={service.id}
              href={`#servicio-${service.id}`}
              className="group shrink-0 flex items-center gap-3 px-5 py-4 border-r border-white/5 first:border-l font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:bg-white/[0.03] transition-colors"
            >
              <span className="text-gold/70 group-hover:text-gold">{service.id}</span>
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionLabel index="01" as="h2" className="mb-12">Lo que construimos</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((service, idx) => (
            <motion.article
              key={service.id}
              id={`servicio-${service.id}`}
              className="scroll-mt-40 h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard className="h-full min-h-[340px] flex flex-col p-7 md:p-8 bg-black border border-white/10 hover:border-gold/40 transition-colors duration-300">
                <HudCorners className="border-white/20 group-hover:border-gold" />
                <div className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold via-neon-blue to-transparent transition-all duration-700 ease-out z-10" />

                <div className="relative z-10 flex items-start justify-between mb-10">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500 border border-white/10 px-2 py-1">
                    REF: {service.id}
                  </span>
                  <span className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:border-gold/50 transition-colors duration-300">
                    <service.icon className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors duration-300" />
                  </span>
                </div>

                <h3 className="relative z-10 font-display font-bold text-2xl md:text-[1.7rem] leading-tight text-white mb-4">
                  {service.title}
                </h3>
                <p className="relative z-10 text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                  {service.desc}
                </p>

                <ul className="relative z-10 mt-auto pt-8 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="font-mono text-[10px] uppercase tracking-wider text-gray-400 border border-white/10 bg-white/[0.02] px-2.5 py-1 group-hover:border-gold/30 group-hover:text-gold transition-colors duration-300"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <span aria-hidden="true" className="absolute -bottom-7 -right-2 z-0 select-none font-display font-black text-[8rem] leading-none text-white/[0.03] group-hover:text-gold/[0.07] transition-colors duration-500">
                  {service.id}
                </span>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Skills Banner */}
      <section className="relative py-20 border-t border-white/10 bg-dark-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <SectionLabel index="02" as="h2">Habilidades</SectionLabel>
        </div>

        <div className="opacity-50 hover:opacity-100 transition-opacity duration-500">
          <VelocityText baseVelocity={1} className="py-4">
            {skillsRowA.map((skill) => <SkillItem key={skill} label={skill} />)}
          </VelocityText>
          <VelocityText baseVelocity={-1} className="py-4 mt-6">
            {skillsRowB.map((skill) => <SkillItem key={skill} label={skill} />)}
          </VelocityText>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative py-24 md:py-32 border-t border-white/10 bg-black overflow-hidden">
        <div className="absolute inset-0 border-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
            <HudCorners className="border-gold/60" size="w-6 h-6" />
            <RevealOnScroll width="100%">
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-10 leading-[1.05]">
                ¿LISTO PARA LA <br /> EVOLUCIÓN?
              </h2>
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
        </div>
      </section>
    </div>
  );
};

export default Services;
