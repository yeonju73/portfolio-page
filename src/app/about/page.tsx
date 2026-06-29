import Image from 'next/image';
import profileImg from '../../assets/profile.jpeg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | 박연주',
  description: '백엔드 개발자 박연주를 소개합니다.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center px-5 py-16 font-sans">
      <div className="w-full max-w-[1200px]">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-6">
          <div>
            <h1 className="font-bold text-[36px] leading-[1.15] tracking-[-1px] text-neutral-900 mb-3">
              박연주
            </h1>
            <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Backend Developer</p>
          </div>
          <Image
            src={profileImg}
            alt="박연주 프로필"
            className="w-36 h-44 object-cover object-top shrink-0"
            style={{ borderRadius: '4px' }}
            priority
          />
        </div>

        {/* 소개 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">
            소개
          </p>
          <div className="flex flex-col gap-2.5 text-[15px] text-neutral-700 leading-relaxed tracking-[-0.2px]">
            <p>안녕하세요. 기술적 신뢰를 바탕으로 사용자 경험을 완성하는 백엔드 개발자 박연주입니다.</p>
            <p>어떠한 장애 상황에서도 데이터 정합성을 보장하고 시스템 안정성을 유지하는 구조를 지향합니다.</p>
            <p>고가용성 인프라와 최적화된 파이프라인을 구축하여, 보이지 않는 곳에서도 끊김 없는 신뢰를 제공하겠습니다.</p>
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
  );
}
