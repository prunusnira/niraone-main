import { useEffect, useState } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/third-party/collection'

import { getNotionPage } from '../../../api/notion/getNotionPage'
import type { NotionPageRecordMap } from '../../../api/notion/getNotionPage'
import styles from './DevNotePage.module.css'

import 'react-notion-x/src/styles.css'

type DevNoteStatus = 'loading' | 'success' | 'error'

interface DevNotePageProps {
  notionPageId: string
}

export function DevNotePage({ notionPageId }: DevNotePageProps) {
  const [status, setStatus] = useState<DevNoteStatus>('loading')
  const [recordMap, setRecordMap] = useState<NotionPageRecordMap | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => setIsDark(event.matches)

    darkQuery.addEventListener('change', handleChange)
    return () => darkQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    let isStale = false

    getNotionPage(notionPageId)
      .then((data) => {
        if (isStale) return
        setRecordMap(data)
        setStatus('success')
      })
      .catch(() => {
        if (isStale) return
        setRecordMap(null)
        setStatus('error')
      })

    return () => {
      isStale = true
    }
  }, [notionPageId, retryCount])

  if (status === 'loading') {
    return <div className={styles.notionStatus} role="status">노트를 불러오는 중입니다</div>
  }

  if (status === 'error' || !recordMap) {
    return (
      <div className={styles.notionStatus} role="alert">
        <p>노트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
        <button
          type="button"
          className={styles.retryButton}
          onClick={() => {
            setStatus('loading')
            setRetryCount((count) => count + 1)
          }}
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className={styles.notionBody}>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={isDark}
        fullPage={false}
        components={{ Collection }}
      />
    </div>
  )
}
