"use client";
import { useState } from "react";
import Link from "next/link";

export default function LaunchAnglePractice() {
  // Question 1: Numeric
  const [q1, setQ1] = useState("");
  const [q1Feedback, setQ1Feedback] = useState<string | null>(null);
  const q1Correct = 28;

  // Question 2: Multiple Choice
  const [q2, setQ2] = useState("");
  const [q2Feedback, setQ2Feedback] = useState<string | null>(null);

  function checkQ1() {
    const val = parseFloat(q1);
    if (isNaN(val)) {
      setQ1Feedback("Please enter a number.");
      return;
    }
    if (Math.abs(val - q1Correct) < 1) {
      setQ1Feedback("✅ Correct! The MLB average home run launch angle is about 28°.");
    } else {
      setQ1Feedback("❌ Not quite. Try again or check the lesson for the MLB average.");
    }
  }

  function checkQ2() {
    if (q2 === "b") {
      setQ2Feedback("✅ Correct! Pop-ups are usually above 40°.");
    } else if (q2) {
      setQ2Feedback("❌ Not quite. Pop-ups are very high launch angles.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Practice: Launch Angle</div>
      <h1 className="text-2xl font-bold mb-6 text-black">Launch Angle Practice</h1>
      {/* Q1 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">1. What is the typical launch angle (in degrees) for most MLB home runs?</div>
        <input
          type="number"
          className="border border-neutral-300 rounded px-3 py-2 mr-2 w-32"
          placeholder="Degrees"
          value={q1}
          onChange={e => setQ1(e.target.value)}
        />
        <button onClick={checkQ1} className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q1Feedback && <div className="mt-2 text-base font-semibold">{q1Feedback}</div>}
      </div>
      {/* Q2 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">2. Which launch angle range is most likely to result in a pop-up?</div>
        <div className="flex flex-col gap-2">
          <label><input type="radio" name="q2" value="a" checked={q2 === "a"} onChange={e => setQ2(e.target.value)} /> 10°–20°</label>
          <label><input type="radio" name="q2" value="b" checked={q2 === "b"} onChange={e => setQ2(e.target.value)} /> 40°–50°</label>
          <label><input type="radio" name="q2" value="c" checked={q2 === "c"} onChange={e => setQ2(e.target.value)} /> 20°–30°</label>
        </div>
        <button onClick={checkQ2} className="mt-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q2Feedback && <div className="mt-2 text-base font-semibold">{q2Feedback}</div>}
      </div>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/practice/distance" className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">Next: Distance Practice →</Link>
      </div>
    </main>
  );
} 