import { useState } from 'react'
import driveuImg from '../assets/driveu.png'
import blockguardImg from '../assets/blockguard.jpg'
import mcpImg from '../assets/mcp.png'
import reborn1Img from '../assets/reborn1.png'
import reborn2Img from '../assets/reborn2.png'

const PROJECTS = [
  {
    title: 'DriveU',
    subtitle: '학부생을 위한 생성형 AI 기반 클라우드 아카이빙 서비스',
    period: '2025.03 — 2025.12',
    tags: ['Spring', 'Java', 'JPA', 'MySQL', 'AWS EC2', 'AWS S3', 'GPT API', 'Google OAuth2'],
    team: 'BackEnd 1명(본인) / FrontEnd 1명 / 보안 & 인프라 1명',
    github: 'https://github.com/DriveU',
    summary: '학부생을 위한 생성형 AI 기반 클라우드 아카이빙 플랫폼. 학기·과목 단위 파일 관리와 AI 학습 도구(노트 요약, 문제 생성)를 제공합니다.',
    images: [driveuImg],
    roles: [
      {
        title: '대용량 파일 처리 시스템 설계',
        desc: '서버 부하를 최소화하기 위해 AWS S3 Presigned URL 기반 Multipart Upload 아키텍처를 설계하고 Spring Boot 환경에서 구현했습니다. 서버의 직접 I/O 부하를 줄이고, 대용량 파일 업로드 속도를 약 2배 향상시켰습니다.',
      },
      {
        title: '계층적 디렉토리 관리 및 쿼리 성능 최적화',
        desc: 'Closure Table 패턴으로 임의 깊이의 중첩 디렉토리 조회·삭제를 단일 쿼리로 처리했습니다. 풀 테이블 스캔 문제를 발견하고 5개 엔티티에 복합 인덱스 10개를 추가해 디렉토리 트리 조회 성능을 약 3배 개선했습니다.',
      },
      {
        title: 'S3-DB 정합성 보장 및 복구 JOB 설계',
        desc: 'Presigned URL 발급 시점에 업로드 상태를 DB에 선제 기록하고, 복구 Job이 주기적으로 미완료 건을 감지해 S3 정리와 DB 복구를 자동 수행하는 구조를 설계했습니다. 불완전한 멀티파트 업로드를 자동 정리하여 불필요한 S3 과금을 제거했습니다.',
      },
      {
        title: '휴지통 리소스 자동 정리 배치 시스템 설계',
        desc: '휴지통에 30일 이상 보관된 파일·노트·링크·디렉토리를 자동 영구 삭제하는 Spring Batch Job을 설계·구현했습니다. 커서 버퍼 방식과 ExecutionContext 기반 재시작 체크포인트를 적용했고, Exponential Backoff·Circuit Breaker·Skip 처리를 조합해 외부 장애가 전체 Job을 중단시키지 않도록 내결함성을 확보했습니다. Skip 발생 건은 별도 skip_log 테이블에 기록하여 사후 추적과 수동 복구가 가능하도록 했습니다.',
      },
      {
        title: '보안 중심 AWS 인프라 설계 (VPC / ALB)',
        desc: 'VPC 기반 계층형 네트워크 아키텍처를 설계·구현했습니다. Public Subnet에는 ALB, Bastion Host, NAT Gateway만 배치하고, 애플리케이션 서버와 DB는 Private Subnet에 배치하여 외부 직접 접근을 차단했습니다. AWS WAF, GuardDuty + EventBridge + Discord 알림을 연동해 보안 이벤트 실시간 모니터링 환경을 구축했습니다.',
      },
      {
        title: '비동기 아키텍처 전환',
        desc: '외부 AI API 호출에 Spring WebFlux + WebClient 기반 Non-blocking 구조를 도입했습니다. I/O 대기 시간이 서버 병목으로 이어지는 문제를 해결하여 응답 효율 개선 및 장애 지점을 감소시켰습니다.',
      },
    ],
    achievements: [
      '대용량 파일 업로드 속도 2배 향상 및 서버 부하 감소',
      '외부 공격으로 인한 서버 다운 0건 달성',
      'DB 인덱스 최적화로 디렉토리 트리 조회 성능 약 3배 개선',
    ],
  },
  {
    title: 'Block Guard',
    subtitle: 'AI 기반 피싱 예방 서비스',
    period: '2025.06 — 2025.08',
    tags: ['Spring', 'Java', 'JPA', 'MySQL', 'AWS EC2', 'AWS S3', 'GPT API', 'Spring AI'],
    team: 'BackEnd 2명(본인 외 1명) / FrontEnd 2명 / PM 1명 / Designer 3명',
    github: 'https://github.com/Guard',
    summary: '통합형 피싱 사전예방 서비스로, AI 기반 사기 분석, 긴급대응, 시뮬레이션 기능을 제공합니다. 사용자가 실제 피해사례와 올바른 대처방법을 학습하고 실제 상황에서 대응 능력을 기를 수 있도록 돕습니다.',
    images: [blockguardImg],
    roles: [
      {
        title: 'AI 기반 사기 분석 백엔드 파이프라인 구축 및 최적화',
        desc: '실제 피싱 사례 데이터를 정제 및 카테고리화하여 GPT API에 최적화된 프롬프트를 설계했습니다. Spring AI의 Vector Store를 활용해 사용자 입력과 유사도가 높은 사례를 동적으로 검색하고 프롬프트에 주입하는 Dynamic Few-shot Learning 파이프라인을 구현했습니다. 정적 프롬프트 방식 대비 불필요한 토큰 소모를 60% 절감하고 분석 답변의 정확도를 높였습니다.',
      },
      {
        title: '사기분석 및 긴급대응 기능 API 설계 및 구현',
        desc: '사기분석 및 긴급대응 기능의 RESTful API를 직접 설계하고 구현했습니다. Spring Auditing 기반 BaseEntity 구조를 적용하여 생성·수정 이력 관리의 일관성을 확보했습니다. 글로벌 예외 처리 및 응답 구조를 통일해 프론트엔드와의 협업 효율성을 높였습니다.',
      },
      {
        title: '프로젝트 관리 및 협업',
        desc: '백엔드 팀원 1명과 함께 개발 일정을 관리하고, 프론트엔드 및 기획/디자인 팀과 긴밀하게 소통하며 요구사항을 조율했습니다.',
      },
    ],
    achievements: [
      'KUIT 5기 데모데이 최우수상 수상',
      '실사용 데이터 기반 AI 분석 정확도 향상 및 완성도 높은 프로토타입 구축',
      '[과학기술정보통신부] 2025 민관협력 지원 플랫폼 활용 디지털 사회혁신 서비스 개발·아이디어 공모전 본선 진출',
    ],
  },
  {
    title: 'MCP 기반 프론트엔드 개발·테스트 자동화',
    subtitle: '2019 → 2026 우리은행 메인 페이지 UX·UI 전면 리뉴얼 및 MCP 기반 개발 자동화',
    period: '2026.01 — 2026.01',
    tags: ['React', 'JavaScript', 'Vite', 'Tailwind CSS'],
    team: 'FrontEnd 2명(본인 포함) / 서버 구축 2명',
    github: 'https://github.com/Woori-Pizza/tech-seminar-mcp',
    summary: '2019년에 제작된 우리은행 메인 페이지를 2026년 기준 UX·UI·개발 방식으로 전면 리뉴얼한 프로젝트입니다. MCP(Model Context Protocol)를 활용해 디자인 → 코드 → 리뷰 → 테스트까지의 전 과정을 자동화한 협업 구조를 도입했습니다.',
    images: [mcpImg],
    roles: [
      {
        title: 'UI/UX 리뉴얼 및 컴포넌트 기반 구조 설계',
        desc: '금융 서비스 특성을 고려한 정보 위계를 재정의하고, 주요 액션 중심의 사용자 흐름을 설계했습니다. 버튼, 카드, 레이아웃 단위로 컴포넌트를 분리하여 유지보수성과 확장성을 강화했습니다. 불필요한 시각 요소를 제거하고 디자인 시스템 기반으로 구현했습니다.',
      },
      {
        title: 'Figma MCP를 활용한 디자인 → 코드 자동화',
        desc: 'Figma MCP를 통해 색상, 레이아웃, 컴포넌트 구조 등 디자인 스펙을 자동 추출했습니다. 추출된 스펙을 AI가 직접 해석해 코드를 생성함으로써 구현 시간을 수 분에서 1분 이내로 단축했습니다. 디자인 변경 사항을 코드에 빠르게 반영하여 시각적 불일치 문제를 최소화했습니다.',
      },
      {
        title: 'Storybook MCP를 활용한 컴포넌트 중복 탐지',
        desc: 'Storybook MCP로 버튼 컴포넌트 props 전체를 탐색하여 기능은 같고 이름만 다른 props를 자동으로 식별했습니다. GitHub MCP와 연계해 해당 컴포넌트의 작성자 및 변경 히스토리를 분석하고, Slack MCP로 담당자 변경 여부까지 확인했습니다. props 설계 일관성을 확보하고 레거시 코드의 맥락을 빠르게 파악했습니다.',
      },
      {
        title: 'GitHub MCP를 활용한 PR 리뷰 자동화',
        desc: 'GitHub MCP로 PR 단위 변경 내용을 자동 요약하고 UI 관련 코드 흐름을 정리했습니다. Figma MCP로 추출한 디자인 스펙과 구현 코드를 자동 비교하여 불일치 지점에 코드 리뷰 코멘트를 자동 생성했습니다.',
      },
      {
        title: 'Playwright MCP를 활용한 UI 테스트 자동화',
        desc: '자연어 기반으로 UI 테스트 시나리오를 작성하고 Playwright MCP로 자동 실행했습니다. 버튼 클릭 → API 호출 → 응답 스키마 검증까지의 흐름을 자동화하여 프론트엔드·백엔드 오류 원인을 빠르게 식별했습니다.',
      },
    ],
    achievements: [
      '디자인 → 코드 구현 시간 대폭 단축 (수 분 → 1분 이내)',
      'MCP 기반 자동화로 디자인·코드·히스토리·테스트를 하나의 Context로 연결하여 불필요한 커뮤니케이션 비용 절감',
      '컴포넌트 기반 구조 도입으로 유지보수성 및 확장성 강화',
    ],
  },
  {
    title: 'Reborn',
    subtitle: '중장년층을 위한 구직 정보 제공 커뮤니티',
    period: '2024.09 — 2025.01',
    tags: ['Spring', 'Java', 'JPA', 'MySQL', 'AWS EC2'],
    team: 'BackEnd 4명(본인 외 3명) / Android 2명',
    github: 'https://github.com/6',
    summary: '중장년층의 재취업을 돕기 위해 구직 정보와 커뮤니티 기능을 결합한 디지털 사회혁신 서비스. 맞춤형 구직 정보와 커뮤니티 소통을 통해 재취업 동기를 강화합니다.',
    images: [reborn1Img, reborn2Img],
    roles: [
      {
        title: 'JPA 기반 해시태그 관리 기능 설계 및 구현',
        desc: '커뮤니티 게시판을 위한 API를 설계했습니다. 해시태그와 게시글 간의 다대다 관계를 중간테이블 기반 JPA 연관관계 매핑으로 설계했습니다. 게시글 조회 시 발생하는 N+1 문제를 fetch join을 활용하여 해결했습니다.',
      },
      {
        title: '게시글 좋아요 동시성 처리',
        desc: '다수의 사용자가 동시에 좋아요 요청을 보낼 때 발생하는 동시성 문제를 JPA 낙관적 락(Optimistic Lock)을 도입하여 버전 충돌 감지 기반으로 데이터 정합성을 보장했습니다.',
      },
      {
        title: '협업 및 커뮤니케이션',
        desc: 'Android 팀과 API 명세를 문서화·공유하며 기능별 연동 일정을 관리했습니다. 주간 스크럼을 주도하며 개발 진행 상황을 조율하고 기능 통합 시 발생한 문제를 빠르게 해결했습니다.',
      },
    ],
    achievements: [
      '2024-2학기 교내 Learning & Sharing 활동 장려상 수상',
      '[과학기술정보통신부] 2024 민관협력 지원 플랫폼 활용 디지털 사회혁신 서비스 개발·아이디어 공모전 본선 진출',
    ],
  },
]

function ProjectModal({ project, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-170 max-h-[85vh] bg-white overflow-y-auto shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        style={{ borderRadius: '4px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-8 py-5 flex items-start justify-between">
          <div>
            <h2 className="font-['Instrument_Serif',serif] text-[28px] leading-tight tracking-[-0.8px] text-neutral-900 font-normal">
              {project.title}
            </h2>
            <p className="text-[13px] text-neutral-400 mt-1 tracking-[-0.1px]">{project.period}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-1 p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-7 flex flex-col gap-8">

          {/* Images */}
          {project.images.length === 1 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full object-cover"
              style={{ borderRadius: '4px', maxHeight: '500px' }}
            />
          ) : (
            <div className="flex justify-center gap-2 items-start">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  className="h-auto object-contain"
                  style={{ borderRadius: '4px', maxHeight: '350px', maxWidth: '45%' }}
                />
              ))}
            </div>
          )}

          {/* Summary */}
          <section>
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-3">요약</p>
            <p className="text-[14px] text-neutral-700 leading-relaxed tracking-[-0.1px]">{project.summary}</p>
          </section>

          {/* Meta */}
          <section className="flex flex-col gap-3">
            <div className="flex gap-3">
              <span className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium w-20 shrink-0 pt-0.5">팀 구성</span>
              <p className="text-[13px] text-neutral-600 tracking-[-0.1px]">{project.team}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium w-20 shrink-0 pt-0.5">GitHub</span>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-neutral-700 hover:text-neutral-900 transition-colors tracking-[-0.1px]"
              >
                {project.github}
              </a>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-3">기술 스택</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-neutral-200 text-[12px] text-neutral-600 tracking-[-0.1px] bg-white"
                  style={{ borderRadius: '3px' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="border-t border-neutral-100" />

          {/* Roles */}
          <section>
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">역할 및 기여</p>
            <div className="flex flex-col gap-5">
              {project.roles.map((role, i) => (
                <div key={i}>
                  <p className="text-[13px] font-semibold text-neutral-900 tracking-[-0.1px] mb-1.5">{role.title}</p>
                  <p className="text-[13px] text-neutral-600 leading-relaxed tracking-[-0.1px]">{role.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-neutral-100" />

          {/* Achievements */}
          <section className="pb-1">
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-3">성과</p>
            <ul className="flex flex-col gap-2">
              {project.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-neutral-700 tracking-[-0.1px] leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function Project() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col items-center px-5 py-16 font-['DM_Sans',sans-serif]">
      <div className="w-full max-w-160">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-['Instrument_Serif',serif] text-[52px] leading-[1.05] tracking-[-1.5px] text-neutral-900 font-normal mb-3">
            프로젝트
          </h1>
          <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Projects</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <button
              key={project.title}
              onClick={() => setSelected(project)}
              className="group text-left flex flex-col border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-150 overflow-hidden"
              style={{ borderRadius: '4px' }}
            >
              {/* Thumbnail */}
              {project.images.length === 1 ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full object-cover"
                  style={{ height: '220px' }}
                />
              ) : (
                <div className="grid grid-cols-2 overflow-hidden flex-shrink-0" style={{ height: '220px' }}>
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="w-full object-cover"
                      style={{ height: '220px' }}
                    />
                  ))}
                </div>
              )}

              {/* Text */}
              <div className="flex flex-col gap-3 p-5">
                <div>
                  <p className="text-[11px] text-neutral-400 tracking-[-0.1px] mb-1.5">{project.period}</p>
                  <h3 className="font-['Instrument_Serif',serif] text-[22px] leading-tight tracking-[-0.5px] text-neutral-900 font-normal mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-snug tracking-[-0.1px]">{project.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-neutral-100 text-[11px] text-neutral-500 tracking-[-0.1px] bg-neutral-50 group-hover:border-neutral-200 transition-colors"
                      style={{ borderRadius: '2px' }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] text-neutral-400 tracking-[-0.1px]">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
