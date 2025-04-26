'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { dashboardMenu } from '@/lib/router/dashboard.router'
import { ChevronRight, ChevronsUpDown } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

// TODO: useOrganizationStore
export default function Sidebar() {
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
  }, [])

  return (
    <SidebarContainer collapsible="icon">
      <SidebarHeader className="h-16 items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger disabled asChild>
                <SidebarMenuButton>
                  {/* <Logo className="me-2 group-data-[collapsible=icon]:me-0" /> */}
                  <div>
                    <div className="truncate font-semibold text-s group-data-[collapsible=icon]:hidden">
                      {computed.selectedOrganization?.name}
                    </div>
                    <div className="truncate text-xs">{computed.currentRole?.name}</div>
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
          {guardedDashboardMenu.map((route, key) => (
            <SidebarGroup key={key}>
              <SidebarGroupLabel>{route.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {route.items.map((item, key) => (
                    <SidebarMenuItem key={key}>
                      {item.items?.length ? (
                        <Collapsible className="group/collapsible">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              {item.icon && <Icon name={item.icon} className="size-4" />}
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem, key) => (
                                <SidebarMenuSubItem key={key}>
                                  <SidebarMenuSubButton isActive={pathname === subItem.href} asChild>
                                    <Link to={subItem.href} target={subItem.newTab ? '_blank' : ''}>
                                      {subItem.icon && <Icon name={subItem.icon} className="size-4" />}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.href}>
                          <Link to={item.href} target={item.newTab ? '_blank' : ''}>
                            {item.icon && <Icon name={item.icon} className="size-4" />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                      {item.isComing ? <SidebarMenuBadge className="opacity-50">Coming</SidebarMenuBadge> : null}
                      {item.isNew ? (
                        <SidebarMenuBadge className="text-green-500 dark:text-green-200">New</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
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
