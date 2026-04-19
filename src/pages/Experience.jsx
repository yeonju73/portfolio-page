const EXPERIENCES = [
  {
    org: '우리FIS아카데미 6기',
    role: '클라우드 서비스 개발과정',
    period: '2025.12.30 — 현재',
    bullets: [
      '웹 풀스택 및 클라우드 네이티브 역량 확보: 프론트엔드부터 백엔드까지 전 과정을 아우르는 풀스택 개발 역량 습득',
      'AI 연동 및 개발 자동화 연구: MCP(Model Context Protocol)를 활용한 프론트엔드 툴 통합 및 개발-테스트 자동화 주제 발표를 통해 최신AI 기술 트렌드 탐구',
      '고가용성 백엔드 시스템 심화 학습: OAuth2 인증 구조 설계 및 내결함성 확보를 위한 Spring Batch 전략 학습',
      '클라우드 인프라 및 CI/CD 실무: AWS VPC 기반 3-Tier 아키텍처 설계와 Jenkins를 활용한 지속적 통합 및 배포(CI/CD) 파이프라인 구축역량 강화'
    ],
  },
  {
    org: 'GDGoC Konkuk',
    role: '서버 파트원',
    period: '2025.09 — 현재',
    bullets: [
      '대규모 시스템 설계 스터디 참여: 캐시 전략, 로드밸런싱, 데이터베이스 샤딩 등 대규모 트래픽 환경에 대응하기 위한 서버 구조 학습 및 매주 기술 아티클 발표 참여',
      '확장성 및 장애 대응 설계 역량 강화: 실제 글로벌 서비스 사례를 분석하여 시스템의 확장성과 고가용성을 고려한 서버 설계 역량 확보',
      '최신 기술 트렌드 공유: 정기 기술 세션 참여 및 커뮤니티 활동을 통해 백엔드 기술 스택에 대한 심도 있는 논의와 지식 공유를 진행하며 기술적 시야 확장'
    ],
  },
  {
    org: 'KUIT',
    role: '서버 파트원',
    period: '2025.03 — 2025.08',
    bullets: [
      '기획·디자인·개발이 함께하는 교내 융합형 IT 동아리에서 서버 개발자로 활동했습니다.',
      '서버 스터디를 진행하며 RESTful API 설계, 인증/인가, 배포 자동화 등 실무형 백엔드 기술을 학습했습니다.',
      'Block Guard AI 기반 피싱 예방 서비스의 백엔드 개발을 담당하며 GPT API를 활용한 사기 분석 기능의 프롬프트 엔지니어링을 고도화했습니다.',
      'KUIT 5기 데모데이 최우수상 수상.',
    ],
  },
  {
    org: 'Learning & Sharing',
    role: '백엔드 팀원',
    period: '2024.09 — 2025.01',
    bullets: [
      '교내 학습공동체 Learning & Sharing에 선정되어 중장년층을 위한 커뮤니티 서비스를 개발했습니다.',
      '커뮤니티 및 해시태그 시스템 설계: JPA를 활용해 해시태그와 게시글 간의 다대다 연관관계를 중간 테이블 기반으로 설계하고, 게시판 CRUD API 구현',
      '데이터베이스 성능 최적화: 게시글 조회 시 발생하는 N+1 문제를 Fetch Join으로 해결하여 쿼리 효율성 개선',
      '동시성 제어 및 정합성 보장: 다수 사용자의 \'좋아요\' 요청 시 발생하는 데이터 불일치 문제를 해결하기 위해 JPA 낙관적 락(Optimistic Lock) 을 도입하여 데이터 정합성 확보',
      '유기적 협업 및 공모전 성과: 안드로이드 팀과 API 명세 공유 및 개발 일정을 관리했으며, 초기 기획을 발전시켜 과기정통부 주관 \'민관협력 지원 플랫폼 활용 디지털 사회혁신 공모전\' 본선 진출'
    ],
  },
]

export default function Experience() {
  return (
    <div className="flex flex-col items-center px-5 py-16 font-['DM_Sans',sans-serif]">
      <div className="w-full max-w-160">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-['Instrument_Serif',serif] text-[52px] leading-[1.05] tracking-[-1.5px] text-neutral-900 font-normal mb-3">
            활동 및 경험
          </h1>
          <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Experience</p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="flex gap-8 group">
              {/* Left: period */}
              <div className="w-36 shrink-0 pt-0.5">
                <p className="text-[12px] text-neutral-400 tracking-[-0.1px] leading-snug">{exp.period}</p>
              </div>

              {/* Divider line + dot */}
              <div className="flex flex-col items-center">
                <div className="w-px h-2 bg-neutral-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
                {i < EXPERIENCES.length - 1 && (
                  <div className="w-px flex-1 bg-neutral-100 min-h-8" />
                )}
              </div>

              {/* Right: content */}
              <div className={`flex-1 pb-12 ${i === EXPERIENCES.length - 1 ? 'pb-0' : ''}`}>
                <div className="mb-3">
                  <h3 className="font-['Instrument_Serif',serif] text-[22px] leading-tight tracking-[-0.5px] text-neutral-900 font-normal">
                    {exp.org}
                  </h3>
                  <p className="text-[13px] text-neutral-500 tracking-[-0.1px] mt-0.5">{exp.role}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-neutral-600 tracking-[-0.1px] leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
