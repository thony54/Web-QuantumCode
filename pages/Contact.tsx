import React, { useRef } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, ChevronDown } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import GooeyButton from '../components/ui/GooeyButton';
import PageHeader from '../components/ui/PageHeader';
import SectionLabel from '../components/ui/SectionLabel';
import SpotlightCard from '../components/ui/SpotlightCard';
import HudCorners from '../components/ui/HudCorners';
import { SEO } from '../components/SEO';

const channels = [
  { icon: Phone, label: 'Línea Directa', lines: ['+593 96 303 8666'], href: 'tel:+593963038666' },
  { icon: Mail, label: 'Frecuencia Email', lines: ['global@quantumcode.art'], href: 'mailto:global@quantumcode.art' },
  { icon: Clock, label: 'Horario Operativo', lines: ['Abierto, todos los días (24/7 Virtual)'] },
  { icon: MapPin, label: 'Base de Operaciones', lines: ['Ibarra, Ecuador', 'Barquisimeto, Venezuela'] },
];

const inputClass =
  'w-full bg-black/70 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3.5 font-sans transition-[border-color,box-shadow] duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)]';

const FieldLabel: React.FC<{ htmlFor: string; index: string; children: React.ReactNode }> = ({ htmlFor, index, children }) => (
  <label htmlFor={htmlFor} className="flex items-center gap-2 mb-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold">
    <span className="text-gray-600">{index}</span>
    {children}
  </label>
);

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-dark min-h-screen text-white">
      <SEO
        title="Contacto | Iniciar Proyecto | Quantum Code"
        description="Ponte en contacto con Quantum Code en Ibarra, Ecuador y Barquisimeto, Venezuela. Inicia tu proyecto de desarrollo web, marketing o diseño UI/UX."
        canonicalUrl="/contacto"
      />

      <PageHeader
        path="contacto"
        index="04"
        title={<>INICIAR <br /><GlitchText text="PROYECTO" className="text-gold" as="span" /></>}
        description="Estábamos esperando esta señal. Cuéntanos sobre tu proyecto y construiremos juntos la mejor solución."
        meta={['CANAL: ABIERTO', 'HORARIO: 24/7 VIRTUAL']}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Contact channels */}
        <div className="lg:col-span-5">
          <SectionLabel index="01" as="h2" className="mb-8">Canales directos</SectionLabel>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {channels.map(({ icon: Icon, label, lines, href }) => {
              const body = (
                <>
                  <span className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center border border-neon-blue/30 text-neon-blue group-hover:border-neon-blue transition-colors duration-300">
                    <Icon size={18} />
                  </span>
                  <h3 className="relative z-10 mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">{label}</h3>
                  {lines.map((line) => (
                    <p key={line} className="relative z-10 text-sm text-gray-400 break-words">{line}</p>
                  ))}
                </>
              );
              return (
                <SpotlightCard key={label} color="0,240,255" className="h-full border border-white/10 bg-black hover:border-neon-blue/30 transition-colors duration-300">
                  <HudCorners className="border-white/15 group-hover:border-neon-blue/70" size="w-2.5 h-2.5" />
                  {href ? (
                    <a href={href} className="block h-full p-6">{body}</a>
                  ) : (
                    <div className="h-full p-6">{body}</div>
                  )}
                </SpotlightCard>
              );
            })}
          </div>

          <a
            href="https://wa.me/593963038666"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 flex items-center justify-between gap-4 border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-5 hover:bg-[#25D366] transition-colors duration-300"
          >
            <span className="flex items-center gap-3 font-bold text-[#25D366] group-hover:text-black transition-colors duration-300">
              <MessageCircle /> CHATEAR EN WHATSAPP
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[#25D366] group-hover:text-black transition-colors duration-300">
              <span className="h-2 w-2 rounded-full bg-[#25D366] group-hover:bg-black animate-pulse" />
              ONLINE
            </span>
          </a>
        </div>

        {/* Form console */}
        <div className="lg:col-span-7">
          <div className="relative border border-white/10 bg-dark-card">
            <HudCorners className="border-gold/60" size="w-4 h-4" />

            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/70 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">
              <span className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon-green/70" />
              </span>
              <span className="truncate">Nueva transmisión</span>
              <span className="hidden sm:flex items-center gap-2 text-neon-green">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" /> LIVE
              </span>
            </div>

            <form ref={formRef} className="space-y-6 p-6 md:p-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="contact-name" index="01">Identificación</FieldLabel>
                  <input id="contact-name" type="text" placeholder="Nombre" className={inputClass} />
                </div>
                <div>
                  <FieldLabel htmlFor="contact-org" index="02">Empresa / Entidad</FieldLabel>
                  <input id="contact-org" type="text" placeholder="Organización" className={inputClass} />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="contact-email" index="03">Punto de Contacto</FieldLabel>
                <input id="contact-email" type="email" placeholder="Email" className={inputClass} />
              </div>

              <div>
                <FieldLabel htmlFor="contact-service" index="04">Tipo de Misión</FieldLabel>
                <div className="relative">
                  <select id="contact-service" className={`${inputClass} appearance-none pr-12 text-gray-300`}>
                    <option>Seleccionar Servicio</option>
                    <option>Diseño Web</option>
                    <option>Branding</option>
                    <option>Audiovisual</option>
                    <option>Marketing</option>
                    <option>Otro</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="contact-details" index="05">Datos de la Misión</FieldLabel>
                <textarea id="contact-details" rows={5} placeholder="Detalles del proyecto..." className={`${inputClass} resize-y`}></textarea>
              </div>

              <GooeyButton
                label="Enviar Mensaje"
                className="w-full bg-white text-black h-14"
                onClick={() => {
                  // In a real app, we'd handle submit here.
                  // For now, let's just trigger the effect.
                  formRef.current?.requestSubmit();
                }}
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
