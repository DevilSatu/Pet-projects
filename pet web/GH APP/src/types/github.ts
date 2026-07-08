export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string | null;
  topics?: string[];
  default_branch: string;
}

export interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
  };
}

export type LanguageMap = Record<string, number>;

export interface RepoAnalysis {
  repo: GithubRepo;
  languages: LanguageMap;
  readme: string;
  packageJson: Record<string, unknown> | null;
  technologies: string[];
}

export interface ActivityPoint {
  label: string;
  value: number;
}
