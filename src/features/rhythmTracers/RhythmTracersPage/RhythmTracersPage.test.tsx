import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { RhythmTracersPage } from './RhythmTracersPage'

describe('RhythmTracersPage', () => {
  it('프로젝트 핵심 경험과 홈 이동 링크를 안내한다', async () => {
    // Given: RhythmTracers 소개 페이지가 열렸을 때
    await renderWithRouter(RhythmTracersPage)

    // When: 사용자가 프로젝트 내용을 확인하면
    const title = await screen.findByRole('heading', { name: 'Trace every beat.' })

    // Then: 핵심 기능과 홈 이동 경로가 제공된다
    expect(title).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'BMS Play' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Versus' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Feedback' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /프로젝트 허브로 돌아가기/ })).toHaveAttribute('href', '/')
  })
})
