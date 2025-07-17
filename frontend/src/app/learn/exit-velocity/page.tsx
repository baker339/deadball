import React from 'react';
import Link from 'next/link';
import { EquationBlock } from '@/components/EquationBlock';

export default function ExitVelocityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Exit Velocity & Launch Angle</h1>
        <p className="text-lg text-gray-600">
          Understanding how exit velocity and launch angle combine to create home runs
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What is Exit Velocity?</h2>
          <p className="mb-4">
            Exit velocity is the speed of the baseball immediately after it leaves the bat. It's measured in miles per hour (mph) 
            and is one of the most important factors in determining how far a ball will travel.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">95+ mph</div>
              <div className="text-sm text-red-700">Home Run Territory</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">85-95 mph</div>
              <div className="text-sm text-yellow-700">Extra Base Hit Range</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">75-85 mph</div>
              <div className="text-sm text-green-700">Single/Double Range</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Physics of Exit Velocity</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Conservation of Momentum</h3>
            <p className="mb-3">
              When a bat hits a ball, momentum is transferred from the bat to the ball. The exit velocity depends on:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Bat speed at contact</li>
              <li>Mass of the bat</li>
              <li>Mass of the ball</li>
              <li>Quality of contact (sweet spot vs. off-center)</li>
            </ul>
            <EquationBlock 
              equation="v_{exit} = \\frac{m_{bat}v_{bat} + m_{ball}v_{ball}}{m_{bat} + m_{ball}}"
              explanation="The exit velocity is determined by the conservation of momentum in the collision between bat and ball."
              variables={{
                "v_{exit}": "Exit velocity of the ball",
                "m_{bat}": "Mass of the bat",
                "v_{bat}": "Velocity of the bat at contact",
                "m_{ball}": "Mass of the ball",
                "v_{ball}": "Velocity of the ball before contact"
              }}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">The Sweet Spot</h3>
            <p className="mb-3">
              The sweet spot is the optimal location on the bat where maximum energy is transferred to the ball.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Key Point:</strong> Hitting the sweet spot maximizes exit velocity and minimizes vibration, 
                leading to the longest possible hits.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Launch Angle: The Perfect Arc</h2>
          
          <p className="mb-4">
            Launch angle is the vertical angle at which the ball leaves the bat. It's crucial for determining 
            whether a ball becomes a home run, fly out, or ground ball.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Optimal Launch Angle</h3>
              <p className="text-sm text-gray-600 mb-2">
                Research shows that the optimal launch angle for maximum distance is between 25-35 degrees.
              </p>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-sm text-green-800">
                  <strong>25-35°:</strong> Maximum distance potential
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Launch Angle Ranges</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>0-10°:</span>
                  <span className="text-gray-600">Ground balls</span>
                </div>
                <div className="flex justify-between">
                  <span>10-25°:</span>
                  <span className="text-gray-600">Line drives</span>
                </div>
                <div className="flex justify-between">
                  <span>25-35°:</span>
                  <span className="text-green-600 font-semibold">Optimal home runs</span>
                </div>
                <div className="flex justify-between">
                  <span>35-50°:</span>
                  <span className="text-gray-600">High fly balls</span>
                </div>
                <div className="flex justify-between">
                  <span>50°+:</span>
                  <span className="text-gray-600">Pop-ups</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Exit Velocity vs. Launch Angle Relationship</h2>
          
          <p className="mb-4">
            Exit velocity and launch angle work together to determine the outcome of a hit. Higher exit velocities 
            can compensate for suboptimal launch angles, and vice versa.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Home Run Probability Matrix</h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="font-semibold p-2">Exit Velocity</div>
              <div className="font-semibold p-2">Launch Angle</div>
              <div className="font-semibold p-2">HR Probability</div>
              <div className="font-semibold p-2">Typical Distance</div>
              
              <div className="p-2">95+ mph</div>
              <div className="p-2">25-35°</div>
              <div className="p-2 text-green-600 font-semibold">Very High</div>
              <div className="p-2">400+ ft</div>
              
              <div className="p-2">90-95 mph</div>
              <div className="p-2">25-35°</div>
              <div className="p-2 text-green-600">High</div>
              <div className="p-2">380-420 ft</div>
              
              <div className="p-2">85-90 mph</div>
              <div className="p-2">25-35°</div>
              <div className="p-2 text-yellow-600">Medium</div>
              <div className="p-2">350-380 ft</div>
              
              <div className="p-2">80-85 mph</div>
              <div className="p-2">25-35°</div>
              <div className="p-2 text-red-600">Low</div>
              <div className="p-2">320-350 ft</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Barrel Rate: Quality Contact</h2>
          
          <p className="mb-4">
            Barrel rate measures the percentage of batted balls with optimal exit velocity and launch angle combinations.
            A "barrel" is defined as a batted ball with:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Exit Velocity ≥ 98 mph</h3>
              <p className="text-sm text-purple-700">
                High enough velocity to clear most outfield fences
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Launch Angle 26-30°</h3>
              <p className="text-sm text-purple-700">
                Optimal angle for maximum distance
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Key Insight:</strong> Players with higher barrel rates tend to have higher slugging percentages 
              and more home runs, regardless of their overall batting average.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Hitting Strategy</h3>
              <p className="text-sm text-gray-600">
                Understanding exit velocity helps hitters optimize their swing mechanics and contact quality.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Defensive Positioning</h3>
              <p className="text-sm text-gray-600">
                Teams use exit velocity data to position fielders optimally based on hitter tendencies.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">Pitching Strategy</h3>
              <p className="text-sm text-gray-600">
                Pitchers can adjust their approach based on a hitter's exit velocity profile.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between mt-8">
        <Link 
          href="/learn/physics/practice" 
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Physics Practice
        </Link>
        <Link 
          href="/learn/exit-velocity/practice" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Exit Velocity Practice →
        </Link>
      </div>
    </div>
  );
} 