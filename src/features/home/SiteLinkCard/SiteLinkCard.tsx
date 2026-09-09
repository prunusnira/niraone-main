import { Link } from '@tanstack/react-router'

import styles from './SiteLinkCard.module.css'

type SiteAccent = 'cyan' | 'violet' | 'amber' | 'rose' | 'lime' | 'sky'

export interface SiteLinkCardProps {
  slug: string
  index: string
  title: string
  description: string
  domain: string
  monogram: string
  accent: SiteAccent
}

export function SiteLinkCard({
  slug,
  index,
  title,
  description,
  domain,
  monogram,
  accent,
}: SiteLinkCardProps) {
  return (
    <Link
      className={styles.projectCard}
      data-accent={accent}
      to="/projects/$slug"
      params={{ slug }}
      aria-label={`${title} 페이지로 이동`}
    >
      <div className={styles.cardTopline}>
        <span>{index}</span>
        <span className={styles.cardDomain}>{domain}</span>
      </div>
      <div className={styles.cardMonogram} aria-hidden="true">{monogram}</div>
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className={styles.cardArrow} aria-hidden="true">→</span>
    </Link>
  )
}
