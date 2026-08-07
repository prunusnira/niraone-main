import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '../features/home/HomePage/HomePage'

export const Route = createFileRoute('/')({
  component: HomePage,
})
