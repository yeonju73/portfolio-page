import React from 'react';
import Navigation from '../components/Navigation';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'profile',
  description: '박연주의 포트폴리오 프로필 페이지입니다.',
  icons: {
    icon: '/favicon.svg',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        {/* Subtle grid background */}
        <div
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Navigation */}
        <Navigation />

        {/* Page Content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
