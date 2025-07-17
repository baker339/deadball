import Link from "next/link";
import LessonNav from "../../../../components/LessonNav";

export default function DistanceLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Physics</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Distance Calculations</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          The distance a baseball travels is determined by its <span className="font-semibold">exit velocity</span> and <span className="font-semibold">launch angle</span>. Ignoring air resistance, we can use the projectile motion formula:
        </p>
        <div className="bg-neutral-50 border border-neutral-200 rounded p-4 mb-4">
          <div className="font-mono text-sm mb-2">Distance = (v<sub>0</sub><sup>2</sup> * sin(2θ)) / g</div>
          <div className="text-xs text-neutral-500">Where v<sub>0</sub> = initial velocity, θ = launch angle, g = gravity</div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Worked Example</h2>
        <p className="text-base text-neutral-700 mb-4">
          If a ball leaves the bat at 45 m/s with a launch angle of 30°, how far will it travel? Plug the values into the formula above to find the answer.
        </p>
        <div className="my-6 flex items-center justify-center h-64 bg-neutral-100 border border-neutral-200 rounded">
          <span className="text-neutral-400">[Distance Calculation Diagram Coming Soon]</span>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Baseball Context</h2>
        <p className="text-base text-neutral-700 mb-4">
          In reality, air resistance and drag reduce the distance, but this formula gives a good starting point. Statcast data shows that balls hit at the same launch angle but with higher exit velocity travel much farther.
        </p>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/physics/projectile-motion" prevLabel="Previous: Projectile Motion Overview" nextHref="/learn/physics/apex" nextLabel="Next: Apex & Hang Time" />
      </div>
    </main>
  );
} 