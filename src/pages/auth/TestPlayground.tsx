// StressTestPage.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { stressAPI } from '@/lib/api/stress.api'
import { useMutation } from '@tanstack/react-query'
import { Check, Frown, Loader2, Smile, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export const getStressLevelMessage = (stressLevel: number) => {
  if (stressLevel < 0.4) {
    return { message: 'Всё отлично', icon: <Smile className="w-6 h-6 text-green-500" /> }
  } else if (stressLevel < 0.7) {
    return { message: 'Средний', icon: <ThumbsUp className="w-6 h-6 text-yellow-500" /> }
  } else {
    return { message: 'ВЫСОКИЙ', icon: <Frown /> }
  }
}

const useVideoAnalysis = () => {
  const controller = new AbortController()

  return useMutation({
    mutationKey: ['videoAnalysis'],
    mutationFn: (url: string) => {
      const timeoutId = setTimeout(() => {
        controller.abort('Request timed out')
      }, 60000) // 60 секунд

      try {
        return stressAPI.analyzeVideo(url, { signal: controller.signal })
      } finally {
        clearTimeout(timeoutId)
      }
    },
    onError: (error) => {
      if (error.name === 'AbortError') {
        console.error('Request took more than 5 seconds. Automatically cancelled.')
        toast({ title: `Failed to analyse audio, abort: ${error}` })
        return
      }

      toast({ title: `Failed to analyse audio: ${error}` })
      console.error(error)
    },
  })
}

const useAudioAnalysis = () => {
  const controller = new AbortController()

  return useMutation({
    mutationKey: ['audioAnalysis'],
    mutationFn: (url: string) => {
      const timeoutId = setTimeout(() => {
        controller.abort('Request timed out')
      }, 60000) // 60 секунд

      try {
        return stressAPI.analyzeAudio(url, { signal: controller.signal })
      } finally {
        clearTimeout(timeoutId)
      }
    },
    onError: (error) => {
      if (error.name === 'AbortError') {
        console.error('Request took more than 5 seconds. Automatically cancelled.')
        toast({ title: `Failed to analyse audio, abort: ${error}` })
        return
      }

      toast({ title: `Failed to analyse audio: ${error}` })
      console.error(error)
    },
  })
}

export function Component() {
  const [audioUrl, setAudioUrl] = useState('https://github.com/Mo-rok/media/raw/refs/heads/main/test.wav')
  const [videoUrl, setVideoUrl] = useState('https://github.com/Mo-rok/media/raw/refs/heads/main/video.mp4')
  const [stressLevel, setStressLevel] = useState<number | null>(null)

  const { mutate: analyzeVideo, isPending: videoLoading, data: videoData } = useVideoAnalysis()
  const { mutate: analyzeAudio, isPending: audioLoading, data: audioData } = useAudioAnalysis()

  // Обработка запросов при нажатии на кнопки
  const handleAudioRequest = () => {
    analyzeAudio(audioUrl)
  }

  const handleVideoRequest = () => {
    analyzeVideo(videoUrl)
  }

  const handleProcess = () => {
    analyzeAudio(audioUrl)
    analyzeVideo(videoUrl)
  }

  // Вычисление среднего уровня стресса
  useEffect(() => {
    if (audioData && videoData) {
      const audioStressLevel = audioData.analysis_result.stress_level
      const videoStressLevel = videoData.analysis_result.stress_level
      const averageStressLevel = (audioStressLevel + videoStressLevel) / 2
      setStressLevel(averageStressLevel)
    }
  }, [audioData, videoData])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Тестовая прошадка</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ссылка на аудио файл</label>
        <Input type="text" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} className="w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ссылка на видео файл</label>
        <Input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full" />
      </div>
      <div className="mb-4">
        <Button onClick={handleAudioRequest} disabled={audioLoading}>
          {audioLoading ? 'Обработка аудио...' : 'Обработать аудио'}
        </Button>
        <Button onClick={handleVideoRequest} disabled={videoLoading} className="ml-2">
          {videoLoading ? 'Обработка видео...' : 'Обработать видео'}
        </Button>
        <Button onClick={handleProcess} disabled={audioLoading || videoLoading} className="ml-2">
          {audioLoading || videoLoading ? 'Обработка...' : 'Обработать все'}
        </Button>
      </div>
      <div className="mt-6">
        <div className="flex items-center mb-2">
          <div className="mr-2">Аудио:</div>
          {audioLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : audioData ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : null}
          {audioData && <span className="ml-2">Аудио обработано</span>}
        </div>
        <div className="flex items-center mb-2">
          <div className="mr-2">Видео:</div>
          {videoLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : videoData ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : null}
          {videoData && <span className="ml-2">Видео обработано</span>}
        </div>
      </div>
      {stressLevel !== null && (
        <div className="mt-6">
          <div className="flex items-center">
            <div className="mr-2">Уровень стресса:</div>
            {getStressLevelMessage(stressLevel).icon}
            <span className="ml-2">{getStressLevelMessage(stressLevel).message}</span>
          </div>
        </div>
      )}
    </div>
  )
}
