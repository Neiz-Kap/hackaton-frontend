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
  owner_id: number
}

export type TCreateOrganization = {
  owner_id: number
  name: string
  email: string
}
