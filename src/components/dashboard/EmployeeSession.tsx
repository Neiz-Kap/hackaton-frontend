import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pause } from 'lucide-react'

interface EmployeeSessionProps {
  onSessionStarted: () => void
  onSessionFinished: () => void
  isSessionStarted: boolean
  className: string
}

export function EmployeeSession({
  onSessionStarted,
  onSessionFinished,
  isSessionStarted,
  className,
}: EmployeeSessionProps) {
  return (
    <Card
      className={`h-full w-full @container/card flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      <CardHeader>
        <CardTitle>Рабочая сессия</CardTitle>
        <CardDescription>Начните рабочую сессию.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-5 px-2 pt-4 sm:px-6 sm:pt-6">
        {isSessionStarted ? (
          <Button className="grow" onClick={onSessionFinished}>
            Завершить
          </Button>
        ) : (
          <Button className="grow" onClick={onSessionStarted}>
            Начать
          </Button>
        )}

        <Button variant="outline" className="grow" disabled>
          <Pause color="black" />
          Пауза
        </Button>
      </CardContent>
    </Card>
  )
}
