"use client";

import Link from 'next/link';

interface NavTab {
  id: string;
  label: string;
  href: string;
}

const NAV_TABS: NavTab[] = [
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'search', label: 'Search', href: '/#search' },
  { id: 'project', label: 'Projects', href: '/#project' },
  { id: 'experience', label: 'Experiences', href: '/#experience' },
  { id: 'certification', label: 'Certifications', href: '/#certification' },
  { id: 'blog', label: 'Blog', href: '/blog' },
];

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  return (
    <nav
      className="sticky top-0 z-20 bg-white/80 border-b border-neutral-100 backdrop-blur-md"
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-end gap-0">
        {NAV_TABS.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`px-4 py-4 text-[13px] font-medium tracking-[-0.1px] transition-colors duration-150 border-b-2 -mb-px ${
                isActive
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
