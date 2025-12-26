import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

interface VelocityTextProps {
    children: React.ReactNode;
    baseVelocity?: number;
    className?: string;
}

const VelocityText: React.FC<VelocityTextProps> = ({
    children,
    baseVelocity = 5,
    className = ""
}) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Wrap -25% to 0% because we render 4 copies.
    // -25% of total width = width of 1 copy (since total is 400% of a copy).
    const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // This changes direction based on scroll direction if desired
        // Or just accelerates in the current direction based on scroll speed
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
            <motion.div className="flex flex-nowrap gap-12 md:gap-24 items-center" style={{ x }}>
                {/* Render 4 copies to ensure seamless loop */}
                <div className="flex flex-nowrap gap-12 md:gap-24 flex-shrink-0">
                    {children}
                </div>
                <div className="flex flex-nowrap gap-12 md:gap-24 flex-shrink-0">
                    {children}
                </div>
                <div className="flex flex-nowrap gap-12 md:gap-24 flex-shrink-0">
                    {children}
                </div>
                <div className="flex flex-nowrap gap-12 md:gap-24 flex-shrink-0">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

// Utility to wrap value within a range
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default VelocityText;
