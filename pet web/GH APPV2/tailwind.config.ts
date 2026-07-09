import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0D1117',
          card: '#161B22',
          hover: '#1C2333',
          border: '#30363D',
          text: '#F0F6FC',
          muted: '#8B949E',
          accent: '#58A6FF',
          accentDark: '#1F6FEB',
        },
        chart: {
          coral: '#FF6B6B',
          teal: '#4ECDC4',
          yellow: '#FFE66D',
          mint: '#A8E6CF',
          orange: '#FF8A5C',
          purple: '#6C5CE7',
          sky: '#74B9FF',
          pink: '#FD79A8',
          turquoise: '#00CEC9',
          golden: '#FDCB6E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        glow: '0 0 20px rgba(88, 166, 255, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
