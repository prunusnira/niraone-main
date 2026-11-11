import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { AboutPage } from './AboutPage'

describe('AboutPage', () => {
  it('이력서에서 경력, 기술, 개인 프로젝트, 학력을 요약해 표시한다', async () => {
    // Given: About 경로로 접근했을 때
    await renderWithRouter(() => <AboutPage slug="about" />)

    // When: 사용자가 About 내용을 확인하면
    const heading = await screen.findByRole('heading', { name: 'About' })

    // Then: 이력서 요약과 원본 About 사이트 링크가 표시된다
    expect(heading).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '경력' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '기술 스택' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '개인 프로젝트' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '학력' })).toBeInTheDocument()
    expect(screen.getByText(/월 AWS 비용을 최대 40%/)).toBeInTheDocument()
    expect(screen.getByText(/누적 가입자는 5,000명/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /기존 About 사이트 열기/ })).toHaveAttribute(
      'href',
      'https://about.nira.one',
    )
  })

  it('About이 아닌 서비스 slug는 404 안내를 보여준다', async () => {
    // Given: 일반 서비스 slug로 내부 About 페이지에 접근했을 때
    await renderWithRouter(() => <AboutPage slug="skill-navigator" />)

    // When: 사용자가 내용을 확인하면
    const heading = await screen.findByRole('heading', { name: '페이지를 찾을 수 없습니다' })

    // Then: 존재하지 않는 경로 안내가 표시된다
    expect(heading).toBeInTheDocument()
  })
})
