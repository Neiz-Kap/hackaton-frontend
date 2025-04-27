// CallCard.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, PhoneCall, Star, XCircle } from 'lucide-react'
import { useRef, useState } from 'react'

export const CallCard = () => {
  const [isCallAccepted, setIsCallAccepted] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Моковые данные
  const clientNumber = '+1234567890'
  const clientAverageRating = 4.5

  const handleAcceptCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setIsCallAccepted(true)
    } catch (error) {
      console.error('Ошибка при доступе к камере:', error)
    }
  }

  const handleCancelCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCallAccepted(false)
  }

  return (
    <Card className="lg:col-span-6 xl:col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PhoneCall className="w-6 h-6 mr-2 text-blue-500" />
            <p className="">Вам звонят</p>{' '}
          </div>
          <div className="flex flex-col items-center gap-1">
            <p>Входящий звонок: {clientNumber}</p>
            <div className="flex">
              <p>Средний рейтинг клиента: {clientAverageRating}</p>

              <div className="ml-3 flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isCallAccepted ? (
          <video ref={videoRef} className="w-full h-64 bg-gray-200 rounded-lg" autoPlay playsInline />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <PhoneCall className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isCallAccepted ? (
          <Button className="mb-3" variant="destructive" onClick={handleCancelCall} disabled={!isCallAccepted}>
            <XCircle className="w-4 h-4 mr-2" />
            Отменить
          </Button>
        ) : (
          <Button className="mb-3" variant="destructive" onClick={handleCancelCall} disabled={!isCallAccepted}>
            <XCircle className="w-4 h-4 mr-2" />
            Завершить
          </Button>
        )}
        <Button className="mb-3 ml-2" variant="default" onClick={handleAcceptCall} disabled={isCallAccepted}>
          <CheckCircle className="w-4 h-4 mr-2" />
          Принять
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CallCard
