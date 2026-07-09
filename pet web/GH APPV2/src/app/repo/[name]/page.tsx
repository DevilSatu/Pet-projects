'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { fetchRepoLanguages, fetchCommitActivity } from '@/lib/github';
import Link from 'next/link';

Chart.register(...registerables);

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
  PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Dart: '#00B4AB', Vue: '#41b883',
};

const CHART_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8A5C',
  '#6C5CE7', '#74B9FF', '#FD79A8', '#00CEC9', '#FDCB6E',
];

interface RepoInfo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

export default function RepoDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const repoName = params.name as string;
  const username = searchParams.get('user') || '';

  const [repo, setRepo] = useState<RepoInfo | null>(null);
  const [languages, setLanguages] = useState<{ name: string; bytes: number; pct: number; color: string }[]>([]);
  const [commitActivity, setCommitActivity] = useState<{ week: number; total: number; days: number[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username || !repoName) { router.push('/'); return; }

    let cancelled = false;

    async function load() {
      try {
        const [repoRes, langs, activity] = await Promise.all([
          fetch(`https://api.github.com/repos/${username}/${repoName}`).then(r => r.json()),
          fetchRepoLanguages(username, repoName),
          fetchCommitActivity(username, repoName),
        ]);

        if (cancelled) return;

        setRepo(repoRes);
        setCommitActivity(activity);

        const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0);
        const langArr = Object.entries(langs)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang, bytes], i) => ({
            name: lang,
            bytes,
            pct: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
            color: LANG_COLORS[lang] || CHART_COLORS[i % CHART_COLORS.length],
          }));
        setLanguages(langArr);
        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [username, repoName, router]);

  useEffect(() => {
    if (languages.length === 0) return;
    const canvas = document.getElementById('repo-lang-chart') as HTMLCanvasElement;
    if (!canvas) return;
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: languages.map(l => l.name),
        datasets: [{
          data: languages.map(l => l.pct),
          backgroundColor: languages.map(l => l.color),
          borderColor: '#161B22',
          borderWidth: 3,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '55%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#8B949E', padding: 12, usePointStyle: true, pointStyleWidth: 8, font: { size: 12 } },
          },
          tooltip: {
            backgroundColor: '#161B22', titleColor: '#F0F6FC', bodyColor: '#8B949E',
            borderColor: '#30363D', borderWidth: 1,
            callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` },
          },
        },
      },
    });
  }, [languages]);

  useEffect(() => {
    if (commitActivity.length === 0) return;
    const canvas = document.getElementById('repo-commit-chart') as HTMLCanvasElement;
    if (!canvas) return;
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayTotals = [0, 0, 0, 0, 0, 0, 0];
    commitActivity.forEach(w => {
      w.days.forEach((c, i) => { dayTotals[i] += c; });
    });

    const total = dayTotals.reduce((a, b) => a + b, 0);
    const prev = dayTotals.slice(0, 3).reduce((a, b) => a + b, 0);
    const curr = dayTotals.slice(4).reduce((a, b) => a + b, 0);
    const trend = curr >= prev ? 'up' : 'down';
    const pct = prev > 0 ? Math.round(Math.abs(curr - prev) / prev * 100) : 0;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          data: dayTotals,
          backgroundColor: '#58A6FF99',
          borderColor: '#58A6FF',
          borderWidth: 1,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161B22', titleColor: '#F0F6FC', bodyColor: '#8B949E',
            borderColor: '#30363D', borderWidth: 1,
            callbacks: { label: ctx => `${ctx.parsed.y} commits` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8B949E' } },
          y: { grid: { color: 'rgba(48,54,61,0.4)' }, ticks: { color: '#8B949E' }, beginAtZero: true },
        },
      },
    });
  }, [commitActivity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-github-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-base p-8 text-center">
          <p className="text-github-muted mb-4">Repository not found</p>
          <Link href={`/dashboard?user=${username}`} className="btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const totalCommits = commitActivity.reduce((a, w) => a + w.total, 0);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-github-bg/80 backdrop-blur-md border-b border-github-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link
            href={`/dashboard?user=${username}`}
            className="flex items-center gap-2 text-github-text hover:text-github-accent transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 page-enter">
        <div className="card-base p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-github-text">{repo.name}</h1>
              {repo.description && (
                <p className="text-github-muted mt-1">{repo.description}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm text-github-muted">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANG_COLORS[repo.language] || '#8B949E' }} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>
                  {repo.forks_count}
                </span>
                <span>{totalCommits.toLocaleString()} commits</span>
              </div>
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm whitespace-nowrap"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-base p-6">
            <h3 className="section-title text-sm">Language Distribution</h3>
            <div className="h-[220px]">
              <canvas id="repo-lang-chart" />
            </div>
          </div>
          <div className="card-base p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title text-sm mb-0">Commit Activity by Day</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-github-muted">{totalCommits} total</span>
                {commitActivity.length > 0 && (() => {
                  const recent = commitActivity.slice(-4).reduce((a, w) => a + w.total, 0);
                  const older = commitActivity.slice(-8, -4).reduce((a, w) => a + w.total, 0);
                  const diff = older > 0 ? Math.round(Math.abs(recent - older) / older * 100) : 0;
                  const up = recent >= older;
                  return diff > 0 ? (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${up ? 'bg-chart-mint/20 text-chart-mint' : 'bg-chart-coral/20 text-chart-coral'}`}>
                      {up ? '↑' : '↓'} {diff}%
                    </span>
                  ) : null;
                })()}
              </div>
            </div>
            <div className="h-[220px]">
              <canvas id="repo-commit-chart" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
