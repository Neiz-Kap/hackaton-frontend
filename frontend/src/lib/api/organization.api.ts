import { $request, $secureRequest } from '.'
import { Employee, Organization, TCreateEmployee, TCreateOrganization } from '../types'

interface LoginParams {
  email: string
  password: string
}

interface AuthResult {
  user_data: Employee
  access_token: string
}

/** @class Employee API to interact with backend */
class OrganizationAPI {
  private prefix = '/organization'

  create = async (organizationCreate: TCreateOrganization) => {
    return await $secureRequest.post<Organization>(this.prefix, { json: organizationCreate }).json()
  }

  getOne = async (id: number) => {
    try {
      return await $request.get<Organization>(this.prefix + `/${id}`).json()
    } catch (error) {
      console.error('Error wh3en retrieving organization by id: ', error)
      throw error
    }
  }

  getAll = async () => {
    try {
      return await $request.get<Organization[]>(this.prefix).json()
    } catch (error) {
      console.error('Error when retrieving organizations: ', error)
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

export const organizationAPI = new OrganizationAPI()
