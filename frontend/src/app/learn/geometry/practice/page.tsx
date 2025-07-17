"use client";
import Link from "next/link";

export default function GeometryPracticeLanding() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry Practice</div>
      <h1 className="text-3xl font-bold mb-6 text-black">Practice & Mastery: Geometry</h1>
      <p className="mb-8 text-base text-neutral-700">Test your understanding of each concept below, or try the challenge problems for a real test of your skills!</p>
      <ul className="space-y-4 mb-12">
        <li><Link href="/learn/geometry/practice/launch-angle" className="underline hover:text-black">Practice: Launch Angle</Link></li>
        <li><Link href="/learn/geometry/practice/distance" className="underline hover:text-black">Practice: Distance Calculations</Link></li>
        <li><Link href="/learn/geometry/practice/apex" className="underline hover:text-black">Practice: Apex & Hang Time</Link></li>
        <li><Link href="/learn/geometry/practice/field-geometry" className="underline hover:text-black">Practice: Field Geometry</Link></li>
        <li><Link href="/learn/geometry/practice/challenge" className="font-bold underline hover:text-black">Challenge Problems</Link></li>
      </ul>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/intro" className="text-sm text-neutral-500 underline hover:text-black">← Back to Introduction</Link>
      </div>
    </main>
  );
} 