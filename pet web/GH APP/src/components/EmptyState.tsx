import { Github } from "lucide-react";

export function EmptyState() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
      <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-6 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2ea043]">Ready</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#e6edf3]">Start with any public GitHub profile.</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          The analyzer combines public profile data, recent repositories, language byte counts, README and package
          signals, events, and commit stats into one responsive dashboard.
        </p>
      </div>
      <div className="grid place-items-center rounded-lg border border-dashed border-[#30363d] bg-[#161b22] p-8">
        <div className="text-center">
          <Github className="mx-auto text-slate-400" size={44} strokeWidth={1.75} />
          <p className="mt-4 text-sm font-medium text-slate-200">No profile loaded yet</p>
          <p className="mt-1 text-xs text-slate-400">Search above to populate all charts.</p>
        </div>
      </div>
    </section>
  );
}
