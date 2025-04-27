import { EcommerceSalesByLocationCard } from '@/components/dashboard/work-session/calls-by-location'
import CardSurvey from '../../components/dashboard/card-survey'
import { WorkPage } from '../../components/dashboard/work-page'

export function Component() {
  return (
    <>
      <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
        <div className="lg:col-span-2">
          <WorkPage />
        </div>
        <CardSurvey />
        <EcommerceSalesByLocationCard />
      </div>
    </>
  )
}
