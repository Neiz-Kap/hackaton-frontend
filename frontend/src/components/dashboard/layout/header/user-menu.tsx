import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/stores/auth'
import { useEmployeeStore } from '@/stores/employee'
import { BadgeCheck, Bell, CreditCard, LogOut } from 'lucide-react'
import { useMemo } from 'react'

export default function UserMenu() {
  const { employee } = useEmployeeStore()

  if (!employee) return <Spinner />

  const { name, email } = employee

  const abbreviatedName = useMemo(() => {
    if (name.split(' ').length > 1) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
    } else {
      return name[0]
    }
  }, [name])

  const { logout } = useAuthStore()

  const onLogoutClick = async () => {
    await logout()
  }

  return (
    <div className="ms-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={`/images/avatars/1.png`} alt="shadcn ui kit" />
            <AvatarFallback className="rounded-lg">{abbreviatedName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={`/images/avatars/1.png`} alt="shadcn ui kit" />
                <AvatarFallback className="rounded-lg">{abbreviatedName}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs text-muted-foreground">{email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <BadgeCheck className="me-2 size-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <CreditCard className="me-2 size-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Bell className="me-2 size-4" />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogoutClick}>
            <LogOut className="me-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
