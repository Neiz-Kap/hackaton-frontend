import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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

  const { register, handleSubmit, watch } = form

  const createOrgSelected = watch('createOrg')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="createOrg"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Выберите действие</FormLabel>
            <FormControl>
              <div>
                <label>
                  <input
                    type="radio"
                    value="true"
                    {...register('createOrg', { required: true })}
                    checked={createOrgSelected}
                  />
                  Создать новую организацию
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    {...register('createOrg', { required: true })}
                    checked={!createOrgSelected}
                  />
                  Присоединиться к существующей
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Далее</Button>
    </form>
  )
}
