// components/dashboard/layout/Sidebar.tsx
'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Icon from '@/components/ui/icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { dashboardMenu } from '@/lib/router/dashboard.router'
import { useEmployeeStore } from '@/stores/employee'
import { useOrganizationStore } from '@/stores/organization.store'
import { ChevronsUpDown } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const { organization } = useOrganizationStore()
  const { employee } = useEmployeeStore()

  const { pathname } = useLocation()

  const guardedDashboardMenu = useMemo(() => {
    const sections = []
    for (const section of dashboardMenu) {
      const sectionItems = []
      for (const item of section.items) {
        sectionItems.push(item)
      }

      if (sectionItems.length) {
        sections.push({ ...section, items: sectionItems })
      }
    }

    return sections
  }, [dashboardMenu])

  return (
    <SidebarContainer collapsible="icon">
      <SidebarHeader className="h-16 items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger disabled asChild>
                <SidebarMenuButton>
                  <div>
                    <div className="truncate font-semibold text-s group-data-[collapsible=icon]:me-0">
                      {organization?.name}
                    </div>
                  </div>
                  <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <ScrollArea>
          {dashboardMenu.map((route, key) => (
            <SidebarGroup key={key}>
              <SidebarGroupLabel>{route.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {route.items.map((item, key) => {
                    return (
                      (item.isPublic || (!item.isPublic && item.isDirector && employee?.role === 'director')) && (
                        <SidebarMenuItem key={key}>
                          <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.href}>
                            <Link to={item.href}>
                              {item.icon && <Icon name={item.icon} className="size-4" />}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </SidebarContainer>
  )
}
