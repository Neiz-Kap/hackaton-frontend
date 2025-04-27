import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function AskCardPreview({ onStart }: { onStart: () => void }) {
  return (
    <>
      <CardHeader className="flex-col">
        <div className="flex justify-center">
          <img
            src="https://em-content.zobj.net/source/telegram/386/pensive-face_1f614.webp"
            alt=""
            className="w-16 h-16"
          />
        </div>
        <div className="flex justify-center flex-col gap-2">
          <CardTitle className="text-center">У вас был тяжёлый звонок?</CardTitle>
          <CardDescription className="text-center">Давайте пройдём небольшой опрос.</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Button className="grow" onClick={onStart}>
          Пройти
        </Button>
      </CardFooter>
    </>
  )
}
