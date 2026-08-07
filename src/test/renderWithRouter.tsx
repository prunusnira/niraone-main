import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { render } from '@testing-library/react'
import type { RouteComponent } from '@tanstack/react-router'

interface RenderWithRouterOptions {
  initialEntry?: string
  layoutComponent?: RouteComponent
}

function TestRoot() {
  return <Outlet />
}

export async function renderWithRouter(
  routeComponent: RouteComponent,
  options: RenderWithRouterOptions = {},
) {
  const rootRoute = createRootRoute({
    component: options.layoutComponent ?? TestRoot,
  })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: routeComponent,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({ initialEntries: [options.initialEntry ?? '/'] }),
  })

  await router.load()

  return {
    ...render(<RouterProvider router={router} />),
    router,
  }
}
