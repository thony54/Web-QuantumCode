import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
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
                            Términos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Servicio</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert prose-gray max-w-none text-gray-300 font-sans leading-relaxed">
                        <p className="mb-6 text-sm text-gray-500 font-mono">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">1. Aceptación de los Términos</h2>
                        <p className="mb-6">
                            Al acceder y utilizar el sitio web de Quantum Code ("la Agencia"), usted acepta estar sujeto a estos términos de servicio, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.
                        </p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">2. Uso de la Licencia</h2>
                        <p className="mb-6">
                            Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de la Agencia para visualización transitoria personal y no comercial.
                        </p>
                        <ul className="list-disc pl-6 mb-6">
                            <li className="mb-2">Modificar o copiar los materiales.</li>
                            <li className="mb-2">Utilizar los materiales para cualquier propósito comercial o para cualquier exhibición pública.</li>
                            <li className="mb-2">Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web.</li>
                        </ul>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">3. Propiedad Intelectual</h2>
                        <p className="mb-6">
                            Todos los contenidos incluidos en este sitio, como textos, gráficos, logotipos, iconos de botones, imágenes y clips de audio, son propiedad de Quantum Code o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual y derechos de autor internacionales.
                        </p>

                        <h2 className="text-2xl text-white mt-12 mb-6 font-display tracking-tight border-l-2 border-gold pl-4">4. Limitación de Responsabilidad</h2>
                        <p className="mb-6">
                            En ningún caso Quantum Code o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el sitio web.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
