'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const clean = username.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '').replace(/\/$/, '').trim();
      const res = await fetch(`https://api.github.com/users/${clean}`);
      if (!res.ok) throw new Error('User not found');
      router.push(`/dashboard?user=${clean}`);
    } catch {
      setError('GitHub user not found. Please check the username.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full page-enter">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-github-accentDark to-chart-purple mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-github-text to-github-muted bg-clip-text text-transparent">
            GitHub Profile Analyzer
          </h1>
          <p className="text-github-muted text-lg">
            Analyze any GitHub profile. Build a professional resume from your contributions.
          </p>
        </div>

        <div className="card-base p-8">
          <label htmlFor="username" className="block text-sm font-medium text-github-muted mb-2">
            GitHub Username or Profile URL
          </label>
          <div className="flex gap-3">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="e.g. octocat or https://github.com/octocat"
              className="input-base flex-1"
              disabled={isLoading}
            />
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-sm text-chart-coral">{error}</p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Languages', icon: '{}' },
            { label: 'Contributions', icon: '|||' },
            { label: 'Resume Export', icon: 'PDF' },
          ].map((f) => (
            <div key={f.label} className="card-base py-4">
              <div className="text-github-accent font-mono text-lg font-bold mb-1">{f.icon}</div>
              <div className="text-xs text-github-muted">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
