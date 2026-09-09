import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { ProjectEmbedPage } from './ProjectEmbedPage'

const { mockGetNotionPage } = vi.hoisted(() => ({
  mockGetNotionPage: vi.fn(),
}))

vi.mock('../../../api/notion/getNotionPage', () => ({
  getNotionPage: mockGetNotionPage,
}))

describe('ProjectEmbedPage', () => {
  it('슬러그에 해당하는 프로젝트를 iframe으로 표시한다', async () => {
    // Given: 등록된 프로젝트 슬러그로 페이지에 접근했을 때
    await renderWithRouter(() => <ProjectEmbedPage slug="skill-navigator" />)

    // When: 사용자가 프로젝트 화면을 확인하면
    const frame = await screen.findByTitle('Skill Navigator 화면')

    // Then: 프로젝트 정보와 외부 서비스 화면, 새 탭 열기 링크를 제공한다
    expect(screen.getByRole('heading', { name: 'Skill Navigator' })).toBeInTheDocument()
    expect(frame).toHaveAttribute('src', 'https://sin.nira.one')
    const openLink = screen.getByRole('link', { name: /새 탭에서 열기/ })
    expect(openLink).toHaveAttribute('href', 'https://sin.nira.one')
    expect(openLink).toHaveAttribute('target', '_blank')
    expect(openLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('존재하지 않는 슬러그는 404 안내를 보여준다', async () => {
    // Given: 등록되지 않은 슬러그로 페이지에 접근했을 때
    await renderWithRouter(() => <ProjectEmbedPage slug="unknown-project" />)

    // When: 사용자가 페이지 내용을 확인하면
    const heading = await screen.findByRole('heading', { name: '페이지를 찾을 수 없습니다' })

    // Then: 404 안내와 홈 복귀 경로를 제공한다
    expect(heading).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /프로젝트 허브로 돌아가기/ })).toHaveAttribute('href', '/')
  })

  it('노트 프로젝트는 iframe 대신 노트 뷰어를 표시한다', async () => {
    // Given: Notion 기반 프로젝트(dev-note)로 접근했을 때
    mockGetNotionPage.mockReturnValue(new Promise(() => {}))
    await renderWithRouter(() => <ProjectEmbedPage slug="dev-note" />)

    // When: 사용자가 페이지를 확인하면
    const status = await screen.findByRole('status')

    // Then: iframe 없이 노트 뷰어의 로딩 상태가 노출된다
    expect(status).toHaveTextContent('노트를 불러오는 중입니다')
    expect(screen.queryByTitle("Nira's Dev Note 화면")).not.toBeInTheDocument()
  })
})
