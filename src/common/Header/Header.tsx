import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { projects } from '../../features/projects/projects'
import type { ProjectSlug } from '../../features/projects/projects'
import styles from './Header.module.css'

const navLabels: Record<ProjectSlug, string> = {
  'skill-navigator': 'Skill Navigator',
  toolbox: 'Toolbox',
  about: 'About',
  'dev-note': 'Blog',
  'piu-manager': 'PIU Manager',
  'streaming-tools': 'Streaming Tools',
}

const headerProjects = projects.filter(
  (project) => project.slug === 'about' || project.slug === 'dev-note',
)

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
          {headerProjects.map((project) => project.slug === 'about' ? (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.active}` }}
            >
              {navLabels[project.slug]}
            </Link>
          ) : (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              {navLabels[project.slug]}
            </a>
          ))}
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
        {headerProjects.map((project, index) => project.slug === 'about' ? (
          <Link
            key={project.slug}
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span>{navLabels[project.slug]}</span><span aria-hidden="true">0{index + 1} →</span>
          </Link>
        ) : (
          <a
            key={project.slug}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span>{navLabels[project.slug]}</span><span aria-hidden="true">0{index + 1} →</span>
          </a>
        ))}
      </nav>
    </header>
  )
}
