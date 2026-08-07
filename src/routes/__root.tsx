import { createRootRoute } from '@tanstack/react-router'

import { AppLayout } from '../common/AppLayout/AppLayout'
import { NotFoundPage } from '../features/notFound/NotFoundPage/NotFoundPage'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  return <AppLayout />
}
