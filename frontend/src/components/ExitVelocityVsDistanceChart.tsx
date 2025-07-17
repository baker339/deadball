"use client";

import React, { useState, useMemo } from "react";
import { useCachedAPI } from '../hooks/useCachedData';

interface ExitVelocityData {
  launch_speed: number;
  hit_distance_sc: number;
  launch_angle: number;
  bb_type: string;
  drag_coefficient: number;
}

interface ExitVelocityVsDistanceChartProps {
  sampleSize?: number;
}

export default function ExitVelocityVsDistanceChart({ sampleSize = 1000 }: ExitVelocityVsDistanceChartProps) {
  // Dynamically require Plotly only on the client
  const Plot = typeof window !== "undefined" ? require("react-plotly.js").default : null;

  // Use cached API hook
  const { data, loading, error, lastFetch, refetch, cacheInfo } = useCachedAPI<ExitVelocityData[]>(
    '/exit_velocity_distance',
    { sampleSize }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading exit velocity data...</div>
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

  if (!data || !Plot) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">No data available</div>
      </div>
    );
  }

  // Downsample to specified number of points for performance
  const sampled = data.length > sampleSize
    ? data.sort(() => 0.5 - Math.random()).slice(0, sampleSize)
    : data;

  // Prepare data for Plotly 3D scatter
  const x = sampled.map((d: any) => d.launch_speed);
  const y = sampled.map((d: any) => d.hit_distance_sc);
  const z = sampled.map((d: any) => d.launch_angle);
  const color = sampled.map((d: any) => d.hit_distance_sc > 350 ? 'red' : 'blue');

  const plotData = [
    {
      x: x,
      y: y,
      z: z,
      mode: 'markers' as const,
      type: 'scatter3d' as const,
      marker: {
        size: 3,
        color: color,
        opacity: 0.7,
      },
      hovertemplate: 
        '<b>Exit Velocity:</b> %{x:.1f} mph<br>' +
        '<b>Distance:</b> %{y:.0f} ft<br>' +
        '<b>Launch Angle:</b> %{z:.1f}°<br>' +
        '<extra></extra>',
    },
  ];

  const layout = {
    title: {
      text: 'Exit Velocity vs Distance vs Launch Angle',
      font: { size: 16, weight: 'bold' }
    },
    scene: {
      xaxis: { title: 'Exit Velocity (mph)', range: [60, 120] },
      yaxis: { title: 'Distance (ft)', range: [0, 500] },
      zaxis: { title: 'Launch Angle (degrees)', range: [-10, 60] },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.5 }
      }
    },
    margin: { l: 0, r: 0, b: 0, t: 40 },
    height: 500,
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">What This Chart Shows</h3>
        <p className="text-sm text-gray-600 mb-4">
          This 3D scatter plot shows the relationship between exit velocity, distance, and launch angle. 
          Red points represent home runs (350+ ft), while blue points are other hits. The optimal zone 
          for home runs is typically high exit velocity (95+ mph) with launch angles between 25-35 degrees.
        </p>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Home Runs (350+ ft)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Other Hits</span>
          </div>
        </div>
        {lastFetch > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            📊 {cacheInfo.exists ? 'Data cached' : 'Fresh data'} • Last updated: {new Date(lastFetch).toLocaleTimeString()}
            {cacheInfo.age && (
              <span> • Cache age: {Math.round(cacheInfo.age / 1000 / 60)}m</span>
            )}
            <span> • {sampled.length.toLocaleString()} data points</span>
          </div>
        )}
      </div>
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
} 