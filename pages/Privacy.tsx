import React from 'react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
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
                        <h2 className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-4">Legal</h2>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter">
                            Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">Privacidad</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert prose-gray max-w-none text-gray-300 font-sans leading-relaxed">
                        <p className="mb-6 text-sm text-gray-500 font-mono">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-neon-blue pl-4">1. Recopilación de Información</h2>
                        <p className="mb-6">
                            Recopilamos información cuando se registra en nuestro sitio, realiza un pedido, se suscribe a nuestro boletín, responde a una encuesta o completa un formulario. La información recopilada incluye su nombre, dirección de correo electrónico, número de teléfono y/o tarjeta de crédito cuando proceda a realizar pagos.
                        </p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-neon-blue pl-4">2. Uso de la Información</h2>
                        <p className="mb-6">
                            Cualquiera de las informaciones que recopilamos sobre usted puede ser utilizada de las siguientes maneras:
                        </p>
                        <ul className="list-disc pl-6 mb-6">
                            <li className="mb-2">Para personalizar su experiencia.</li>
                            <li className="mb-2">Para mejorar nuestro sitio web.</li>
                            <li className="mb-2">Para mejorar el servicio al cliente.</li>
                            <li className="mb-2">Para procesar transacciones.</li>
                        </ul>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-neon-blue pl-4">3. Protección de la Información</h2>
                        <p className="mb-6">
                            Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal cuando realiza un pedido o ingresa, envía o accede a su información personal. Utilizamos encriptación de última generación para proteger la información confidencial transmitida en línea.
                        </p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-neon-blue pl-4">4. Divulgación a Terceros</h2>
                        <p className="mb-6">
                            No vendemos, intercambiamos ni transferimos a terceros su información personal identificable. Esto no incluye a terceros de confianza que nos asisten en el funcionamiento de nuestro sitio web, la conducción de nuestro negocio o el servicio a usted, siempre y cuando dichas partes acuerden mantener esta información confidencial.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
