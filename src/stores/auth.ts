import { AppRoutes } from '@/lib/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface AuthSlice {
  accessToken: string | null
  isLoading: boolean
  // error: Error | null
  isAuthenticated: boolean
  setAccessToken: (token: string) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthSlice>()(
  persist(
    immer((set) => ({
      // accessToken: null,
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwZXR5YUBNYWlsLnJ1IiwiZXhwIjoxNzQ1Njg3MTk4fQ.JreAjG0UDzDSanWrAd73F4LwappRGcEjhzl0tsKhi_s',
      isAuthenticated: false,
      isLoading: false,
      setAccessToken: (token: string) => {
        set((state) => {
          state.accessToken = token
        })
      },
      logout: async () => {
        set((state) => {
          state.accessToken = null
          state.isAuthenticated = false
        })
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
