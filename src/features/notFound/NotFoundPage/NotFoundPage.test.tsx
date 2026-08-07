import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  it('찾을 수 없는 페이지에서 홈 복귀 경로를 제공한다', async () => {
    // Given: 찾을 수 없는 페이지 안내가 표시될 때
    await renderWithRouter(NotFoundPage)

    // When: 사용자가 안내를 확인하면
    const heading = await screen.findByRole('heading', { name: '페이지를 찾을 수 없어.' })

    // Then: 문제 설명과 홈 복귀 링크가 제공된다
    expect(heading).toBeInTheDocument()
    expect(screen.getByText('주소를 다시 확인하거나 프로젝트 허브로 돌아가 줘.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /프로젝트 허브로 돌아가기/ })).toHaveAttribute('href', '/')
  })
})
