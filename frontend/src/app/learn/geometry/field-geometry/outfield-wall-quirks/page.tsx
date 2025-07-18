import LessonNav from "../../../../../components/LessonNav";

export default function OutfieldWallQuirksLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-3xl font-extrabold mb-6 text-black">Outfield Wall Quirks</h1>
      {/* Math Toolbox */}
      <section className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <h3 className="font-bold text-blue-800 mb-1">Math Toolbox</h3>
          <ul className="list-disc pl-6 text-blue-900 text-base">
            <li><b>Right Triangle:</b> A triangle with one 90° angle. In this context, the wall height (vertical), the distance from home plate (horizontal), and the ball&apos;s path (hypotenuse) form a right triangle.</li>
            <li><b>Pythagorean Theorem:</b> a² + b² = c² (for right triangles; use to find the ball&apos;s path over the wall)</li>
            <li><b>Wall Area:</b> Area = height × width</li>
            <li><b>Wall Height:</b> The vertical distance a ball must clear to be a home run</li>
            <li><b>Horizontal Distance:</b> The distance from home plate to the wall (varies by park and location)</li>
            <li><b>Ratio/Proportion:</b> Used to compare wall heights and distances between parks</li>
            <li><b>Projectile Path:</b> (Preview) The arc a ball must follow to clear a wall (see Physics module for more)</li>
          </ul>
        </div>
      </section>
      {/* Step-by-Step Example */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Step-by-Step Example: Ball Path to Clear the Green Monster</h2>
        <p className="text-base text-neutral-700 mb-4">
          Fenway Park&apos;s Green Monster is 37 feet high and 310 feet from home plate. What is the minimum distance the ball must travel (in the air) to clear the wall, assuming it travels in a straight line from home plate to the top of the wall?
        </p>
        <p className="text-base text-neutral-700 mb-4">
          <b>Why is this a right triangle?</b> The horizontal distance from home plate to the wall and the vertical height of the wall meet at a right angle. The ball&apos;s path forms the hypotenuse, making this a classic right triangle problem.
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li><b>Wall height (vertical):</b> 37 ft</li>
          <li><b>Distance from home plate (horizontal):</b> 310 ft</li>
        </ul>
        <p className="text-base text-neutral-700 mb-4">
          <b>Use the Pythagorean theorem:</b> c = √(a² + b²) = √(310² + 37²) = √(96,100 + 1,369) = √97,469 ≈ 312.2 ft
        </p>
        <p className="text-base text-neutral-700 mb-4">
          <b>Interpretation:</b> The ball must travel at least <b>312.2 feet</b> in the air to clear the Green Monster at its shortest point.
        </p>
      </section>
      {/* Practice Problems */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Practice & Exploration</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Yankee Stadium&apos;s right field wall is 8 feet high and 314 feet from home plate. What is the minimum ball path needed to clear the wall?</li>
          <li>Suppose a ball is hit 320 feet and reaches a height of 10 feet at the wall. Will it clear the right field wall at Yankee Stadium? What about the Green Monster?</li>
          <li>Draw a diagram of two parks with different wall heights and distances. Label the minimum ball path needed for a home run at each wall.</li>
        </ul>
      </section>
      {/* MLB Context & Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">MLB Context & Key Takeaways</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Outfield wall quirks are a defining feature of MLB parks and a real-world math problem.</li>
          <li>Wall height and distance directly affect home run probability and player strategy.</li>
          <li>Math helps us compare parks and understand why some are hitter- or pitcher-friendly.</li>
        </ul>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/geometry/field-geometry/field-layout" prevLabel="Previous: Field Layout & Dimensions" nextHref="/learn/geometry/field-geometry/ballpark-factors" nextLabel="Next: Ballpark Factors" />
      </div>
    </main>
  );
} 