import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, MoveLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

const NotFound: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-black">
            <SEO 
                title="Página No Encontrada (404) | Quantum Code"
                description="La estructura de datos solicitada no existe en este nodo. Vuelve a la singularidad."
            />
            <div className="absolute inset-0 border-grid opacity-20 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-neon-pink/20 blur-xl rounded-full z-0 animate-pulse"></div>
                    <Terminal className="w-24 h-24 text-neon-pink mx-auto mb-8 relative z-10" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-8xl md:text-9xl font-display font-bold text-white tracking-tighter mb-4">
                        4<span className="text-neon-pink">0</span>4
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-mono text-gray-400 mb-8 tracking-widest uppercase">
                        Sistema <span className="text-white">No</span> Encontrado
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto mb-12 font-sans font-light">
                        La estructura de datos a la que intentas acceder no existe en este nodo. Es posible que el enlace esté roto o haya sido movido.
                    </p>

                    <Link to="/" className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 font-bold font-mono text-sm tracking-widest uppercase hover:bg-gold transition-colors hover-scale">
                        <MoveLeft className="w-4 h-4" />
                        <span>Volver al Nodo Principal</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
