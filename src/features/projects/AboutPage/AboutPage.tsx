import { NotFoundPage } from '../../notFound/NotFoundPage/NotFoundPage'
import { getProjectBySlug, projects } from '../projects'
import styles from './AboutPage.module.css'

interface AboutPageProps {
  slug: string
}

const careerHistory = [
  {
    period: '2023.03 - 현재',
    role: '프론트엔드 리드',
    organization: '버킷스토어 스토어개발팀',
    highlights: [
      '신규 커머스 서비스와 백오피스를 구축하고 기술 결정, 업무 분배, 배포, 코드 리뷰를 주도했습니다.',
      'S3와 Lambda 기반 이미지 전달 최적화로 월 AWS 비용을 최대 40% 줄였습니다.',
      '모바일 앱 현대화, 모노레포 전환, AI를 활용한 개발 워크플로우 개선을 진행했습니다.',
    ],
  },
  {
    period: '2021.09 - 2022.08',
    role: '프론트엔드 개발',
    organization: '코핀커뮤니케이션즈 코핀코믹스 개발팀',
    highlights: [
      '웹툰 뷰어를 개선하고 PHP 기반 레거시 서비스를 React와 Next.js로 단계적으로 전환했습니다.',
    ],
  },
  {
    period: '2019.05 - 2020.05',
    role: '프론트엔드 개발',
    organization: '한국전자인증 ISLab',
    highlights: [
      '공인인증서 문의 챗봇과 브라우저 인증서 클라우드 백업 서비스를 개발했습니다.',
    ],
  },
  {
    period: '2015.05 - 2019.05',
    role: 'AI 연구개발',
    organization: 'AIBrain / 한국전자인증',
    highlights: [
      '대화형 AI 연구개발과 챗봇, 게임, 게임 개발 도구 제작에 참여했습니다.',
    ],
  },
  {
    period: '2013.03 - 2015.02',
    role: '연구개발',
    organization: '부산대학교 소프트웨어공학 연구실',
    highlights: [
      '빅데이터 서비스 조합 프레임워크와 온톨로지 기반 상황인지 모바일 프레임워크를 개발했습니다.',
    ],
  },
] as const

const skillGroups = [
  {
    title: 'Frontend',
    skills: 'JavaScript, TypeScript, React, Next.js, Vue, CSS Modules, Tailwind CSS, Sass, TanStack Query, Jotai, Storybook, Axios',
  },
  {
    title: 'Mobile & Backend',
    skills: 'Android (Java, Kotlin), iOS (Swift), Spring Boot, MySQL, MariaDB, SQLite',
  },
  {
    title: 'AI & Tools',
    skills: 'Codex, Claude, Gemini, GLM, Ollama, ComfyUI, Jira, Confluence, Slack, Notion, Sentry',
  },
] as const

interface PersonalProject {
  title: string
  period?: string
  description: string
}

const personalProjects: PersonalProject[] = [
  {
    title: 'Skill Navigator',
    period: '2016 - 현재',
    description: '기타도라 아케이드 게임 기록을 관리하는 서비스입니다. 10년 이상 개발·운영했으며 누적 가입자는 5,000명입니다.',
  },
  ...projects
    .filter((project) => project.slug !== 'about' && project.slug !== 'skill-navigator')
    .map(({ title, description }) => ({ title, description })),
  {
    title: 'Rhythm Tracers',
    period: '2020 - 현재',
    description: 'Unity와 BMS 기반 리듬게임입니다. FMOD 사운드 엔진과 1:1 온라인 대전을 구현하고 사용자 피드백을 반영해 개선하고 있습니다.',
  },
] as const

const education = [
  {
    period: '2013 - 2015',
    degree: '석사 · 소프트웨어공학',
    school: '부산대학교 전기전자컴퓨터공학부',
  },
  {
    period: '2009 - 2013',
    degree: '학사 · 정보컴퓨터공학',
    school: '부산대학교',
  },
] as const

export function AboutPage({ slug }: AboutPageProps) {
  const project = getProjectBySlug(slug)

  if (!project || project.slug !== 'about') {
    return <NotFoundPage />
  }

  return (
    <article className={styles.aboutPage}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>ABOUT</p>
        <h1>About</h1>
        <p className={styles.lead}>
          커머스와 콘텐츠 서비스에서 프론트엔드 개발과 소규모 팀 리딩을 해왔습니다. 신규 서비스 구축,
          레거시 전환, 하이브리드 앱 운영과 개선을 맡았고, 최근에는 개발 환경과 프로젝트 구조를 개선하는 데 집중하고 있습니다.
        </p>
        <a className={styles.externalLink} href={project.url} target="_blank" rel="noopener noreferrer">
          기존 About 사이트 열기 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className={styles.contentSection} aria-labelledby="career-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>EXPERIENCE</p>
          <h2 id="career-heading">경력</h2>
        </div>
        <div className={styles.experienceList}>
          {careerHistory.map((experience) => (
            <article className={styles.experienceCard} key={`${experience.period}-${experience.organization}`}>
              <div className={styles.experienceMeta}>
                <p className={styles.period}>{experience.period}</p>
                <h3>{experience.role}</h3>
                <p className={styles.organization}>{experience.organization}</p>
              </div>
              <ul className={styles.highlights}>
                {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="skills-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>TOOLKIT</p>
          <h2 id="skills-heading">기술 스택</h2>
        </div>
        <div className={styles.skillGrid}>
          {skillGroups.map((group) => (
            <article className={styles.skillCard} key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.skills}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="projects-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>SIDE PROJECTS</p>
          <h2 id="projects-heading">개인 프로젝트</h2>
        </div>
        <div className={styles.projectGrid}>
          {personalProjects.map((personalProject) => (
            <article className={styles.projectCard} key={personalProject.title}>
              {personalProject.period && <p className={styles.period}>{personalProject.period}</p>}
              <h3>{personalProject.title}</h3>
              <p>{personalProject.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="education-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>EDUCATION</p>
          <h2 id="education-heading">학력</h2>
        </div>
        <div className={styles.educationList}>
          {education.map((item) => (
            <article className={styles.educationItem} key={item.period}>
              <p className={styles.period}>{item.period}</p>
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
