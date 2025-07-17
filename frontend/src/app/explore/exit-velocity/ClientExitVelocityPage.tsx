"use client";
import dynamic from "next/dynamic";

const PlotlyExitVelocityChart = dynamic(() => import("@/components/PlotlyExitVelocityChart"), { ssr: false });
import PitchVsExitVelocityChart from "@/components/PitchVsExitVelocityChart";

export default function ClientExitVelocityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Exit Velocity vs Distance vs Launch Angle</h1>
      <p className="text-gray-600 mb-6">
        Explore the full interactive 3D scatter plot of batted balls, colored by home run status. Rotate, zoom, and hover for details. This chart shows the relationship between exit velocity, hit distance, and launch angle for all batted balls in the database.
      </p>
      <PlotlyExitVelocityChart sampleSize={1000} />
      <PitchVsExitVelocityChart />
    </div>
  );
} 