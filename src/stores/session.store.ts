import { Organization } from '@/lib/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface ProfileSlice {
  organization: Organization | null
  isLoading: boolean
  error: string | null
  setOrganization: (employee: Organization) => Promise<void>
}

export const useSessionStore = create<ProfileSlice>()(
  immer((set, get) => ({
    organization: { id: 1, name: 'ODS Хантатон', email: 'email@mail.ru', user_id: 5 },
    // organization: null,
    isLoading: false,
    error: null,
    setOrganization: async (employee) => {
      set((state) => {
        state.organization = employee
      })
    },
  })),
)
