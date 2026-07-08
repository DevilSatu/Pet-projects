import axios, { AxiosError } from "axios";
import { format, parseISO, subMonths } from "date-fns";
import {
  ActivityPoint,
  GithubCommit,
  GithubEvent,
  GithubRepo,
  GithubUser,
  LanguageMap,
  RepoAnalysis,
  RepoDetailsData,
} from "../types/github";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: import.meta.env.VITE_GITHUB_TOKEN
    ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
    : {},
});

const cache = new Map<string, { expires: number; value: unknown }>();
const ttl = 1000 * 60 * 20;

async function cached<T>(key: string, loader: () => Promise<T>) {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  const value = await loader();
  cache.set(key, { expires: Date.now() + ttl, value });
  return value;
}

function githubError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) return "GitHub could not find that user or repository.";
    if (error.response?.status === 403) {
      const reset = error.response.headers["x-ratelimit-reset"];
      const resetText = reset
        ? ` Try again after ${format(Number(reset) * 1000, "MMM d, h:mm a")}.`
        : "";
      return `GitHub API rate limit reached.${resetText} Add VITE_GITHUB_TOKEN to raise the limit.`;
    }
  }
  return "GitHub request failed. Check the username and your connection.";
}

export async function fetchProfileBundle(username: string) {
  try {
    return await cached(`profile:${username}`, async () => {
      const [userRes, reposRes, eventsRes] = await Promise.all([
        api.get<GithubUser>(`/users/${username}`),
        api.get<GithubRepo[]>(`/users/${username}/repos`, {
          params: { sort: "updated", per_page: 10, direction: "desc" },
        }),
        api.get<GithubEvent[]>(`/users/${username}/events`, {
          params: { per_page: 100 },
        }),
      ]);

      const repoAnalyses = await Promise.all(
        reposRes.data.map((repo) => fetchRepoAnalysis(repo.owner.login, repo.name, repo)),
      );

      return {
        user: userRes.data,
        repos: reposRes.data,
        repoAnalyses,
        activity: buildActivity(eventsRes.data),
      };
    });
  } catch (error) {
    throw new Error(githubError(error));
  }
}

export async function fetchRepoAnalysis(owner: string, repo: string, baseRepo?: GithubRepo) {
  return cached<RepoAnalysis>(`repo-analysis:${owner}/${repo}`, async () => {
    const repoPromise = baseRepo ? Promise.resolve({ data: baseRepo }) : api.get<GithubRepo>(`/repos/${owner}/${repo}`);
    const [repoRes, languages, readme, packageJson] = await Promise.all([
      repoPromise,
      fetchLanguages(owner, repo),
      fetchReadme(owner, repo),
      fetchPackageJson(owner, repo),
    ]);

    return {
      repo: repoRes.data,
      languages,
      readme,
      packageJson,
      technologies: detectTechnologies(repoRes.data, readme, packageJson),
    };
  });
}

export async function fetchRepoDetails(owner: string, repo: string): Promise<RepoDetailsData> {
  try {
    return await cached(`repo-details:${owner}/${repo}`, async () => {
      const [repoRes, languages, commits] = await Promise.all([
        api.get<GithubRepo>(`/repos/${owner}/${repo}`),
        fetchLanguages(owner, repo),
        fetchCommits(owner, repo),
      ]);
      return { repo: repoRes.data, languages, commits };
    });
  } catch (error) {
    throw new Error(githubError(error));
  }
}

async function fetchLanguages(owner: string, repo: string) {
  try {
    const response = await api.get<LanguageMap>(`/repos/${owner}/${repo}/languages`);
    return response.data;
  } catch {
    return {};
  }
}

async function fetchReadme(owner: string, repo: string) {
  try {
    const response = await api.get<{ content: string; encoding: string }>(`/repos/${owner}/${repo}/readme`);
    if (response.data.encoding !== "base64") return "";
    return atob(response.data.content.replace(/\n/g, ""));
  } catch {
    return "";
  }
}

async function fetchPackageJson(owner: string, repo: string) {
  try {
    const response = await api.get<{ content: string; encoding: string }>(
      `/repos/${owner}/${repo}/contents/package.json`,
    );
    if (response.data.encoding !== "base64") return null;
    return JSON.parse(atob(response.data.content.replace(/\n/g, ""))) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function fetchCommits(owner: string, repo: string) {
  const list = await api.get<GithubCommit[]>(`/repos/${owner}/${repo}/commits`, {
    params: { per_page: 30 },
  });

  const detailed = await Promise.all(
    list.data.slice(0, 10).map(async (commit) => {
      try {
        const response = await api.get<GithubCommit>(`/repos/${owner}/${repo}/commits/${commit.sha}`);
        return response.data;
      } catch {
        return commit;
      }
    }),
  );

  return detailed.reverse();
}

function buildActivity(events: GithubEvent[]): ActivityPoint[] {
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = subMonths(new Date(), 5 - index);
    return { key: format(date, "yyyy-MM"), label: format(date, "MMM"), value: 0 };
  });

  for (const event of events) {
    const key = format(parseISO(event.created_at), "yyyy-MM");
    const month = months.find((item) => item.key === key);
    if (!month) continue;
    month.value += event.type === "PushEvent" ? event.payload.commits?.length ?? 1 : 1;
  }

  return months.map(({ label, value }) => ({ label, value }));
}

const techMatchers: Array<{ name: string; tests: string[] }> = [
  { name: "React", tests: ["react", "vite", "next"] },
  { name: "Node.js", tests: ["node", "express", "fastify", "nestjs"] },
  { name: "Django", tests: ["django", "djangorestframework"] },
  { name: "Flask", tests: ["flask"] },
  { name: "Vue", tests: ["vue", "nuxt"] },
  { name: "Angular", tests: ["angular"] },
  { name: "Tailwind", tests: ["tailwindcss", "tailwind"] },
  { name: "TypeScript", tests: ["typescript", "tsconfig"] },
  { name: "Docker", tests: ["docker", "dockerfile", "compose"] },
  { name: "GraphQL", tests: ["graphql", "apollo"] },
  { name: "Prisma", tests: ["prisma"] },
  { name: "PostgreSQL", tests: ["postgres", "postgresql", "pg"] },
  { name: "MongoDB", tests: ["mongodb", "mongoose"] },
  { name: "Laravel", tests: ["laravel"] },
  { name: "Spring", tests: ["spring-boot", "spring"] },
];

function detectTechnologies(repo: GithubRepo, readme: string, packageJson: Record<string, unknown> | null) {
  const deps = packageJson ? collectPackageNames(packageJson).join(" ") : "";
  const haystack = `${repo.topics?.join(" ") ?? ""} ${repo.description ?? ""} ${readme} ${deps}`.toLowerCase();
  return techMatchers
    .filter((matcher) => matcher.tests.some((test) => haystack.includes(test)))
    .map((matcher) => matcher.name);
}

function collectPackageNames(packageJson: Record<string, unknown>) {
  const names: string[] = [];
  for (const key of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    const group = packageJson[key];
    if (group && typeof group === "object" && !Array.isArray(group)) {
      names.push(...Object.keys(group));
    }
  }
  return names;
}
