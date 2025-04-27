'use client'

import Header from '@/components/dashboard/layout/header'
import Sidebar from '@/components/dashboard/layout/Sidebar'
import { cn } from '@/lib/utils'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <Header />
          <main className={cn('p-4 lg:container lg:pt-10 mx-auto')}>{children}</main>
        </div>
      </div>
    </>
  )
}
