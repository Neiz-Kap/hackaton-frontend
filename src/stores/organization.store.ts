import { Organization } from '@/lib/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface ProfileSlice {
  organization: Organization | null
  isLoading: boolean
  error: string | null
  setOrganization: (employee: Organization) => Promise<void>
}

export const useOrganizationStore = create<ProfileSlice>()(
  immer((set, get) => ({
    organization: { id: 1, name: 'orgtest', email: 'email@mail.ru', owner_id: 5 },
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
