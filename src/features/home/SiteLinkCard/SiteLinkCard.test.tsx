import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SiteLinkCard } from './SiteLinkCard'

describe('SiteLinkCard', () => {
  it('서비스 설명과 안전한 외부 링크를 제공한다', () => {
    // Given: 외부 서비스 정보가 주어졌을 때
    render(
      <SiteLinkCard
        index="01"
        title="Skill Navigator"
        description="배움의 방향을 찾는 서비스"
        href="https://sin.nira.one"
        domain="sin.nira.one"
        monogram="SN"
        accent="cyan"
      />,
    )

    // When: 사용자가 서비스 카드를 확인하면
    const link = screen.getByRole('link', { name: 'Skill Navigator 새 탭에서 열기' })

    // Then: 서비스 정보와 새 탭 속성을 확인할 수 있다
    expect(screen.getByRole('heading', { name: 'Skill Navigator' })).toBeInTheDocument()
    expect(screen.getByText('배움의 방향을 찾는 서비스')).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://sin.nira.one')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
