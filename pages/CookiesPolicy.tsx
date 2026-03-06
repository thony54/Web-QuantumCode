import React from 'react';
import { motion } from 'framer-motion';

const CookiesPolicy: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 border-grid opacity-20 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-12">
                        <h2 className="text-gold font-mono text-sm tracking-widest uppercase mb-4">Legal</h2>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter">
                            Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Cookies</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert prose-gray max-w-none text-gray-300 font-sans leading-relaxed">
                        <p className="mb-6 text-sm text-gray-500 font-mono">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

                        <p className="mb-8 text-lg text-gray-400">
                            En Quantum Code, utilizamos diversas tecnologías, incluyendo cookies, para mejorar la experiencia del usuario y analizar el rendimiento de nuestro ecosistema digital.
                        </p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">1. ¿Qué son las Cookies?</h2>
                        <p className="mb-6">
                            Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, tableta o teléfono móvil) cuando los visita. Estas permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo, para que no tenga que volver a introducirlas cada vez que regrese o navegue de una página a otra.
                        </p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">2. ¿Cómo las utilizamos?</h2>
                        <p className="mb-6">
                            Quantum Code utiliza cookies con los siguientes propósitos operativos:
                        </p>
                        <ul className="list-disc pl-6 mb-6">
                            <li className="mb-4">
                                <strong className="text-white font-mono">Cookies Estrictamente Necesarias:</strong> Son fundamentales para el funcionamiento del sitio web. Le permiten navegar y utilizar sus características principales. Sin estas, la plataforma no funcionaría correctamente.
                            </li>
                            <li className="mb-4">
                                <strong className="text-white font-mono">Cookies Analíticas:</strong> Nos permiten reconocer y recopilar datos estadísticos sobre el comportamiento de los usuarios (volumen de visitas, páginas más frecuentadas). Usamos esta telemetría internamente para optimizar el rendimiento y diseño.
                            </li>
                            <li className="mb-4">
                                <strong className="text-white font-mono">Cookies de Funcionalidad:</strong> Ayudan a recordar las elecciones que usted realiza (como el idioma o la región) para proporcionar una experiencia más personalizada.
                            </li>
                        </ul>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">3. Gestión de las Cookies</h2>
                        <p className="mb-6">
                            Usted tiene el control. Puede modificar, aceptar o rechazar el uso de cookies en cualquier momento ajustando la configuración de su navegador web. Tenga en cuenta que deshabilitar ciertos tipos de cookies puede afectar nuestra capacidad para proporcionarle determinadas funciones o servicios del sitio.
                        </p>
                        <p className="mb-6">
                            A continuación, le indicamos cómo gestionar las cookies en los navegadores principales:
                        </p>
                        <ul className="list-disc pl-6 mb-6">
                            <li className="mb-2"><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Google Chrome</a></li>
                            <li className="mb-2"><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Mozilla Firefox</a></li>
                            <li className="mb-2"><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Microsoft Edge</a></li>
                            <li className="mb-2"><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Safari</a></li>
                        </ul>

                        <div className="mt-12 p-6 border border-white/10 bg-white/5 rounded-sm">
                            <h3 className="text-xl text-white mb-2 font-display">¿Necesita asistencia adicional?</h3>
                            <p className="text-sm">
                                Si tiene preguntas adicionales o necesita asistencia técnica respecto al manejo de los datos y nuestra política de cookies, inicie contacto con el soporte a través de <a href="mailto:global@quantumcode.art" className="text-gold hover:text-white transition-colors border-b border-gold hover:border-white pb-0.5">global@quantumcode.art</a>.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CookiesPolicy;
