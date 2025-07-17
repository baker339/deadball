import Link from "next/link";
import LessonNav from "../../../../components/LessonNav";
import LaunchAngleAnimation from "../../../../components/LaunchAngleAnimation";

export default function LaunchAngleLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Launch Angle</h1>
      {/* Math Toolbox */}
      <section className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <h3 className="font-bold text-blue-800 mb-1">Math Toolbox</h3>
          <ul className="list-disc pl-6 text-blue-900 text-base">
            <li><b>Pythagorean Theorem:</b> a² + b² = c² (for right triangles)</li>
            <li><b>Rise over Run:</b> The ratio of vertical to horizontal change forms the slope of the ball's path</li>
            <li><b>Triangle Sides:</b> You can use the lengths of the vertical and horizontal components to construct and measure the launch angle</li>
          </ul>
        </div>
      </section>
      {/* Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Step-by-Step: Launch Angle with Triangles</h2>
        <p className="text-base text-neutral-700 mb-4">
          Imagine a baseball leaves the bat with a vertical velocity of 40 mph and a horizontal velocity of 90 mph. You can represent this as a right triangle:
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>The vertical side (rise) is 40 units long</li>
          <li>The horizontal side (run) is 90 units long</li>
          <li>The hypotenuse is the ball's total exit velocity (use the Pythagorean theorem to find it)</li>
        </ul>
        <p className="text-base text-neutral-700 mb-4">
          <b>Find the hypotenuse:</b> c = √(40² + 90²) = √(1600 + 8100) = √9700 ≈ 98.5 mph
        </p>
        <p className="text-base text-neutral-700 mb-4">
          <b>Estimate the launch angle:</b> Draw the triangle to scale on graph paper, measure the angle with a protractor, or use the ratio of rise/run to estimate the steepness. The bigger the rise compared to the run, the steeper the angle.
        </p>
        <div className="my-6 flex items-center justify-center h-72 bg-neutral-100 border border-neutral-200 rounded">
          <LaunchAngleAnimation />
        </div>
      </section>
      {/* Try It Yourself Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Try It Yourself</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>A ball leaves the bat with a vertical velocity of 35 mph and a horizontal velocity of 80 mph. Draw the triangle and use the Pythagorean theorem to find the total exit velocity. Estimate the launch angle by measuring or comparing rise/run.</li>
          <li>If a ball’s vertical velocity is 50 mph and the horizontal velocity is 50 mph, what is the shape of the triangle? What can you say about the launch angle?</li>
          <li>Find a Statcast highlight and try to sketch the triangle for the launch angle using the data provided.</li>
        </ul>
      </section>
      {/* Context and navigation */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Why Launch Angle Matters</h2>
        <p className="text-base text-neutral-700 mb-4">
          Launch angle, combined with exit velocity, determines how far a ball will travel. Most home runs are hit with launch angles between 25° and 35°, but the optimal angle can vary based on player, ballpark, and even the baseball itself. Understanding the geometry behind launch angle helps players and analysts optimize performance and strategy. In the next section, you’ll learn how trigonometry can make these calculations even easier!
        </p>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/geometry/field-geometry/ballpark-factors" prevLabel="Previous: Ballpark Factors" nextHref="/learn" nextLabel="Back to Learn Overview" />
      </div>
    </main>
  );
} 