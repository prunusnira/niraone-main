import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import styles from './Header.module.css'

const blogUrl = 'https://blog.nira.one'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.wordmark} onClick={closeMenu}>
          Studio Nira
        </Link>

        <nav className={styles.desktopNav} aria-label="주요 메뉴">
          <Link
            to="/projects/$slug"
            params={{ slug: 'about' }}
            className={styles.navLink}
            activeProps={{ className: `${styles.navLink} ${styles.active}` }}
          >
            About
          </Link>
          <a href={blogUrl} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            Blog <ExternalLinkIcon />
          </a>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}
        aria-label="모바일 메뉴"
      >
        <Link
          to="/projects/$slug"
          params={{ slug: 'about' }}
          className={styles.mobileNavLink}
          onClick={closeMenu}
        >
          <span>About</span><span aria-hidden="true">01 →</span>
        </Link>
        <a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileNavLink}
          onClick={closeMenu}
        >
          <span className={styles.mobileNavLabel}>Blog <ExternalLinkIcon /></span>
          <span aria-hidden="true">02 →</span>
        </a>
      </nav>
    </header>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className={styles.externalIcon} aria-hidden="true" viewBox="0 0 12 12" fill="none">
      <path
        d="M7 2h3v3M10 2 5.5 6.5M9 6.5v3a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  )
}
