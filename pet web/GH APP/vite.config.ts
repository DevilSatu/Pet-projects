import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ["chart.js", "react-chartjs-2", "chartjs-plugin-datalabels"],
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
