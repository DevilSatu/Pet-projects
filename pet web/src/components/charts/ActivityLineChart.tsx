import { Line } from "react-chartjs-2";
import { commonChartOptions } from "../../lib/charts";
import { ActivityPoint } from "../../types/github";
import { trendDirection } from "../../lib/format";
import { TrendBadge } from "../TrendBadge";
import { ChartFrame } from "../ChartFrame";

interface ActivityLineChartProps {
  points: ActivityPoint[];
  label: string;
}

export function ActivityLineChart({ points, label }: ActivityLineChartProps) {
  const direction = trendDirection(points);
  const trendLabel = direction === "up" ? "Activity rising" : direction === "down" ? "Activity cooling" : "Stable trend";

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-300">{label}</p>
        <TrendBadge direction={direction} label={trendLabel} />
      </div>
      <ChartFrame>
        <Line
          data={{
            labels: points.map((point) => point.label),
            datasets: [
              {
                label,
                data: points.map((point) => point.value),
                borderColor: "#2ea043",
                backgroundColor: "rgb(46 160 67 / 0.16)",
                pointBackgroundColor: "#2ea043",
                pointBorderColor: "#010409",
                pointBorderWidth: 2,
                tension: 0.35,
                fill: true,
              },
            ],
          }}
          options={{
            ...commonChartOptions,
            scales: {
              x: { grid: { display: false }, ticks: { color: "#9aa7b5" } },
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
