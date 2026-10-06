import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import HudCorners from '../ui/HudCorners';
import SectionLabel from '../ui/SectionLabel';
import Wave from './Wave';
import '../../pages/universes/universes.css';

/**
 * Interactive step sequencer + arrangement view + mixer (WebAudio, everything synthesized in the browser).
 * Parked on 2026-10-05 at the owner's request ("lo dejamos para después"): it is not rendered anywhere yet.
 * To bring it back: <StudioLab /> inside any universe page.
 */
const STEPS = 16;

const TRACKS = [
  { id: 'kick', label: 'KICK', color: '#D4AF37' },
  { id: 'snare', label: 'SNARE', color: '#00F0FF' },
  { id: 'hat', label: 'HI-HAT', color: '#FF003C' },
  { id: 'bass', label: 'BASS', color: '#00FF41' },
] as const;

const initialPattern = (): boolean[][] => {
  const row = (on: number[]) => Array.from({ length: STEPS }, (_, i) => on.includes(i));
  return [row([0, 4, 8, 11, 12]), row([4, 12]), row([2, 6, 10, 14]), row([0, 3, 6, 8, 10, 14])];
};

/** A1 – C2 – D2 – E2 bassline, one frequency per step */
const BASS_NOTES = [55, 55, 65.4, 55, 73.4, 55, 82.4, 73.4, 55, 55, 65.4, 55, 98, 82.4, 73.4, 65.4];

const LANES = [
  { label: 'VOCES', color: '#FF003C', clips: [[0, 22], [26, 30], [60, 36]] },
  { label: 'SYNTH', color: '#00F0FF', clips: [[8, 40], [52, 44]] },
  { label: 'BATERÍA', color: '#D4AF37', clips: [[0, 48], [50, 50]] },
  { label: 'BAJO', color: '#00FF41', clips: [[12, 36], [56, 40]] },
  { label: 'FX', color: '#FFFFFF', clips: [[4, 10], [47, 8], [90, 9]] },
] as const;

const StudioLab: React.FC = () => {

  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(112);
  const [step, setStep] = useState(-1);
  const [pattern, setPattern] = useState<boolean[][]>(initialPattern);
  const [volumes, setVolumes] = useState<number[]>([88, 68, 52, 72]);
  const [master, setMaster] = useState(80);

  // Audio engine lives in refs: the scheduler must not depend on React renders
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextTimeRef = useRef(0);
  const stepRef = useRef(0);
  const playingRef = useRef(false);
  const patternRef = useRef(pattern);
  const bpmRef = useRef(bpm);
  const volumesRef = useRef(volumes);
  const meterRefs = useRef<(HTMLDivElement | null)[]>([]);

  patternRef.current = pattern;
  bpmRef.current = bpm;
  volumesRef.current = volumes;

  useEffect(() => {
    if (masterGainRef.current) masterGainRef.current.gain.value = master / 100;
  }, [master]);

  const ensureAudio = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      const gain = ctx.createGain();
      gain.gain.value = master / 100;
      const comp = ctx.createDynamicsCompressor();
      gain.connect(comp).connect(ctx.destination);
      const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      ctxRef.current = ctx;
      masterGainRef.current = gain;
      noiseRef.current = buffer;
    }
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
    return ctxRef.current;
  }, [master]);

  /** Flash a mixer meter: jump to `level`, then fall back (meters are covered by a scaling black layer) */
  const flashMeter = useCallback((index: number, level: number, delayMs: number) => {
    window.setTimeout(() => {
      const el = meterRefs.current[index];
      if (!el) return;
      el.style.transition = 'none';
      el.style.transform = `scaleY(${Math.max(0, 1 - level)})`;
      void el.offsetWidth;
      el.style.transition = 'transform 380ms ease-out';
      el.style.transform = 'scaleY(1)';
    }, Math.max(0, delayMs));
  }, []);

  const trigger = useCallback(
    (track: number, time: number, stepIndex: number) => {
      const ctx = ctxRef.current;
      const out = masterGainRef.current;
      if (!ctx || !out) return;
      const vol = Math.max(volumesRef.current[track] / 100, 0.0001);

      if (track === 0) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);
        g.gain.setValueAtTime(vol, time);
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        osc.connect(g).connect(out);
        osc.start(time);
        osc.stop(time + 0.4);
      } else if (track === 1) {
        const noise = ctx.createBufferSource();
        noise.buffer = noiseRef.current;
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 1200;
        const g = ctx.createGain();
        g.gain.setValueAtTime(vol * 0.6, time);
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
        noise.connect(hp).connect(g).connect(out);
        noise.start(time);
        noise.stop(time + 0.2);
        const tone = ctx.createOscillator();
        tone.type = 'triangle';
        tone.frequency.value = 190;
        const tg = ctx.createGain();
        tg.gain.setValueAtTime(vol * 0.4, time);
        tg.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
        tone.connect(tg).connect(out);
        tone.start(time);
        tone.stop(time + 0.15);
      } else if (track === 2) {
        const noise = ctx.createBufferSource();
        noise.buffer = noiseRef.current;
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 7500;
        const g = ctx.createGain();
        g.gain.setValueAtTime(vol * 0.35, time);
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        noise.connect(hp).connect(g).connect(out);
        noise.start(time);
        noise.stop(time + 0.06);
      } else {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = BASS_NOTES[stepIndex % STEPS];
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 520;
        lp.Q.value = 4;
        const g = ctx.createGain();
        g.gain.setValueAtTime(vol * 0.38, time);
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
        osc.connect(lp).connect(g).connect(out);
        osc.start(time);
        osc.stop(time + 0.25);
      }

      const delay = (time - ctx.currentTime) * 1000;
      const level = 0.25 + vol * 0.7;
      flashMeter(track, level, delay);
      flashMeter(TRACKS.length, level * 0.9, delay);
    },
    [flashMeter]
  );

  const tick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    while (nextTimeRef.current < ctx.currentTime + 0.12) {
      const s = stepRef.current;
      const at = nextTimeRef.current;
      patternRef.current.forEach((row, t) => {
        if (row[s]) trigger(t, at, s);
      });
      window.setTimeout(() => {
        if (playingRef.current) setStep(s);
      }, Math.max(0, (at - ctx.currentTime) * 1000));
      nextTimeRef.current += 60 / bpmRef.current / 4;
      stepRef.current = (s + 1) % STEPS;
    }
  }, [trigger]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    playingRef.current = false;
    setPlaying(false);
    setStep(-1);
  }, []);

  const start = useCallback(() => {
    const ctx = ensureAudio();
    nextTimeRef.current = ctx.currentTime + 0.05;
    stepRef.current = 0;
    playingRef.current = true;
    setPlaying(true);
    tick();
    timerRef.current = window.setInterval(tick, 25);
  }, [ensureAudio, tick]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      playingRef.current = false;
      void ctxRef.current?.close();
    },
    []
  );

  const toggleCell = (track: number, s: number) => {
    const turningOn = !pattern[track][s];
    setPattern((prev) => prev.map((row, t) => (t === track ? row.map((v, i) => (i === s ? !v : v)) : row)));
    if (turningOn && !playing) {
      const ctx = ensureAudio();
      trigger(track, ctx.currentTime + 0.01, s);
    }
  };

  const setVolume = (track: number, value: number) =>
    setVolumes((prev) => prev.map((v, i) => (i === track ? value : v)));

  return (
    <>

      {/* ───────── 01 Sequencer ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="01" as="h2" className="mb-12">Secuenciador</SectionLabel>

        <div className="relative border border-white/15 bg-black">
          <HudCorners className="border-neon-blue/60" size="w-4 h-4" />
          {/* Window title bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neon-pink" />
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="h-2 w-2 rounded-full bg-neon-green" />
              <span className="ml-3 hidden sm:inline">QUANTUM_STUDIO.qcp</span>
            </span>
            <span>{playing ? 'REC ● ROLLING' : 'STANDBY'}</span>
          </div>

          {/* Transport */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-white/10 px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={playing ? stop : start}
              aria-pressed={playing}
              className={`flex h-12 items-center gap-3 border px-6 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                playing
                  ? 'border-neon-pink bg-neon-pink text-black'
                  : 'border-gold bg-gold text-black hover:bg-white'
              }`}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? 'Detener' : 'Reproducir'}
            </button>

            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
              <label htmlFor="studio-bpm">BPM</label>
              <input
                id="studio-bpm"
                type="range"
                min={70}
                max={160}
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="studio-range w-32 sm:w-44"
              />
              <span className="w-8 text-right text-lg font-bold text-neon-blue">{bpm}</span>
            </div>

            <div className="ml-auto border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm tracking-[0.25em] text-neon-green" aria-hidden="true">
              BAR {step < 0 ? '-' : Math.floor(step / 4) + 1}.{step < 0 ? '-' : (step % 4) + 1}
            </div>
          </div>

          {/* Step grid */}
          <div className="overflow-x-auto p-4 sm:p-6">
            <div className="min-w-[620px] space-y-2">
              {TRACKS.map((track, t) => (
                <div key={track.id} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: track.color }}>
                    {track.label}
                  </span>
                  <div className="grid flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${STEPS}, minmax(0, 1fr))` }}>
                    {Array.from({ length: STEPS }, (_, s) => {
                      const on = pattern[t][s];
                      const current = step === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={on}
                          aria-label={`${track.label}, paso ${s + 1}`}
                          onClick={() => toggleCell(t, s)}
                          className={`h-11 border transition-colors ${s % 4 === 0 ? 'ml-1' : ''} ${
                            on ? 'border-transparent' : 'border-white/10 bg-white/[0.03] hover:border-white/40'
                          }`}
                          style={{
                            background: on ? track.color : undefined,
                            opacity: on ? (current ? 1 : 0.78) : 1,
                            boxShadow: current ? `0 0 0 1px #fff, 0 0 14px ${track.color}` : undefined,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 sm:px-6">
            Haz clic en los pasos para componer un ritmo. El sonido se genera en tu navegador.
          </p>
        </div>
      </section>

      {/* ───────── 02 Arrangement ───────── */}
      <section className="border-t border-white/10 bg-dark-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="02" as="h2" className="mb-12">Arreglo</SectionLabel>

          <div className="overflow-x-auto border border-white/10 bg-black" aria-hidden="true">
            <div className="min-w-[680px]">
              <div className="flex border-b border-white/10 font-mono text-[9px] text-gray-600">
                <span className="w-24 shrink-0 border-r border-white/10" />
                <div className="grid flex-1 grid-cols-8">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} className="border-l border-white/5 px-2 py-1.5 first:border-l-0">
                      {String(i * 2 + 1).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                {LANES.map((lane, li) => (
                  <div key={lane.label} className="flex h-16 border-b border-white/5 last:border-b-0">
                    <span className="flex w-24 shrink-0 items-center border-r border-white/10 px-3 font-mono text-[10px] tracking-[0.2em] text-gray-400">
                      {lane.label}
                    </span>
                    <div className="relative flex-1">
                      {lane.clips.map(([left, width], ci) => (
                        <div
                          key={ci}
                          className="absolute top-1.5 bottom-1.5 overflow-hidden border"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            borderColor: `${lane.color}99`,
                            background: `${lane.color}14`,
                          }}
                        >
                          <Wave seed={li * 7 + ci * 3 + 1} color={lane.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Playhead: only its transform animates */}
                <div className="pointer-events-none absolute inset-y-0 left-24 right-0 overflow-hidden">
                  <div className="studio-playhead h-full w-full" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
                    <div className="absolute inset-y-0 right-full w-px bg-white shadow-[0_0_10px_#fff]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 03 Mixer ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <SectionLabel index="03" as="h2" className="mb-12">Mezclador</SectionLabel>

        <div className="relative border border-white/15 bg-black p-4 sm:p-8">
          <HudCorners className="border-gold/50" size="w-4 h-4" />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {[...TRACKS.map((t, i) => ({ key: t.id, label: t.label, color: t.color, index: i })), { key: 'master', label: 'MASTER', color: '#FFFFFF', index: TRACKS.length }].map((ch) => {
              const isMaster = ch.index === TRACKS.length;
              const value = isMaster ? master : volumes[ch.index];
              return (
                <div key={ch.key} className={`flex w-20 flex-col items-center gap-4 ${isMaster ? 'border-l border-white/15 pl-4 sm:pl-8' : ''}`}>
                  <div className="flex items-end gap-3">
                    {/* Meter: gradient strip hidden under a black layer that scales away on every hit */}
                    <div className="relative h-[130px] w-3 overflow-hidden bg-gradient-to-t from-neon-green via-gold to-neon-pink" aria-hidden="true">
                      <div
                        ref={(el) => {
                          meterRefs.current[ch.index] = el;
                        }}
                        className="absolute inset-0 origin-top bg-black"
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={value}
                      aria-label={`Volumen ${ch.label}`}
                      onChange={(e) => (isMaster ? setMaster(Number(e.target.value)) : setVolume(ch.index, Number(e.target.value)))}
                      className="studio-fader"
                    />
                  </div>
                  <span className="font-mono text-[10px] tabular-nums text-gray-500">{value}</span>
                  <span className="border-t-2 pt-2 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: ch.color, color: ch.color }}>
                    {ch.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default StudioLab;
