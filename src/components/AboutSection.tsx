import Image from 'next/image';

export default function AboutSection() {
  return (
    <div id="about" className="flex flex-col items-center px-5 py-24 font-sans border-b border-neutral-100">
      <div className="w-full max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          
          {/* Left Contents */}
          <div className="flex-1 flex flex-col items-start text-left order-2 md:order-1">
            <span className="text-[#3b82f6] font-medium text-[16px] mb-3">
              안녕하세요
            </span>
            <h1 className="font-bold text-[38px] md:text-[46px] leading-[1.2] tracking-[-1px] text-neutral-900 mb-6 whitespace-pre-line">
              신뢰할 수 있는 경험을 만드는<br />
              <span className="text-[#3b82f6]">백엔드 개발자</span><br />
              박연주입니다.
            </h1>
            <p className="text-[16px] text-neutral-500 mb-10 tracking-[-0.2px] leading-relaxed">
              장애를 선제 대응하고 최선의 방법을 찾아나갑니다.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:yeon703@naver.com"
                className="flex items-center gap-2.5 px-5 py-3 border border-neutral-200 bg-white hover:bg-neutral-50 transition-all duration-150 text-[14px] text-neutral-700 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                style={{ borderRadius: '6px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                yeon703@naver.com
              </a>
              <a
                href="https://github.com/yeonju73"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 border border-neutral-200 bg-white hover:bg-neutral-50 transition-all duration-150 text-[14px] text-neutral-700 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                style={{ borderRadius: '6px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
          
          {/* Right Profile Image */}
          <div className="flex-shrink-0 relative order-1 md:order-2">
            <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <Image
                src="/assets/profile.jpeg"
                alt="박연주 프로필"
                className="w-full h-full object-cover"
                width={320}
                height={320}
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
