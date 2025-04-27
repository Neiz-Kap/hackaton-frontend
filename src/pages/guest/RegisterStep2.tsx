// Step2.tsx
import { Button } from '@/components/ui/button'
import { Form, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'

type Step2Inputs = {
  createOrg: boolean
}

type Step2Props = {
  onSubmit: (data: Step2Inputs) => void
}

export function Step2({ onSubmit }: Step2Props) {
  const form = useForm<Step2Inputs>({
    defaultValues: { createOrg: true },
  })

  const { handleSubmit } = form

  const onSubmitCreateOrg = () => {
    onSubmit({ createOrg: true })
  }

  const onSubmitJoinOrg = () => {
    onSubmit({ createOrg: false })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitCreateOrg)}>
        <FormLabel className="text-2xl mb-6 text-center block">Выберите действие</FormLabel>
        <div className="flex space-y-4 flex-col">
          <Button type="button" onClick={onSubmitCreateOrg}>
            Создать новую организацию
          </Button>
          <Button type="button" onClick={onSubmitJoinOrg}>
            Присоединиться к существующей
          </Button>
        </div>
      </form>
    </Form>
  )
}
