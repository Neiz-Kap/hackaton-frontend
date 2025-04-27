'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AppRoutes } from '@/lib/types'
import { TCreateEmployee } from '@/lib/types'
import { faker } from '@faker-js/faker'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { OAuthSign } from './OAuthSign'

export function RegisterStep1({ onSubmit }: { onSubmit: (data: TCreateEmployee) => void }) {
  const form = useForm<TCreateEmployee>({
    defaultValues: {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      password: '123',
      phone: '+79821933132',
    },
  })

  const { handleSubmit } = form

  return (
    <>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold">Create New Account</h2>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} required />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} required />
                </FormControl>
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
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="w-full">
              Далее
            </Button>
          </div>
        </form>
      </Form>

      <OAuthSign />

      <div className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link to={AppRoutes.LOGIN} className="underline">
          Log in
        </Link>
      </div>
    </>
  )
}
