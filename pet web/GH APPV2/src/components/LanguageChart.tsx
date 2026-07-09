'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { LanguageStat } from '@/types';

Chart.register(...registerables);

interface Props {
  languages: LanguageStat[];
}

export default function LanguageChart({ languages }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || languages.length === 0) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: languages.map((l) => l.language),
        datasets: [
          {
            data: languages.map((l) => l.percentage),
            backgroundColor: languages.map((l) => l.color),
            borderColor: '#161B22',
            borderWidth: 3,
            hoverBorderColor: '#F0F6FC',
            hoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#8B949E',
              padding: 12,
              usePointStyle: true,
              pointStyleWidth: 8,
              font: { size: 12 },
            },
          },
          tooltip: {
            backgroundColor: '#161B22',
            titleColor: '#F0F6FC',
            bodyColor: '#8B949E',
            borderColor: '#30363D',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [languages]);

  return (
    <div className="card-base p-6 page-enter" style={{ animationDelay: '0.2s' }}>
      <h2 className="section-title">Top Languages</h2>
      <div className="h-[260px]">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
