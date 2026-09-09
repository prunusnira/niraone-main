import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../test/renderWithRouter'
import { Header } from './Header'

describe('Header', () => {
  it('모바일 메뉴를 열고 닫는다', async () => {
    // Given: 헤더가 표시된 상태에서
    const user = userEvent.setup()
    await renderWithRouter(Header)
    const menuButton = await screen.findByRole('button', { name: '메뉴 열기' })

    // When: 사용자가 메뉴 버튼을 누르면
    await user.click(menuButton)

    // Then: 메뉴가 열리고 다시 닫을 수 있다
    expect(screen.getByRole('button', { name: '메뉴 닫기' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: '모바일 메뉴' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '메뉴 닫기' }))
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('프로젝트 메뉴를 내부 페이지 경로로 제공한다', async () => {
    // Given: 헤더가 표시됐을 때
    await renderWithRouter(Header)

    // When: 사용자가 주요 메뉴를 확인하면
    const navigation = await screen.findByRole('navigation', { name: '주요 메뉴' })
    const skillNavigatorLink = within(navigation).getByRole('link', { name: 'Skill Navigator' })
    const streamingToolsLink = within(navigation).getByRole('link', { name: 'Streaming Tools' })

    // Then: 프로젝트 메뉴는 새 탭이 아닌 내부 경로로 노출된다
    expect(navigation).toContainElement(skillNavigatorLink)
    expect(skillNavigatorLink).toHaveAttribute('href', '/projects/skill-navigator')
    expect(skillNavigatorLink).not.toHaveAttribute('target')
    expect(streamingToolsLink).toHaveAttribute('href', '/projects/streaming-tools')
  })
})
