import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '../../../test/renderWithRouter'
import { DevNotePage } from './DevNotePage'
import type { NotionPageRecordMap } from '../../../api/notion/getNotionPage'

const { mockGetNotionPage, mockNotionRenderer } = vi.hoisted(() => ({
  mockGetNotionPage: vi.fn(),
  mockNotionRenderer: vi.fn(),
}))

vi.mock('../../../api/notion/getNotionPage', () => ({
  getNotionPage: mockGetNotionPage,
}))

vi.mock('react-notion-x', () => ({
  NotionRenderer: mockNotionRenderer,
}))

function createRecordMap(blockId: string): NotionPageRecordMap {
  return {
    block: {
      [blockId]: {
        role: 'reader',
        value: {
          id: blockId,
          type: 'page',
          parent_id: 'parent-page',
          parent_table: 'block',
          version: 1,
          created_time: 0,
          last_edited_time: 0,
          alive: true,
          created_by_table: 'notion_user',
          created_by_id: 'user-1',
          last_edited_by_table: 'notion_user',
          last_edited_by_id: 'user-1',
          properties: { title: [['테스트 노트']] },
          format: {},
          permissions: [{ role: 'reader', type: 'public' }],
          content: [],
        },
      },
    },
    collection: {},
    collection_view: {},
    notion_user: {},
    collection_query: {},
    signed_urls: {},
  }
}

describe('DevNotePage', () => {
  beforeEach(() => {
    mockNotionRenderer.mockImplementation(
      ({ recordMap }: { recordMap: NotionPageRecordMap }) => (
        <div>{`노트 본문 ${Object.keys(recordMap.block).length} 블록`}</div>
      ),
    )
  })

  it('노트를 불러오는 동안 로딩 상태를 보여준다', async () => {
    // Given: 노트 조회가 아직 끝나지 않은 상황
    mockGetNotionPage.mockReturnValue(new Promise(() => {}))

    // When: Dev Note 페이지가 렌더링되면
    await renderWithRouter(() => <DevNotePage notionPageId="note-page" />)

    // Then: 로딩 안내가 표시된다
    expect(await screen.findByRole('status')).toHaveTextContent('노트를 불러오는 중입니다')
  })

  it('노트 데이터를 불러와 본문을 표시한다', async () => {
    // Given: 노트 조회가 성공하는 상황
    mockGetNotionPage.mockResolvedValue(createRecordMap('note-page'))

    // When: Dev Note 페이지가 렌더링되면
    await renderWithRouter(() => <DevNotePage notionPageId="note-page" />)

    // Then: 조회한 기록으로 본문이 표시된다
    expect(mockGetNotionPage).toHaveBeenCalledWith('note-page')
    expect(await screen.findByText('노트 본문 1 블록')).toBeInTheDocument()
  })

  it('노트 조회가 실패하면 다시 시도할 수 있다', async () => {
    // Given: 첫 조회는 실패하고 재시도는 성공하는 상황
    const user = userEvent.setup()
    mockGetNotionPage.mockRejectedValueOnce(new Error('network down'))
    mockGetNotionPage.mockResolvedValueOnce(createRecordMap('retry-page'))

    await renderWithRouter(() => <DevNotePage notionPageId="note-page" />)

    // When: 오류 안내를 확인하고 다시 시도하면
    expect(await screen.findByRole('alert')).toHaveTextContent('노트를 불러오지 못했습니다')
    await user.click(screen.getByRole('button', { name: '다시 시도' }))

    // Then: 조회를 반복해 본문을 표시한다
    expect(await screen.findByText('노트 본문 1 블록')).toBeInTheDocument()
    expect(mockGetNotionPage).toHaveBeenCalledTimes(2)
  })
})
