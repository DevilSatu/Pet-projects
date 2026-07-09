'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { GitHubUser, GitHubRepo, LanguageStat, TechFramework } from '@/types';
import {
  fetchUser, fetchRepos, fetchRepoLanguages, fetchContributions,
  computeLanguages, computeFrameworks,
} from '@/lib/github';
import TopBar from '@/components/TopBar';
import ProfileHeader from '@/components/ProfileHeader';
import ContributionChart from '@/components/ContributionChart';
import LanguageChart from '@/components/LanguageChart';
import FrameworkChart from '@/components/FrameworkChart';
import ProjectCards from '@/components/ProjectCards';
import LoadingSkeleton from '@/components/LoadingSkeleton';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get('user') || '';

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [frameworks, setFrameworks] = useState<TechFramework[]>([]);
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      router.push('/');
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const [userData, reposData, contribData] = await Promise.all([
          fetchUser(username),
          fetchRepos(username),
          fetchContributions(username),
        ]);

        if (cancelled) return;
        setUser(userData);
        setRepos(reposData);
        setContributions(contribData);

        const langMap: Record<string, Record<string, number>> = {};
        await Promise.all(
          reposData.slice(0, 30).map(async (repo) => {
            const langs = await fetchRepoLanguages(username, repo.name);
            if (!cancelled) langMap[repo.name] = langs;
          })
        );

        if (cancelled) return;
        setLanguages(computeLanguages(reposData, langMap));
        setFrameworks(computeFrameworks(reposData));
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError('Failed to load profile data. Please try again.');
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [username, router]);

  if (!username) return null;

  if (loading) return <LoadingSkeleton username={username} />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-base p-8 text-center max-w-md">
          <div className="text-chart-coral text-4xl mb-4">!</div>
          <h2 className="text-xl font-semibold text-github-text mb-2">Something went wrong</h2>
          <p className="text-github-muted mb-6">{error}</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar username={username} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {user && <ProfileHeader user={user} />}
        <ContributionChart contributions={contributions} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.length > 0 && <LanguageChart languages={languages} />}
          {frameworks.length > 0 && <FrameworkChart frameworks={frameworks} />}
          {repos.length > 0 && (
            <div className="lg:col-span-1">
              <ProjectCards repos={repos} username={username} />
            </div>
          )}
        </div>
        {repos.length > 5 && (
          <ProjectCards repos={repos.slice(5)} username={username} />
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton username="" />}>
      <DashboardContent />
    </Suspense>
  );
}
