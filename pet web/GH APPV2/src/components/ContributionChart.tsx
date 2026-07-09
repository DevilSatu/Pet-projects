'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Props {
  contributions: { date: string; count: number }[];
}

export default function ContributionChart({ contributions }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || contributions.length === 0) return;

    if (chartRef.current) chartRef.current.destroy();

    const last30 = contributions.slice(-30);
    const labels = last30.map((c) => {
      const d = new Date(c.date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const data = last30.map((c) => c.count);

    const total = data.reduce((a, b) => a + b, 0);
    const prev = data.slice(0, 14).reduce((a, b) => a + b, 0);
    const curr = data.slice(14).reduce((a, b) => a + b, 0);
    const trend = curr >= prev ? 'up' : 'down';
    const pct = prev > 0 ? Math.round(Math.abs(curr - prev) / prev * 100) : 0;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Contributions',
            data,
            borderColor: '#58A6FF',
            backgroundColor: 'rgba(88, 166, 255, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#58A6FF',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
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
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (ctx) => `${ctx.parsed.y} contributions`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(48, 54, 61, 0.4)' },
            ticks: { color: '#8B949E', font: { size: 11 }, maxRotation: 0, autoSkipPadding: 20 },
          },
          y: {
            grid: { color: 'rgba(48, 54, 61, 0.4)' },
            ticks: { color: '#8B949E', font: { size: 11 }, stepSize: 5 },
            beginAtZero: true,
          },
        },
        interaction: { intersect: false, mode: 'index' as const },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [contributions]);

  const last30 = contributions.slice(-30);
  const total = last30.reduce((a, c) => a + c.count, 0);
  const prev = last30.slice(0, 14).reduce((a, c) => a + c.count, 0);
  const curr = last30.slice(14).reduce((a, c) => a + c.count, 0);
  const trend = curr >= prev ? 'up' : 'down';
  const pct = prev > 0 ? Math.round(Math.abs(curr - prev) / prev * 100) : 0;

  return (
    <div className="card-base p-6 page-enter" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">Activity (Last 30 Days)</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-github-muted">{total} contributions</span>
          {pct > 0 && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-chart-mint/20 text-chart-mint' : 'bg-chart-coral/20 text-chart-coral'}`}>
              {trend === 'up' ? '↑' : '↓'} {pct}%
            </span>
          )}
        </div>
      </div>
      <div className="h-[240px]">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
