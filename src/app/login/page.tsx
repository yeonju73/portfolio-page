"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      // Refresh page routing and redirect to blog page (/blog)
      router.refresh();
      router.push('/blog');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Login error:', error);
      // Friendly messages for common auth issues
      if (error.message === 'Invalid login credentials') {
        setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setErrorMsg(error.message || '로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="w-full max-w-[420px] bg-white border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-8 relative z-10"
        style={{ borderRadius: '16px' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-[#3b82f6] font-semibold text-[13px] tracking-[1.5px] uppercase mb-2 hover:underline">
            ← Portfolio
          </Link>
          <h1 className="font-bold text-[26px] tracking-[-0.5px] text-neutral-900 mb-2">
            Admin Log In
          </h1>
          <p className="text-neutral-500 text-[13.5px] tracking-[-0.1px]">
            블로그 및 이력 관리를 위해 로그인해 주세요.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[13px] rounded-r-md flex items-start gap-2.5">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold tracking-[0.5px] uppercase text-neutral-400">
              이메일 주소
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="bg-neutral-50 px-4 py-3 text-[14px] text-neutral-800 border border-neutral-200/60 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all placeholder-neutral-400"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold tracking-[0.5px] uppercase text-neutral-400">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-neutral-50 px-4 py-3 text-[14px] text-neutral-800 border border-neutral-200/60 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all placeholder-neutral-400"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-[14px] rounded-xl disabled:opacity-55 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>로그인 중...</span>
              </>
            ) : (
              <span>로그인</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
