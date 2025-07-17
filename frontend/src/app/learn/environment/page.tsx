import React from 'react';
import Link from 'next/link';
import { EquationBlock } from '@/components/EquationBlock';

export default function EnvironmentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Environmental Factors</h1>
        <p className="text-lg text-gray-600">
          How temperature, humidity, altitude, and weather conditions affect baseball performance
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Air Density and Baseball Flight</h2>
          <p className="mb-4">
            The density of air significantly affects how far a baseball travels. Air density depends on three main factors:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">Temperature</div>
              <div className="text-sm text-blue-700">Warmer = Less Dense</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">Humidity</div>
              <div className="text-sm text-green-700">Higher = Less Dense</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">Altitude</div>
              <div className="text-sm text-purple-700">Higher = Less Dense</div>
            </div>
          </div>

          <EquationBlock 
            equation="\\rho = \\frac{P}{RT}"
            explanation="Air density is inversely proportional to temperature and directly proportional to pressure."
            variables={{
              "\\rho": "Air density (kg/m³)",
              "P": "Atmospheric pressure (Pa)",
              "R": "Gas constant for air (287 J/kg·K)",
              "T": "Temperature (Kelvin)"
            }}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Temperature Effects</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">How Temperature Affects Distance</h3>
            <p className="mb-3">
              Warmer air is less dense, creating less drag on the baseball. This allows the ball to travel farther.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Rule of Thumb:</strong> For every 10°F increase in temperature, a baseball travels approximately 2-3 feet farther.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Cold Weather (40°F)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Higher air density</li>
                <li>• More drag on the ball</li>
                <li>• Shorter travel distance</li>
                <li>• Pitchers may have advantage</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Hot Weather (90°F)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lower air density</li>
                <li>• Less drag on the ball</li>
                <li>• Longer travel distance</li>
                <li>• Hitters may have advantage</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Altitude and "Thin Air"</h2>
          
          <p className="mb-4">
            Higher altitudes have lower atmospheric pressure, resulting in less dense air and longer ball flight.
          </p>

          <div className="bg-red-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-red-800 mb-2">Coors Field Effect</h3>
            <p className="text-sm text-red-700 mb-3">
              Coors Field in Denver (5,280 feet elevation) is famous for its "thin air" effect on baseball flight.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Distance Increase:</strong> ~9% farther than sea level
              </div>
              <div>
                <strong>Home Run Rate:</strong> ~30% higher than average
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">Sea Level</div>
              <div className="text-sm text-gray-600">0 feet</div>
              <div className="text-xs text-gray-500">Normal distance</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">Denver</div>
              <div className="text-sm text-gray-600">5,280 feet</div>
              <div className="text-xs text-gray-500">+9% distance</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">Mexico City</div>
              <div className="text-sm text-gray-600">7,350 feet</div>
              <div className="text-xs text-gray-500">+15% distance</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Humidity and Water Vapor</h2>
          
          <p className="mb-4">
            Contrary to popular belief, higher humidity actually makes air less dense, allowing baseballs to travel farther.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Why?</strong> Water vapor (H₂O) has a lower molecular weight than the nitrogen and oxygen 
              that make up most of the air. When humidity increases, the lighter water molecules displace 
              heavier air molecules, reducing overall air density.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Low Humidity (20%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Higher air density</li>
                <li>• More drag on baseball</li>
                <li>• Slightly shorter distance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">High Humidity (80%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lower air density</li>
                <li>• Less drag on baseball</li>
                <li>• Slightly longer distance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Wind Effects</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Wind Direction and Speed</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Tailwind (Favorable)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Wind blowing toward outfield</li>
                    <li>• Reduces apparent drag</li>
                    <li>• Increases ball distance</li>
                    <li>• Can add 10-20 feet to fly balls</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Headwind (Unfavorable)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Wind blowing toward home plate</li>
                    <li>• Increases apparent drag</li>
                    <li>• Decreases ball distance</li>
                    <li>• Can reduce distance by 10-20 feet</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Crosswinds</h3>
              <p className="mb-3">
                Crosswinds can cause the ball to curve sideways, affecting both distance and accuracy.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Effect:</strong> Crosswinds can push fly balls toward foul territory or cause 
                  them to drift away from their intended path.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Weather Conditions</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Rain and Moisture</h3>
              <p className="text-sm text-gray-600">
                Wet conditions can make the ball heavier and affect grip, but the main impact is on field conditions 
                rather than ball flight physics.
              </p>
            </div>
            
            <div className="border-l-4 border-gray-500 pl-4">
              <h3 className="font-semibold">Barometric Pressure</h3>
              <p className="text-sm text-gray-600">
                Low pressure systems (stormy weather) reduce air density, while high pressure systems 
                (clear weather) increase air density.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold">Time of Day</h3>
              <p className="text-sm text-gray-600">
                Temperature typically peaks in late afternoon, creating optimal conditions for long ball flight 
                during day games.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ballpark Design</h3>
              <p className="text-sm text-gray-600">
                Teams consider local climate when designing ballparks. Coors Field's large outfield 
                compensates for the altitude effect.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Game Strategy</h3>
              <p className="text-sm text-gray-600">
                Managers adjust strategies based on weather conditions - more aggressive baserunning 
                in cold weather, different pitching approaches in windy conditions.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Player Performance</h3>
              <p className="text-sm text-gray-600">
                Players' statistics can vary significantly between home and away games due to 
                environmental differences between ballparks.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Environmental Adjustments</h2>
          
          <p className="mb-4">
            Statcast and other analytics systems can adjust for environmental factors to provide 
            more accurate comparisons between different ballparks and conditions.
          </p>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Example:</strong> A 400-foot home run in Denver might be adjusted to 365 feet 
              for sea-level equivalent, allowing fair comparison with other ballparks.
            </p>
          </div>
        </section>
      </div>

      <div className="flex justify-between mt-8">
        <Link 
          href="/learn/data-visualization/practice" 
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Data Visualization Practice
        </Link>
        <Link 
          href="/learn/environment/practice" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Environment Practice →
        </Link>
      </div>
    </div>
  );
} 