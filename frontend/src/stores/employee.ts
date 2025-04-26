import { employeeAPI } from '@/lib/api/employee.api'
import { Employee, Organization } from '@/lib/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface ProfileSlice {
  employee?: Employee | null
  isLoading: boolean
  error?: string | null
  setEmployee: (employee: Employee) => Promise<void>
  // computed: {
  //   get selectedOrganization(): Organization | null
  // get currentRole(): Role | null
  // get currentPermissions(): string[]
  // }
}

export const useEmployeeStore = create<ProfileSlice>()(
  immer((set, get) => ({
    employee: null,
    isLoading: false,
    error: null,
    // computed: {
    // get selectedOrganization() {
    //   return get().account?.memberships[0]?.organization || null
    // },
    // get currentRole() {
    //   return get().account?.memberships[0]?.role || null
    // },
    // get currentPermissions() {
    //   return get().account?.memberships[0]?.role?.permissions.map((p) => p.name) || []
    // }
    // },
    setEmployee: async (employee) => {
      set((state) => {
        state.employee = true
      })
      // try {
      //   set((state) => {
      //     state.isLoading = true
      //     state.error = null
      //   })
      //   const data = await employeeAPI.validateAccessToken()
      //   console.log(data)
      //   set((state) => {
      //     state.employee = data.user_data
      //     // TODO: set state.accessToken as data.access_token
      //     state.isLoading = false
      //   })
      // } catch (error) {
      //   console.error(error)
      //   set((state) => {
      //     state.error = error
      //     state.isLoading = false
      //   })
      // }
    },
  })),
)
