import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import HudCorners from '../ui/HudCorners';
import ShareMenu from './ShareMenu';
import Wave from './Wave';
import { embedInfo, Track, trackShareUrl } from '../../lib/music';

interface MusicPlayerProps {
  tracks: Track[];
  /** Track selected on load (from the shared link) */
  initialSlug?: string | null;
  /** Called when the visitor picks a track, so the page can keep the link in sync */
  onSelect?: (slug: string) => void;
  /** Cover art shown next to the title and on the lock screen */
  cover?: string;
  artist?: string;
}

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '--:--';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const sourceLabel = (t: Track) =>
  t.source.kind === 'file' ? 'Quantum' : t.source.kind === 'embed' ? embedInfo(t.source)?.providerLabel ?? 'Enlace' : 'Pronto';

/** Equalizer glyph for the row that is playing */
const NowBars: React.FC = () => (
  <span aria-hidden="true" className="flex h-4 items-end gap-[2px]">
    {[0, 1, 2].map((i) => (
      <span key={i} className="eq-bar w-[3px] bg-gold" style={{ height: '100%', ['--d' as string]: `${0.5 + i * 0.17}s` }} />
    ))}
  </span>
);

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, initialSlug, onSelect, cover, artist }) => {
  const [index, setIndex] = useState(() => Math.max(0, tracks.findIndex((t) => t.slug === initialSlug)));
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadedEmbed, setLoadedEmbed] = useState<string | null>(null); // slug of the embed the visitor chose to load
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantPlay = useRef(false);
  const loadedSrc = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const track = tracks[index];
  const isFile = track.source.kind === 'file';
  const embed = track.source.kind === 'embed' ? embedInfo(track.source) : null;
  const progress = duration > 0 ? (time / duration) * 100 : 0;

  /**
   * Points the <audio> at a track's file (idempotent). Returns false when the track has no file.
   * IMPORTANT for phones: this and play() must run synchronously inside the tap handler. iOS Safari
   * ignores play() calls made later (e.g. from a React effect) because they no longer count as user-initiated.
   */
  const attach = (audio: HTMLAudioElement, source: Track['source']) => {
    if (source.kind !== 'file') {
      audio.pause();
      audio.removeAttribute('src');
      loadedSrc.current = null;
      return false;
    }
    if (loadedSrc.current !== source.src) {
      audio.src = source.src;
      loadedSrc.current = source.src;
    }
    return true;
  };

  const startPlayback = (audio: HTMLAudioElement) => {
    setError(null);
    audio.play().catch((e: DOMException) => {
      if (e.name === 'AbortError') return; // interrupted by a quick track change: not an error
      setPlaying(false);
      setError('No se pudo reproducir este tema. Toca de nuevo o revisa tu conexión.');
    });
  };

  // Reset the display when the selected track changes (the actual loading/playing happens in the tap handlers)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setTime(0);
    setDuration(0);
    setError(null);
    if (!attach(audio, track.source)) setPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  const select = useCallback(
    (i: number, autoplay: boolean) => {
      const audio = audioRef.current;
      const next = tracks[i];
      wantPlay.current = autoplay;
      if (audio) {
        const playable = attach(audio, next.source);
        if (playable && autoplay) startPlayback(audio);
        else audio.pause();
      }
      setIndex(i);
      onSelect?.(next.slug);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSelect, tracks]
  );

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !isFile) return;
    if (audio.paused) {
      wantPlay.current = true;
      attach(audio, track.source);
      startPlayback(audio);
    } else {
      wantPlay.current = false;
      audio.pause();
    }
  };

  const step = (delta: number) => select((index + delta + tracks.length) % tracks.length, playing || wantPlay.current);

  // Lock-screen / media-key controls (always call the latest handlers)
  const controls = useRef({ toggle, step });
  controls.current = { toggle, step };
  useEffect(() => {
    if (!('mediaSession' in navigator) || !isFile) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist,
      artwork: cover ? [{ src: cover, sizes: '800x800', type: 'image/webp' }] : [],
    });
    navigator.mediaSession.setActionHandler('play', () => controls.current.toggle());
    navigator.mediaSession.setActionHandler('pause', () => controls.current.toggle());
    navigator.mediaSession.setActionHandler('previoustrack', () => controls.current.step(-1));
    navigator.mediaSession.setActionHandler('nexttrack', () => controls.current.step(1));
    return () => {
      for (const a of ['play', 'pause', 'previoustrack', 'nexttrack'] as const) navigator.mediaSession.setActionHandler(a, null);
    };
  }, [track, isFile, artist, cover]);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (audio && duration > 0) audio.currentTime = (value / 100) * duration;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Hidden engine: no native controls (so no native download button), context menu disabled */}
      <audio
        ref={audioRef}
        preload="none"
        controlsList="nodownload noplaybackrate"
        onContextMenu={(e) => e.preventDefault()}
        onError={() => {
          setPlaying(false);
          setError('No se pudo cargar este tema. Revisa tu conexión e inténtalo de nuevo.');
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          if (index < tracks.length - 1) select(index + 1, true);
          else {
            wantPlay.current = false;
            setPlaying(false);
          }
        }}
      />

      {/* ───────── Deck ───────── */}
      <div className="relative border border-white/15 bg-black p-5 sm:p-8 lg:col-span-7">
        <HudCorners className="border-gold/60" size="w-4 h-4" />
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
          <span className="flex items-center gap-2">
            {playing ? <NowBars /> : <span className="h-2 w-2 rounded-full bg-gray-600" />}
            {playing ? 'Sonando' : 'En pausa'}
          </span>
          <span>
            {String(index + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-start gap-5">
          {cover && (
            <img
              src={cover}
              alt={artist ? `Portada de ${artist}` : 'Portada'}
              width={160}
              height={160}
              className="h-24 w-24 shrink-0 border border-white/20 object-cover sm:h-36 sm:w-36"
            />
          )}
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-black uppercase leading-[1.05] tracking-tight text-white">
              {track.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">{subtitle(track)}</p>
            {track.description && <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">{track.description}</p>}
          </div>
        </div>

        {/* Body depends on where the song lives */}
        <div className="mt-8">
          {isFile && (
            <div>
              <div className="relative h-20">
                <div className="absolute inset-0 opacity-30"><Wave seed={index * 5 + 3} color="#ffffff" /></div>
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}>
                  <Wave seed={index * 5 + 3} color="#D4AF37" />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Posición de la canción"
                  aria-valuetext={`${fmt(time)} de ${fmt(duration)}`}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] tabular-nums tracking-widest text-gray-500">
                <span>{fmt(time)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>
          )}

          {embed && (
            <div className="border border-white/10 bg-white/[0.02]">
              {loadedEmbed === track.slug ? (
                <iframe
                  title={`${track.title} en ${embed.providerLabel}`}
                  src={embed.src}
                  loading="lazy"
                  allow="autoplay; encrypted-media; clipboard-write; fullscreen"
                  className="block w-full border-0"
                  style={embed.height ? { height: embed.height } : { aspectRatio: embed.ratio }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setLoadedEmbed(track.slug)}
                  className="flex w-full flex-col items-center gap-2 px-4 py-10 text-center transition-colors hover:bg-white/[0.04]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
                    <Play size={22} />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">Cargar reproductor de {embed.providerLabel}</span>
                  <span className="max-w-sm font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-gray-600">
                    {embed.providerLabel} podría guardar cookies al cargarse. Solo se carga si lo pides.
                  </span>
                </button>
              )}
            </div>
          )}

          {track.source.kind === 'soon' && (
            <div className="flex h-28 items-center justify-center border border-dashed border-white/15 font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
              Próximamente<span className="animate-pulse text-gold">_</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => step(-1)} aria-label="Tema anterior" className="flex h-11 w-11 items-center justify-center border border-white/20 text-gray-300 transition-colors hover:border-gold hover:text-gold">
            <SkipBack size={16} />
          </button>
          <button
            type="button"
            onClick={toggle}
            disabled={!isFile}
            aria-label={playing ? 'Pausar' : 'Reproducir'}
            className="flex h-14 w-14 items-center justify-center bg-gold text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-600"
          >
            {playing ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Tema siguiente" className="flex h-11 w-11 items-center justify-center border border-white/20 text-gray-300 transition-colors hover:border-gold hover:text-gold">
            <SkipForward size={16} />
          </button>
          <div className="ml-auto">
            <ShareMenu
              title={track.title}
              url={trackShareUrl(track.slug)}
              text={`Escucha "${track.title}"`}
              placement="top"
            />
          </div>
        </div>
        {error && (
          <p role="alert" className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-neon-pink">
            {error}
          </p>
        )}
      </div>

      {/* ───────── Playlist ───────── */}
      <ul className="border border-white/10 bg-black lg:col-span-5" aria-label="Lista de temas">
        {tracks.map((t, i) => {
          const active = i === index;
          return (
            <li key={t.slug} className={`flex items-center border-b border-white/5 last:border-b-0 ${active ? 'bg-white/[0.05]' : ''}`}>
              <button
                type="button"
                onClick={() => select(i, t.source.kind === 'file')}
                aria-current={active ? 'true' : undefined}
                className="flex min-w-0 flex-1 items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.06] focus-visible:outline-none"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 font-mono text-[10px] text-gray-500">
                  {active && playing ? <NowBars /> : String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate font-display text-sm font-bold uppercase tracking-tight ${active ? 'text-gold' : 'text-gray-200'}`}>{t.title}</span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gray-600">
                    {t.year}{t.year ? ' · ' : ''}{sourceLabel(t)}
                  </span>
                </span>
              </button>
              {t.duration && <span className="hidden pr-3 font-mono text-[10px] tabular-nums tracking-widest text-gray-600 sm:block">{t.duration}</span>}
              <div className="pr-3">
                <ShareMenu title={t.title} url={trackShareUrl(t.slug)} text={`Escucha "${t.title}"`} className="px-2.5" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/** Subtitle of the deck: where the song comes from */
function subtitle(t: Track) {
  if (t.source.kind === 'file') return `Reproduciendo desde Quantum Code${t.year ? ` · ${t.year}` : ''}`;
  if (t.source.kind === 'embed') return `${embedInfo(t.source)?.providerLabel ?? 'Enlace externo'}${t.year ? ` · ${t.year}` : ''}`;
  return `Sin publicar${t.year ? ` · ${t.year}` : ''}`;
}

export default MusicPlayer;
