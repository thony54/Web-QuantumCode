import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already accepted cookies
        const hasAcceptedCookies = localStorage.getItem('quantum_cookies_accepted');
        if (!hasAcceptedCookies) {
            // Small delay to allow initial load animations to run first
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('quantum_cookies_accepted', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md w-full"
                >
                    <div className="bg-black/95 backdrop-blur-md border border-white/20 p-6 sm:rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden">
                        {/* Cyberpunk accent lines */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-neon-blue via-neon-pink to-gold opacity-50"></div>
                        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-neon-blue to-transparent opacity-50"></div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 border border-white/10 bg-white/5 shrink-0 hidden sm:block">
                                <Cookie className="w-5 h-5 text-gold" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-display text-lg mb-2 flex items-center gap-2">
                                    <Cookie className="w-4 h-4 text-gold sm:hidden" />
                                    Protocolo de Cookies
                                </h3>
                                <p className="text-gray-400 text-xs font-sans leading-relaxed mb-4">
                                    Utilizamos pequeños paquetes de datos (cookies) en su terminal para optimizar el rendimiento del sistema, analizar el tráfico y mejorar la interfaz de usuario. Al continuar navegando, usted aprueba esta telemetría.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 bg-white text-black hover:bg-gold transition-colors font-mono text-xs uppercase tracking-widest py-3 px-4 font-bold active:scale-95"
                                    >
                                        Establecer Conexión
                                    </button>
                                    <Link
                                        to="/cookies"
                                        onClick={() => setIsVisible(false)} // close banner if they go to policy directly
                                        className="flex-1 border border-white/20 text-white hover:border-white/50 hover:bg-white/5 transition-all font-mono text-xs uppercase tracking-widest py-3 px-4 text-center active:scale-95"
                                    >
                                        Ver Datos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
