import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('프로젝트 링크와 RhythmTracers 내부 경로를 제공한다', async () => {
    // Given: 홈 페이지가 열렸을 때
    await renderWithRouter(HomePage)

    // When: 사용자가 프로젝트 영역을 확인하면
    const heading = await screen.findByRole('heading', { name: 'Explore the system.' })
    const projectsSection = heading.closest('section')

    // Then: 여섯 프로젝트 카드와 내부 소개 페이지 링크가 노출된다
    expect(projectsSection).not.toBeNull()
    expect(within(projectsSection!).getAllByRole('link')).toHaveLength(7)
    expect(screen.getByRole('link', { name: 'Skill Navigator 페이지로 이동' })).toHaveAttribute('href', '/projects/skill-navigator')
    expect(screen.getByRole('link', { name: 'Streaming Tools by Nira 페이지로 이동' })).toHaveAttribute('href', '/projects/streaming-tools')
    expect(screen.getByRole('link', { name: /프로젝트 이야기 보기/ })).toHaveAttribute('href', '/rhythmtracers')
  })
})
