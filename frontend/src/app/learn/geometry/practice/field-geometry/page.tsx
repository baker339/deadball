"use client";
import { useState } from "react";
import Link from "next/link";

export default function FieldGeometryPractice() {
  // Q1: Multiple Choice
  const [q1, setQ1] = useState("");
  const [q1Feedback, setQ1Feedback] = useState<string | null>(null);

  // Q2: Scenario
  const [q2, setQ2] = useState("");
  const [q2Feedback, setQ2Feedback] = useState<string | null>(null);

  function checkQ1() {
    if (q1 === "b") {
      setQ1Feedback("✅ Correct! Fenway's Green Monster is a famous high wall.");
    } else if (q1) {
      setQ1Feedback("❌ Not quite. Review the lesson on ballpark features.");
    }
  }

  function checkQ2() {
    if (q2 === "a") {
      setQ2Feedback("✅ Correct! A ball hit to deep center in Comerica Park is less likely to be a home run.");
    } else if (q2) {
      setQ2Feedback("❌ Not quite. Think about the deepest part of the park.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Practice: Field Geometry</div>
      <h1 className="text-2xl font-bold mb-6 text-black">Field Geometry & Ballparks Practice</h1>
      {/* Q1 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">1. Which ballpark feature is most likely to turn a would-be home run into a double?</div>
        <div className="flex flex-col gap-2">
          <label><input type="radio" name="q1" value="a" checked={q1 === "a"} onChange={e => setQ1(e.target.value)} /> Short right field porch</label>
          <label><input type="radio" name="q1" value="b" checked={q1 === "b"} onChange={e => setQ1(e.target.value)} /> High outfield wall (e.g., Green Monster)</label>
          <label><input type="radio" name="q1" value="c" checked={q1 === "c"} onChange={e => setQ1(e.target.value)} /> Artificial turf</label>
        </div>
        <button onClick={checkQ1} className="mt-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q1Feedback && <div className="mt-2 text-base font-semibold">{q1Feedback}</div>}
      </div>
      {/* Q2 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">2. In which scenario is a home run least likely?</div>
        <div className="flex flex-col gap-2">
          <label><input type="radio" name="q2" value="a" checked={q2 === "a"} onChange={e => setQ2(e.target.value)} /> Deep center field in Comerica Park</label>
          <label><input type="radio" name="q2" value="b" checked={q2 === "b"} onChange={e => setQ2(e.target.value)} /> Left field in Yankee Stadium</label>
          <label><input type="radio" name="q2" value="c" checked={q2 === "c"} onChange={e => setQ2(e.target.value)} /> Right field in Fenway Park</label>
        </div>
        <button onClick={checkQ2} className="mt-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q2Feedback && <div className="mt-2 text-base font-semibold">{q2Feedback}</div>}
      </div>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/practice/challenge" className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">Next: Challenge Problems →</Link>
      </div>
    </main>
  );
} 