"use client";
import React, { useMemo } from 'react';
import { useCachedAPI } from '../../hooks/useCachedData';

export default function AnalyticsPage() {
  // Correlation Analysis Data
  const { data: dragVsHR, loading: loadingCorr, error: errorCorr } = useCachedAPI<any[]>(
    '/drag_vs_hr',
    { granularity: 'month' }
  );

  // Home Run Probability Data
  const { data: evDist, loading: loadingProb, error: errorProb } = useCachedAPI<any[]>(
    '/exit_velocity_distance',
    { sampleSize: 2000 }
  );

  // Calculate correlation and trendline for drag vs HR
  const corrResult = useMemo(() => {
    if (!dragVsHR || dragVsHR.length < 2) return null;
    const xs = dragVsHR.map((d: any) => d.drag_coefficient);
    const ys = dragVsHR.map((d: any) => d.home_runs);
    const n = xs.length;
    const xMean = xs.reduce((a: number, b: number) => a + b, 0) / n;
    const yMean = ys.reduce((a: number, b: number) => a + b, 0) / n;
    const cov = xs.map((x: number, i: number) => (x - xMean) * (ys[i] - yMean)).reduce((a: number, b: number) => a + b, 0) / n;
    const xStd = Math.sqrt(xs.map((x: number) => (x - xMean) ** 2).reduce((a: number, b: number) => a + b, 0) / n);
    const yStd = Math.sqrt(ys.map((y: number) => (y - yMean) ** 2).reduce((a: number, b: number) => a + b, 0) / n);
    const r = cov / (xStd * yStd);
    // Trendline: y = a + b*x
    const b = cov / (xStd ** 2);
    const a = yMean - b * xMean;
    const trend = xs.map((x: number) => a + b * x);
    return { r, r2: r * r, xs, ys, trend };
  }, [dragVsHR]);

  // Home Run Probability Heatmap (exit velocity vs launch angle)
  const hrHeatmap = useMemo(() => {
    if (!evDist) return null;
    // Bin by exit velocity and launch angle
    const bins: Record<string, { count: number; hr: number }> = {};
    evDist.forEach((d: any) => {
      const ev = Math.round(d.launch_speed);
      const la = Math.round(d.launch_angle);
      const key = `${ev}_${la}`;
      if (!bins[key]) bins[key] = { count: 0, hr: 0 };
      bins[key].count++;
      // Simple HR rule: distance > 350ft
      if (d.hit_distance_sc > 350) bins[key].hr++;
    });
    // Prepare grid
    const evs = Array.from(new Set(evDist.map((d: any) => Math.round(d.launch_speed)))).sort((a: number, b: number) => a - b);
    const las = Array.from(new Set(evDist.map((d: any) => Math.round(d.launch_angle)))).sort((a: number, b: number) => a - b);
    const z: (number | null)[][] = las.map((la: number) => evs.map((ev: number) => {
      const bin = bins[`${ev}_${la}`];
      if (!bin || bin.count < 3) return null;
      return bin.hr / bin.count;
    }));
    return { evs, las, z };
  }, [evDist]);

  // Dynamically require Plotly only on the client
  const Plot = typeof window !== 'undefined' ? require('react-plotly.js').default : null;

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Advanced Analytics</h1>
      <p className="text-lg text-gray-700 mb-8">
        Deep dive into the statistical relationships between drag coefficient, home run rates, and ball performance. 
        Explore correlation analysis and predictive models.
      </p>

      {/* Correlation Analysis Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Correlation Analysis</h2>
        <p className="text-base text-gray-600 mb-8">
          How well does drag coefficient actually predict home run rates? This analysis shows the statistical 
          relationship between air resistance and home run production.
        </p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          {loadingCorr ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : errorCorr ? (
            <div className="text-center text-red-500">Error: {errorCorr}</div>
          ) : corrResult ? (
            Plot && (
              <Plot
                data={[
                  {
                    x: corrResult.xs,
                    y: corrResult.ys,
                    mode: 'markers',
                    type: 'scatter',
                    name: 'Data',
                    marker: { color: '#3b82f6', size: 8, opacity: 0.7 },
                    hovertemplate: 'Drag: %{x:.3f}<br>HRs: %{y}<extra></extra>',
                  },
                  {
                    x: corrResult.xs,
                    y: corrResult.trend,
                    mode: 'lines',
                    name: 'Trendline',
                    line: { color: '#16a34a', width: 3, dash: 'dot' },
                  },
                ]}
                layout={{
                  title: `Drag Coefficient vs Home Runs (R² = ${corrResult.r2.toFixed(2)})`,
                  xaxis: { title: 'Drag Coefficient', range: [0.12, 0.25] },
                  yaxis: { title: 'Home Runs' },
                  height: 400,
                  margin: { l: 60, r: 30, b: 60, t: 60 },
                  legend: { x: 0.02, y: 0.98 },
                }}
                config={{ displayModeBar: false }}
                style={{ width: '100%', height: '400px' }}
              />
            )
          ) : (
            <div className="text-center text-gray-500">Not enough data</div>
          )}
        </div>
      </section>

      {/* Home Run Probability Model Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Home Run Probability Model</h2>
        <p className="text-base text-gray-600 mb-8">
          Interactive model that predicts home run probability based on exit velocity, launch angle, and drag coefficient. 
          See how changes in ball properties affect home run likelihood.
        </p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          {loadingProb ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : errorProb ? (
            <div className="text-center text-red-500">Error: {errorProb}</div>
          ) : hrHeatmap && Plot ? (
            <Plot
              data={[
                {
                  z: hrHeatmap.z,
                  x: hrHeatmap.evs,
                  y: hrHeatmap.las,
                  type: 'heatmap',
                  colorscale: 'YlOrRd',
                  colorbar: { title: 'HR Probability', ticksuffix: '' },
                  hovertemplate: 'EV: %{x} mph<br>LA: %{y}°<br>HR Prob: %{z:.2f}<extra></extra>',
                },
              ]}
              layout={{
                title: 'Home Run Probability (by Exit Velocity & Launch Angle)',
                xaxis: { title: 'Exit Velocity (mph)' },
                yaxis: { title: 'Launch Angle (°)' },
                height: 400,
                margin: { l: 60, r: 30, b: 60, t: 60 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '400px' }}
            />
          ) : (
            <div className="text-center text-gray-500">Not enough data</div>
          )}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Methodology</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Correlation Analysis</h3>
            <p className="text-sm text-gray-600">
              We calculate the Pearson correlation coefficient between drag coefficient and home run rates 
              across different time periods. This tells us how much of the variation in home run rates 
              can be explained by changes in air resistance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Probability Model</h3>
            <p className="text-sm text-gray-600">
              Using a simple rule (distance &gt; 350ft = HR), we estimate home run probability for each bin of exit velocity and launch angle. 
              This can be upgraded to a true ML model in the future.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 