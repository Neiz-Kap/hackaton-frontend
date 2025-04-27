import { useAuthStore } from '@/stores/auth'
import { Navigate } from 'react-router-dom'
import { Spinner } from './ui/spinner'
import { AppRoutes } from '@/lib/types'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    // return <LoadingOverlay />
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.REGISTER} />
  }

  return children
}
