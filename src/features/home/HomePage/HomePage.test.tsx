import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('서비스 카드를 간단한 Services 섹션에 직접 링크로 제공한다', async () => {
    // Given: 홈 페이지가 열렸을 때
    await renderWithRouter(HomePage)

    // When: 사용자가 프로젝트 영역을 확인하면
    const heading = await screen.findByRole('heading', { name: 'Services' })
    const projectsSection = heading.closest('section')

    // Then: Dev Portfolio 없이 서비스 카드와 GitHub 링크가 노출된다
    expect(projectsSection).not.toBeNull()
    expect(within(projectsSection!).getAllByRole('link')).toHaveLength(6)
    expect(screen.getByRole('link', { name: 'Skill Navigator 페이지로 이동' })).toHaveAttribute('href', 'https://sin.nira.one')
    expect(screen.getByRole('link', { name: 'Streaming Tools by Nira 페이지로 이동' })).toHaveAttribute('href', 'https://streaming.nira.one')
    expect(screen.getByText('GITADORA 시리즈 스킬 관리 도구 · Since 2016')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'About 페이지로 이동' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Rhythm Tracers 페이지로 이동' })).toHaveAttribute(
      'href',
      'https://github.com/prunusnira/rhythmtracers-public-release',
    )
  })
})
