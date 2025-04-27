import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './lib/router'

export const Root: FC = () => {
  return <RouterProvider router={router} />
}
