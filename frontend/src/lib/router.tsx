import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { NotFound } from '../pages/_404'
import { dashboardRoutes } from './router/dashboard.router'

export enum AppRoutes {
  REGISTER = '/register',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  NOT_FOUND = 'not_found',
}

const publicRoutes: RouteObject[] = [
  { path: '/', element: <Navigate to={AppRoutes.REGISTER} /> },
  { path: AppRoutes.REGISTER, lazy: () => import('@/pages/guest/RegistrationForm') },
  { path: AppRoutes.LOGIN, lazy: () => import('@/pages/guest/LogIn') },
]

const authRoutes: RouteObject[] = [...dashboardRoutes]

const router = createBrowserRouter([
  ...authRoutes,
  ...publicRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
