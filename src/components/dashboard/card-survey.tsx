import { toast } from '@/hooks/use-toast'
import { getStressLevelMessage } from '@/pages/auth/TestPlayground'
import { useState } from 'react'
import { AskCard } from './ask-card'
import { AskCardPreview } from './ask-card-preview'

const surveySteps = [
  {
    question: 'Как вы оцениваете уровень сложности последнего звонка?',
    points: [
      { value: 0, label: 'Легко' },
      { value: 50, label: 'Умеренно' },
      { value: 100, label: 'Сложно' },
    ],
  },
  {
    question: 'Насколько вы были уверены в своих ответах во время звонка?',
    points: [
      { value: 0, label: 'Полностью уверен' },
      { value: 50, label: 'Частично уверен' },
      { value: 100, label: 'Не уверен' },
    ],
  },
  {
    question: 'Как часто вы чувствовали напряжение или раздражение во время звонка?',
    points: [
      { value: 0, label: 'Постоянно' },
      { value: 50, label: 'Иногда' },
      { value: 100, label: 'Редко' },
    ],
  },
  {
    question: 'Насколько вы удовлетворены тем, как завершился звонок?',
    points: [
      { value: 0, label: 'Удовлетворен' },
      { value: 50, label: 'Нейтрально' },
      { value: 100, label: 'Совсем не удовлетворен' },
    ],
  },
  {
    question: 'Как вы себя чувствуете прямо сейчас (после звонка)?',
    points: [
      { value: 0, label: 'Спокойно' },
      { value: 50, label: 'Усталым' },
      { value: 100, label: 'Раздраженным' },
    ],
  },
  {
    question: 'Опрос завершён',
    points: [],
  },
]

export default function CardSurvey() {
  const [currentStep, setCurrentStep] = useState(0) // Текущий шаг
  const [isSurveyVisible, setIsSurveyVisible] = useState(true) // Видимость опроса
  const [responses, setResponses] = useState<number[]>([]) // Массив выбранных значений

  const totalSteps = surveySteps.length

  const stressLevel = 0.5
  toast({
    title: 'По результату опроса, ваш уровень стресса:',
    description: (
      <div className="flex items-center">
        {getStressLevelMessage(stressLevel).icon}
        <span className="ml-2">{getStressLevelMessage(stressLevel).message}</span>
      </div>
    ),
  })

  // Fill the responses array with zeros
  const fillWithZeros = (length: number): number[] => {
    return Array.from({ length }, () => 0)
  }

  // Sanitize responses array
  const sanitizeResponses = (responses: number[], totalSteps: number): number[] => {
    if (responses.length === 0) {
      // If responses are empty, fill with zeros
      return fillWithZeros(totalSteps)
    }
    // Otherwise, sanitize the existing responses
    return responses.map((value) => (value !== undefined && value !== null ? value : 0))
  }

  // Переход к следующему шагу
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  // Переход к предыдущему шагу
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  // Расчет уровня стресса
  const calculateStressLevel = (responses: number[], totalSteps: number): number => {
    const sanitizedResponses = sanitizeResponses(responses, totalSteps) // Sanitize the responses
    const sum = sanitizedResponses.reduce((acc, value) => acc + value, 0)
    const stressLevel = sum / (sanitizedResponses.length * 100) // Normalize to a value between 0 and 1.0
    return isNaN(stressLevel) ? 0 : stressLevel // Default to 0 if stressLevel is NaN
  }

  // Завершение опроса
  const handleFinish = () => {
    // Sanitize the responses array
    const sanitizedResponses = sanitizeResponses(responses, totalSteps)

    // Calculate the stress level using sanitized data
    const stressLevel = calculateStressLevel(sanitizedResponses, totalSteps)

    // Log the sanitized responses and stress level
    console.log('Ответы пользователя:', sanitizedResponses)
    console.log('Общий уровень стресса:', stressLevel)

    // Send the sanitized data to the backend
    fetch('https://hackathon-backend-szk8.onrender.com/result/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'test',
        score: stressLevel,
        stress_level: 'Normale',
        employee_id: 5,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle non-2xx HTTP status codes
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log('Данные успешно отправлены:', data)
        toast({
          title: 'По результату опроса, ваш уровень стресса:',
          description: (
            <div className="flex items-center">
              <div className="mr-2">:</div>
              {getStressLevelMessage(stressLevel).icon}
              <span className="ml-2">{getStressLevelMessage(stressLevel).message}</span>
            </div>
          ),
        })
      })
      .catch((error) => {
        if (error.message.includes('422')) {
          console.error('Ошибка 422: Некорректные данные отправлены на сервер.')
        } else {
          console.error('Ошибка при отправке данных:', error)
        }
      })

    // Hide the survey after completion
    setIsSurveyVisible(false)
  }

  return (
    isSurveyVisible && (
      <div className="flex flex-row justify-center items-center">
        {/* Render AskCardPreview or AskCard based on currentStep */}
        {currentStep === 0 ? (
          <AskCardPreview onStart={handleNextStep} />
        ) : currentStep <= totalSteps ? (
          <AskCard
            question={surveySteps[currentStep - 1].question}
            points={surveySteps[currentStep - 1].points}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onFinish={currentStep === totalSteps ? handleFinish : undefined}
            selectedValue={responses[currentStep - 1] || 0}
            setSelectedValue={(value: number) =>
              setResponses((prev) => {
                const newResponses = [...prev]
                newResponses[currentStep - 1] = value
                return newResponses
              })
            }
          />
        ) : null}
      </div>
    )
  )
}
