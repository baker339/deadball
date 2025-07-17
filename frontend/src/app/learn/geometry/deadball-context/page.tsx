import Link from "next/link";
import LessonNav from "../../../../components/LessonNav";

export default function DeadballContextLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Deadball Context</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          Changes in the construction of the baseball—its seams, core, and materials—can have a dramatic effect on launch angle, distance, and home run rates. This is at the heart of the “juiced” vs. “dead” ball debate.
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Lower seams = less drag, longer flights</li>
          <li>Different core materials = changes in exit velocity</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Case Studies</h2>
        <p className="text-base text-neutral-700 mb-4">
          <span className="font-semibold">2019:</span> MLB home run rates reached all-time highs, with evidence of a “juiced” ball (lower drag, higher exit velocity).<br />
          <span className="font-semibold">2021:</span> MLB introduced a new “deadened” ball, and home run rates dropped.
        </p>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/geometry/field-geometry" prevLabel="Previous: Field Geometry" nextHref="/learn/geometry/practice" nextLabel="Next: Practice" />
      </div>
    </main>
  );
} 