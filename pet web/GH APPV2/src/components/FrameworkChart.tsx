'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { TechFramework } from '@/types';

Chart.register(...registerables);

interface Props {
  frameworks: TechFramework[];
}

export default function FrameworkChart({ frameworks }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || frameworks.length === 0) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: frameworks.map((f) => f.name),
        datasets: [
          {
            data: frameworks.map((f) => f.count),
            backgroundColor: frameworks.map((f) => f.color + 'CC'),
            borderColor: frameworks.map((f) => f.color),
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 28,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161B22',
            titleColor: '#F0F6FC',
            bodyColor: '#8B949E',
            borderColor: '#30363D',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => `${ctx.parsed.x} repositories`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(48, 54, 61, 0.4)' },
            ticks: { color: '#8B949E', font: { size: 11 }, stepSize: 1 },
            beginAtZero: true,
          },
          y: {
            grid: { display: false },
            ticks: { color: '#F0F6FC', font: { size: 12, weight: 500 } },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [frameworks]);

  return (
    <div className="card-base p-6 page-enter" style={{ animationDelay: '0.3s' }}>
      <h2 className="section-title">Frameworks & Technologies</h2>
      <div className="h-[260px]">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
