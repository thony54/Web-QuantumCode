import React, { useMemo } from 'react';

/** Decorative, deterministic waveform: the same seed always draws the same shape. */
export const Wave: React.FC<{ seed: number; color: string }> = ({ seed, color }) => {
  const bars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) =>
        Math.round(14 + 86 * Math.abs(Math.sin(i * 0.55 + seed) * Math.cos(i * 0.21 + seed * 2)))
      ),
    [seed]
  );
  return (
    <div className="flex h-full items-center gap-px px-1">
      {bars.map((h, i) => (
        <span key={i} className="flex-1" style={{ height: `${h}%`, background: color, opacity: 0.85 }} />
      ))}
    </div>
  );
};

export default Wave;
