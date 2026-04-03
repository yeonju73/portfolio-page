import profileImg from '../assets/profile.jpeg'

export default function About() {
  return (
    <div className="flex flex-col items-center px-5 py-16 font-['DM_Sans',sans-serif]">
      <div className="w-full max-w-160">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-6">
          <div>
            <h1 className="font-['Instrument_Serif',serif] text-[52px] leading-[1.05] tracking-[-1.5px] text-neutral-900 font-normal mb-3">
              박연주
            </h1>
            <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Backend Developer</p>
          </div>
          <img
            src={profileImg}
            alt="박연주 프로필"
            className="w-36 h-44 object-cover object-top shrink-0"
            style={{ borderRadius: '4px', imageRendering: 'high-quality' }}
          />
        </div>

        {/* 소개 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">
            소개
          </p>
          <div className="flex flex-col gap-2.5 text-[15px] text-neutral-700 leading-relaxed tracking-[-0.2px]">
            <p>안녕하세요. 백엔드 개발자 박연주입니다.</p>
            <p>시스템 구조를 최적화하는 개발자가 되기 위해 노력하고 있습니다.</p>
            <p>현재는 클라우드 환경과 고가용성에 관심을 가지고 공부 중입니다.</p>
            <p>사용자의 불편함을 기술로 해결하고, 신뢰할 수 있는 경험을 만드는 백엔드 개발자로 성장하고 싶습니다.</p>
          </div>
        </section>

        <div className="border-t border-neutral-100 mb-12" />

        {/* 학력 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">
            학력
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-[15px] text-neutral-900 font-medium tracking-[-0.2px]">건국대학교</p>
            <p className="text-[14px] text-neutral-600 tracking-[-0.1px]">컴퓨터공학부 전공</p>
            <p className="text-[13px] text-neutral-400 tracking-[-0.1px] mt-1">2022.03 — 2026.08 (졸업예정)</p>
          </div>
        </section>

        <div className="border-t border-neutral-100 mb-12" />

        {/* 연락처 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">
            연락처
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-neutral-400 w-14 shrink-0 tracking-[-0.1px]">Email</span>
              <a
                href="mailto:yeon703@naver.com"
                className="text-[14px] text-neutral-700 hover:text-neutral-900 transition-colors tracking-[-0.1px]"
              >
                yeon703@naver.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-neutral-400 w-14 shrink-0 tracking-[-0.1px]">GitHub</span>
              <a
                href="https://github.com/yeonju73"
                target="_blank"
                rel="noreferrer"
                className="text-[14px] text-neutral-700 hover:text-neutral-900 transition-colors tracking-[-0.1px]"
              >
                github.com/yeonju73
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
