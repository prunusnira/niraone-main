import { Outlet } from '@tanstack/react-router'

import { Header } from '../Header/Header'
import styles from './AppLayout.module.css'

export function AppLayout() {
  return (
    <div className={styles.appShell}>
      <a className={styles.skipLink} href="#main-content">본문으로 건너뛰기</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <footer className={styles.siteFooter}>
        <span>© 2026 Studio Nira</span>
      </footer>
    </div>
  )
}
