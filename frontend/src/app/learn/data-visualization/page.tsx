import React from 'react';
import Link from 'next/link';

export default function DataVisualizationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Visualization in Baseball</h1>
        <p className="text-lg text-gray-600">
          Understanding how to read and interpret baseball analytics through charts and graphs
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Types of Baseball Charts</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Time Series Charts</h3>
              <p className="text-sm text-blue-700">
                Show how metrics change over time (seasons, months, games). Perfect for tracking trends in home runs, 
                drag coefficients, or player performance.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Scatter Plots</h3>
              <p className="text-sm text-green-700">
                Display relationships between two variables (e.g., exit velocity vs. distance, 
                launch angle vs. home run probability).
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Heat Maps</h3>
              <p className="text-sm text-purple-700">
                Show patterns across multiple dimensions (e.g., hit locations, pitch types vs. outcomes).
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Bar Charts</h3>
              <p className="text-sm text-orange-700">
                Compare discrete categories (e.g., home runs by team, drag coefficients by year).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Reading Baseball Analytics</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Key Chart Elements</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded mt-1"></div>
                <div>
                  <strong>X-Axis:</strong> Usually represents time, categories, or independent variables
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-red-500 rounded mt-1"></div>
                <div>
                  <strong>Y-Axis:</strong> Represents the measured values or dependent variables
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-green-500 rounded mt-1"></div>
                <div>
                  <strong>Trend Lines:</strong> Show overall patterns and help identify relationships
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded mt-1"></div>
                <div>
                  <strong>Confidence Intervals:</strong> Show uncertainty in the data and predictions
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Statistical Concepts in Baseball</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Correlation vs. Causation</h3>
              <p className="mb-3">
                Just because two variables move together doesn't mean one causes the other.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Example:</strong> Higher drag coefficients correlate with fewer home runs, 
                  but this doesn't prove the ball construction directly caused the change.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Sample Size</h3>
              <p className="mb-3">
                Larger sample sizes provide more reliable conclusions.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-red-800">
                    <strong>Small Sample:</strong> 10 games - unreliable trends
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Large Sample:</strong> Full season - more reliable patterns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Outliers</h3>
              <p className="mb-3">
                Extreme values that don't follow the general pattern. Important to identify but not always remove.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> A 500-foot home run might be an outlier but represents a real, 
                  significant event that should be included in analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Common Baseball Metrics</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Hitting Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Exit Velocity:</span>
                  <span className="text-gray-600">Ball speed off bat</span>
                </div>
                <div className="flex justify-between">
                  <span>Launch Angle:</span>
                  <span className="text-gray-600">Vertical angle off bat</span>
                </div>
                <div className="flex justify-between">
                  <span>Barrel Rate:</span>
                  <span className="text-gray-600">% of optimal contact</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard Hit Rate:</span>
                  <span className="text-gray-600">% of 95+ mph contact</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Ball Flight Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Drag Coefficient:</span>
                  <span className="text-gray-600">Air resistance measure</span>
                </div>
                <div className="flex justify-between">
                  <span>Carry Distance:</span>
                  <span className="text-gray-600">Distance in air</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Distance:</span>
                  <span className="text-gray-600">Including roll</span>
                </div>
                <div className="flex justify-between">
                  <span>Hang Time:</span>
                  <span className="text-gray-600">Time in air</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Interpreting Trends</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Upward Trends</h3>
              <p className="text-sm text-gray-600">
                Values increasing over time (e.g., home run rates, exit velocities)
              </p>
            </div>
            
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold">Downward Trends</h3>
              <p className="text-sm text-gray-600">
                Values decreasing over time (e.g., drag coefficients, batting averages)
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Cyclical Patterns</h3>
              <p className="text-sm text-gray-600">
                Values that repeat in cycles (e.g., seasonal variations, yearly patterns)
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold">No Clear Pattern</h3>
              <p className="text-sm text-gray-600">
                Random fluctuations with no obvious trend (may indicate stable conditions)
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Juiced vs. Dead Ball Analysis</h3>
              <p className="text-sm text-gray-600">
                Time series charts showing drag coefficients over time help identify when baseballs 
                were "juiced" or "dead" based on air resistance measurements.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Player Development</h3>
              <p className="text-sm text-gray-600">
                Tracking exit velocity and launch angle improvements helps coaches and players 
                optimize hitting mechanics and strategy.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Rule Changes Impact</h3>
              <p className="text-sm text-gray-600">
                Comparing metrics before and after rule changes (e.g., ball composition, 
                mound height) shows their effects on the game.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Best Practices for Reading Charts</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
              <div>
                <strong>Check the axes:</strong> Always read the labels and units to understand what's being measured
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
              <div>
                <strong>Look for patterns:</strong> Identify trends, cycles, or unusual data points
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
              <div>
                <strong>Consider context:</strong> Think about what might explain the patterns you see
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
              <div>
                <strong>Question assumptions:</strong> Don't assume correlation equals causation
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">5</div>
              <div>
                <strong>Look for multiple sources:</strong> Confirm findings with other data or analysis
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between mt-8">
        <Link 
          href="/learn/exit-velocity/practice" 
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Exit Velocity Practice
        </Link>
        <Link 
          href="/learn/data-visualization/practice" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Data Visualization Practice →
        </Link>
      </div>
    </div>
  );
} 