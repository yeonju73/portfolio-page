interface CertificationItem {
  name: string;
  date: string;
}

interface AwardItem {
  name: string;
  org: string;
  date: string;
}

interface ContestItem {
  name: string;
  result: string;
  project: string;
}

const CERTIFICATIONS: CertificationItem[] = [
  { name: '정보처리기사', date: '2025.12.24' },
  { name: 'SQLD', date: '2025.12.12' },
  { name: 'Toeic Speaking IH', date: '2026.03.14' }
]

const AWARDS: AwardItem[] = [
  {
    name: '우리FIS아카데미 프로젝트 우수상',
    org: '우리FIS',
    date: '2026.06.25',
  },
  {
    name: 'KUIT 5기 데모데이 최우수상',
    org: '건국대학교 교내 기획개발 동아리 KUIT',
    date: '2025.08.21',
  },
  {
    name: 'Learning & Sharing 장려상',
    org: '건국대학교 대학교육혁신원',
    date: '2025.01.22',
  },
]

const CONTESTS: ContestItem[] = [
  {
    name: '[과학기술정보통신부] 2025 민관협력 지원 플랫폼 활용 디지털 사회혁신 서비스 개발·아이디어 공모전',
    result: '본선 진출',
    project: 'Block Guard',
  },
  {
    name: '[과학기술정보통신부] 2024 민관협력 지원 플랫폼 활용 디지털 사회혁신 서비스 개발·아이디어 공모전',
    result: '본선 진출',
    project: 'ReBorn',
  },
]

export default function CertificationSection() {
  return (
    <div id="certification" className="flex flex-col items-center px-5 py-24 font-sans">
      <div className="w-full max-w-[1200px] flex flex-col gap-16">

        {/* Header */}
        <div>
          <h1 className="font-bold text-[36px] leading-[1.15] tracking-[-1px] text-neutral-900">
            Certifications & Awards
          </h1>
        </div>

        {/* 자격증 */}
        <section>
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">Certifications</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between p-5 border border-neutral-100 bg-white hover:border-neutral-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300"
                style={{ borderRadius: '12px' }}
              >
                <p className="text-[15px] font-bold text-neutral-900 tracking-[-0.2px]">{cert.name}</p>
                <span className="px-2.5 py-1 bg-neutral-50 border border-neutral-100 text-[11px] text-neutral-500 font-medium shrink-0" style={{ borderRadius: '6px' }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 수상 */}
        <section>
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">Awards</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AWARDS.map((award) => (
              <div
                key={award.name}
                className="flex items-center justify-between gap-4 p-5 border border-neutral-100 bg-white hover:border-neutral-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300"
                style={{ borderRadius: '12px' }}
              >
                <div>
                  <p className="text-[15px] font-bold text-neutral-900 tracking-[-0.2px] mb-1">{award.name}</p>
                  <p className="text-[13px] text-neutral-500 tracking-[-0.1px]">{award.org}</p>
                </div>
                <span className="px-2.5 py-1 bg-neutral-50 border border-neutral-100 text-[11px] text-neutral-500 font-medium shrink-0" style={{ borderRadius: '6px' }}>
                  {award.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 공모전 */}
        <section>
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">Contests</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTESTS.map((contest) => (
              <div
                key={contest.name}
                className="flex items-center justify-between gap-4 p-5 border border-neutral-100 bg-white hover:border-neutral-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-all duration-300"
                style={{ borderRadius: '12px' }}
              >
                <div className="flex-1">
                  <p className="text-[14.5px] font-bold text-neutral-900 tracking-[-0.2px] leading-snug mb-1">{contest.name}</p>
                  <p className="text-[13px] text-neutral-500 tracking-[-0.1px]">프로젝트: {contest.project}</p>
                </div>
                <span className="px-2.5 py-1 border border-neutral-200 text-[11.5px] font-semibold text-neutral-600 bg-neutral-50 shrink-0" style={{ borderRadius: '6px' }}>
                  {contest.result}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
