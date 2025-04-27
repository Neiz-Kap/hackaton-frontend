import orgLogo from '@/assets/logo.svg'
import { AppRoutes } from '@/lib/types'
import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link to={AppRoutes.DASHBOARD} className={className}>
      <img src={orgLogo} className="hidden w-6 dark:block" alt="shadcn ui kit light logo" />
      <img src={orgLogo} className="block w-6 dark:hidden" alt="shadcn ui kit logo" />
    </Link>
  )
}
