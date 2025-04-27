import CardSurvey from '../../components/dashboard/card-survey'
import { WorkPage } from '../../components/dashboard/work-page'

export function Component() {
  return (
    <>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <WorkPage />
        </div>
        <CardSurvey />
      </div>
    </>
  )
}
