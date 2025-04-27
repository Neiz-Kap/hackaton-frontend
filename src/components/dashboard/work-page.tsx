import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pause } from 'lucide-react'

export function WorkPage() {
  return (
    <Card
      className="@container/card h-full flex flex-col justify-between"
      // className="w-100% m-8 rounded-md border border-gray-900"
    >
      <CardHeader>
        <CardTitle>Рабочая сессия</CardTitle>
        <CardDescription>Начните рабочую сессию.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-5 px-2 pt-4 sm:px-6 sm:pt-6">
        <Button className="grow">Начать</Button>
        <Button variant="outline" className="grow">
          <Pause color="black" />
          Пауза
        </Button>
      </CardContent>
    </Card>
  )
}
