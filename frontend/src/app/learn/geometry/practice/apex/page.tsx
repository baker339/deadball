"use client";
import { useState } from "react";
import Link from "next/link";

const GRAVITY = 9.8;
const VELOCITY = 45;
const ANGLE = 30;
const APEX_CORRECT = ((VELOCITY * Math.sin(ANGLE * Math.PI / 180)) ** 2) / (2 * GRAVITY);
const HANGTIME_CORRECT = 2 * VELOCITY * Math.sin(ANGLE * Math.PI / 180) / GRAVITY;

export default function ApexPractice() {
  // Q1: Numeric (Apex)
  const [q1, setQ1] = useState("");
  const [q1Feedback, setQ1Feedback] = useState<string | null>(null);

  // Q2: Numeric (Hang Time)
  const [q2, setQ2] = useState("");
  const [q2Feedback, setQ2Feedback] = useState<string | null>(null);

  function checkQ1() {
    const val = parseFloat(q1);
    if (isNaN(val)) {
      setQ1Feedback("Please enter a number.");
      return;
    }
    if (Math.abs(val - APEX_CORRECT) < 1) {
      setQ1Feedback("✅ Correct! That's the calculated apex.");
    } else {
      setQ1Feedback("❌ Not quite. Review the formula in the lesson.");
    }
  }

  function checkQ2() {
    const val = parseFloat(q2);
    if (isNaN(val)) {
      setQ2Feedback("Please enter a number.");
      return;
    }
    if (Math.abs(val - HANGTIME_CORRECT) < 0.5) {
      setQ2Feedback("✅ Correct! That's the calculated hang time.");
    } else {
      setQ2Feedback("❌ Not quite. Review the formula in the lesson.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Practice: Apex & Hang Time</div>
      <h1 className="text-2xl font-bold mb-6 text-black">Apex & Hang Time Practice</h1>
      {/* Q1 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">1. What is the apex (maximum height, in meters) for a ball hit at 45 m/s and 30°?</div>
        <input
          type="number"
          className="border border-neutral-300 rounded px-3 py-2 mr-2 w-32"
          placeholder="Apex (m)"
          value={q1}
          onChange={e => setQ1(e.target.value)}
        />
        <button onClick={checkQ1} className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q1Feedback && <div className="mt-2 text-base font-semibold">{q1Feedback}</div>}
      </div>
      {/* Q2 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">2. What is the hang time (in seconds) for the same ball?</div>
        <input
          type="number"
          className="border border-neutral-300 rounded px-3 py-2 mr-2 w-32"
          placeholder="Hang Time (s)"
          value={q2}
          onChange={e => setQ2(e.target.value)}
        />
        <button onClick={checkQ2} className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q2Feedback && <div className="mt-2 text-base font-semibold">{q2Feedback}</div>}
      </div>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/practice/field-geometry" className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">Next: Field Geometry Practice →</Link>
      </div>
    </main>
  );
} 