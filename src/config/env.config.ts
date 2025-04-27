const env = import.meta.env
// Определяем конфигурацию окружения
export interface EnvConfig {
  apiAudioUrl: string
  apiVideoUrl: string
}

export const envConfig = {
  apiBaseUrl: env.VITE_BACKEND_URL,
  apiAudioUrl: env.VITE_AUDIO_BACKEND_URL,
  apiVideoUrl: env.VITE_VIDEO_BACKEND_URL,
}

console.debug(envConfig)
