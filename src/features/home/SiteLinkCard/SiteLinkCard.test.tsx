import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { SiteLinkCard } from './SiteLinkCard'

describe('SiteLinkCard', () => {
  it('프로젝트 정보와 내부 임베드 페이지 경로를 제공한다', async () => {
    // Given: 외부 서비스 정보가 주어졌을 때
    await renderWithRouter(() => (
      <SiteLinkCard
        slug="skill-navigator"
        index="01"
        title="Skill Navigator"
        description="배움의 방향을 찾는 서비스"
        domain="sin.nira.one"
        monogram="SN"
        accent="cyan"
      />
    ))

    // When: 사용자가 서비스 카드를 확인하면
    const link = await screen.findByRole('link', { name: 'Skill Navigator 페이지로 이동' })

    // Then: 서비스 정보와 새 탭이 아닌 내부 경로를 확인할 수 있다
    expect(screen.getByRole('heading', { name: 'Skill Navigator' })).toBeInTheDocument()
    expect(screen.getByText('배움의 방향을 찾는 서비스')).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/projects/skill-navigator')
    expect(link).not.toHaveAttribute('target')
  })
})
