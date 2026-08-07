import styles from './RhythmTracersPage.module.css'

const features = [
  { number: '01', title: 'BMS Play', description: 'PC 리듬게임 스타일의 4~8버튼, 정통적인 턴테이블+7버튼 조합은 물론 10버튼, 16버튼의 플레이도 가능합니다' },
  { number: '02', title: 'Versus', description: '플레이어 두 사람이 각각 호스트/클라이언트가 되어 1:1 대전을 진행할 수 있습니다' },
  { number: '03', title: 'Feedback', description: '리플레이 기능이 존재하여 내가 했던 플레이를 복기하거나, 리플레이 기록과 대결을 할 수 있습니다' },
  { number: '04', title: 'Conquer', description: 'Aery, U_E, Stella, Satellite 등 여러 BMS 난이도 표를 지원합니다' },
  { number: '05', title: 'System', description: 'FMOD를 사용하여 싱크 문제를 최소화 했습니다' },
]

export function RhythmTracersPage() {
  return (
    <article className={styles.rhythmPage}>
      <section className={`${styles.rhythmHero} ${styles.pageContainer}`}>
        <div className={styles.rhythmVisual} aria-hidden="true">
          <div className={styles.rhythmDisc}></div>
          <div className={`${styles.rhythmTrack} ${styles.trackOne}`} />
          <div className={`${styles.rhythmTrack} ${styles.trackTwo}`} />
          <div className={`${styles.rhythmTrack} ${styles.trackThree}`} />
          <span className={styles.rhythmBpm}>BPM<br /><strong>∞</strong></span>
        </div>
        <div className={styles.rhythmHeroCopy}>
          <p className={styles.eyebrow}>BMS Player, rhythm game / In development</p>
          <h1>Trace the beat.</h1>
          <p>
            RhythmTracers는 BMS를 좀 더 가볍게 플레이 할 수 있도록 만들고 있는 BMS 플레이어입니다.<br/>
            FMOD를 지원하여 사운드 딜레이를 줄였고, U_E팩, Aery팩 등 다양한 단위표를 지원합니다.<br/>
            네트워크 연결로 1:1 대전을 즐길수도 있습니다
          </p>
          <div className={styles.rhythmMeta}>
            <div><span>Platform</span><strong>Windows / macos</strong></div>
            <div><span>Mode</span><strong>4B · 5B · 6B · 8B · 10B · 16B</strong></div>
            <div><span>Status</span><strong>In development</strong></div>
            <div><span>Players</span><strong>1-2</strong></div>
          </div>
        </div>
      </section>

      <section className={`${styles.featureSection} ${styles.pageContainer}`}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>특징</p><h2>Specifications</h2></div>
        </div>
        <div className={styles.featureList}>
          {features.map((feature) => (
            <div className={styles.featureRow} key={feature.number}>
              <span>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.rhythmCta} ${styles.pageContainer}`}>
        <p className={styles.eyebrow}>Download</p>
        <h2>Trace the beat.</h2>
        <p>현재는 GitHub에서 배포중입니다. Windows 버전 및 macos 버전* 배포</p>
        <a href="https://github.com/prunusnira/rhythmtracers-public-release" target="_blank" rel="noreferrer noopener" className={styles.primaryAction}>Download <span aria-hidden="true">←</span></a>
        <p>* macos 버전은 사정상 배포에 포함되지 않을 수 있습니다. Apple Silicon에서만 구동할 수 있습니다.</p>
      </section>
    </article>
  )
}
