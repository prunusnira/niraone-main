import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../test/renderWithRouter'
import { AppLayout } from './AppLayout'

function TestPage() {
  return <h1>테스트 본문</h1>
}

describe('AppLayout', () => {
  it('공통 탐색 영역과 본문, 푸터를 제공한다', async () => {
    // Given: 공통 레이아웃 안에서 페이지가 렌더링될 때
    await renderWithRouter(TestPage, { layoutComponent: AppLayout })

    // When: 사용자가 페이지의 주요 영역을 확인하면
    const main = await screen.findByRole('main')

    // Then: 건너뛰기 링크, 본문, 푸터를 사용할 수 있다
    expect(screen.getByRole('link', { name: '본문으로 건너뛰기' })).toHaveAttribute('href', '#main-content')
    expect(main).toHaveTextContent('테스트 본문')
    expect(screen.getByText('© 2026 Studio Nira')).toBeInTheDocument()
  })
})
