import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout'
import { WorkPage } from '@/components/dashboard/work-page'
import { Navigate, RouteObject } from 'react-router-dom'
import { AppRoutes } from '../types'

interface RouteMetadata {
  menuTitle: string
  menuIcon?: string
  menuGroup: string
}

type AppRouteObject = RouteObject & {
  metadata?: RouteMetadata
  children?: AppRouteObject[]
}

// export const dashboardRoutes: RouteObject[] = [
//   {
//     path: '/',
//     Component: DashboardLayout,
// children: [
//   // {
//   //   index: true,
//   //   element: <Navigate to={AppRoutes.DASHBOARD_SESSION} replace />,
//   // },
//   {
//     path: 'dashboard',
//     children: [
//       {
//         path: 'session',
//         lazy: () => import('@/pages/auth/EmployeeSession'),
//       },
//       {
//         path: 'test-playground',
//         lazy: () => import('@/pages/auth/TestPlayground'),
//       },
//     ],
//   },
// ],
//   },
// ]

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true, // Этот маршрут будет срабатывать при переходе на /dashboard
        element: <Navigate to="/dashboard/session" replace />,
      },
      {
        path: 'session',
        lazy: () => import('@/pages/auth/WorkPage'),
        metadata: {
          menuTitle: 'Organizations',
          menuIcon: 'ContactRound',
          menuGroup: 'Management',
        },
      },
      {
        path: 'test-playground',
        lazy: () => import('@/pages/auth/TestPlayground'),
      },
      {
        path: 'employees',
        lazy: () => import('@/pages/auth/EmployeeManagement'),
      },
      {
        path: 'employees-session',
        lazy: () => import('@/pages/auth/EmployeeSessionManagement'),
      },
      {
        path: 'employees-stress',
        lazy: () => import('@/pages/auth/EmployeeStress'),
      },
    ],
  },
]

type SidebarConfig = {
  title: string
  items: { title: string; href: string; icon: string; isDirector?: boolean; isPublic: boolean }[]
}

export const dashboardMenu: SidebarConfig[] = [
  {
    title: 'Управление',
    items: [
      {
        title: 'Звонок',
        href: AppRoutes.DASHBOARD_SESSION,
        icon: 'Headset',
        isPublic: true,
      },
      {
        title: 'Тестовая площадка',
        href: AppRoutes.DASHBOARD_PLAYGROUND,
        icon: 'FileAudio',
        isPublic: true,
      },
      {
        title: 'Сотрудники',
        href: AppRoutes.DASHBOARD_EMPLOYEE,
        icon: 'Users',
        isPublic: false,
        isDirector: true,
      },
      {
        title: 'Рейтинг клиентов',
        href: AppRoutes.DASHBOARD_EMPLOYEE,
        icon: 'Users',
        isPublic: false,
        isDirector: true,
      },
      {
        title: 'Сессии сотрудников',
        href: AppRoutes.DASHBOARD_EMPLOYEE_SESSION,
        icon: 'ScrollText',
        isPublic: false,
        isDirector: true,
      },
      {
        title: 'Графики стресса',
        href: AppRoutes.DASHBOARD_EMPLOYEE_STRESS,
        icon: 'ChartColumnIncreasing',
        isPublic: false,
        isDirector: true,
      },
    ],
  },
]
