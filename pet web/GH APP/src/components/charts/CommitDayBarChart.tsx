import { Bar } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import { GithubCommit } from "../../types/github";
import { commonChartOptions } from "../../lib/charts";
import { ChartFrame } from "../ChartFrame";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CommitDayBarChart({ commits }: { commits: GithubCommit[] }) {
  const counts = new Map(days.map((day) => [day, 0]));
  for (const commit of commits) {
    const day = format(parseISO(commit.commit.author.date), "EEE");
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  return (
    <ChartFrame>
      <Bar
        data={{
          labels: days,
          datasets: [
            {
              label: "Commits",
              data: days.map((day) => counts.get(day) ?? 0),
              backgroundColor: "#2ea043",
              borderRadius: 7,
              maxBarThickness: 42,
            },
          ],
        }}
        options={{
          ...commonChartOptions,
          scales: {
            x: { grid: { display: false }, ticks: { color: "#e7edf5" } },
            y: { beginAtZero: true, grid: { color: "rgb(255 255 255 / 0.08)" }, ticks: { precision: 0, color: "#9aa7b5" } },
          },
          plugins: {
            ...commonChartOptions.plugins,
            datalabels: {
              anchor: "end",
              align: "top",
              color: "#e7edf5",
              formatter: (value: number) => value || "",
              font: { weight: "bold" },
            },
          },
        }}
      />
    </ChartFrame>
  );
}
