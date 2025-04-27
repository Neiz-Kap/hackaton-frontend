import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import React from 'react'

const spinnerVariants = cva('items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
    fullScreen: {
      true: 'min-h-dvh',
      false: '',
    },
    fullHeight: {
      true: 'h-full',
      false: '',
    },
  },
  defaultVariants: {
    show: true,
    fullScreen: false,
    fullHeight: true,
  },
})

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

interface SpinnerContentProps extends VariantProps<typeof spinnerVariants>, VariantProps<typeof loaderVariants> {
  className?: string
  children?: React.ReactNode
}

export function Spinner({ size, show, children, className, fullScreen, fullHeight }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show, fullScreen, fullHeight })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      <p className='pl-3'> {children}</p>
    </span>
  )
}
