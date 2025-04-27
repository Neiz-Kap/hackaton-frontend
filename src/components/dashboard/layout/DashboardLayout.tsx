import { ThemeProvider } from '@/components/provider/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import { useEmployeeStore } from '@/stores/employee'
import { Outlet, useNavigate } from 'react-router-dom'
import MainLayout from './header/MainLayout'

export function DashboardLayout() {
  const { employee, isLoading, error } = useEmployeeStore()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!account && !isLoading && !error) {
  //     fetchProfile()
  //   }
  // }, [account, error, fetchProfile, isLoading])

  // useEffect(() => {
  //   if (account && !account?.onboardingSteps?.includes('PROFILE_SETUP')) {
  //     navigate('/dashboard/onboarding/details')
  //     return
  //   }

  //   if (account && !account?.onboardingSteps?.includes('PAYMENT_SETUP')) {
  //     navigate('/dashboard/onboarding/payment')
  //     return
  //   }
  // }, [account, navigate])

  // const onboarded = useMemo(() => {
  //   return (
  //     !!account?.onboardingSteps?.includes('PROFILE_SETUP') && !!account?.onboardingSteps?.includes('PAYMENT_SETUP')
  //   )
  // }, [account])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {!isLoading ? (
        <SidebarProvider defaultOpen={true}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </SidebarProvider>
      ) : (
        <Spinner />
      )}
    </ThemeProvider>
  )
}
