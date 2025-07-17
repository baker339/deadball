import Link from "next/link";
import LessonNav from "../../../components/LessonNav";

export default function GeometryOverview() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">
        Geometry of Batted Ball Flight
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
        <h2 className="text-2xl font-bold mb-2 text-black">Submodules & Lessons</h2>
        <ul className="list-decimal pl-6 text-base text-blue-700 mb-4 space-y-2">
          <li>
            <Link href="/learn/geometry/field-geometry">Field Geometry & Ballparks</Link>
            <ul className="list-disc pl-6 text-blue-600 text-sm mt-2 space-y-1">
              <li><Link href="/learn/geometry/field-geometry/field-layout">Field Layout & Dimensions</Link></li>
              <li><Link href="/learn/geometry/field-geometry/outfield-wall-quirks">Outfield Wall Quirks</Link></li>
              <li><Link href="/learn/geometry/field-geometry/ballpark-factors">Ballpark Factors</Link></li>
            </ul>
          </li>
          <li>
            <Link href="/learn/geometry/launch-angle">Launch Angle</Link>
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">MLB Context: Why Geometry Matters</h2>
        <p className="text-base text-neutral-700 mb-4">
          Launch angle, distance, and field geometry are at the heart of the juiced vs. dead ball debate. Every ballpark’s unique shape changes the odds of a home run, and every batted ball is a real-world geometry problem.
        </p>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn" prevLabel="← Back to Learn Overview" nextHref="/learn/geometry/field-geometry" nextLabel="Start: Field Geometry & Ballparks" />
      </div>
    </main>
  );
} 