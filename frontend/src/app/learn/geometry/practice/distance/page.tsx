"use client";
import { useState } from "react";
import Link from "next/link";

const GRAVITY = 9.8;
const VELOCITY = 45;
const ANGLE = 30;
const DIST_CORRECT = ((VELOCITY ** 2) * Math.sin(2 * (ANGLE * Math.PI / 180))) / GRAVITY;

export default function DistancePractice() {
  // Q1: Numeric
  const [q1, setQ1] = useState("");
  const [q1Feedback, setQ1Feedback] = useState<string | null>(null);

  // Q2: Multiple Choice
  const [q2, setQ2] = useState("");
  const [q2Feedback, setQ2Feedback] = useState<string | null>(null);

  function checkQ1() {
    const val = parseFloat(q1);
    if (isNaN(val)) {
      setQ1Feedback("Please enter a number.");
      return;
    }
    if (Math.abs(val - DIST_CORRECT) < 2) {
      setQ1Feedback("✅ Correct! That's the calculated distance ignoring air resistance.");
    } else {
      setQ1Feedback(`❌ Not quite. Try again or review the formula in the lesson.`);
    }
  }

  function checkQ2() {
    if (q2 === "b") {
      setQ2Feedback("✅ Correct! Higher exit velocity means much greater distance.");
    } else if (q2) {
      setQ2Feedback("❌ Not quite. Review how velocity affects distance in the lesson.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Practice: Distance Calculations</div>
      <h1 className="text-2xl font-bold mb-6 text-black">Distance Calculations Practice</h1>
      {/* Q1 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">1. If a ball leaves the bat at 45 m/s with a launch angle of 30°, how far will it travel (ignoring air resistance)?</div>
        <input
          type="number"
          className="border border-neutral-300 rounded px-3 py-2 mr-2 w-32"
          placeholder="Distance (m)"
          value={q1}
          onChange={e => setQ1(e.target.value)}
        />
        <button onClick={checkQ1} className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q1Feedback && <div className="mt-2 text-base font-semibold">{q1Feedback}</div>}
      </div>
      {/* Q2 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">2. Which change will increase the distance a ball travels the most?</div>
        <div className="flex flex-col gap-2">
          <label><input type="radio" name="q2" value="a" checked={q2 === "a"} onChange={e => setQ2(e.target.value)} /> Increase launch angle from 30° to 35°</label>
          <label><input type="radio" name="q2" value="b" checked={q2 === "b"} onChange={e => setQ2(e.target.value)} /> Increase exit velocity from 45 m/s to 50 m/s</label>
          <label><input type="radio" name="q2" value="c" checked={q2 === "c"} onChange={e => setQ2(e.target.value)} /> Decrease gravity from 9.8 to 9.0 m/s²</label>
        </div>
        <button onClick={checkQ2} className="mt-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q2Feedback && <div className="mt-2 text-base font-semibold">{q2Feedback}</div>}
      </div>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/practice/apex" className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">Next: Apex Practice →</Link>
      </div>
    </main>
  );
} 