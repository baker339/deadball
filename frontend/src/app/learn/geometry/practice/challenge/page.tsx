"use client";
import { useState } from "react";
import Link from "next/link";

export default function GeometryChallengePractice() {
  // Q1: Scenario
  const [q1, setQ1] = useState("");
  const [q1Feedback, setQ1Feedback] = useState<string | null>(null);

  // Q2: Scenario
  const [q2, setQ2] = useState("");
  const [q2Feedback, setQ2Feedback] = useState<string | null>(null);

  function checkQ1() {
    if (q1 === "b") {
      setQ1Feedback("✅ Correct! The 2019 ball had lower drag, so the same hit would travel farther.");
    } else if (q1) {
      setQ1Feedback("❌ Not quite. Review the deadball context lesson.");
    }
  }

  function checkQ2() {
    if (q2 === "c") {
      setQ2Feedback("✅ Correct! A ball hit at 28° and 50 m/s is most likely to be a home run.");
    } else if (q2) {
      setQ2Feedback("❌ Not quite. Think about the optimal launch angle and high exit velocity.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Challenge Problems</div>
      <h1 className="text-2xl font-bold mb-6 text-black">Geometry Challenge</h1>
      {/* Q1 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">1. A ball hit at 30° and 45 m/s in 2019 and 2021 travels different distances. In which year is it more likely to be a home run?</div>
        <div className="flex flex-col gap-2">
          <label><input type="radio" name="q1" value="a" checked={q1 === "a"} onChange={e => setQ1(e.target.value)} /> 2021 (deadened ball)</label>
          <label><input type="radio" name="q1" value="b" checked={q1 === "b"} onChange={e => setQ1(e.target.value)} /> 2019 (juiced ball)</label>
        </div>
        <button onClick={checkQ1} className="mt-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q1Feedback && <div className="mt-2 text-base font-semibold">{q1Feedback}</div>}
      </div>
      {/* Q2 */}
      <div className="mb-8">
        <div className="mb-2 font-semibold">2. Which of the following is most likely to result in a home run?</div>
        <div className="flex flex-col gap-2">
          <label><input type="radio" name="q2" value="a" checked={q2 === "a"} onChange={e => setQ2(e.target.value)} /> 15° launch angle, 55 m/s exit velocity</label>
          <label><input type="radio" name="q2" value="b" checked={q2 === "b"} onChange={e => setQ2(e.target.value)} /> 40° launch angle, 40 m/s exit velocity</label>
          <label><input type="radio" name="q2" value="c" checked={q2 === "c"} onChange={e => setQ2(e.target.value)} /> 28° launch angle, 50 m/s exit velocity</label>
        </div>
        <button onClick={checkQ2} className="mt-2 bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition">Check</button>
        {q2Feedback && <div className="mt-2 text-base font-semibold">{q2Feedback}</div>}
      </div>
      <div className="mt-12 text-center">
        <Link href="/learn/geometry/practice" className="text-sm text-neutral-500 underline hover:text-black">← Back to Practice Landing</Link>
      </div>
    </main>
  );
} 