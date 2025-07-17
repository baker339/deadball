import Link from "next/link";
import LessonNav from "../../../../components/LessonNav";

export default function FieldGeometryOverview() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Field Geometry & Ballparks</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          Every MLB ballpark is unique. Outfield wall shapes, fence heights, and distances all affect the likelihood of a batted ball becoming a home run. Understanding field geometry is crucial for interpreting Statcast data and the juiced/dead ball debate.
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Shorter fences = more home runs; deeper alleys = more triples.</li>
          <li>Some parks have quirky angles or high walls (e.g., Fenway’s Green Monster).</li>
          <li>Ballpark overlays show how a hit in one stadium might be a home run in another.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Lessons in This Submodule</h2>
        <ul className="list-decimal pl-6 text-base text-blue-700 mb-4">
          <li><Link href="/learn/geometry/field-geometry/field-layout">Field Layout & Dimensions</Link></li>
          <li><Link href="/learn/geometry/field-geometry/outfield-wall-quirks">Outfield Wall Quirks</Link></li>
          <li><Link href="/learn/geometry/field-geometry/ballpark-factors">Ballpark Factors</Link></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Launch Angle</h2>
        <ul className="list-decimal pl-6 text-base text-blue-700 mb-4">
          <li><Link href="/learn/geometry/launch-angle">Launch Angle</Link></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">MLB Context: Why Field Geometry Matters</h2>
        <p className="text-base text-neutral-700 mb-4">
          In 2019, Statcast data showed that a ball hit 380 feet to left field would be a home run in 18 ballparks, but an out in 12 others. Fenway Park’s Green Monster, Houston’s Crawford Boxes, and Oracle Park’s deep right-center are just a few examples of how geometry changes the game.
        </p>
        <div className="my-6 flex items-center justify-center h-64 bg-neutral-100 border border-neutral-200 rounded">
          <span className="text-neutral-400">[Ballpark Overlay Diagram Coming Soon]</span>
        </div>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/geometry" prevLabel="← Back to Geometry Overview" nextHref="/learn/geometry/field-geometry/field-layout" nextLabel="Start: Field Layout & Dimensions" />
      </div>
    </main>
  );
} 