import {
  ArrowLeft,
  CalendarClock,
  Code2,
  Download,
  FileText,
  FolderGit2,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Panel } from "../components/Panel";
import { compactNumber, percent, readableDate } from "../lib/format";
import { useAnalyzerStore } from "../store/analyzerStore";
import { GithubRepo, LanguageMap, RepoAnalysis } from "../types/github";

export function ResumePage() {
  const { user, repos, repoAnalyses } = useAnalyzerStore();
  const [about, setAbout] = useState("");
  const [exportingPdf, setExportingPdf] = useState(false);

  const resumeSignals = useMemo(() => buildResumeSignals(repoAnalyses), [repoAnalyses]);
  const recentRepos = repos.slice(0, 5);

  function exportAsPdf() {
    if (!user || exportingPdf) return;

    setExportingPdf(true);
    const previousTitle = document.title;
    const safeName = (user.name ?? user.login).replace(/[\\/:*?"<>|]/g, "").trim() || user.login;

    document.title = `${safeName} GitHub Resume`;
    const finishExport = () => {
      document.title = previousTitle;
      setExportingPdf(false);
      window.removeEventListener("afterprint", finishExport);
    };

    window.addEventListener("afterprint", finishExport);
    window.requestAnimationFrame(() => {
      window.print();
      window.setTimeout(finishExport, 1000);
    });
  }

  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-[#010409] px-4 py-6 text-[#e6edf3] lg:px-6">
        <main className="mx-auto max-w-3xl">
          <Panel title="Resume not ready" eyebrow="Load profile first">
            <p className="text-sm leading-6 text-slate-300">
              Analyze a GitHub profile first, then open Create Resume to generate this page.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#2ea043] px-4 py-2 text-sm font-semibold text-[#010409] transition hover:bg-[#3fb950] active:translate-y-px"
              to="/"
            >
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
              Back to analyzer
            </Link>
          </Panel>
        </main>
      </div>
    );
  }

  return (
    <div className="printable-resume min-h-[100dvh] bg-[#010409] text-[#e6edf3]">
      <header className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:px-6">
          <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-semibold transition hover:border-[#2ea043] hover:text-[#2ea043] active:translate-y-px"
              to="/"
            >
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
              Back to analyzer
            </Link>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-semibold transition hover:border-[#2ea043] hover:text-[#2ea043]"
                href={user.html_url}
                rel="noreferrer"
                target="_blank"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2ea043] text-[#010409]">
              <FileText aria-hidden="true" size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2ea043]">Resume builder</p>
              <h1 className="text-3xl font-semibold tracking-tight">{user.name ?? user.login}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                GitHub-derived stack, language, and project stats with editable personal resume blocks.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:px-6">
        <Panel title="About Me" eyebrow="Editable">
          <textarea
            className="no-print min-h-44 w-full resize-y rounded-lg border border-[#30363d] bg-[#010409] p-4 text-sm leading-6 text-[#e6edf3] outline-none placeholder:text-slate-500 focus:border-[#2ea043] focus:ring-2 focus:ring-[#2ea043]/30"
            onChange={(event) => setAbout(event.target.value)}
            placeholder="Write a short professional summary, role focus, background, or career goals."
            value={about}
          />
          <p className="print-only whitespace-pre-wrap text-sm leading-6 text-slate-700">{about}</p>
        </Panel>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Panel title="Recent Projects" eyebrow="Last 5 repositories">
            <div className="grid gap-3">
              {recentRepos.length ? (
                recentRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />)
              ) : (
                <p className="text-sm leading-6 text-slate-300">No public repositories were returned for this profile.</p>
              )}
            </div>
          </Panel>

          <Panel title="Public Account" eyebrow="GitHub profile">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <StatTile icon={<FolderGit2 size={18} strokeWidth={2} />} label="Public repos" value={user.public_repos} />
              <StatTile icon={<Star size={18} strokeWidth={2} />} label="Stars earned" value={resumeSignals.totalStars} />
              <StatTile icon={<Code2 size={18} strokeWidth={2} />} label="Repositories scanned" value={repoAnalyses.length} />
            </div>
          </Panel>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <Panel title="Top Languages" eyebrow="Array from repositories">
            <LanguageArray languages={resumeSignals.languages} />
          </Panel>

          <Panel title="Tech Stack" eyebrow="Array from repositories">
            <TechnologyArray technologies={resumeSignals.technologies} />
          </Panel>
        </section>

        <div className="no-print flex justify-end pt-2">
          <button
            className="inline-flex w-fit items-center gap-2 rounded-md bg-[#2ea043] px-5 py-3 text-sm font-semibold text-[#010409] transition hover:bg-[#3fb950] active:translate-y-px disabled:cursor-wait disabled:bg-[#30363d] disabled:text-slate-300"
            disabled={exportingPdf}
            onClick={exportAsPdf}
            type="button"
          >
            <Download aria-hidden="true" size={16} strokeWidth={2} />
            {exportingPdf ? "Preparing PDF" : "Export as PDF"}
          </button>
        </div>
      </main>
    </div>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
      <div className="flex items-center gap-2 text-[#2ea043]">{icon}</div>
      <p className="mt-3 text-2xl font-semibold text-[#e6edf3]">{compactNumber(value)}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">{label}</p>
    </div>
  );
}

function RepoRow({ repo }: { repo: GithubRepo }) {
  return (
    <a
      className="grid gap-2 rounded-lg border border-[#30363d] bg-[#161b22] p-3 transition hover:border-[#2ea043] hover:bg-[#0d1117]"
      href={repo.html_url}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#e6edf3]">{repo.name}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{repo.description ?? "No description provided."}</p>
        </div>
        <span className="shrink-0 text-xs font-medium text-[#2ea043]">{repo.language ?? "Mixed"}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <CalendarClock aria-hidden="true" size={14} strokeWidth={2} />
          Updated {readableDate(repo.updated_at)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star aria-hidden="true" size={14} strokeWidth={2} />
          {compactNumber(repo.stargazers_count)}
        </span>
      </div>
    </a>
  );
}

function LanguageArray({ languages }: { languages: Array<{ name: string; bytes: number }> }) {
  const total = languages.reduce((sum, language) => sum + language.bytes, 0);

  if (!languages.length) return <p className="text-sm leading-6 text-slate-300">[]</p>;

  const arrayText = `[${languages.map((language) => `"${language.name}"`).join(", ")}]`;

  return (
    <div className="grid gap-4">
      <code className="block overflow-x-auto rounded-lg border border-[#30363d] bg-[#010409] p-4 text-sm font-semibold leading-7 text-[#e6edf3]">
        {arrayText}
      </code>
      <div className="grid gap-2">
        {languages.map((language) => (
          <div key={language.name} className="flex items-center justify-between gap-3 rounded-md bg-[#161b22] px-3 py-2 text-sm">
            <span className="font-semibold text-[#e6edf3]">{language.name}</span>
            <span className="text-slate-400">{percent(language.bytes, total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnologyArray({ technologies }: { technologies: Array<{ name: string; count: number }> }) {
  if (!technologies.length) return <p className="text-sm leading-6 text-slate-300">[]</p>;

  const arrayText = `[${technologies.map((technology) => `"${technology.name}"`).join(", ")}]`;

  return (
    <div className="grid gap-4">
      <code className="block overflow-x-auto rounded-lg border border-[#30363d] bg-[#010409] p-4 text-sm font-semibold leading-7 text-[#e6edf3]">
        {arrayText}
      </code>
      <div className="flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology.name}
            className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-medium text-[#e6edf3]"
          >
            {technology.name}
            <span className="rounded bg-[#010409] px-2 py-0.5 text-xs text-slate-400">
              {technology.count} {technology.count === 1 ? "repo" : "repos"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function buildResumeSignals(analyses: RepoAnalysis[]) {
  const languageCounts: LanguageMap = {};
  const technologyCounts = new Map<string, number>();
  let totalStars = 0;

  for (const analysis of analyses) {
    totalStars += analysis.repo.stargazers_count;

    for (const [language, bytes] of Object.entries(analysis.languages)) {
      languageCounts[language] = (languageCounts[language] ?? 0) + bytes;
    }

    for (const technology of analysis.technologies) {
      technologyCounts.set(technology, (technologyCounts.get(technology) ?? 0) + 1);
    }
  }

  return {
    languages: Object.entries(languageCounts)
      .map(([name, bytes]) => ({ name, bytes }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 5),
    technologies: Array.from(technologyCounts, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 8),
    totalStars,
  };
}
