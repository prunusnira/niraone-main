import { NotionAPI } from 'notion-client'
import type { ExtendedRecordMap } from 'notion-types'

// Notion 비공식 API를 사용하므로 응답 형식이 바뀌거나 요청이 거부될 수 있다.
// 브라우저에서 app.notion.com을 직접 호출하면 Origin 헤더 때문에 400으로 거부되므로
// same-origin 경로(/notion-api)를 경유한다. 개발은 Vite server.proxy,
// 운영 배포에서는 동일 경로의 역프록시가 필요하다.
const notionClient = new NotionAPI({
  apiBaseUrl: '/notion-api/api/v3',
})

export type NotionPageRecordMap = ExtendedRecordMap

export function getNotionPage(pageId: string): Promise<NotionPageRecordMap> {
  return notionClient.getPage(pageId)
}
