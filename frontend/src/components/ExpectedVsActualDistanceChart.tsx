"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
  Plugin,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useCachedAPI } from '../hooks/useCachedData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HitData {
  game_date: string;
  expected_distance: number;
  hit_distance_sc: number;
}

// Custom plugin for dumbbell chart effect
const dumbbellPlugin: Plugin<'line'> = {
  id: "dumbbell",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const meta0 = chart.getDatasetMeta(0);
    const meta1 = chart.getDatasetMeta(1);

    ctx.save();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 1;

    for (let i = 0; i < meta0.data.length; i++) {
      const point0 = meta0.data[i];
      const point1 = meta1.data[i];
      if (point0 && point1) {
        ctx.beginPath();
        ctx.moveTo(point0.x, point0.y);
        ctx.lineTo(point1.x, point1.y);
        ctx.stroke();
      }
    }
    ctx.restore();
  },
};

export default function ExpectedVsActualDistanceChart() {
  // Use cached API hook
  const { data, loading, error, lastFetch, cacheInfo } = useCachedAPI<HitData[]>(
    '/expected_vs_actual_distance'
  );

  // Randomly sample up to 1000 points for performance
  const MAX_POINTS = 1000;
  const sampledData = useMemo(() => {
    if (!data || data.length <= MAX_POINTS) return data || [];
    // Shuffle and take first MAX_POINTS
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, MAX_POINTS);
  }, [data]);

  // Aggregate by month: { month: { expected: avg, actual: avg } }
  const monthly = useMemo(() => {
    const groups: Record<string, { expected: number[]; actual: number[] }> = {};
    sampledData.forEach(d => {
      const month = d.game_date.slice(0, 7); // 'YYYY-MM'
      if (!groups[month]) groups[month] = { expected: [], actual: [] };
      groups[month].expected.push(d.expected_distance);
      groups[month].actual.push(d.hit_distance_sc);
    });
    // Convert to array of { month, avgExpected, avgActual }
    return Object.entries(groups)
      .map(([month, vals]) => ({
        month,
        avgExpected: vals.expected.reduce((a, b) => a + b, 0) / vals.expected.length,
        avgActual: vals.actual.reduce((a, b) => a + b, 0) / vals.actual.length,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [sampledData]);

  // Prepare data for Chart.js dumbbell plot
  const chartData = {
    labels: monthly.map(m => m.month),
    datasets: [
      {
        label: "Expected Distance (Vacuum)",
        data: monthly.map(m => m.avgExpected),
        borderColor: "rgba(16, 185, 129, 0.5)",
        backgroundColor: "rgba(16, 185, 129, 1)",
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        order: 2,
      },
      {
        label: "Actual Distance",
        data: monthly.map(m => m.avgActual),
        borderColor: "rgba(59, 130, 246, 0.5)",
        backgroundColor: "rgba(59, 130, 246, 1)",
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Expected vs Actual Distance by Month",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<'line'>[]) => {
            return `Month: ${context[0].label}`;
          },
          label: (context: TooltipItem<'line'>) => {
            if (context.dataset.label === "Expected Distance (Vacuum)") {
              return `Expected: ${context.parsed.y.toFixed(1)} ft (no air resistance)`;
            } else {
              return `Actual: ${context.parsed.y.toFixed(1)} ft (with air resistance)`;
            }
          },
          afterBody: (context: TooltipItem<'line'>[]) => {
            const expectedPoint = context.find((c) => c.dataset.label === "Expected Distance (Vacuum)");
            const actualPoint = context.find((c) => c.dataset.label === "Actual Distance");
            if (expectedPoint && actualPoint) {
              const expected = expectedPoint.parsed.y;
              const actual = actualPoint.parsed.y;
              const difference = expected - actual;
              const percentage = (difference / expected) * 100;
              return [
                '',
                `Difference: ${difference.toFixed(1)} ft`,
                `Drag Effect: ${percentage.toFixed(1)}% reduction`,
                'The gap shows how much air resistance reduces distance'
              ];
            }
            return [];
          },
        },
      },
    },
    scales: {
      x: {
        type: "category" as const,
        title: { display: true, text: "Month" },
        ticks: {
          maxTicksLimit: 20,
        },
      },
      y: {
        type: "linear" as const,
        title: { display: true, text: "Distance (ft)" },
        min: 0,
        max: 600,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading expected vs actual distance data...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">What this chart shows</h3>
        <p className="text-sm text-gray-600 mb-4">
          For each month, the vertical line shows the gap between the average expected distance (vacuum, green) 
          and the average actual distance (blue). The gap represents the effect of air resistance (drag) on ball flight.
        </p>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Expected Distance (No Air Resistance)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Actual Distance (With Air Resistance)</span>
          </div>
        </div>
        {lastFetch > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            📊 {cacheInfo.exists ? 'Data cached' : 'Fresh data'} • Last updated: {new Date(lastFetch).toLocaleTimeString()}
            {cacheInfo.age && (
              <span> • Cache age: {Math.round(cacheInfo.age / 1000 / 60)}m</span>
            )}
            <span> • {sampledData.length.toLocaleString()} data points</span>
          </div>
        )}
      </div>
      <Line data={chartData} options={options} plugins={[dumbbellPlugin]} />
    </div>
  );
} 