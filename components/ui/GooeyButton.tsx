import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GooeyButton.css';

interface GooeyButtonProps {
    label: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    animationTime?: number;
    timeVariance?: number;
    colors?: number[];
    variant?: 'primary' | 'secondary' | 'gold';
    icon?: React.ReactNode;
}

const GooeyButton: React.FC<GooeyButtonProps> = ({
    label,
    href,
    onClick,
    className = '',
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    icon,
    variant,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const noise = (n = 1) => n / 2 - Math.random() * n;

    const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const createParticle = (i: number, t: number, d: [number, number], r: number) => {
        let rotate = noise(r / 10);
        return {
            start: getXY(d[0], particleCount - i, particleCount),
            end: getXY(d[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
        };
    };

    const makeParticles = (element: HTMLElement) => {
        const d = particleDistances;
        const r = particleR;
        const bubbleTime = animationTime * 2 + timeVariance;
        element.style.setProperty('--time', `${bubbleTime}ms`);

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const p = createParticle(i, t, d as [number, number], r);

            setTimeout(() => {
                const particle = document.createElement('span');
                const point = document.createElement('span');
                particle.classList.add('particle');
                particle.style.setProperty('--start-x', `${p.start[0]}px`);
                particle.style.setProperty('--start-y', `${p.start[1]}px`);
                particle.style.setProperty('--end-x', `${p.end[0]}px`);
                particle.style.setProperty('--end-y', `${p.end[1]}px`);
                particle.style.setProperty('--time', `${p.time}ms`);
                particle.style.setProperty('--scale', `${p.scale}`);
                particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
                particle.style.setProperty('--rotate', `${p.rotate}deg`);

                point.classList.add('point');
                particle.appendChild(point);
                element.appendChild(particle);

                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch {
                        // Do nothing
                    }
                }, t);
            }, 30);
        }
    };

    const updateEffectPosition = () => {
        if (!buttonRef.current || !filterRef.current || !textRef.current || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = buttonRef.current.getBoundingClientRect();

        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`,
        };
        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isActive) return;

        setIsActive(true);
        updateEffectPosition();

        if (filterRef.current) {
            const particles = filterRef.current.querySelectorAll('.particle');
            particles.forEach((p) => filterRef.current?.removeChild(p));
            makeParticles(filterRef.current);
        }

        if (textRef.current) {
            textRef.current.classList.remove('active');
            void textRef.current.offsetWidth;
            textRef.current.classList.add('active');
        }

        // Navigation / Callback
        setTimeout(() => {
            if (onClick) onClick();
            if (href) navigate(href);
            setIsActive(false);
        }, animationTime);
    };

    useEffect(() => {
        updateEffectPosition();
        window.addEventListener('resize', updateEffectPosition);
        return () => window.removeEventListener('resize', updateEffectPosition);
    }, []);

    return (
        <div className={`gooey-button-container ${className}`} ref={containerRef}>
            <div
                className={`gooey-button ${isActive ? 'active' : ''} ${variant ? `variant-${variant}` : ''}`}
                ref={buttonRef}
                onClick={handleClick}
            >
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {label}
                    {icon && <span className="ml-2">{icon}</span>}
                </div>
            </div>
            <span className="effect filter" ref={filterRef} />
            <span className="effect text" ref={textRef}>
                {label}
                {icon && <span className="ml-2">{icon}</span>}
            </span>
        </div>
    );
};

export default GooeyButton;
