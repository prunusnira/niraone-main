import { Link } from '@tanstack/react-router'

import { projects } from '../../projects/projects'
import { SiteLinkCard } from '../SiteLinkCard/SiteLinkCard'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <section className={`${styles.hero} ${styles.pageContainer}`}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`${styles.heroOrb} ${styles.heroOrbOne}`} aria-hidden="true" />
        <div className={`${styles.heroOrb} ${styles.heroOrbTwo}`} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> A Developer who's</p>
          <h1>Ideas become<span>things that move forward.</span></h1>
          <p className={styles.heroDescription}>
            만들고 싶은것을 만듭니다.<br/>결과를 바로 볼 수 있는 개발을 좋아합니다.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.action} ${styles.primaryAction}`} href="#projects">프로젝트 보기 <span aria-hidden="true">↓</span></a>
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
          <div><p className={styles.eyebrow}>Projects</p><h2>Explore the system.</h2></div>
          <p>카드를 누르면 페이지 안에서 바로 열립니다</p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => <SiteLinkCard key={project.slug} {...project} />)}
          <Link className={styles.rhythmCard} to="/rhythmtracers">
            {/* 사각형 내부의 배경 디자인, css를 사용해 평면을 눕힘 */}
            <div className={styles.rhythmLines} aria-hidden="true"><span /><span /><span /><span /><span /></div>
            <div className={styles.cardTopline}><span>07 / FEATURED</span><span>INTERNAL STORY</span></div>
            <div className={styles.rhythmContent}>
              <p>BMS Player for everyone</p>
              <h2>Rhythm<br />Tracers</h2>
              <span>프로젝트 이야기 보기 <b aria-hidden="true">→</b></span>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
