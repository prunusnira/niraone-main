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

  it('About과 Blog 메뉴만 표시하고 각각 맞는 경로로 연결한다', async () => {
    // Given: 헤더가 표시됐을 때
    await renderWithRouter(Header)

    // When: 사용자가 주요 메뉴를 확인하면
    const navigation = await screen.findByRole('navigation', { name: '주요 메뉴' })
    const aboutLink = within(navigation).getByRole('link', { name: 'About' })
    const blogLink = within(navigation).getByRole('link', { name: 'Blog' })

    // Then: About과 Blog만 남고 서비스 외부 링크는 직접 열 수 있다
    expect(within(navigation).getAllByRole('link')).toHaveLength(2)
    expect(aboutLink).toHaveAttribute('href', '/projects/about')
    expect(blogLink).toHaveAttribute('href', 'https://blog.nira.one')
    expect(blogLink).toHaveAttribute('target', '_blank')
    expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: 'Studio Nira' })).toBeInTheDocument()
  })
})
