import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

interface TrendBadgeProps {
  direction: "up" | "down" | "flat";
  label: string;
}

export function TrendBadge({ direction, label }: TrendBadgeProps) {
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : ArrowRight;
  const tone =
    direction === "up"
      ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-200"
      : direction === "down"
        ? "border-orange-400/40 bg-orange-400/15 text-orange-200"
        : "border-[#30363d] bg-[#161b22] text-slate-200";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>
      <Icon aria-hidden="true" size={14} strokeWidth={2} />
      {label}
    </span>
  );
}
