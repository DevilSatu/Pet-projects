import { ArrowLeft, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Panel } from "../components/Panel";
import { ProfileOverview } from "../components/ProfileOverview";
import { RepoAnalytics } from "../components/RepoAnalytics";
import { StackAnalysis } from "../components/StackAnalysis";
import { fetchRepoDetails } from "../lib/github";
import { useAnalyzerStore } from "../store/analyzerStore";
import { RepoDetailsData } from "../types/github";

export function ResumePage() {
  const { user, activity, repoAnalyses } = useAnalyzerStore();
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [repoDetails, setRepoDetails] = useState<RepoDetailsData | null>(null);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [repoError, setRepoError] = useState<string | null>(null);

  const featuredRepo = repoAnalyses[0]?.repo;

  useEffect(() => {
    if (!featuredRepo) return;

    let active = true;
    setLoadingRepo(true);
    setRepoError(null);

    fetchRepoDetails(featuredRepo.owner.login, featuredRepo.name)
      .then((details) => {
        if (active) setRepoDetails(details);
      })
      .catch((caught: unknown) => {
        if (active) setRepoError(caught instanceof Error ? caught.message : "Unable to load featured project details.");
      })
      .finally(() => {
        if (active) setLoadingRepo(false);
      });

    return () => {
      active = false;
    };
  }, [featuredRepo]);

  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-[#010409] px-4 py-6 text-[#e6edf3] lg:px-6">
        <main className="mx-auto max-w-3xl">
          <Panel title="Resume not ready" eyebrow="Load profile first">
            <p className="text-sm leading-6 text-slate-300">
              Analyze a GitHub profile first, then use Make resume to generate this page.
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
    <div className="min-h-[100dvh] bg-[#010409] text-[#e6edf3]">
      <header className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:px-6">
          <Link
            className="inline-flex w-fit items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-semibold transition hover:border-[#2ea043] hover:text-[#2ea043] active:translate-y-px"
            to="/"
          >
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
            Back to analyzer
          </Link>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2ea043] text-[#010409]">
              <FileText aria-hidden="true" size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2ea043]">Resume builder</p>
              <h1 className="text-3xl font-semibold tracking-tight">{user.name ?? user.login}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                A profile-backed resume view with editable personal sections.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:px-6">
        <ProfileOverview activity={activity} user={user} />
        <StackAnalysis analyses={repoAnalyses} />

        <section className="grid gap-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2ea043]">Featured project</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Repository Details</h2>
          </div>
          {loadingRepo ? <ResumeRepoLoading /> : null}
          {repoError ? (
            <Panel title="Featured project unavailable" eyebrow="Repository details">
              <p className="text-sm leading-6 text-slate-300">{repoError}</p>
            </Panel>
          ) : null}
          {!loadingRepo && repoDetails ? <RepoAnalytics data={repoDetails} heading={repoDetails.repo.full_name} /> : null}
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <WritableBlock
            label="About me"
            onChange={setAbout}
            placeholder="Write a short professional summary, role focus, background, or goals."
            value={about}
          />
          <WritableBlock
            label="My personal skills"
            onChange={setSkills}
            placeholder="Write your strengths, soft skills, workflow habits, languages, tools, or specialties."
            value={skills}
          />
        </section>
      </main>
    </div>
  );
}

function WritableBlock({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <Panel title={label} eyebrow="Editable">
      <textarea
        className="min-h-48 w-full resize-y rounded-lg border border-[#30363d] bg-[#010409] p-4 text-sm leading-6 text-[#e6edf3] outline-none placeholder:text-slate-500 focus:border-[#2ea043] focus:ring-2 focus:ring-[#2ea043]/30"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </Panel>
  );
}

function ResumeRepoLoading() {
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
