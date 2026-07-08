import { Bar } from "react-chartjs-2";
import { commonChartOptions } from "../../lib/charts";
import { ChartFrame } from "../ChartFrame";

interface TechBarChartProps {
  technologies: Array<{ name: string; count: number }>;
}

export function TechBarChart({ technologies }: TechBarChartProps) {
  if (!technologies.length) {
    return <div className="grid h-72 place-items-center text-center text-sm text-slate-400">No framework signals found.</div>;
  }

  return (
    <ChartFrame>
      <Bar
        data={{
          labels: technologies.map((item) => item.name),
          datasets: [
            {
              label: "Detected repositories",
              data: technologies.map((item) => item.count),
              backgroundColor: "#1aa6b7",
              borderRadius: 7,
              maxBarThickness: 44,
            },
          ],
        }}
        options={{
          ...commonChartOptions,
          indexAxis: "y",
          scales: {
            x: { beginAtZero: true, grid: { color: "rgb(255 255 255 / 0.08)" }, ticks: { precision: 0, color: "#9aa7b5" } },
            y: { grid: { display: false }, ticks: { color: "#e7edf5" } },
          },
          plugins: {
            ...commonChartOptions.plugins,
            datalabels: {
              anchor: "end",
              align: "right",
              color: "#e7edf5",
              formatter: (value: number) => value,
              font: { weight: "bold" },
            },
          },
        }}
      />
    </ChartFrame>
  );
}
