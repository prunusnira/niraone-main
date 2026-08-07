import { Link } from '@tanstack/react-router'

import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.notFound}>
      <p className={styles.eyebrow}>404 / Lost signal</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소를 다시 확인해주세요</p>
      <Link className={styles.textLink} to="/">
        프로젝트 허브로 돌아가기 <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
