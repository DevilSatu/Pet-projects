import { FallbackProps } from "react-error-boundary";

export function AppError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <main className="min-h-[100dvh] bg-[#010409] px-4 py-8 text-[#e6edf3]">
      <section className="mx-auto max-w-2xl rounded-lg border border-[#30363d] bg-[#0d1117] p-6 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#2ea043]">Application error</p>
        <h1 className="mt-3 text-2xl font-semibold">Something broke while rendering the analyzer.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">{error.message}</p>
        <button
          className="mt-6 rounded-md bg-[#2ea043] px-4 py-2 text-sm font-semibold text-[#010409] transition hover:bg-[#3fb950] active:translate-y-px"
          onClick={resetErrorBoundary}
          type="button"
        >
          Reset
        </button>
      </section>
    </main>
  );
}
