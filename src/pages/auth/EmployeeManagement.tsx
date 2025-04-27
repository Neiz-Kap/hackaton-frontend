import { EmployeeTable } from '@/components/dashboard/EmployeeTable'
import { EcommerceSalesByLocationCard2 } from '@/components/dashboard/work-session/calls-by-location-2'

export function Component() {
  return (
    <section className="space-y-4">
      <div className="mt-4 gap-4 space-y-4 xl:grid xl:grid-cols-2 xl:space-y-0">
        <EmployeeTable />
        <EcommerceSalesByLocationCard2 />
      </div>
    </section>
  )
}
