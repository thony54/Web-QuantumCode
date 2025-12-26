import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Grid Effect */}
            <div className="absolute inset-0 border-grid opacity-20 pointer-events-none"></div>

            {/* Scanline */}
            <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Container */}
                <div className="relative mb-8">
                    <motion.div
                        className="absolute inset-0 bg-neon-blue rounded-full blur-xl opacity-20"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.img
                        src="/assets/images/favicon.svg"
                        alt="Loading..."
                        className="w-24 h-24 relative z-10"
                        animate={{
                            rotate: [0, 360],
                            filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            filter: { duration: 2, repeat: Infinity }
                        }}
                    />
                </div>

                {/* Loading Text */}
                <div className="font-mono text-center">
                    <motion.div
                        className="text-2xl font-bold text-white mb-2 tracking-[0.5em]"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        LOADING
                    </motion.div>

                    <div className="flex items-center gap-1 justify-center text-[10px] text-gold uppercase tracking-widest">
                        <span>System Initialization</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
                        >...</motion.span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue via-white to-neon-blue"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Tech Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/5 rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }}></div>
            </div>

            {/* Bottom Status */}
            <div className="absolute bottom-8 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Establishing Secure Connection
                </motion.span>
            </div>
        </motion.div>
    );
};

export default Loader;
