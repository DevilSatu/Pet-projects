import { CalendarDays, ExternalLink, MapPin, Users } from "lucide-react";
import { GithubUser, ActivityPoint } from "../types/github";
import { compactNumber, readableDate } from "../lib/format";
import { Panel } from "./Panel";
import { ActivityLineChart } from "./charts/ActivityLineChart";

interface ProfileOverviewProps {
  user: GithubUser;
  activity: ActivityPoint[];
}

export function ProfileOverview({ user, activity }: ProfileOverviewProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[360px_1fr]" id="overview">
      <Panel title="Profile Summary" eyebrow="Public account">
        <div className="flex items-start gap-4">
          <img
            alt={`${user.login} avatar`}
            className="h-20 w-20 rounded-lg border border-[#30363d]"
            height={80}
            src={user.avatar_url}
            width={80}
          />
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-semibold tracking-tight">{user.name ?? user.login}</h2>
            <a
              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#2ea043] hover:underline"
              href={user.html_url}
              rel="noreferrer"
              target="_blank"
            >
              @{user.login}
              <ExternalLink aria-hidden="true" size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

        <p className="mt-5 min-h-12 text-sm leading-6 text-slate-300">{user.bio ?? "No public bio available."}</p>

        <dl className="mt-6 grid grid-cols-3 gap-2">
          <Metric label="Repos" value={compactNumber(user.public_repos)} />
          <Metric label="Followers" value={compactNumber(user.followers)} />
          <Metric label="Following" value={compactNumber(user.following)} />
        </dl>

        <div className="mt-6 grid gap-3 border-t border-[#30363d] pt-5 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden="true" size={16} strokeWidth={2} />
            Joined {readableDate(user.created_at)}
          </span>
          {user.location ? (
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" size={16} strokeWidth={2} />
              {user.location}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <Users aria-hidden="true" size={16} strokeWidth={2} />
            Public profile analytics
          </span>
        </div>
      </Panel>

      <Panel title="Activity Trend" eyebrow="Six month signal">
        <ActivityLineChart label="Public events and push commits" points={activity} />
      </Panel>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-3">
      <dt className="text-xs font-medium text-slate-400">{label}</dt>
      <dd className="mt-1 text-xl font-semibold text-[#e6edf3]">{value}</dd>
    </div>
  );
}
