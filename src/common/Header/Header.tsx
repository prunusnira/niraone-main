import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { projects } from '../../features/projects/projects'
import type { ProjectSlug } from '../../features/projects/projects'
import styles from './Header.module.css'

const navLabels: Record<ProjectSlug, string> = {
  'skill-navigator': 'Skill Navigator',
  toolbox: 'Toolbox',
  'dev-portfolio': 'Portfolio',
  'dev-note': 'Dev Note',
  'piu-manager': 'PIU Manager',
  'streaming-tools': 'Streaming Tools',
}

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
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            >
              {navLabels[project.slug]}
            </Link>
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
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span>{navLabels[project.slug]}</span><span aria-hidden="true">0{index + 2} →</span>
          </Link>
        ))}
        <Link to="/rhythmtracers" className={`${styles.mobileNavLink} ${styles.featured}`} onClick={closeMenu}>
          <span>RhythmTracers</span><span aria-hidden="true">08</span>
        </Link>
      </nav>
    </header>
  )
}
