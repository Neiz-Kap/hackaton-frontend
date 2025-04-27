export enum AppRoutes {
  REGISTER = '/register',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  DASHBOARD_PLAYGROUND = '/dashboard/test-playground',
  DASHBOARD_SESSION = '/dashboard/session',
  DASHBOARD_EMPLOYEE_SESSION = '/dashboard/employees-session',
  DASHBOARD_CABINET = '/dashboard/cabinet',
  DASHBOARD_EMPLOYEE = '/dashboard/employees',
  DASHBOARD_EMPLOYEE_STRESS = '/dashboard/employees-stress',
  NOT_FOUND = 'not_found',
}

export type Employee = {
  id: number
  username: string
  name: string
  surname: string
  email: string
  phone: string
  is_active: boolean
  is_ready: boolean
  status: string
  role: string
  organization_id: number
}

export type TCreateEmployee = {
  name: string
  surname: string
  email: string
  phone: string
  password: string
  organization_id: number
}

export type Organization = {
  id: number
  name: string
  email: string
  user_id: number
}

export type TCreateOrganization = {
  id: number
  user_id: number
  name: string
  email: string
}
