import { $request, $secureRequest } from '.'
import { Employee, TCreateEmployee } from '../types'

interface LoginParams {
  email: string
  password: string
}

interface AuthResult {
  user_data: Employee
  access_token: string
}

/** @class Employee API to interact with backend */
class EmployeeAPI {
  private prefix = '/employee'

  signUp = async (employee: TCreateEmployee) => {
    try {
      return await $request.post(`${this.prefix}/sign-up`, { json: employee }).json<AuthResult>()
    } catch (error) {
      console.error('Error when signing up employee: ', error)
      throw error
    }
  }

  login = async (params: LoginParams) => {
    try {
      return await $request.post(`${this.prefix}/login`, { json: params }).json<AuthResult>()
    } catch (error) {
      console.error('Error when logging in employee: ', error)
      throw error
    }
  }

  validateAccessToken = async () => {
    try {
      return await $secureRequest.post(`${this.prefix}/validate-token`).json<AuthResult>()
    } catch (error) {
      console.error('Error when validating access token: ', error)
      throw error
    }
  }

  update = async (id: number, update: Partial<Employee>) => {
    try {
      return await $secureRequest.patch(`${this.prefix}/${id}`, { json: update }).json<Employee>()
    } catch (error) {
      console.error('Error when updating employee: ', error)
      throw error
    }
  }

  delete = async (id: number) => {
    try {
      return await $secureRequest.delete(`${this.prefix}/${id}`)
    } catch (error) {
      console.error('Error when deleting employee: ', error)
      throw error
    }
  }
}

export const employeeAPI = new EmployeeAPI()
