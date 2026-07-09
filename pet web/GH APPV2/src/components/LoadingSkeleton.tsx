'use client';

import Link from 'next/link';

interface Props {
  username: string;
}

export default function LoadingSkeleton({ username }: Props) {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-github-bg/80 backdrop-blur-md border-b border-github-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-github-text">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="font-semibold text-sm hidden sm:inline">GitHub Analyzer</span>
          </Link>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="card-base p-6 flex items-center gap-6 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-github-hover" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-32 bg-github-hover rounded" />
            <div className="h-4 w-48 bg-github-hover rounded" />
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="stat-card min-w-[80px] animate-pulse">
                <div className="h-6 w-12 bg-github-hover rounded" />
                <div className="h-3 w-14 bg-github-hover rounded mt-2" />
              </div>
            ))}
          </div>
        </div>
        <div className="card-base p-6 h-[300px] animate-pulse">
          <div className="h-5 w-40 bg-github-hover rounded mb-4" />
          <div className="h-full bg-github-hover rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-base p-6 h-[300px] animate-pulse">
              <div className="h-5 w-32 bg-github-hover rounded mb-4" />
              <div className="h-full bg-github-hover rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
