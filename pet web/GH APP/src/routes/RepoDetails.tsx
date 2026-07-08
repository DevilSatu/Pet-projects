import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Panel } from "../components/Panel";
import { RepoAnalytics } from "../components/RepoAnalytics";
import { fetchRepoDetails } from "../lib/github";
import { RepoDetailsData } from "../types/github";

export function RepoDetails() {
  const { owner = "", repo = "" } = useParams();
  const [data, setData] = useState<RepoDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchRepoDetails(owner, repo)
      .then((details) => {
        if (active) setData(details);
      })
      .catch((caught: unknown) => {
        if (active) setError(caught instanceof Error ? caught.message : "Unable to load repository details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [owner, repo]);

  return (
    <div className="min-h-[100dvh] bg-[#010409] text-[#e6edf3]">
      <header className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:px-6">
          <Link
            className="inline-flex w-fit items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-semibold transition hover:border-[#2ea043] hover:text-[#2ea043] active:translate-y-px"
            to="/"
          >
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
            Back to profile
          </Link>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2ea043]">Repository drilldown</p>
            <h1 className="mt-1 break-words text-3xl font-semibold tracking-tight">{owner}/{repo}</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:px-6">
        {loading ? <RepoDetailsLoading /> : null}
        {error ? (
          <Panel title="Repository unavailable" eyebrow="Error">
            <p className="text-sm leading-6 text-slate-300">{error}</p>
          </Panel>
        ) : null}
        {!loading && data ? <RepoAnalytics data={data} /> : null}
      </main>
    </div>
  );
}

function RepoDetailsLoading() {
  return (
    <>
      <Skeleton className="h-52 rounded-lg" />
      <section className="grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-lg lg:col-span-2" />
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
      </section>
    </>
  );
}
