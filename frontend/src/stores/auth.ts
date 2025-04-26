import { AppRoutes } from '@/lib/router'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface AuthSlice {
  accessToken?: string
  // refreshToken?: string
  accessTokenTtl?: Date
  isLoading?: boolean
  error?: Error
  isAuthenticated: boolean
  setAccessToken: (token: string) => void
  // setRefreshToken: (token: string) => void
  // loginWithGoogleOneTap: (credential: string) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthSlice>()(
  persist(
    immer((set) => ({
      accessToken: null,
      // refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      setAccessToken: (token: string) =>
        set((state) => {
          state.accessToken = token
        }),
      // setRefreshToken: (token: string) =>
      //   set((state) => {
      //     state.refreshToken = token
      //   }),
      // loginWithGoogleOneTap: async (credential: string) => {
      //   set((state) => {
      //     state.isLoading = true
      //     state.error = null
      //   })

      //   try {
      //     const tokens = await authenticateGoogleWithCredential(credential)

      //     set((state) => {
      //       state.isLoading = false
      //       state.isAuthenticated = true
      //       state.error = null
      //       state.accessToken = tokens.accessToken
      //       state.refreshToken = tokens.refreshToken
      //       state.accessTokenTtl = tokens.expiresAt
      //     })
      //   } catch (error) {
      //     console.log(error)
      //     set((state) => {
      //       state.isLoading = false
      //       state.error = error instanceof Error ? error : new Error('Login failed')
      //       state.isAuthenticated = false
      //     })
      //     throw error
      //   }
      // },
      validateToken: async () => {
        try {
          set((state) => {
            state.isLoading = true
            state.error = null
          })
          const data = await employeeAPI.validateAccessToken()
          console.log(data)

          set((state) => {
            state.account = data.user_data
            // TODO: set state.accessToken as data.access_token
            state.isLoading = false
          })
        } catch (error) {
          console.error(error)
          set((state) => {
            state.error = error
            state.isLoading = false
          })
        }
      },
      logout: async () => {
        set((state) => {
          state.accessToken = null
          state.accessTokenTtl = null
          state.isAuthenticated = false
        })
        window.location = AppRoutes.LOGIN
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
