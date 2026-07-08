import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import { GithubCommit } from "../../types/github";
import { commonChartOptions } from "../../lib/charts";
import { trendDirection } from "../../lib/format";
import { TrendBadge } from "../TrendBadge";
import { ChartFrame } from "../ChartFrame";

interface CommitLineChartProps {
  commits: GithubCommit[];
}

export function CommitLineChart({ commits }: CommitLineChartProps) {
  const points = commits.map((commit) => ({
    label: format(parseISO(commit.commit.author.date), "MMM d"),
    value: commit.stats?.total ?? commit.commit.message.length,
  }));
  const direction = trendDirection(points);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-300">Additions plus deletions per recent commit</p>
        <TrendBadge
          direction={direction}
          label={direction === "up" ? "Larger changes" : direction === "down" ? "Smaller changes" : "Even changes"}
        />
      </div>
      <ChartFrame>
        <Line
          data={{
            labels: points.map((point) => point.label),
            datasets: [
              {
                label: "Character change proxy",
                data: points.map((point) => point.value),
                borderColor: "#d18b16",
                backgroundColor: "rgb(209 139 22 / 0.16)",
                pointBackgroundColor: "#d18b16",
                pointBorderColor: "#010409",
                pointBorderWidth: 2,
                tension: 0.3,
                fill: true,
              },
            ],
          }}
          options={{
            ...commonChartOptions,
            scales: {
              x: { grid: { display: false }, ticks: { color: "#9aa7b5", maxRotation: 0, autoSkip: true } },
              y: { beginAtZero: true, grid: { color: "rgb(255 255 255 / 0.08)" }, ticks: { precision: 0, color: "#9aa7b5" } },
            },
            plugins: {
              ...commonChartOptions.plugins,
              datalabels: { display: false },
            },
          }}
        />
      </ChartFrame>
    </div>
  );
}
