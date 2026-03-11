import React from 'react';
import { motion } from 'framer-motion';

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, width = "fit-content", delay = 0, className = "" }) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RevealOnScroll;
