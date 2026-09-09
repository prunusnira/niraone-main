import { NotFoundPage } from '../../notFound/NotFoundPage/NotFoundPage'
import { DevNotePage } from '../DevNotePage/DevNotePage'
import { getProjectBySlug } from '../projects'
import styles from './ProjectEmbedPage.module.css'

interface ProjectEmbedPageProps {
  slug: string
}

export function ProjectEmbedPage({ slug }: ProjectEmbedPageProps) {
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <section className={styles.embedPage}>
      <div className={styles.embedToolbar}>
        <div className={styles.embedHeading}>
          <p className={styles.eyebrow}>{project.index} / Project · {project.domain}</p>
          <h1>{project.title}</h1>
          <p className={styles.embedDescription}>{project.description}</p>
        </div>
        <a
          className={styles.embedOpen}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          새 탭에서 열기 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.embedShell}>
        {project.embed === 'notion' ? (
          <DevNotePage notionPageId={project.notionPageId} />
        ) : (
          <iframe
            className={styles.embedFrame}
            src={project.url}
            title={`${project.title} 화면`}
          />
        )}
      </div>
    </section>
  )
}
