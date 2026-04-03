const CERTIFICATIONS = [
  { name: '정보처리기사', date: '2025.12.24' },
  { name: 'SQLD', date: '2025.12.12' },
]

const AWARDS = [
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

const CONTESTS = [
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

export default function Certification() {
  return (
    <div className="flex flex-col items-center px-5 py-16 font-['DM_Sans',sans-serif]">
      <div className="w-full max-w-160">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-['Instrument_Serif',serif] text-[52px] leading-[1.05] tracking-[-1.5px] text-neutral-900 font-normal mb-3">
            자격증 및 수상
          </h1>
          <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Certification & Awards</p>
        </div>

        {/* 자격증 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">자격증</p>
          <div className="flex flex-col gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                <p className="text-[15px] text-neutral-900 tracking-[-0.2px]">{cert.name}</p>
                <p className="text-[13px] text-neutral-400 tracking-[-0.1px]">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-neutral-100 mb-12" />

        {/* 수상 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">수상</p>
          <div className="flex flex-col gap-5">
            {AWARDS.map((award) => (
              <div key={award.name} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] text-neutral-900 tracking-[-0.2px] mb-1">{award.name}</p>
                  <p className="text-[13px] text-neutral-500 tracking-[-0.1px]">{award.org}</p>
                </div>
                <p className="text-[13px] text-neutral-400 tracking-[-0.1px] shrink-0">{award.date}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-neutral-100 mb-12" />

        {/* 공모전 */}
        <section>
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">공모전</p>
          <div className="flex flex-col gap-5">
            {CONTESTS.map((contest) => (
              <div key={contest.name} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[14px] text-neutral-900 tracking-[-0.2px] leading-snug mb-1.5">{contest.name}</p>
                  <p className="text-[13px] text-neutral-500 tracking-[-0.1px]">프로젝트: {contest.project}</p>
                </div>
                <span
                  className="px-2.5 py-1 border border-neutral-200 text-[12px] text-neutral-600 tracking-[-0.1px] bg-white shrink-0"
                  style={{ borderRadius: '3px' }}
                >
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
