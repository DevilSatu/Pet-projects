import { PropsWithChildren, ReactNode } from "react";

interface PanelProps extends PropsWithChildren {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}

export function Panel({ title, eyebrow, action, className = "", children }: PanelProps) {
  return (
    <section className={`rounded-lg border border-[#30363d] bg-[#0d1117] p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#2ea043]">{eyebrow}</p> : null}
          <h2 className="mt-1 text-lg font-semibold text-[#e6edf3]">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
