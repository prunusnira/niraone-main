import { projects } from '../../projects/projects'
import type { Project } from '../../projects/projects'
import { SiteLinkCard } from '../SiteLinkCard/SiteLinkCard'
import styles from './HomePage.module.css'

const homeProjects = projects.filter(
  (project): project is Project & { url: string } =>
    project.slug !== 'about' && typeof project.url === 'string',
)

export function HomePage() {
  return (
    <>
      <section className={`${styles.hero} ${styles.pageContainer}`}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`${styles.heroOrb} ${styles.heroOrbOne}`} aria-hidden="true" />
        <div className={`${styles.heroOrb} ${styles.heroOrbTwo}`} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>A Developer who's</p>
          <h1>Ideas become<span>things that move forward.</span></h1>
          <p className={styles.heroDescription}>
            만들고 싶은것을 만듭니다.<br/>결과를 바로 볼 수 있는 개발을 좋아합니다.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.action} ${styles.primaryAction}`} href="#projects">서비스 보기 <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className={styles.heroAside} aria-label="사이트 정보">
          <div><span>Focus</span><strong>Web · Unity · AI</strong></div>
          <div><span>Status</span><strong>Working</strong></div>
          <div><span>Local time</span><strong>UTC +09:00</strong></div>
        </div>
      </section>

      <section id="projects" className={`${styles.projectsSection} ${styles.pageContainer}`}>
        <div className={styles.sectionHeading}>
          <h2>Services</h2>
          <p>카드를 누르면 각 서비스로 이동합니다</p>
        </div>
        <div className={styles.projectGrid}>
          {homeProjects.map((project) => (
            <SiteLinkCard
              key={project.slug}
              slug={project.slug}
              url={project.url}
              title={project.title}
              description={project.description}
              domain={project.domain}
              monogram={project.monogram}
              accent={project.accent}
            />
          ))}
        </div>
      </section>
    </>
  )
}
