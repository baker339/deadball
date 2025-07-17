import React from 'react';
import Link from 'next/link';
import LessonNav from '@/components/LessonNav';
import { EquationBlock } from '@/components/EquationBlock';

export default function PhysicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Physics of Baseball Flight</h1>
        <p className="text-lg text-gray-600">
          Understanding the fundamental forces that govern how a baseball moves through the air
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Four Forces of Flight</h2>
          <p className="mb-4">
            When a baseball is hit, it experiences four main forces that determine its trajectory:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">1. Gravity (Weight)</h3>
              <p className="text-sm text-blue-700">
                Always acts downward, pulling the ball toward Earth. This is the force that causes the ball to eventually fall.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">2. Thrust (Initial Force)</h3>
              <p className="text-sm text-green-700">
                The force from the bat that propels the ball forward. This is what gives the ball its initial velocity.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">3. Drag (Air Resistance)</h3>
              <p className="text-sm text-red-700">
                Opposes the ball's motion through the air. This is what we measure with the drag coefficient.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">4. Lift (Magnus Force)</h3>
              <p className="text-sm text-purple-700">
                Created by the ball's spin, causing it to curve. This is why pitchers can make the ball move.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Newton's Laws in Action</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">First Law: Inertia</h3>
            <p className="mb-3">
              A baseball at rest stays at rest, and a baseball in motion stays in motion unless acted upon by an external force.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Example:</strong> When a ball is hit, it continues moving in a straight line until gravity and air resistance slow it down.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Second Law: Force = Mass × Acceleration</h3>
            <p className="mb-3">
              The acceleration of a baseball is directly proportional to the net force acting on it.
            </p>
            <EquationBlock equation="F = ma" />
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Example:</strong> A harder hit (more force) results in greater acceleration and higher exit velocity.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Third Law: Action-Reaction</h3>
            <p className="mb-3">
              For every action, there is an equal and opposite reaction.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Example:</strong> When the bat hits the ball, the ball exerts an equal force back on the bat.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Energy and Momentum</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Kinetic Energy</h3>
            <p className="mb-3">
              The energy of motion. A moving baseball has kinetic energy proportional to its mass and the square of its velocity.
            </p>
            <EquationBlock equation="KE = \\frac{1}{2}mv^2" />
            <p className="text-sm text-gray-600">
              Where m is mass and v is velocity
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Momentum</h3>
            <p className="mb-3">
              The product of mass and velocity. Momentum is conserved in collisions.
            </p>
            <EquationBlock equation="p = mv" />
            <p className="text-sm text-gray-600">
              Where p is momentum, m is mass, and v is velocity
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Conservation of Energy</h3>
            <p className="mb-3">
              Energy cannot be created or destroyed, only transformed from one form to another.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Example:</strong> When a ball is hit, some of the bat's kinetic energy is transferred to the ball, 
                while some is lost as heat and sound.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Magnus Effect</h2>
          <p className="mb-4">
            When a baseball spins, it creates a pressure difference on opposite sides, causing the ball to curve.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Backspin (Hitters)</h3>
              <p className="text-sm text-gray-600 mb-2">
                Creates upward force, helping the ball stay in the air longer and travel farther.
              </p>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-sm text-green-800">
                  More backspin = higher launch angle = potential for more distance
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Topspin (Pitchers)</h3>
              <p className="text-sm text-gray-600 mb-2">
                Creates downward force, making the ball drop faster than expected.
              </p>
              <div className="bg-red-100 p-3 rounded">
                <p className="text-sm text-red-800">
                  More topspin = faster drop = harder to hit
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Exit Velocity Analysis</h3>
              <p className="text-sm text-gray-600">
                Understanding the physics of exit velocity helps us predict how far a ball will travel.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Launch Angle Optimization</h3>
              <p className="text-sm text-gray-600">
                The optimal launch angle balances distance with the time the ball stays in the air.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">Drag Coefficient Impact</h3>
              <p className="text-sm text-gray-600">
                Changes in ball construction affect drag, which directly impacts home run rates.
              </p>
            </div>
          </div>
        </section>
      </div>

      <LessonNav 
        prev={{ href: '/learn/trigonometry', label: 'Trigonometry' }}
        next={{ href: '/learn/physics/practice', label: 'Physics Practice' }}
      />
    </div>
  );
} 