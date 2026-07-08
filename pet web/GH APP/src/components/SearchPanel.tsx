import { FormEvent, useState } from "react";
import { Github, Search } from "lucide-react";
import { ReactNode } from "react";
import { parseGithubInput } from "../lib/format";

interface SearchPanelProps {
  loading: boolean;
  onSearch: (username: string) => void;
  action?: ReactNode;
}

export function SearchPanel({ action, loading, onSearch }: SearchPanelProps) {
  const [value, setValue] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const username = parseGithubInput(value);
    if (username) onSearch(username);
  }

  return (
    <header className="border-b border-[#30363d] bg-[#0d1117]">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 md:grid-cols-[1fr_minmax(360px,520px)] md:items-center lg:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2ea043] text-[#010409]">
              <Github aria-hidden="true" size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2ea043]">GitHub Profile Analyzer</p>
              <h1 className="text-2xl font-semibold tracking-tight text-[#e6edf3]">Repository intelligence in one pass</h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Enter a username or profile URL to inspect activity, stack signals, and recent project health.
          </p>
        </div>

        <div className="grid gap-3">
          {action ? <div className="flex justify-start md:justify-end">{action}</div> : null}
          <form className="flex rounded-lg border border-[#30363d] bg-[#010409] p-1 shadow-sm" onSubmit={submit}>
            <label className="sr-only" htmlFor="github-search">
              GitHub username or URL
            </label>
            <input
              id="github-search"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#e6edf3] outline-none placeholder:text-slate-500 focus:ring-0"
              onChange={(event) => setValue(event.target.value)}
              placeholder="torvalds or github.com/torvalds"
              value={value}
            />
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2ea043] px-4 py-2 text-sm font-semibold text-[#010409] transition hover:bg-[#3fb950] active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#30363d] disabled:text-slate-300"
              disabled={loading}
              type="submit"
            >
              <Search aria-hidden="true" size={16} strokeWidth={2} />
              {loading ? "Fetching" : "Analyze"}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
