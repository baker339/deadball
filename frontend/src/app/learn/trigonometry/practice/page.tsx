"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_VELOCITY = 40; // m/s
const LAUNCH_ANGLE = 25; // degrees

function calculateVy(v0: number, thetaDeg: number) {
  const thetaRad = (thetaDeg * Math.PI) / 180;
  return v0 * Math.sin(thetaRad);
}

export default function TrigPractice() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const correct = calculateVy(INITIAL_VELOCITY, LAUNCH_ANGLE);

  function checkAnswer() {
    const userVal = parseFloat(answer);
    if (isNaN(userVal)) {
      setFeedback("Please enter a number.");
      return;
    }
    if (Math.abs(userVal - correct) < 0.5) {
      setFeedback("✅ Correct! Great job.");
    } else {
      setFeedback(`❌ Not quite. The correct answer is about ${correct.toFixed(1)} m/s.`);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Trigonometry Practice</div>
      <h1 className="text-3xl font-bold mb-6 text-black">Practice: Vertical Velocity Component</h1>
      <div className="mb-6 text-base text-neutral-700">
        <p>
          If a baseball leaves the bat at <span className="font-semibold">{INITIAL_VELOCITY} m/s</span> with a launch angle of <span className="font-semibold">{LAUNCH_ANGLE}°</span>, what is the <span className="font-semibold">vertical velocity component</span> <span className="font-mono">v<sub>y</sub></span>?
        </p>
        <div className="bg-neutral-50 border border-neutral-200 rounded p-4 my-4">
          <div className="font-mono text-sm mb-2">v<sub>y</sub> = v<sub>0</sub> * sin(θ)</div>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="number"
          className="border border-neutral-300 rounded px-3 py-2 mr-2 w-32"
          placeholder="v<sub>y</sub> (m/s)"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <button
          onClick={checkAnswer}
          className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition"
        >
          Check Answer
        </button>
      </div>
      {feedback && <div className="mb-6 text-base font-semibold">{feedback}</div>}
      <div className="mt-12 text-center">
        <Link href="/learn/trigonometry" className="text-sm text-neutral-500 underline hover:text-black">← Back to Lesson</Link>
      </div>
    </main>
  );
} 