"use client";

import { useState } from 'react'

interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  abbr: string;
  summary: string;
  bgGradient: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    org: '우리FIS아카데미 6기',
    role: '클라우드 서비스 개발과정',
    period: '2025.12.30 — 2026.06.25',
    abbr: 'Woori FIS',
    summary: '웹 풀스택 개발 및 클라우드 네이티브 역량을 기르고, MCP 기반 협업 자동화와 고가용성 아키텍처를 학습했습니다.',
    bgGradient: 'from-[#0054a6] to-[#0089e1]',
    bullets: [
      '웹 풀스택 및 클라우드 네이티브 역량 확보: 프론트엔드부터 백엔드까지 전 과정을 아우르는 풀스택 개발 역량 습득',
      'AI 연동 및 개발 자동화 연구: MCP(Model Context Protocol)를 활용한 프론트엔드 툴 통합 및 개발-테스트 자동화 주제 발표를 통해 최신 AI 기술 트렌드 탐구',
      '고가용성 백엔드 시스템 심화 학습: OAuth2 인증 구조 설계 및 내결함성 확보를 위한 Spring Batch 전략 학습',
      '클라우드 인프라 및 CI/CD 실무: AWS VPC 기반 3-Tier 아키텍처 설계와 Jenkins를 활용한 지속적 통합 및 배포(CI/CD) 파이프라인 구축 역량 강화'
    ],
  },
  {
    org: 'GDGoC Konkuk',
    role: '서버 파트원',
    period: '2025.09 — 2026.06.23',
    abbr: 'GDGoC',
    summary: '대규모 분산 시스템 설계 및 고가용성 서버 구조를 스터디하고 정기 기술 발표 세션에 참여했습니다.',
    bgGradient: 'from-[#ea4335] via-[#4285f4] to-[#fbbc05]',
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
    abbr: 'KUIT',
    summary: '교내 IT 융합 동아리에서 백엔드 개발자로서 Spring AI 및 피싱 예방 API 개발에 참여하고 최우수상을 수상했습니다.',
    bgGradient: 'from-[#10b981] to-[#059669]',
    bullets: [
      '기획·디자인·개발이 함께하는 교내 융합형 IT 동아리에서 서버 개발자로 활동',
      '서버 스터디를 진행하며 RESTful API 설계, 인증/인가, 배포 자동화 등 실무형 백엔드 기술을 학습',
      'Block Guard AI 기반 피싱 예방 서비스의 백엔드 개발을 담당하며 GPT API를 활용한 사기 분석 기능의 프롬프트 엔지니어링 고도화',
      'KUIT 5기 데모데이 최우수상 수상.',
    ],
  },
  {
    org: 'Learning & Sharing',
    role: '백엔드 팀원',
    period: '2024.09 — 2025.01',
    abbr: 'L&S',
    summary: '교내 학습공동체에서 중장년층 커뮤니티 서비스를 개발했으며, JPA 성능 최적화 및 동시성 문제를 다뤘습니다.',
    bgGradient: 'from-[#8b5cf6] to-[#d946ef]',
    bullets: [
      '교내 학습공동체 Learning & Sharing에 선정되어 중장년층을 위한 커뮤니티 서비스를 개발했습니다.',
      '커뮤니티 및 해시태그 시스템 설계: JPA를 활용해 해시태그와 게시글 간의 다대다 연관관계를 중간 테이블 기반으로 설계하고, 게시판 CRUD API 구현',
      '데이터베이스 성능 최적화: 게시글 조회 시 발생하는 N+1 문제를 Fetch Join으로 해결하여 쿼리 효율성 개선',
      '동시성 제어 및 정합성 보장: 다수 사용자의 \'좋아요\' 요청 시 발생하는 데이터 불일치 문제를 해결하기 위해 JPA 낙관적 락(Optimistic Lock) 을 도입하여 데이터 정합성 확보',
      '유기적 협업 및 공모전 성과: 안드로이드 팀과 API 명세 공유 및 개발 일정을 관리했으며, 초기 기획을 발전시켜 과기정통부 주관 \'민관협력 지원 플랫폼 활용 디지털 사회혁신 공모전\' 본선 진출'
    ],
  },
]

interface ExperienceModalProps {
  experience: ExperienceItem;
  onClose: () => void;
}

function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
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
            <h2 className="font-bold text-[24px] leading-tight tracking-[-0.5px] text-neutral-900">
              {experience.org}
            </h2>
            <p className="text-[13px] text-neutral-400 mt-1 tracking-[-0.1px]">{experience.period}</p>
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

        <div className="px-8 py-7 flex flex-col gap-6">
          {/* Abbr Gradient Banner (Modal) */}
          <div className={`w-full py-10 rounded-lg bg-gradient-to-r ${experience.bgGradient} flex items-center justify-center text-white font-bold text-[32px] tracking-wider shadow-sm`}>
            {experience.abbr}
          </div>

          {/* Role */}
          <section className="mt-2">
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-1.5">역할 / 파트</p>
            <p className="text-[15px] font-semibold text-neutral-800 tracking-[-0.1px]">{experience.role}</p>
          </section>

          {/* Details */}
          <section className="border-t border-neutral-100 pt-5">
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-4">상세 활동 및 성과</p>
            <ul className="flex flex-col gap-3">
              {experience.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-neutral-600 tracking-[-0.1px] leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  const [selected, setSelected] = useState<ExperienceItem | null>(null)

  return (
    <div id="experience" className="flex flex-col items-center px-5 py-24 font-sans border-b border-neutral-100">
      <div className="w-full max-w-[1200px]">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-bold text-[36px] leading-[1.15] tracking-[-1px] text-neutral-900">
            Experiences
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((exp) => (
            <button
              key={exp.org}
              onClick={() => setSelected(exp)}
              className="group text-left flex flex-col border border-neutral-100 bg-white hover:border-neutral-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 h-full"
              style={{ borderRadius: '12px' }}
            >
              {/* Banner */}
              <div className={`w-full h-[140px] bg-gradient-to-r ${exp.bgGradient} flex items-center justify-center text-white font-bold text-[24px] tracking-wide shrink-0 transition-opacity duration-300 group-hover:opacity-95`}>
                {exp.abbr}
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[19px] leading-tight tracking-[-0.3px] text-neutral-900 mb-1">
                    {exp.org}
                  </h3>
                  <p className="text-[13px] font-semibold text-[#3b82f6] tracking-[-0.1px] -mt-1">
                    {exp.role}
                  </p>
                  <p className="text-[13.5px] text-neutral-500 leading-snug tracking-[-0.1px] line-clamp-2 min-h-10 mt-1">
                    {exp.summary}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-neutral-50 text-[12px] text-neutral-400 flex justify-between items-center">
                  <span>{exp.period}</span>
                  <span className="font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors flex items-center gap-1">
                    자세히 보기 <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selected && (
        <ExperienceModal experience={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
