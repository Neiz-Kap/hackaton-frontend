import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMeta({
  title,
  description,
  canonical,
}: {
  title: string
  description: string
  canonical: string
}) {
  return {
    title: `${title} - Shadcn UI Kit`,
    description: description,
    metadataBase: new URL(`${process.env.BASE_URL}`),
    alternates: {
      canonical: `/dashboard${canonical}`,
    },
    openGraph: {
      images: [`${process.env.ASSETS_URL}/seo.jpg`],
    },
  }
}
