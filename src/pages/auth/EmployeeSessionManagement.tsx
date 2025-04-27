import { ChartProjectOverview } from '@/components/chart-project-overview'
import { EmployeeSessionTable } from '@/components/dashboard/EmployeeSessionTable'

export function Component() {
  return (
    <section className="space-y-4">
      <div className="mt-4 gap-4 space-y-4">
        <EmployeeSessionTable />
        <ChartProjectOverview />
      </div>
    </section>
  )
}
