import { createFileRoute } from '@tanstack/react-router'

import { RhythmTracersPage } from '../features/rhythmTracers/RhythmTracersPage/RhythmTracersPage'

export const Route = createFileRoute('/rhythmtracers')({
  component: RhythmTracersPage,
})
