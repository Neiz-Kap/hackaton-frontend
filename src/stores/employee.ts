import { Employee, Organization } from '@/lib/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface ProfileSlice {
  employee: Employee | null
  isLoading: boolean
  error: string | null
  setEmployee: (employee: Employee) => Promise<void>
}

export const useEmployeeStore = create<ProfileSlice>()(
  immer((set, get) => ({
    // employee: null,
    employee: {
      id: 5,
      username: 'petya123',
      name: 'petya',
      surname: 'petrov',
      email: 'petya@Mail.ru',
      phone: '+7989893893',
      is_active: true,
      is_ready: true,
      status: 'normal',
      role: 'director',
      organization_id: 1,
    },
    isLoading: false,
    error: null,
    setEmployee: async (employee) => {
      set((state) => {
        state.employee = employee
      })
    },
  })),
)
