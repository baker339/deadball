import DragVsHRChart from "../../../components/DragVsHRChart";
import ExpectedVsActualDistanceChart from "../../../components/ExpectedVsActualDistanceChart";

export default function DragVsHRPage() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Drag Coefficient vs Home Runs</h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore the relationship between air resistance (drag coefficient) and home run production over time. Use the interactive chart below to see how changes in the baseball affect the game.
      </p>
      <div className="mb-16">
        <DragVsHRChart granularity="month" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Expected vs Actual Home Run Distance (Raw Hits)</h2>
      <p className="text-base text-gray-600 mb-8">
        This scatter plot shows, for every qualifying hit, the expected distance (in a vacuum, no drag) vs the actual distance measured by Statcast. This visualizes the effect of drag and the &quot;juiced&quot; or &quot;dead&quot; ball debate at the most granular level.
      </p>
      <ExpectedVsActualDistanceChart />
    </main>
  );
} 