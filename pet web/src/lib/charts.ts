import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  ChartDataLabels,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
);

export const palette = ["#8db600", "#1aa6b7", "#d18b16", "#c2415a", "#8b6fd6"];

export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        color: "#e7edf5",
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: "#101821",
      padding: 12,
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      displayColors: true,
    },
  },
} satisfies ChartOptions;
