'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { employeeAPI } from '@/lib/api/employee.api'
import { AppRoutes } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useEmployeeStore } from '@/stores/employee'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  surname: z
    .string()
    .min(2, {
      message: 'Surname must be at least 2 characters.',
    })
    .max(30, {
      message: 'Surname must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  phone: z
    .string({
      required_error: 'Please select a phone number to display.',
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.',
    }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: [{ value: 'https://shadcn.com' }, { value: 'http://twitter.com/shadcn' }],
}

export function Component() {
  const { employee } = useEmployeeStore()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: employee || defaultValues,
    mode: 'onChange',
  })

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Обновляем данные сотрудника на сервере
      // const updatedEmployee = await employeeAPI.update(employee!.id, data)

      // // Обновляем данные сотрудника в сторе
      // updateEmployee(updatedEmployee)

      toast({
        title: 'Profile updated successfully!',
        description: 'Your profile has been updated.',
      })
    } catch (e) {
      toast({
        title: 'Error updating profile',
        description: 'There was an error updating your profile.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Личный кабинет</CardTitle>
        <CardDescription>Здесь вы можете управлять вашими данными</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym. You can only change this
                    once every 30 days.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can manage verified email addresses in your <Link to={AppRoutes.DASHBOARD}>email settings</Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your phone number will be used for notifications and security purposes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations to link to them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>URLs</FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: '' })}>
                Add URL
              </Button>
            </div>
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
