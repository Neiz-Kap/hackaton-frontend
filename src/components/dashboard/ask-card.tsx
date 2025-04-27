import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MarkedSlider } from './marked-slider'

export function AskCard({
  question,
  points,
  onNext,
  onPrev,
  onFinish,
  selectedValue,
  setSelectedValue,
}: {
  question: string
  points: { value: number; label: string }[]
  onNext: () => void
  onPrev: () => void
  onFinish?: () => void
  selectedValue: number
  setSelectedValue: (value: number) => void
}) {
  // Check if the slider should be hidden (e.g., for the last mock question)
  const shouldHideSlider = points.length === 0

  return (
    <>
      <CardHeader className="flex-col">
        <div className="flex justify-center flex-col gap-4">
          <CardTitle className="flex flex-row justify-center">{question}</CardTitle>
          {!shouldHideSlider && (
            <CardDescription className="flex my-5 flex-col">
              <MarkedSlider value={selectedValue} onChange={setSelectedValue} points={points} />
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="gap-4 flex justify-between">
        {!onFinish && !shouldHideSlider && (
          <Button variant="outline" className="grow" onClick={onPrev}>
            Назад
          </Button>
        )}
        {onFinish ? (
          <Button className="grow" onClick={onFinish}>
            Готово
          </Button>
        ) : (
          <Button className="grow" onClick={onNext} disabled={shouldHideSlider || selectedValue === undefined}>
            Далее
          </Button>
        )}
      </CardContent>
    </>
  )
}
