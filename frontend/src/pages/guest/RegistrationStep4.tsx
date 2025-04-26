import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TCreateOrganization } from '@/lib/types'
import { useEmployeeStore } from '@/stores/employee'
import { Button } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { SelectOrganization } from './SelectOrganization'

type Step4Props = {
  onSubmit: (id: number) => void
}

export function Step4({ onSubmit }: Step4Props) {
  const form = useForm<{ id: number }>()

  const onSubmitForm = (data: { id: number }) => {
    onSubmit(data.id)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)}>
      <SelectOrganization control={form.control} />
      <Button type="submit">Присоединиться к организации</Button>
    </form>
  )
}
