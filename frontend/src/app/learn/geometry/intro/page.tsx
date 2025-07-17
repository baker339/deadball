import Link from "next/link";

export default function GeometryIntro() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">
        Introduction: Geometry in Baseball
      </h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          Geometry is everywhere in baseball. From the diamond’s layout to the arc of a home run, understanding geometry helps us decode the game’s most exciting moments—and the science behind the “deadball” debate.
        </p>
        <p className="text-base text-neutral-700 mb-4">
          In this module, you’ll learn how angles, distances, and trajectories shape every batted ball. We’ll use real Statcast data and MLB examples to show how geometry explains why some balls leave the park and others fall short.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Why Geometry Matters</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Launch angle and exit velocity determine how far a ball travels.</li>
          <li>Ballpark shapes and fence distances change home run odds.</li>
          <li>Changes in the baseball itself (the “deadball” debate) affect flight paths and outcomes.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">What You'll Learn</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>How to calculate launch angle, distance, and apex</li>
          <li>How field geometry and ballpark design affect the game</li>
          <li>How geometry helps us understand the “juiced” vs. “dead” ball debate</li>
        </ul>
      </section>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/launch-angle" className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">Next: Launch Angle →</Link>
      </div>
    </main>
  );
} 