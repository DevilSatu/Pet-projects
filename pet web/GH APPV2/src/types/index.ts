export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

export interface LanguageStat {
  language: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface TechFramework {
  name: string;
  count: number;
  color: string;
}

export interface RepoActivity {
  date: string;
  additions: number;
  deletions: number;
  total: number;
}

export interface ResumeData {
  skills: { name: string; rating: number }[];
  aboutMe: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}
