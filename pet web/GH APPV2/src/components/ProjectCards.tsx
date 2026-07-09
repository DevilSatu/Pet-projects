'use client';

import { GitHubRepo } from '@/types';
import Link from 'next/link';

interface Props {
  repos: GitHubRepo[];
  username: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
};

export default function ProjectCards({ repos, username }: Props) {
  const top5 = repos.slice(0, 5);

  return (
    <div className="page-enter" style={{ animationDelay: '0.4s' }}>
      <h2 className="section-title">Recent Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {top5.map((repo) => (
          <Link
            key={repo.id}
            href={`/repo/${repo.name}?user=${username}`}
            className="card-hover p-5 flex flex-col gap-3 group"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-github-text group-hover:text-github-accent transition-colors truncate">
                {repo.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-github-muted shrink-0 ml-2">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                  </svg>
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  </svg>
                  {repo.forks_count}
                </span>
              </div>
            </div>
            <p className="text-sm text-github-muted line-clamp-2 flex-1">
              {repo.description || 'No description'}
            </p>
            <div className="flex items-center gap-2 mt-auto">
              {repo.language && (
                <>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[repo.language] || '#8B949E' }}
                  />
                  <span className="text-xs text-github-muted">{repo.language}</span>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
