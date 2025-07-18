"use client";

import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useCachedAPI } from '../hooks/useCachedData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DragVsHRData {
  [key: string]: string | number; // Allow dynamic fields for granularity
  drag_coefficient: number;
  home_runs: number;
}

interface DragVsHRChartProps {
  granularity?: 'year' | 'month' | 'week' | 'day';
}

export default function DragVsHRChart({ granularity = 'month' }: DragVsHRChartProps) {
  const [showPostseason, setShowPostseason] = useState(false);

  // Use cached API hook
  const { data, loading, error, lastFetch, cacheInfo } = useCachedAPI<DragVsHRData[]>(
    '/drag_vs_hr',
    { granularity }
  );

  // Filter out postseason (October/November) unless showPostseason is true
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (showPostseason) return data;
    // Only filter for month granularity
    if (granularity !== 'month') return data;
    return data.filter(d => {
      const label = String(d[granularity] || d.date);
      // Exclude months ending in -10 (October) or -11 (November)
      return !(label.endsWith('-10') || label.endsWith('-11'));
    });
  }, [data, showPostseason, granularity]);

  // Memoize chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => ({
    labels: filteredData.map(d => d[granularity] || d.date),
    datasets: [
      {
        label: 'Drag Coefficient',
        data: filteredData.map(d => d.drag_coefficient),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Home Runs',
        data: filteredData.map(d => d.home_runs),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        yAxisID: 'y1',
        fill: true,
        tension: 0.4,
      },
    ],
  }), [filteredData, granularity]);

  // Memoize chart options
  const options = useMemo(() => ({
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: `Drag Coefficient vs Home Runs (${granularity}ly)`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<'line'>[]) => {
            return `Date: ${context[0].label}`;
          },
          label: (context: TooltipItem<'line'>) => {
            if (context.dataset.label === 'Drag Coefficient') {
              return `Drag Coefficient: ${context.parsed.y.toFixed(3)} (Lower = less air resistance)`;
            } else {
              return `Home Runs: ${context.parsed.y}`;
            }
          },
          afterBody: (context: TooltipItem<'line'>[]) => {
            const dragPoint = context.find((c) => c.dataset.label === 'Drag Coefficient');
            const hrPoint = context.find((c) => c.dataset.label === 'Home Runs');
            
            if (dragPoint && hrPoint) {
              const dragValue = dragPoint.parsed.y;
              
              let interpretation = '';
              if (dragValue < 0.3) {
                interpretation = 'Low drag = ball travels further = more home runs likely';
              } else if (dragValue > 0.5) {
                interpretation = 'High drag = ball travels shorter = fewer home runs likely';
              } else {
                interpretation = 'Medium drag = typical air resistance';
              }
              
              return [
                '',
                `Interpretation: ${interpretation}`,
                `Relationship: ${dragValue < 0.4 ? 'Favorable for home runs' : 'Less favorable for home runs'}`
              ];
            }
            return [];
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time Period',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Drag Coefficient (Lower = Less Air Resistance)',
        },
        // Remove fixed min/max to auto-scale based on data
        // min: 0,
        // max: 1,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Home Runs',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }), [granularity]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading drag coefficient data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ height: '100%' }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">What This Chart Shows</h3>
        <p className="text-sm text-gray-600 mb-4">
          This chart tracks how air resistance (drag coefficient) affects home run production over time. 
          A lower drag coefficient means less air resistance, allowing balls to travel further and potentially 
          result in more home runs.
        </p>
        <button
          className="mb-4 px-4 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm font-semibold hover:bg-neutral-200 transition"
          onClick={() => setShowPostseason(s => !s)}
        >
          {showPostseason ? 'Hide Postseason Data' : 'Show Postseason Data'}
        </button>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Drag Coefficient (Left Axis)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Home Runs (Right Axis)</span>
          </div>
        </div>
        {lastFetch > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            📊 {cacheInfo.exists ? 'Data cached' : 'Fresh data'} • Last updated: {new Date(lastFetch).toLocaleTimeString()}
            {cacheInfo.age && (
              <span> • Cache age: {Math.round(cacheInfo.age / 1000 / 60)}m</span>
            )}
          </div>
        )}
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
} 