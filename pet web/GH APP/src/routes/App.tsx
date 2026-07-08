import { AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { LoadingDashboard } from "../components/LoadingDashboard";
import { ProfileOverview } from "../components/ProfileOverview";
import { SearchPanel } from "../components/SearchPanel";
import { StackAnalysis } from "../components/StackAnalysis";
import { useAnalyzerStore } from "../store/analyzerStore";

export function App() {
  const { user, activity, repoAnalyses, loading, error, loadUser, clearError } = useAnalyzerStore();

  return (
    <div className="min-h-[100dvh] bg-[#010409] text-[#e6edf3]">
      <SearchPanel
        action={
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm font-semibold text-[#e6edf3] transition hover:border-[#2ea043] hover:text-[#2ea043] active:translate-y-px"
            to="/resume"
          >
            <FileText aria-hidden="true" size={16} strokeWidth={2} />
            Create Resume
          </Link>
        }
        loading={loading}
        onSearch={loadUser}
      />
      {error ? (
        <div className="mx-auto max-w-7xl px-4 pt-5 lg:px-6">
          <div className="flex items-start gap-3 rounded-lg border border-orange-400/40 bg-orange-400/15 p-4 text-sm text-orange-100">
            <AlertCircle className="mt-0.5 shrink-0" size={18} strokeWidth={2} />
            <div className="flex-1">
              <p className="font-semibold">Unable to load profile</p>
              <p className="mt-1">{error}</p>
            </div>
            <button className="font-semibold hover:underline" onClick={clearError} type="button">
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      {loading ? <LoadingDashboard /> : null}
      {!loading && !user ? <EmptyState /> : null}
      {!loading && user ? (
        <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:px-6">
          <ProfileOverview activity={activity} user={user} />
          <StackAnalysis analyses={repoAnalyses} />
        </main>
      ) : null}
    </div>
  );
}
