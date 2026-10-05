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
        // The in-view trigger lives on the (untransformed) clipping wrapper: if it were on the
        // inner element, anything shorter than its 75px offset would be fully clipped by
        // overflow:hidden, never count as "in view" and stay invisible forever.
        <motion.div
            style={{ position: "relative", width, overflow: "hidden" }}
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: delay }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default RevealOnScroll;
