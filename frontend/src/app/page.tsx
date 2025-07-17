import Image from "next/image";
import JuicedVsDeadBallChart from "../components/JuicedVsDeadBallChart";
import DragVsHRChart from "../components/DragVsHRChart";
import ExitVelocityVsDistanceChart from "../components/ExitVelocityVsDistanceChart";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-8 border-b border-neutral-200">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4 tracking-tight text-black">The Science of the Juiced & Dead Ball</h1>
        <p className="text-lg sm:text-xl text-neutral-700 mb-6 max-w-2xl">
          Data-driven analysis of MLB's changing baseballs, home run trends, and the physics behind the game. Editorial charts, interactive explainers, and more.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#explore" className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">Explore Data</a>
          <a href="/learn" className="bg-neutral-100 text-black px-6 py-2 rounded font-semibold border border-neutral-200 hover:bg-neutral-200 transition">Learn</a>
          <a href="/analytics" className="bg-neutral-100 text-black px-6 py-2 rounded font-semibold border border-neutral-200 hover:bg-neutral-200 transition">Analytics</a>
        </div>
      </section>

      {/* Main Visualization */}
      <section id="explore" className="max-w-6xl mx-auto px-4 py-16">
        <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Current State</div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <JuicedVsDeadBallChart granularity="month" />
        </div>
        
        {/* Additional Visualizations */}
        <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Detailed Analysis</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            <a href="/explore/drag-vs-hr" className="absolute top-3 right-3 z-10 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded border border-neutral-300 shadow hover:bg-neutral-200 transition focus:outline-none focus:ring-2 focus:ring-neutral-400">
              Expand Chart →
            </a>
            <DragVsHRChart granularity="month" />
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            <a href="/explore/exit-velocity" className="absolute top-3 right-3 z-10 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded border border-neutral-300 shadow hover:bg-neutral-200 transition focus:outline-none focus:ring-2 focus:ring-neutral-400">
              Expand Chart →
            </a>
            <ExitVelocityVsDistanceChart sampleSize={800} />
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section id="learn" className="max-w-3xl mx-auto px-4 py-16 border-t border-neutral-200">
        <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">The Debate</div>
        <h2 className="text-3xl font-bold mb-4 text-black">What is the "juiced" vs. "dead" ball debate?</h2>
        <p className="text-base text-neutral-700 mb-4">
          Major League Baseball's baseballs have changed over time, affecting home run rates and game outcomes. This site analyzes Statcast data to uncover trends in drag, distance, and more—blending data journalism with interactive learning.
        </p>
        <div className="mt-8">
          <a href="/debate" className="text-sm text-neutral-500 underline hover:text-black">Read more about the debate →</a>
        </div>
      </section>
    </main>
  );
}
