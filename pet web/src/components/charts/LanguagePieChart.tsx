import { Pie } from "react-chartjs-2";
import { commonChartOptions, palette } from "../../lib/charts";
import { percent } from "../../lib/format";
import { LanguageMap } from "../../types/github";
import { ChartFrame } from "../ChartFrame";

interface LanguagePieChartProps {
  languages: LanguageMap;
}

export function LanguagePieChart({ languages }: LanguagePieChartProps) {
  const entries = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

  if (!entries.length) {
    return <div className="grid h-72 place-items-center text-sm text-slate-400">No language data available.</div>;
  }

  return (
    <ChartFrame>
      <Pie
        data={{
          labels: entries.map(([language]) => language),
          datasets: [
            {
              data: entries.map(([, bytes]) => bytes),
              backgroundColor: palette,
              borderColor: "#010409",
              borderWidth: 3,
            },
          ],
        }}
        options={{
          ...commonChartOptions,
          plugins: {
            ...commonChartOptions.plugins,
            datalabels: {
              color: "#ffffff",
              formatter: (value: number) => percent(value, total),
              font: { weight: "bold", size: 12 },
            },
          },
        }}
      />
    </ChartFrame>
  );
}
