import { AppRoutes } from '@/lib/router'
import { useAuthStore } from '@/stores/auth'
import { Navigate } from 'react-router-dom'
import { Spinner } from './ui/spinner'

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
