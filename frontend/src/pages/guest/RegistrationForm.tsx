import BlackEmployee from '@/assets/negr.jpg'
import { employeeAPI } from '@/lib/api/employee.api'
import { organizationAPI } from '@/lib/api/organization.api'
import { AppRoutes } from '@/lib/router'
import { TCreateEmployee, TCreateOrganization } from '@/lib/types'
import { useAuthStore } from '@/stores/auth'
import { useEmployeeStore } from '@/stores/employee'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { OAuthSign } from './OAuthSign'
import { RegisterStep1 } from './RegisterStep1'
import { Step2 } from './RegisterStep2'
import { Step3 } from './RegistrationStep3'
import { Step4 } from './RegistrationStep4'

export function Component() {
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const { setAccessToken } = useAuthStore()
  const { setEmployee, employee } = useEmployeeStore()

  const onEmployeeSubmit = async (data: TCreateEmployee) => {
    setError(null)
    try {
      const employeeResponse = await employeeAPI.signUp(data)

      setAccessToken(employeeResponse.access_token)
      setEmployee(employeeResponse.user_data)

      setStep(2)
    } catch (e) {
      setError('Ошибка при регистрации сотрудника: ' + (e instanceof Error ? e.message : ''))
    }
  }

  const onSubmitStep2 = (data: { createOrg: boolean }) => {
    setError(null)

    if (data.createOrg) setStep(3)
    else {
      setStep(4)
    }
  }

  const onOrganizationSubmit = async (data: TCreateOrganization) => {
    setError(null)
    try {
      const orgResponse = await organizationAPI.create(data)

      if (employee) {
        const updatedEmployee = await employeeAPI.update(employee.id, { organization_id: orgResponse.id })
        setEmployee(updatedEmployee)
      }

      navigate(AppRoutes.DASHBOARD)
    } catch (e) {
      setError('Ошибка при создании организации: ' + (e instanceof Error ? e.message : ''))
    }
  }

  const onSubmitStep4 = async (id: number) => {
    setError(null)
    try {
      if (employee) {
        const updatedEmployee = await employeeAPI.update(employee.id, { organization_id: id })
        setEmployee(updatedEmployee)
      }

      navigate(AppRoutes.DASHBOARD)
    } catch (e) {
      setError('Ошибка при присоединении к организации: ' + (e instanceof Error ? e.message : ''))
    }
  }

  return (
    <div className="flex pb-8 lg:h-screen lg:pb-0">
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <img width={1000} height={1000} src={BlackEmployee} alt="employee" className="h-full w-full object-cover" />
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold">Create New Account</h2>
          </div>

          {/* Form */}
          <>
            {step === 1 && <RegisterStep1 onSubmit={onEmployeeSubmit} />}
            {step === 2 && <Step2 onSubmit={onSubmitStep2} />}
            {step === 3 && <Step3 onSubmit={onOrganizationSubmit} />}
            {step === 4 && employee && <Step4 onSubmit={onSubmitStep4} />}
            {error && <p className="error">{error}</p>}
          </>

          <OAuthSign />

          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to={AppRoutes.LOGIN} className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
