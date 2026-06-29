"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavTab {
  id: string;
  label: string;
  href: string;
}

const NAV_TABS: NavTab[] = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'project', label: 'Project', href: '/project' },
  { id: 'experience', label: 'Experience', href: '/experience' },
  { id: 'certification', label: 'Certification', href: '/certification' },
  { id: 'search', label: 'Search', href: '/search' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-20 bg-white border-b border-neutral-100"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-[900px] mx-auto px-6 flex items-center gap-0">
        {NAV_TABS.map((tab) => {
          const isActive = pathname === tab.href || (pathname === '/' && tab.id === 'search');
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
