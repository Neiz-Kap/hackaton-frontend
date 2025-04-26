import { ProtectedRoute } from '@/components/protected-route'
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

type PageRoutesType = {
  title: string
  items: PageRoutesItemType
}

type PageRoutesItemType = {
  title: string
  href: string
  icon?: string
  isComing?: boolean
  isNew?: boolean
  newTab?: boolean
  items?: PageRoutesItemType
  necessaryPermissions?: string[]
}[]

interface RouteMetadata {
  menuTitle: string
  menuIcon?: string
  menuGroup: string
  parentMenu?: string
  isNew?: boolean
  isComing?: boolean
  newTab?: boolean
  necessaryPermissions?: string[]
}

type AppRouteObject = RouteObject & {
  metadata?: RouteMetadata
  children?: AppRouteObject[]
}

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard/work_session" replace />,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'session',
            lazy: () => import('@/pages/auth/EmployeeSession'),
            metadata: {
              menuTitle: 'Organizations',
              menuIcon: 'ContactRound',
              menuGroup: 'Management',
              // necessaryPermissions: ['*'],
            },
          },
          // {
          //   path: 'roles',
          //   lazy: () => import('@/pages/dashboard/roles'),
          //   metadata: {
          //     menuTitle: 'Roles',
          //     menuIcon: 'SquareUser',
          //     menuGroup: 'Management',
          //     // necessaryPermissions: ['*'],
          //   },
          // },
          // {
          //   path: 'users',
          //   lazy: () => import('@/pages/dashboard/users'),
          //   metadata: {
          //     menuTitle: 'Users',
          //     menuIcon: 'Users',
          //     menuGroup: 'Management',
          //     necessaryPermissions: ['*'],
          //   },
          // },
          // areSettingsHidden && {
          //   path: 'settings',
          //   element: <Outlet />,
          //   metadata: {
          //     menuTitle: 'Settings',
          //     menuIcon: 'Settings',
          //     menuGroup: 'Settings',
          //   },
          //   children: [
          //     {
          //       path: 'profile',
          //       lazy: () => import('@/pages/dashboard/settings/profile'),
          //       index: true,
          //       metadata: {
          //         menuTitle: 'Profile',
          //         menuIcon: 'User',
          //         menuGroup: 'Settings',
          //         parentMenu: 'Settings',
          //       },
          //     },
          //     {
          //       path: 'account',
          //       lazy: () => import('@/pages/dashboard/settings/account'),
          //       index: true,
          //       metadata: {
          //         menuTitle: 'Account',
          //         menuIcon: 'User',
          //         menuGroup: 'Settings',
          //         parentMenu: 'Settings',
          //       },
          //     },
          //     {
          //       path: 'appearance',
          //       lazy: () => import('@/pages/dashboard/settings/appearance'),
          //       metadata: {
          //         menuTitle: 'Appearance',
          //         menuIcon: 'Palette',
          //         menuGroup: 'Settings',
          //         parentMenu: 'Settings',
          //       },
          //     },
          //     {
          //       path: 'notifications',
          //       lazy: () => import('@/pages/dashboard/settings/notifications'),
          //       metadata: {
          //         menuTitle: 'Notifications',
          //         menuIcon: 'Bell',
          //         menuGroup: 'Settings',
          //         parentMenu: 'Settings',
          //       },
          //     },
          //     {
          //       path: 'display',
          //       lazy: () => import('@/pages/dashboard/settings/display'),
          //       metadata: {
          //         menuTitle: 'Display',
          //         menuIcon: 'Monitor',
          //         menuGroup: 'Settings',
          //         parentMenu: 'Settings',
          //       },
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
]

function generateDashboardMenu(routes: AppRouteObject[]): PageRoutesType[] {
  const menuItems = new Map<string, PageRoutesItemType>()
  const nestedItems = new Map<string, PageRoutesItemType>()

  const processDashboardRoutes = (route: AppRouteObject, parentPath: string = '') => {
    if (!route.metadata?.menuTitle) {
      if (route.children) {
        route.children.forEach((child) => processDashboardRoutes(child, parentPath + '/' + (route.path || '')))
      }
      return
    }

    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/')
    const menuItem = {
      title: route.metadata.menuTitle,
      href: fullPath,
      icon: route.metadata.menuIcon,
      isNew: route.metadata.isNew,
      isComing: route.metadata.isComing,
      newTab: route.metadata.newTab,
      necessaryPermissions: route.metadata.necessaryPermissions,
    }

    if (route.metadata.parentMenu) {
      if (!nestedItems.has(route.metadata.parentMenu)) {
        nestedItems.set(route.metadata.parentMenu, [])
      }
      nestedItems.get(route.metadata.parentMenu)!.push(menuItem)
    } else {
      const group = route.metadata.menuGroup
      if (!menuItems.has(group)) {
        menuItems.set(group, [])
      }
      menuItems.get(group)!.push({
        ...menuItem,
        items: [], // Placeholder for nested items
      })
    }

    if (route.children) {
      route.children.forEach((child) => processDashboardRoutes(child, fullPath))
    }
  }

  routes[0].children?.[0].children?.forEach((route) => processDashboardRoutes(route, '/dashboard'))

  menuItems.forEach((items) => {
    items.forEach((item) => {
      const nestedMenuItems = nestedItems.get(item.title)
      if (nestedMenuItems) {
        item.items = nestedMenuItems
      }
    })
  })

  return Array.from(menuItems.entries()).map(([group, items]) => ({
    title: group,
    items,
  }))
}

export const dashboardMenu = generateDashboardMenu(dashboardRoutes)
