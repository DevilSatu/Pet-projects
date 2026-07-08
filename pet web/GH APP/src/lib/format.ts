import { format, parseISO } from "date-fns";

export function parseGithubInput(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    if (url.hostname.includes("github.com")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }
  } catch {
    return trimmed.replace(/^@/, "").split("/")[0];
  }

  return trimmed.replace(/^@/, "").split("/")[0];
}

export function compactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function percent(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export function readableDate(date: string) {
  return format(parseISO(date), "MMM d, yyyy");
}

export function trendDirection(points: Array<{ value: number }>) {
  if (points.length < 2) return "flat";
  const firstHalf = points.slice(0, Math.ceil(points.length / 2));
  const secondHalf = points.slice(Math.floor(points.length / 2));
  const firstAvg = average(firstHalf.map((point) => point.value));
  const secondAvg = average(secondHalf.map((point) => point.value));
  if (secondAvg > firstAvg * 1.08) return "up";
  if (secondAvg < firstAvg * 0.92) return "down";
  return "flat";
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
