// slug는 About 라우트와 서비스 카드에서 함께 사용한다
const projectEntries = [
  {
    slug: 'skill-navigator',
    index: '01',
    title: 'Skill Navigator',
    description: 'GITADORA 시리즈 스킬 관리 도구 · Since 2016',
    details: '기타도라 아케이드 게임 기록을 관리하는 서비스입니다. 10년 이상 개발·운영했으며 누적 가입자는 5,000명입니다.',
    period: '2016 - 현재',
    url: 'https://sin.nira.one',
    domain: 'sin.nira.one',
    monogram: 'SN',
    accent: 'cyan',
  },
  {
    slug: 'toolbox',
    index: '02',
    title: "Nira's Toolbox",
    description: '개발과 일상의 반복 작업을 가볍게 만드는 웹 도구 모음',
    monogram: 'TB',
    accent: 'violet',
    url: 'https://tools.nira.one',
    domain: 'tools.nira.one',
  },
  {
    slug: 'about',
    index: '03',
    title: 'About',
    description: '프론트엔드 개발과 서비스 운영 경험',
    monogram: 'AB',
    accent: 'amber',
  },
  {
    slug: 'piu-manager',
    index: '05',
    title: 'PIU Manager',
    description: 'Pump It Up 플레이 기록을 관리하는 서비스',
    monogram: 'PM',
    accent: 'lime',
    url: 'https://piu.nira.one',
    domain: 'piu.nira.one',
  },
  {
    slug: 'streaming-tools',
    index: '06',
    title: 'Streaming Tools by Nira',
    description: '스트리머를 위한 간편한 도구 모음',
    monogram: 'ST',
    accent: 'sky',
    url: 'https://streaming.nira.one',
    domain: 'streaming.nira.one',
  },
  {
    slug: 'rhythm-tracers',
    index: '07',
    title: 'Rhythm Tracers',
    description: 'BMS Player for everyone',
    details: 'Unity와 BMS 기반 리듬게임입니다. FMOD 사운드 엔진과 1:1 온라인 대전을 구현하고 사용자 피드백을 반영해 개선하고 있습니다.',
    period: '2020 - 현재',
    url: 'https://github.com/prunusnira/rhythmtracers-public-release',
    monogram: 'RT',
    accent: 'sky',
  },
] as const

export type ProjectSlug = (typeof projectEntries)[number]['slug']

export interface Project {
  slug: ProjectSlug
  index: string
  title: string
  description: string
  details?: string
  period?: string
  url?: string
  domain?: string
  monogram: string
  accent: 'cyan' | 'violet' | 'amber' | 'rose' | 'lime' | 'sky'
}

export const projects: readonly Project[] = projectEntries

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
