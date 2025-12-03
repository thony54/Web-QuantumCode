import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import RevealOnScroll from '../components/ui/RevealOnScroll';

const Contact: React.FC = () => {
  return (
    <div className="pt-20 bg-dark min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* Contact Info Side */}
        <div className="bg-black p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

          <RevealOnScroll>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8">
              INICIAR <br /><GlitchText text="TRANSMISIÓN" className="text-gold" />
            </h1>
          </RevealOnScroll>
          <p className="text-gray-400 mb-12 text-lg">
            Estamos listos para recibir tu señal. Cuéntanos sobre tu proyecto y descodificaremos la mejor solución para ti.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Phone className="text-neon-blue mt-1" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider">Línea Directa</h3>
                <p className="text-gray-400">+593 96 303 8666</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-neon-blue mt-1" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider">Frecuencia Email</h3>
                <p className="text-gray-400">global@quantumcode.art</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="text-neon-blue mt-1" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider">Horario Operativo</h3>
                <p className="text-gray-400">Abierto, todos los días (24/7 Virtual)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="text-neon-blue mt-1" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider">Base de Operaciones</h3>
                <p className="text-gray-400">Coordenadas del Multiverso Digital</p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/593963038666"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center bg-[#25D366] text-black font-bold py-3 px-6 hover:bg-white transition-colors w-fit"
          >
            <MessageCircle className="mr-2" /> CHATEAR EN WHATSAPP
          </a>
        </div>

        {/* Form Side */}
        <div className="bg-dark-card border-l border-white/5 p-12 lg:p-24 flex flex-col justify-center">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-gold mb-2 uppercase">Identificación</label>
                <input type="text" placeholder="Nombre" className="w-full bg-black border border-white/10 text-white p-4 focus:border-neon-blue focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gold mb-2 uppercase">Empresa / Entidad</label>
                <input type="text" placeholder="Organización" className="w-full bg-black border border-white/10 text-white p-4 focus:border-neon-blue focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gold mb-2 uppercase">Punto de Contacto</label>
              <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 text-white p-4 focus:border-neon-blue focus:outline-none transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-mono text-gold mb-2 uppercase">Tipo de Misión</label>
              <select className="w-full bg-black border border-white/10 text-gray-300 p-4 focus:border-neon-blue focus:outline-none transition-colors">
                <option>Seleccionar Servicio</option>
                <option>Diseño Web</option>
                <option>Branding</option>
                <option>Audiovisual</option>
                <option>Marketing</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-gold mb-2 uppercase">Datos de la Misión</label>
              <textarea rows={5} placeholder="Detalles del proyecto..." className="w-full bg-black border border-white/10 text-white p-4 focus:border-neon-blue focus:outline-none transition-colors"></textarea>
            </div>

            <button type="submit" className="w-full bg-white text-black font-bold py-4 uppercase tracking-widest hover:bg-gold transition-colors">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;