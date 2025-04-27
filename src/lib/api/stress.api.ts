import { EnvConfig, envConfig } from '@/config/env.config'
import ky from 'ky'

// Определяем тип ответа от сервера аудио
export interface AudioAnalysisResult {
  emotions: {
    angry: number
    neutral: number
    other: number
    positive: number
    sad: number
  }
  stress_level: number
}

export interface AudioResponse {
  analysis_result: AudioAnalysisResult
  file: string
}

// Определяем тип ответа от сервера видео (можно расширить по необходимости)
export interface VideoAnalysisResult {
  emotions: {
    angry: number
    disgust: number
    fear: number
    happy: number
    neutral: number
    sad: number
    surprise: number
  }
  stress_level: number
}

export interface VideoResponse {
  analysis_result: VideoAnalysisResult
  file: string
}

class StressAPI {
  // Метод для отправки запроса на сервер аудио
  async analyzeAudio(url: string, options: { signal?: AbortSignal } = {}): Promise<AudioResponse> {
    const response = await ky
      .post(`${envConfig.apiAudioUrl}/analyze`, {
        searchParams: { url },
        signal: options.signal,
      })
      .json<AudioResponse>()

    return response
  }

  // Метод для отправки запроса на сервер видео
  async analyzeVideo(url: string, options: { signal?: AbortSignal } = {}): Promise<VideoResponse> {
    const response = await ky
      .post(`${envConfig.apiVideoUrl}/analyze`, {
        searchParams: { url },
        signal: options.signal,
      })
      .json<VideoResponse>()

    return response
  }
}

export const stressAPI = new StressAPI()
