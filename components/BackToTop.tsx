import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAbducting, setIsAbducting] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // Make scrolling smooth
    const scrollToTop = () => {
        setIsAbducting(true);

        // Slight delay to see the abduction animation before scrolling
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            // Reset after animation
            setTimeout(() => setIsAbducting(false), 1000);
        }, 400);
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 50, transition: { duration: 0.3 } }}
                    className="fixed bottom-8 right-8 z-[90]"
                >
                    <button
                        onClick={scrollToTop}
                        className="relative group focus:outline-none"
                        aria-label="Volver arriba - Abducción Cuántica"
                    >
                        {/* The UFO Ship */}
                        <motion.div
                            animate={isAbducting ? { y: -800, scale: 0.5, opacity: 0 } : { y: 0 }}
                            transition={{ duration: 0.8, ease: "easeIn" }}
                            className="relative z-10 drop-shadow-[0_0_15px_#ff003c]"
                        >
                            {/* Dome */}
                            <div className="w-6 h-4 bg-[#d4af37] rounded-t-full mx-auto relative border border-[#d4af37] overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>

                            {/* Main Disk */}
                            <div className="w-16 h-4 bg-[#d4af37] border border-[#d4af37] rounded-full flex items-center justify-around px-2 relative overflow-hidden group-hover:brightness-110 transition-all">
                                <div className="absolute inset-0 border-grid opacity-30"></div>
                                {/* Lights */}
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-[ping_1.5s_infinite]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-[ping_1.8s_infinite_0.5s]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-[ping_1.2s_infinite_1s]"></div>
                            </div>
                        </motion.div>

                        {/* Abduction Beam (visible on hover or active) */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: isAbducting ? 1 : 0,
                                height: isAbducting ? "40px" : "0px",
                                y: isAbducting ? -800 : 0
                            }}
                            whileHover={{ opacity: 0.6, height: "30px", top: "100%" }}
                            transition={{ duration: isAbducting ? 0.8 : 0.2, ease: "easeIn" }}
                            className="absolute top-[100%] left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-[#ff003c]/80 via-[#ff003c]/40 to-transparent blur-[2px] pointer-events-none"
                            style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
                        >
                        </motion.div>

                        {/* Tooltip Text */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap text-[#ff003c] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest pointer-events-none">
                            Iniciando Abducción
                        </div>

                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
