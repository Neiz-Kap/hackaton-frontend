import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <SelectOrganization control={form.control} />
        <Button type="submit">Присоединиться к организации</Button>
      </form>
    </Form>
  )
}
