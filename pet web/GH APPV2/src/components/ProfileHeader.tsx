'use client';

import { GitHubUser } from '@/types';
import Image from 'next/image';

interface Props {
  user: GitHubUser;
}

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="card-base p-6 flex flex-col sm:flex-row items-center gap-6 page-enter">
      <div className="relative">
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={96}
          height={96}
          className="rounded-full border-2 border-github-border"
          unoptimized
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-chart-mint rounded-full border-2 border-github-card" />
      </div>
      <div className="text-center sm:text-left flex-1">
        <h1 className="text-2xl font-bold text-github-text">{user.login}</h1>
        {user.name && (
          <p className="text-github-muted text-sm">{user.name}</p>
        )}
        {user.bio && (
          <p className="text-github-muted text-sm italic mt-1 max-w-md">{user.bio}</p>
        )}
      </div>
      <div className="flex gap-4">
        {[
          { label: 'Repos', value: user.public_repos },
          { label: 'Followers', value: user.followers },
          { label: 'Following', value: user.following },
        ].map((s) => (
          <div key={s.label} className="stat-card min-w-[80px]">
            <span className="text-xl font-bold text-github-text">{s.value.toLocaleString()}</span>
            <span className="text-xs text-github-muted mt-1">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
