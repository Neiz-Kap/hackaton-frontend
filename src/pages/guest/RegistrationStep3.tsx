import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TCreateOrganization } from '@/lib/types'
import { useEmployeeStore } from '@/stores/employee'
import { Button } from 'react-day-picker'
import { useForm } from 'react-hook-form'

type Step3Props = {
  onSubmit: (data: TCreateOrganization) => void
}

export function Step3({ onSubmit }: Step3Props) {
  const { employee } = useEmployeeStore()

  const form = useForm<TCreateOrganization>()

  const onSubmitForm = (data: TCreateOrganization) => {
    onSubmit({ ...data, owner_id: employee!.id })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название организации</FormLabel>
            <FormControl>
              <Input {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email организации</FormLabel>
            <FormControl>
              <Input type="email" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Создать организацию</Button>
    </form>
  )
}
