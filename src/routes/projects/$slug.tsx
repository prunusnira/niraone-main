import { createFileRoute } from '@tanstack/react-router'

import { ProjectEmbedPage } from '../../features/projects/ProjectEmbedPage/ProjectEmbedPage'

export const Route = createFileRoute('/projects/$slug')({
  component: ProjectEmbedRoute,
})

function ProjectEmbedRoute() {
  const { slug } = Route.useParams()
  return <ProjectEmbedPage slug={slug} />
}
