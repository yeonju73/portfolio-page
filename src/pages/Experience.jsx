const EXPERIENCES = [
  {
    org: '우리FIS아카데미 6기',
    role: '클라우드 서비스 개발과정',
    period: '2025.12.30 — 현재',
    bullets: [
      '프론트엔드부터 백엔드까지 풀스택 역량과 금융 도메인 지식을 함께 쌓고 있습니다.',
      'MCP(Model Context Protocol)를 활용해 프론트엔드 툴을 통합한 개발-테스트 자동화를 주제로 발표하며 AI 연동 기술 트렌드를 직접 탐구했습니다.',
      '백엔드 과정에서는 운영 환경을 고려한 로깅 전략과 OAuth2 설계에 대해 깊이 있게 학습했습니다.',
    ],
  },
  {
    org: 'GDGoC Konkuk',
    role: '서버 파트원',
    period: '2025.09 — 현재',
    bullets: [
      '개발 커뮤니티 동아리에 서버 파트원으로 참여했습니다.',
      '대규모 시스템 설계 스터디를 통해 캐시, 로드밸런싱, 데이터베이스 샤딩 등 대규모 트래픽 환경의 서버 구조를 학습하며 매주 아티클 발표에 참여했습니다.',
      '실제 사례 기반으로 확장성과 장애 대응을 고려한 서버 설계 역량을 기르고 있습니다.',
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
      '교내 학습공동체에 선정되어 중장년층을 위한 커뮤니티 서비스를 개발했습니다.',
      'ReBorn 프로젝트의 기획부터 구현까지 전 과정에 참여했습니다.',
      '커뮤니티 게시판과 채용 데이터 연동 기능을 구현하며 데이터 활용형 서비스 개발 경험을 쌓았습니다.',
      '[과학기술정보통신부] 주관 민관협력 지원 플랫폼 활용 디지털 사회혁신 아이디어 공모전 본선 진출.',
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
