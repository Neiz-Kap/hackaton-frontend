import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Spinner } from './components/ui/spinner'
import { Root } from './Root'

const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <Root />
      </Suspense>
      <Toaster />
    </QueryClientProvider>
  )
}
