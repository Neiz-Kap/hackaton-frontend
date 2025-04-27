import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TCreateOrganization } from '@/lib/types'
import { useEmployeeStore } from '@/stores/employee'
import { faker } from '@faker-js/faker'
import { useForm } from 'react-hook-form'

type Step3Props = {
  onSubmit: (data: TCreateOrganization) => void
}

export function Step3({ onSubmit }: Step3Props) {
  const { employee } = useEmployeeStore()

  const form = useForm<TCreateOrganization>({
    defaultValues: { email: faker.internet.email(), name: faker.person.fullName() },
  })

  const onSubmitForm = (data: TCreateOrganization) => {
    onSubmit({ ...data, user_id: employee!.id, id: faker.number.int() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="mt-8 space-y-6">
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
    </Form>
  )
}
