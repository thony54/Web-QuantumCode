import React, { useState } from 'react';
import { Instagram, Globe, Cpu, Clapperboard, Crosshair, User } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import PageHeader from '../components/ui/PageHeader';
import SectionLabel from '../components/ui/SectionLabel';
import SpotlightCard from '../components/ui/SpotlightCard';
import HudCorners from '../components/ui/HudCorners';
import { SEO } from '../components/SEO';

interface Social {
  type: 'instagram' | 'tiktok' | 'web' | 'connexo';
  url: string;
}

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  /** Sin foto todavía: se muestra un espacio reservado */
  image?: string;
  hoverImage?: string;
  socials: Social[];
}

const socialLabels: Record<Social['type'], string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  web: 'Sitio web',
  connexo: 'Connexo',
};

const getSocialIcon = (type: Social['type']) => {
  switch (type) {
    case 'instagram':
      return <Instagram size={18} />;
    case 'tiktok':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      );
    case 'web':
      return <Globe size={18} />;
    case 'connexo':
      return <img src="/assets/images/connexo-icon.webp" alt="" className="w-[18px] h-[18px] object-contain" />;
  }
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ id, name, role, image, hoverImage, socials }) => {
  const [isAlien, setIsAlien] = useState(false);
  const hasAlien = !!image && !!hoverImage;

  return (
    <article
      className="group relative bg-black border border-white/10 hover:border-neon-green/40 transition-colors duration-300"
      onMouseEnter={() => hasAlien && setIsAlien(true)}
      onMouseLeave={() => setIsAlien(false)}
      onClick={() => hasAlien && setIsAlien((v) => !v)}
    >
      <HudCorners className="border-white/25 group-hover:border-neon-green" size="w-4 h-4" />

      <div className="relative aspect-[4/5] overflow-hidden bg-dark-card">
        {image ? (
          <>
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Alternate-dimension portrait, revealed bottom-up by a scan wipe */}
            {hoverImage && (
              <img
                src={hoverImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center transition-[clip-path] duration-700 ease-out"
                style={{ clipPath: isAlien ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)' }}
              />
            )}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-transform duration-700 ease-out ${isAlien ? 'translate-y-0' : 'translate-y-full'}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-neon-green shadow-[0_0_14px_#00FF41] transition-opacity duration-700 ${isAlien ? 'opacity-0' : 'opacity-100'}`} />
            </div>
          </>
        ) : (
          <div
            role="img"
            aria-label={`Foto de ${name}: próximamente`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-500"
          >
            <div aria-hidden="true" className="absolute inset-0 border-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
            <User aria-hidden="true" size={72} strokeWidth={1} className="relative" />
            <span aria-hidden="true" className="relative font-mono text-[10px] uppercase tracking-[0.3em]">Foto próximamente</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="absolute top-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
          <span className="text-white/70">ID_{id}</span>
          {hasAlien && (
            <span className={`flex items-center gap-2 border px-2 py-1 bg-black/60 transition-colors duration-300 ${isAlien ? 'border-neon-green/50 text-neon-green' : 'border-white/20 text-white/70'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAlien ? 'bg-neon-green' : 'bg-white/60'}`} />
              {isAlien ? 'MODO: ALIEN' : 'MODO: HUMANO'}
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-4 p-6 border-t border-white/10">
        <div>
          <h3 className="font-display font-bold text-3xl text-white leading-none">{name}</h3>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{role}</p>
        </div>
        <div className="flex gap-2">
          {socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} en ${socialLabels[social.type]}`}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-gold hover:bg-gold/10 transition-colors duration-300"
            >
              {getSocialIcon(social.type)}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

const principles = [
  { lead: 'Pensamos como', role: 'INGENIEROS', icon: Cpu },
  { lead: 'Dirigimos como', role: 'CINEASTAS', icon: Clapperboard },
  { lead: 'Ejecutamos como', role: 'ESTRATEGAS DIGITALES', icon: Crosshair },
];

const directives = [
  {
    title: 'MISIÓN',
    code: 'M-01',
    glow: '212,175,55',
    accentLine: 'from-gold',
    codeClass: 'text-gold border-gold/30',
    paragraphs: [
      'Desarrollar y potenciar marcas, organizaciones y proyectos mediante un ecosistema integral que une estrategia, diseño, tecnología, producción audiovisual, música, accesibilidad digital y gestión de comunicación.',
      'Transformamos ideas en sistemas funcionales: identidades con dirección, plataformas digitales sólidas, narrativas audiovisuales con intención y experiencias accesibles para todos.',
    ],
  },
  {
    title: 'VISIÓN',
    code: 'V-02',
    glow: '0,240,255',
    accentLine: 'from-neon-blue',
    codeClass: 'text-neon-blue border-neon-blue/30',
    paragraphs: [
      'Consolidarnos como un estudio creativo y tecnológico de referencia en Latinoamérica, reconocida por integrar ingeniería, dirección audiovisual y estrategia digital bajo un mismo estándar de calidad.',
      'Nuestra visión no es crecer por volumen, sino por relevancia: construir proyectos que perduren, evolucionen y se conviertan en activos estratégicos para quienes confían en nosotros.',
    ],
  },
];

const heroImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=70&auto=format&fit=crop';

const About: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen text-white">
      <SEO
        title="Estudio Creativo & Tecnológico | Quantum Code Studio"
        description="Conoce al equipo detrás de Quantum Code. Estrategia, código y dirección audiovisual fusionados en un mismo sistema tecnológico."
        canonicalUrl="/nosotros"
      />

      <PageHeader
        path="nosotros"
        index="04"
        backgroundImage={{
          src: `${heroImage}&w=1920`,
          srcSet: `${heroImage}&w=800 800w, ${heroImage}&w=1280 1280w, ${heroImage}&w=1920 1920w`,
        }}
        title={<>SOMOS <br /><GlitchText text="QUANTUM CODE" className="text-gold" as="span" /></>}
        description="Estrategia, código y lenguaje audiovisual. Diseñados como un mismo sistema."
        meta={['BASE: IBARRA, ECUADOR', 'NODO: BARQUISIMETO, VENEZUELA']}
      />

      {/* Quiénes Somos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <SectionLabel index="01" as="h2" className="mb-12">Quiénes somos</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <RevealOnScroll width="100%">
              <p className="font-display font-bold text-2xl md:text-4xl leading-tight text-white mb-8">
                Quantum Code no es una agencia. Es un estudio con múltiples universos, donde la música, la estrategia, el código y el lenguaje audiovisual se diseñan como un mismo sistema.
              </p>
            </RevealOnScroll>
            <div className="space-y-5 text-gray-400 leading-relaxed md:text-lg border-l border-white/10 pl-6">
              <p>
                Nos diferenciamos porque no separamos diseño de desarrollo, ni estética de funcionalidad, ni narrativa de tecnología. Pensamos como ingenieros, dirigimos como cineastas y ejecutamos como estrategas digitales.
              </p>
              <p>
                Integramos accesibilidad nativa, arquitectura digital sólida y dirección visual cinematográfica como estándar, no como extra.
              </p>
              <p>
                No hacemos contenido por tendencia. Construimos activos digitales con intención, precisión y visión a largo plazo.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <RevealOnScroll width="100%" delay={0.2}>
              <div className="relative p-3 border border-white/10 bg-black">
                <HudCorners className="border-neon-blue/70" size="w-6 h-6" />
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
                    alt="Quantum Code studio"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" /> REC
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.25em] text-white/60">CAM_01 // STUDIO</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {principles.map(({ lead, role, icon: Icon }) => (
            <SpotlightCard key={role} className="p-8 bg-black">
              <Icon className="relative z-10 w-6 h-6 text-gold mb-6" />
              <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">{lead}</p>
              <p className="relative z-10 font-display font-bold text-xl md:text-2xl text-white">{role}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="relative bg-black border-y border-white/10 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 border-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel index="02" as="h2" className="mb-12">Misión // Visión</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directives.map((d) => (
              <SpotlightCard key={d.title} color={d.glow} className="h-full p-8 md:p-10 bg-dark-card border border-white/10 hover:border-white/20 transition-colors duration-300">
                <HudCorners className="border-white/20" />
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${d.accentLine} to-transparent`} />
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-white">{d.title}</h3>
                  <span className={`font-mono text-[10px] tracking-[0.3em] border px-2 py-1 ${d.codeClass}`}>{d.code}</span>
                </div>
                <div className="relative z-10 space-y-4 text-gray-400 leading-relaxed">
                  {d.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                </div>
                <span aria-hidden="true" className="absolute -bottom-10 -right-2 z-0 select-none font-display font-black text-[11rem] leading-none text-white/[0.03]">
                  {d.title[0]}
                </span>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <SectionLabel index="03" className="mb-10">Tripulación</SectionLabel>
              <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-4xl xl:text-5xl text-white leading-none">
                EQUIPO <br className="hidden lg:block" /><span className="text-neon-green">MULTIVERSAL</span>
              </h2>
              <p className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
                Pasa el cursor o toca para cambiar de dimensión
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TeamMemberCard
              id="01"
              name="KARTER CODE"
              role="CEO"
              image="/assets/images/karter.webp"
              hoverImage="/assets/images/karter-alien.webp"
              socials={[
                { type: 'instagram', url: 'https://www.instagram.com/karter_code' },
                { type: 'tiktok', url: 'https://www.tiktok.com/@karter_code' },
                { type: 'connexo', url: 'https://www.connexoapp.com/thony.karter' }
              ]}
            />
            <TeamMemberCard
              id="02"
              name="EMA"
              role="Co-fundador y Diseñador"
              image="/assets/images/ema.webp"
              hoverImage="/assets/images/ema-alien.webp"
              socials={[
                { type: 'instagram', url: 'https://instagram.com/ema.visual' },
                { type: 'web', url: 'https://www.emavisual.art/' },
                { type: 'connexo', url: 'https://app.connexo.tech/ema' }
              ]}
            />
            <TeamMemberCard
              id="03"
              name="JUNIORDEV"
              role="Director de Sistemas"
              socials={[
                { type: 'web', url: 'https://juniorz.dev/' },
                { type: 'connexo', url: 'https://www.connexoapp.com/JuniorDev' }
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
