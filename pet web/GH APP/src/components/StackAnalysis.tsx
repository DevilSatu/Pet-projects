import { Code2, GitFork, Star } from "lucide-react";
import { GithubRepo, LanguageMap, RepoAnalysis } from "../types/github";
import { compactNumber, readableDate } from "../lib/format";
import { Panel } from "./Panel";
import { LanguagePieChart } from "./charts/LanguagePieChart";
import { TechBarChart } from "./charts/TechBarChart";

interface StackAnalysisProps {
  analyses: RepoAnalysis[];
}

export function StackAnalysis({ analyses }: StackAnalysisProps) {
  const languages = aggregateLanguages(analyses);
  const technologies = aggregateTechnologies(analyses);
  const projects = analyses.slice(0, 5).map((analysis) => analysis.repo);

  return (
    <section className="grid gap-5" id="stack">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Languages Used" eyebrow="Code volume">
          <LanguagePieChart languages={languages} />
        </Panel>
        <Panel title="Frameworks" eyebrow="Technology signals">
          <TechBarChart technologies={technologies} />
        </Panel>
      </div>

      <Panel title="Recent Projects" eyebrow="Click for details">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {projects.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </Panel>
    </section>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <article className="flex min-h-56 flex-col rounded-lg border border-[#30363d] bg-[#161b22] p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-base font-semibold text-[#e6edf3]">{repo.name}</h3>
        <Code2 className="shrink-0 text-slate-400" size={18} strokeWidth={2} />
      </div>
      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-slate-300">
        {repo.description ?? "No description provided."}
      </p>
      <div className="mt-4 grid gap-2 text-xs text-slate-400">
        <span className="font-medium text-[#e6edf3]">{repo.language ?? "Mixed language"}</span>
        <span>Updated {readableDate(repo.updated_at)}</span>
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Star aria-hidden="true" size={14} strokeWidth={2} />
            {compactNumber(repo.stargazers_count)}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork aria-hidden="true" size={14} strokeWidth={2} />
            {compactNumber(repo.forks_count)}
          </span>
        </span>
      </div>
    </article>
  );
}

function aggregateLanguages(analyses: RepoAnalysis[]): LanguageMap {
  const result: LanguageMap = {};
  for (const analysis of analyses) {
    for (const [language, bytes] of Object.entries(analysis.languages)) {
      result[language] = (result[language] ?? 0) + bytes;
    }
  }
  return Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1]).slice(0, 5));
}

function aggregateTechnologies(analyses: RepoAnalysis[]) {
  const counts = new Map<string, number>();
  for (const analysis of analyses) {
    for (const technology of analysis.technologies) {
      counts.set(technology, (counts.get(technology) ?? 0) + 1);
    }
  }
  return Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
