import Link from "next/link";
import LessonNav from "../../../../components/LessonNav";

export default function ApexLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Physics</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Apex & Hang Time</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          The <span className="font-semibold">apex</span> is the highest point of a batted ball’s flight. <span className="font-semibold">Hang time</span> is how long the ball stays in the air. Both are important for fielders and for understanding home run probability.
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Apex is determined by the vertical component of velocity and gravity.</li>
          <li>Hang time depends on both vertical and horizontal motion.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Formulas</h2>
        <div className="bg-neutral-50 border border-neutral-200 rounded p-4 mb-4">
          <div className="font-mono text-sm mb-2">Apex = (v<sub>0</sub> * sin(θ))<sup>2</sup> / (2g)</div>
          <div className="font-mono text-sm mb-2">Hang Time = 2 * v<sub>0</sub> * sin(θ) / g</div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Baseball Examples</h2>
        <p className="text-base text-neutral-700 mb-4">
          Some of the most memorable home runs have huge apexes and long hang times, giving outfielders time to react—or fans time to marvel. Statcast tracks both metrics for every batted ball.
        </p>
        <div className="my-6 flex items-center justify-center h-64 bg-neutral-100 border border-neutral-200 rounded">
          <span className="text-neutral-400">[Apex & Hang Time Diagram Coming Soon]</span>
        </div>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/physics/distance" prevLabel="Previous: Distance Calculation" nextHref="/learn/physics/drag" nextLabel="Next: Drag & Gravity" />
      </div>
    </main>
  );
} 