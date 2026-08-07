import styles from './SiteLinkCard.module.css'

type SiteAccent = 'cyan' | 'violet' | 'amber' | 'rose' | 'lime'

export interface SiteLinkCardProps {
  index: string
  title: string
  description: string
  href: string
  domain: string
  monogram: string
  accent: SiteAccent
}

export function SiteLinkCard({
  index,
  title,
  description,
  href,
  domain,
  monogram,
  accent,
}: SiteLinkCardProps) {
  return (
    <a
      className={styles.projectCard}
      data-accent={accent}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} 새 탭에서 열기`}
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
      <span className={styles.cardArrow} aria-hidden="true">↗</span>
    </a>
  )
}
