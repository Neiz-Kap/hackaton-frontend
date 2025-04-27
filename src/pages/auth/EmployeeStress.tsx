import AudioChart from '@/components/dashboard/employee/audio-results'
import TestChart from '@/components/dashboard/employee/test-results'
import VideoChart from '@/components/dashboard/employee/video-results'
import { useEmployeeStore } from '@/stores/employee'

export function Component() {
  const { employee } = useEmployeeStore()

  const employeeId = employee!.id

  return (
    <section className="space-y-4">
      <TestChart employeeId={employeeId} />

      <div className="mt-4 gap-4 space-y-4 xl:grid xl:grid-cols-2 xl:space-y-0">
        <AudioChart employeeId={employeeId} />

        <VideoChart employeeId={employeeId} />
      </div>
    </section>
  )
}
