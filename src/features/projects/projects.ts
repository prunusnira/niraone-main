// slug는 About 내부 페이지와 Header 메뉴에서 함께 사용하므로 여기서 단일 관리한다
export const projects = [
  { slug: 'skill-navigator', index: '01', title: 'Skill Navigator', description: 'GITADORA 시리즈 스킬 관리 도구 · Since 2016', url: 'https://sin.nira.one', domain: 'sin.nira.one', monogram: 'SN', accent: 'cyan' },
  { slug: 'toolbox', index: '02', title: "Nira's Toolbox", description: '개발과 일상의 반복 작업을 가볍게 만드는 웹 도구 모음', url: 'https://tools.nira.one', domain: 'tools.nira.one', monogram: 'TB', accent: 'violet' },
  { slug: 'about', index: '03', title: 'About', description: '프론트엔드 개발과 서비스 운영 경험', url: 'https://about.nira.one', domain: 'about.nira.one', monogram: 'AB', accent: 'amber' },
  { slug: 'dev-note', index: '04', title: "Nira's Dev Note", description: '개발 노트 (블로그)', url: 'https://blog.nira.one', domain: 'blog.nira.one', monogram: 'DN', accent: 'rose' },
  { slug: 'piu-manager', index: '05', title: 'PIU Manager', description: 'Pump It Up 플레이 기록을 관리하는 서비스', url: 'https://piu.nira.one', domain: 'piu.nira.one', monogram: 'PM', accent: 'lime' },
  { slug: 'streaming-tools', index: '06', title: 'Streaming Tools by Nira', description: '스트리머를 위한 간편한 도구 모음', url: 'https://streaming.nira.one', domain: 'streaming.nira.one', monogram: 'ST', accent: 'sky' },
] as const

export type Project = (typeof projects)[number]
export type ProjectSlug = Project['slug']

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
