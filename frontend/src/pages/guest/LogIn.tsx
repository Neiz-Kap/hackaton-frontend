import BlackEmployee from '@/assets/negr.jpg'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { employeeAPI } from '@/lib/api/employee.api'
import { AppRoutes } from '@/lib/router'
import { useAuthStore } from '@/stores/auth'
import { useEmployeeStore } from '@/stores/employee'
import { GithubIcon } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { OAuthSign } from './OAuthSign'

type LoginInputs = {
  email: string
  password: string
}

export function Component() {
  const { setAccessToken } = useAuthStore()
  const { setEmployee } = useEmployeeStore()
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const form = useForm<LoginInputs>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setError(null)
    try {
      const response = await employeeAPI.login({
        email: data.email,
        password: data.password,
      })

      setAccessToken(response.access_token)
      setEmployee(response.user_data)

      navigate(AppRoutes.DASHBOARD)
    } catch (e) {
      setError('Ошибка при входе: ' + (e instanceof Error ? e.message : ''))
    }
  }

  return (
    <div className="flex pb-8 lg:h-screen lg:pb-0">
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        {/* <img
          width={1000}
          height={1000}
          src={`https://bundui-images.netlify.app/extra/image4.jpg`}
          alt="Sign up page"
          className="h-full w-full object-cover"
        /> */}
        <img width={1000} height={1000} src={BlackEmployee} alt="employee" className="h-full w-full object-cover" />
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-2 text-sm">Please sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                    {/* <FormDescription>Slug is generated based on the name</FormDescription> */}
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
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                    {/* <FormDescription>Slug is generated based on the name</FormDescription> */}
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </Form>

          <OAuthSign />
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to={AppRoutes.REGISTER} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
