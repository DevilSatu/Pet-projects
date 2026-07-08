import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#e6edf3",
        panel: "#010409",
        line: "#30363d",
        accent: "#2ea043",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        mono: ["Consolas", "Menlo", "monospace"],
      },
      boxShadow: {
        soft: "0 24px 80px rgb(0 0 0 / 0.36)",
      },
    },
  },
  plugins: [],
} satisfies Config;
