import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import styles from './Header.module.css'

const externalLinks = [
  { label: 'Skill Navigator', href: 'https://sin.nira.one' },
  { label: 'Toolbox', href: 'https://tools.nira.one' },
  { label: 'Portfolio', href: 'https://about.nira.one' },
  { label: 'Dev Note', href: 'https://blog.nira.one' },
  { label: 'PIU Manager', href: 'https://piu.nira.one' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.wordmark} onClick={closeMenu}>
          <span className={styles.wordmarkMark} aria-hidden="true">N</span>
          <span>NIRA</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="주요 메뉴">
          <Link
            to="/"
            className={styles.navLink}
            activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          {externalLinks.map((link) => (
            <a key={link.href} className={styles.navLink} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
          <Link
            to="/rhythmtracers"
            className={`${styles.navLink} ${styles.navLinkFeatured}`}
            activeProps={{ className: `${styles.navLink} ${styles.navLinkFeatured} ${styles.active}` }}
          >
            RhythmTracers
          </Link>
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
        <Link to="/" className={styles.mobileNavLink} onClick={closeMenu} activeOptions={{ exact: true }}>
          <span>Home</span><span aria-hidden="true">01</span>
        </Link>
        {externalLinks.map((link, index) => (
          <a key={link.href} className={styles.mobileNavLink} href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            <span>{link.label}</span><span aria-hidden="true">0{index + 2} ↗</span>
          </a>
        ))}
        <Link to="/rhythmtracers" className={`${styles.mobileNavLink} ${styles.featured}`} onClick={closeMenu}>
          <span>RhythmTracers</span><span aria-hidden="true">07</span>
        </Link>
      </nav>
    </header>
  )
}
