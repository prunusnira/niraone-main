import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { SiteLinkCard } from './SiteLinkCard'

describe('SiteLinkCard', () => {
  it('일반 서비스 카드는 해당 서비스 URL로 직접 이동한다', async () => {
    // Given: 외부 서비스 정보가 주어졌을 때
    await renderWithRouter(() => (
      <SiteLinkCard
        slug="skill-navigator"
        url="https://sin.nira.one"
        title="Skill Navigator"
        description="배움의 방향을 찾는 서비스"
        domain="sin.nira.one"
        monogram="SN"
        accent="cyan"
      />
    ))

    // When: 사용자가 서비스 카드를 확인하면
    const link = await screen.findByRole('link', { name: 'Skill Navigator 페이지로 이동' })

    // Then: 서비스 정보와 외부 서비스 URL을 확인할 수 있다
    expect(screen.getByRole('heading', { name: 'Skill Navigator' })).toBeInTheDocument()
    expect(screen.getByText('배움의 방향을 찾는 서비스')).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://sin.nira.one')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('About 카드는 내부 About 페이지로 이동한다', async () => {
    // Given: About 서비스 카드가 렌더링될 때
    await renderWithRouter(() => (
      <SiteLinkCard
        slug="about"
        url=""
        title="About"
        description="Nira에 대한 소개 페이지"
        monogram="DP"
        accent="amber"
      />
    ))

    // When: 사용자가 About 카드를 확인하면
    const link = await screen.findByRole('link', { name: 'About 페이지로 이동' })

    // Then: 향후 통합을 위해 내부 About 페이지 경로가 유지된다
    expect(link).toHaveAttribute('href', '/projects/about')
    expect(link).not.toHaveAttribute('target')
  })
})
