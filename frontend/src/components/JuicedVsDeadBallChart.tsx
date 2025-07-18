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
  ScriptableScaleContext,
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

interface JuicedVsDeadData {
  [key: string]: string | number; // Allow dynamic fields for granularity
  drag_coefficient: number;
  home_runs: number;
}

interface JuicedVsDeadBallChartProps {
  granularity?: 'year' | 'month' | 'week' | 'day';
  onLoaded?: () => void;
}

// Known juiced/dead ball period baselines
const JUICED_BALL_2019 = 0.15; // 2019 was very juiced
const DEAD_BALL_2021 = 0.22;   // 2021 was deadened

export default function JuicedVsDeadBallChart({ granularity = 'month', onLoaded }: JuicedVsDeadBallChartProps) {
  const [showPostseason, setShowPostseason] = useState(false);
  const [metricType, setMetricType] = useState<'efficiency' | 'historical'>('efficiency');

  // Use cached API hook
  const { data, loading, error, lastFetch, cacheInfo } = useCachedAPI<JuicedVsDeadData[]>(
    '/drag_vs_hr',
    { granularity }
  );

  React.useEffect(() => {
    if (!loading && !error && onLoaded) {
      onLoaded();
    }
  }, [loading, error, onLoaded]);

  // Calculate Distance Efficiency Index (how much distance is lost to drag)
  const calculateDistanceEfficiency = (dragCoefficient: number): number => {
    // Higher drag = more distance lost = lower efficiency
    // Convert drag coefficient to efficiency percentage
    // Typical drag coefficients range from ~0.15 to ~0.25
    const minDrag = 0.15; // Very juiced ball
    const maxDrag = 0.25; // Very dead ball
    
    // Normalize to 0-100% efficiency
    const efficiency = ((maxDrag - dragCoefficient) / (maxDrag - minDrag)) * 100;
    return Math.max(0, Math.min(100, efficiency));
  };

  // Calculate Historical Comparison (relative to known periods)
  const calculateHistoricalComparison = (dragCoefficient: number): number => {
    // Compare to known juiced (2019) and dead (2021) ball periods
    // 2019 = 100% juiced, 2021 = 0% juiced
    const juicedDiff = Math.abs(dragCoefficient - JUICED_BALL_2019);
    const totalRange = Math.abs(DEAD_BALL_2021 - JUICED_BALL_2019);
    
    // Calculate percentage: closer to 2019 = more juiced
    const percentage = ((totalRange - juicedDiff) / totalRange) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

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

  // Calculate juiced percentages
  const juicedPercentages = useMemo(() => {
    if (metricType === 'efficiency') {
      return filteredData.map(d => calculateDistanceEfficiency(d.drag_coefficient));
    } else {
      return filteredData.map(d => calculateHistoricalComparison(d.drag_coefficient));
    }
  }, [filteredData, metricType]);

  // Get current state
  const currentPercentage = juicedPercentages.length > 0 ? juicedPercentages[juicedPercentages.length - 1] : 50;
  const currentState = currentPercentage > 50 ? 'Juiced' : currentPercentage < 50 ? 'Dead' : 'Neutral';
  const trendDirection = juicedPercentages.length > 1 ? 
    (juicedPercentages[juicedPercentages.length - 1] > juicedPercentages[juicedPercentages.length - 2] ? '↗️' : '↘️') : '';

  // Memoize chart data
  const chartData = useMemo(() => ({
    labels: filteredData.map(d => d[granularity] || d.date),
    datasets: [
      {
        label: metricType === 'efficiency' ? 'Distance Efficiency Index' : 'Historical Comparison',
        data: juicedPercentages,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  }), [filteredData, granularity, juicedPercentages, metricType]);

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
        text: metricType === 'efficiency' 
          ? `MLB Ball Distance Efficiency (${granularity}ly)` 
          : `MLB Ball State vs Historical Periods (${granularity}ly)`,
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
            const percentage = context.parsed.y;
            if (metricType === 'efficiency') {
              let state = '';
              if (percentage > 80) state = 'Very Efficient (Low Drag)';
              else if (percentage > 60) state = 'Efficient';
              else if (percentage < 20) state = 'Very Inefficient (High Drag)';
              else if (percentage < 40) state = 'Inefficient';
              else state = 'Moderate Efficiency';
              
              return `Distance Efficiency: ${percentage.toFixed(1)}% (${state})`;
            } else {
              let state = '';
              if (percentage > 80) state = 'More Juiced than 2019';
              else if (percentage > 60) state = 'Similar to 2019';
              else if (percentage < 20) state = 'More Dead than 2021';
              else if (percentage < 40) state = 'Similar to 2021';
              else state = 'Between 2019-2021';
              
              return `Historical Comparison: ${percentage.toFixed(1)}% (${state})`;
            }
          },
          afterBody: (context: TooltipItem<'line'>[]) => {
            const percentage = context[0].parsed.y;
            if (metricType === 'efficiency') {
              let interpretation = '';
              if (percentage > 80) {
                interpretation = 'Very efficient - minimal distance lost to air resistance';
              } else if (percentage > 60) {
                interpretation = 'Efficient - ball travels well with low drag';
              } else if (percentage < 20) {
                interpretation = 'Very inefficient - significant distance lost to air resistance';
              } else if (percentage < 40) {
                interpretation = 'Inefficient - ball loses distance due to high drag';
              } else {
                interpretation = 'Moderate efficiency - typical air resistance';
              }
              
              return [
                '',
                `Interpretation: ${interpretation}`,
                `Higher efficiency = ball travels further = more home runs likely`
              ];
            } else {
              let interpretation = '';
              if (percentage > 80) {
                interpretation = 'More juiced than the 2019 &quot;super juiced&quot; ball';
              } else if (percentage > 60) {
                interpretation = 'Similar to or more juiced than 2019 levels';
              } else if (percentage < 20) {
                interpretation = 'More dead than the 2021 &quot;deadened&quot; ball';
              } else if (percentage < 40) {
                interpretation = 'Similar to or more dead than 2021 levels';
              } else {
                interpretation = 'Between 2019 juiced and 2021 dead ball levels';
              }
              
              return [
                '',
                `Interpretation: ${interpretation}`,
                `Based on comparison to 2019 (juiced) and 2021 (dead) ball periods`
              ];
            }
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
          text: metricType === 'efficiency' ? 'Distance Efficiency (%)' : 'Historical Comparison (%)',
        },
        min: 0,
        max: 100,
        ticks: {
          callback: function(value: number | string) {
            if (metricType === 'efficiency') {
              if (value === 50) return '50% (Moderate)';
              if (value === 0) return '0% (Very Inefficient)';
              if (value === 100) return '100% (Very Efficient)';
            } else {
              if (value === 50) return '50% (Neutral)';
              if (value === 0) return '0% (Like 2021)';
              if (value === 100) return '100% (Like 2019)';
            }
            return value + '%';
          }
        },
        grid: {
          color: function(ctx: ScriptableScaleContext) {
            if (typeof ctx.tick === 'object' && ctx.tick && 'value' in ctx.tick && ctx.tick.value === 50) {
              return 'rgba(0, 0, 0, 0.3)';
            }
            return 'rgba(0, 0, 0, 0.1)';
          },
          lineWidth: function(ctx: ScriptableScaleContext) {
            if (typeof ctx.tick === 'object' && ctx.tick && 'value' in ctx.tick && ctx.tick.value === 50) {
              return 2;
            }
            return 1;
          }
        }
      },
    },
  }), [granularity, metricType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading ball state data...</div>
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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Current MLB Ball State</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold">
            {currentPercentage.toFixed(1)}% {currentState} Ball {trendDirection}
          </div>
          <div className="text-sm text-gray-600">
            Based on {metricType === 'efficiency' ? 'distance efficiency' : 'historical comparison'}
          </div>
        </div>
        
        {/* Metric Toggle */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setMetricType('efficiency')}
              className={`px-4 py-2 rounded text-sm font-semibold transition ${
                metricType === 'efficiency'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Distance Efficiency
            </button>
            <button
              onClick={() => setMetricType('historical')}
              className={`px-4 py-2 rounded text-sm font-semibold transition ${
                metricType === 'historical'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Historical Comparison
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {metricType === 'efficiency' ? (
            <>
              <strong>Distance Efficiency Index:</strong> Shows how efficiently the ball travels through the air. 
              Higher efficiency means less distance is lost to air resistance, allowing balls to travel further 
              and potentially result in more home runs. Based on drag coefficient analysis.
            </>
          ) : (
            <>
              <strong>Historical Comparison:</strong> Compares current ball performance to known juiced (2019) 
              and dead (2021) ball periods. Values closer to 100% indicate performance similar to the 2019 
              &quot;super juiced&quot; ball, while values closer to 0% indicate performance similar to the 2021 
              &quot;deadened&quot; ball.
            </>
          )}
        </p>
        
        <button
          className="mb-4 px-4 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm font-semibold hover:bg-neutral-200 transition"
          onClick={() => setShowPostseason(s => !s)}
        >
          {showPostseason ? 'Hide Postseason Data' : 'Show Postseason Data'}
        </button>
        
        <div className="flex gap-4 text-sm">
          {metricType === 'efficiency' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>High Efficiency = Less Drag = More Home Runs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Low Efficiency = More Drag = Fewer Home Runs</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Closer to 2019 = More Juiced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Closer to 2021 = More Dead</span>
              </div>
            </>
          )}
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