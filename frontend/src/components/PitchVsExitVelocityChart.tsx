"use client";
import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { useCachedAPI } from '../hooks/useCachedData';

const Plot = typeof window !== "undefined" ? require("react-plotly.js").default : null;

interface DataPoint {
  release_speed: number;
  launch_speed: number;
  bb_type?: string;
  events?: string;
  game_date?: string; // Added for date filtering
  pitch_type?: string; // Added for pitch type filtering
}

const PITCH_TYPES = [
  "FF", "SI", "FT", "FC", "SL", "CU", "CH", "KC", "FS", "FO", "KN", "EP", "SC", "SV", "CS", "IN", "PO", "UN"
];
const BB_TYPES = [
  { key: "fly_ball", label: "Fly Ball" },
  { key: "line_drive", label: "Line Drive" },
  { key: "home_run", label: "Home Run" },
];

export default function PitchVsExitVelocityChart() {
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("2015-01-01");
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedPitchTypes, setSelectedPitchTypes] = useState<string[]>([]);
  const [selectedBBTypes, setSelectedBBTypes] = useState<string[]>([]);
  const [minRelease, setMinRelease] = useState(30);
  const [maxRelease, setMaxRelease] = useState(110);
  const [minLaunch, setMinLaunch] = useState(40);
  const [maxLaunch, setMaxLaunch] = useState(130);

  // Use cached API hook with broad parameters to get all data
  const { data: rawData, loading, error, lastFetch, refetch, cacheInfo } = useCachedAPI<DataPoint[]>(
    '/pitch_vs_exit_velocity',
    {
      start_date: "2015-01-01",
      end_date: "2025-01-01",
      min_release_speed: 30,
      max_release_speed: 110,
      min_launch_speed: 40,
      max_launch_speed: 130
    }
  );

  // Apply filters on the frontend
  const data = useMemo(() => {
    if (!rawData) return [];
    
    return rawData.filter(d => {
      const date = d.game_date || "2015-01-01";
      if (date < startDate || date > endDate) return false;
      if (d.release_speed < minRelease || d.release_speed > maxRelease) return false;
      if (d.launch_speed < minLaunch || d.launch_speed > maxLaunch) return false;
      if (selectedPitchTypes.length > 0 && (!d.pitch_type || !selectedPitchTypes.includes(d.pitch_type))) return false;
      if (selectedBBTypes.length > 0) {
        if (selectedBBTypes.includes("home_run") && d.events === "home_run") return true;
        if (d.bb_type && selectedBBTypes.includes(d.bb_type) && d.events !== "home_run") return true;
        return false;
      }
      return true;
    });
  }, [rawData, startDate, endDate, selectedPitchTypes, selectedBBTypes, minRelease, maxRelease, minLaunch, maxLaunch]);

  if (loading) return <div className="flex items-center justify-center h-64">Loading pitch vs exit velocity data...</div>;
  if (error) return <div className="flex items-center justify-center h-64 text-red-600">Error: {error}</div>;

  // Group by hit type for coloring
  const types = [
    { key: "fly_ball", label: "Fly Ball", color: "#3b82f6" },
    { key: "line_drive", label: "Line Drive", color: "#16a34a" },
    { key: "home_run", label: "Home Run", color: "#ef4444" },
  ];

  const plotData = types.map(type => {
    const filtered = data.filter(d => {
      if (type.key === "home_run") return d.events === "home_run";
      return d.bb_type === type.key && d.events !== "home_run";
    });

    return {
      x: filtered.map(d => d.release_speed),
      y: filtered.map(d => d.launch_speed),
      mode: "markers" as const,
      type: "scatter" as const,
      name: type.label,
      marker: {
        color: type.color,
        size: 6,
        opacity: 0.7,
      },
      hovertemplate:
        "<b>Pitch Speed:</b> %{x:.1f} mph<br>" +
        "<b>Exit Velocity:</b> %{y:.1f} mph<br>" +
        "<b>Type:</b> " + type.label +
        "<extra></extra>",
    };
  });

  const layout = {
    title: {
      text: "Pitch Velocity vs Exit Velocity",
      font: { size: 16, weight: "bold" }
    },
    xaxis: {
      title: "Pitch Velocity (mph)",
      range: [minRelease - 5, maxRelease + 5],
    },
    yaxis: {
      title: "Exit Velocity (mph)",
      range: [minLaunch - 5, maxLaunch + 5],
    },
    margin: { l: 60, r: 30, b: 60, t: 60 },
    height: 500,
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: "rgba(255,255,255,0.8)",
    },
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["pan2d", "lasso2d", "select2d"],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">What This Chart Shows</h3>
        <p className="text-sm text-gray-600 mb-4">
          This scatter plot shows the relationship between pitch velocity and exit velocity. 
          Generally, faster pitches result in higher exit velocities, but the relationship 
          is complex and depends on contact quality, launch angle, and other factors.
        </p>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 px-4 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm font-semibold hover:bg-neutral-200 transition"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded">
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pitch Speed Range</label>
              <input
                type="range"
                min="30"
                max="110"
                value={minRelease}
                onChange={(e) => setMinRelease(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>{minRelease} mph</span>
                <span>{maxRelease} mph</span>
              </div>
              <input
                type="range"
                min="30"
                max="110"
                value={maxRelease}
                onChange={(e) => setMaxRelease(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Exit Velocity Range</label>
              <input
                type="range"
                min="40"
                max="130"
                value={minLaunch}
                onChange={(e) => setMinLaunch(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>{minLaunch} mph</span>
                <span>{maxLaunch} mph</span>
              </div>
              <input
                type="range"
                min="40"
                max="130"
                value={maxLaunch}
                onChange={(e) => setMaxLaunch(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hit Types</label>
              {BB_TYPES.map((type) => (
                <label key={type.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBBTypes.includes(type.key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBBTypes([...selectedBBTypes, type.key]);
                      } else {
                        setSelectedBBTypes(selectedBBTypes.filter(t => t !== type.key));
                      }
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Fly Balls</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Line Drives</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Home Runs</span>
          </div>
        </div>
        
        {lastFetch > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            📊 {cacheInfo.exists ? 'Data cached' : 'Fresh data'} • Last updated: {new Date(lastFetch).toLocaleTimeString()}
            {cacheInfo.age && (
              <span> • Cache age: {Math.round(cacheInfo.age / 1000 / 60)}m</span>
            )}
            <span> • {data.length.toLocaleString()} data points</span>
          </div>
        )}
      </div>
      
      {Plot && (
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: "100%", height: "500px" }}
        />
      )}
    </div>
  );
} 