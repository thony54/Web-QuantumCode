/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL where the band's audio files are hosted (outside git). Example: https://xxxx.public.blob.vercel-storage.com/audio */
  readonly VITE_AUDIO_BASE_URL?: string;
}
