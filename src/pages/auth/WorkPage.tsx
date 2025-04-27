import CallCard from '@/components/dashboard/rooms/CallCard'
import { useState } from 'react'
import CardSurvey from '../../components/dashboard/card-survey'
import { EmployeeSession } from '../../components/dashboard/EmployeeSession'

export function Component() {
  const [isSurveyVisible, setIsSurveyVisible] = useState(false) // State to track survey visibility
  const [isSessionStarted, setIsSessionStarted] = useState(false) // State to track survey visibility

  return (
    <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
      <EmployeeSession
        className={isSurveyVisible ? 'lg:col-span-2' : 'lg:col-span-3'}
        onSessionStarted={() => {
          setIsSessionStarted(true)
          setIsSurveyVisible(true)
        }}
        onSessionFinished={() => {
          setIsSessionStarted(false)
          setIsSurveyVisible(false)
        }}
        isSessionStarted={isSessionStarted}
      />
      {isSessionStarted && isSurveyVisible && <CardSurvey onSurveyComplete={() => setIsSurveyVisible(false)} />}
      {isSessionStarted && <CallCard />}
    </div>
  )
}
