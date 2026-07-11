"use client";

import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import Link from 'next/link';

interface AuthButtonProps {
  isLoggedIn: boolean;
}

export default function AuthButton({ isLoggedIn }: AuthButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="px-4.5 py-2 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 transition-colors text-[13px] font-medium cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
        style={{ borderRadius: '20px' }}
      >
        로그아웃
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="px-4.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white transition-colors text-[13px] font-medium cursor-pointer inline-block shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
      style={{ borderRadius: '20px' }}
    >
      로그인
    </Link>
  );
}
