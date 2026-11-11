import { createFileRoute } from '@tanstack/react-router'

import { AboutPage } from '../../features/projects/AboutPage/AboutPage'

export const Route = createFileRoute('/projects/$slug')({
  component: AboutRoute,
})

function AboutRoute() {
  const { slug } = Route.useParams()
  return <AboutPage slug={slug} />
}
