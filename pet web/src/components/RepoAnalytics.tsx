import { ExternalLink, GitCommitHorizontal } from "lucide-react";
import { CommitDayBarChart } from "./charts/CommitDayBarChart";
import { CommitLineChart } from "./charts/CommitLineChart";
import { LanguagePieChart } from "./charts/LanguagePieChart";
import { Panel } from "./Panel";
import { compactNumber, readableDate } from "../lib/format";
import { RepoDetailsData } from "../types/github";

interface RepoAnalyticsProps {
  data: RepoDetailsData;
  heading?: string;
}

export function RepoAnalytics({ data, heading }: RepoAnalyticsProps) {
  const { repo, commits, languages } = data;

  return (
    <>
      <section className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <Panel
          title={heading ?? repo.full_name}
          eyebrow="Repository metrics"
          action={
            <a
              className="inline-flex items-center gap-2 rounded-md bg-[#2ea043] px-3 py-2 text-sm font-semibold text-[#010409] transition hover:bg-[#3fb950] active:translate-y-px"
              href={repo.html_url}
              rel="noreferrer"
              target="_blank"
            >
              Open
              <ExternalLink aria-hidden="true" size={15} strokeWidth={2} />
            </a>
          }
        >
          <p className="max-w-3xl text-sm leading-6 text-slate-300">{repo.description ?? "No description provided."}</p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-4">
            <Metric label="Stars" value={compactNumber(repo.stargazers_count)} />
            <Metric label="Forks" value={compactNumber(repo.forks_count)} />
            <Metric label="Issues" value={compactNumber(repo.open_issues_count)} />
            <Metric label="Updated" value={readableDate(repo.updated_at)} />
          </dl>
        </Panel>

        <Panel title="Commit Sample" eyebrow="Recent commits">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#161b22] text-[#2ea043]">
              <GitCommitHorizontal aria-hidden="true" size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-3xl font-semibold">{commits.length}</p>
              <p className="text-sm text-slate-300">Recent commits analyzed</p>
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title="Commit Character Count Over Time" eyebrow="Change Trend" className="lg:col-span-2">
          <CommitLineChart commits={commits} />
        </Panel>
        <Panel title="Language Distribution" eyebrow="Languages Used">
          <LanguagePieChart languages={languages} />
        </Panel>
        <Panel title="Commit Activity by Day" eyebrow="Commit Frequency">
          <CommitDayBarChart commits={commits} />
        </Panel>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-3">
      <dt className="text-xs font-medium text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-[#e6edf3]">{value}</dd>
    </div>
  );
}
