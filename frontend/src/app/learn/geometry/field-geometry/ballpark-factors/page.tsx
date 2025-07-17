import LessonNav from "../../../../../components/LessonNav";

export default function BallparkFactors() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Ballpark Factors</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          Not all ballparks play the same. &quot;Ballpark factors&quot; are statistical measures that describe how a stadium&apos;s unique features—especially its geometry—affect the outcomes of games played there. For example, a park with a short right field may see more home runs by left-handed hitters, while a deep center field can turn would-be homers into outs.
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Ballpark factors compare how often events (like home runs, doubles, or runs) happen in one park versus the league average.</li>
          <li>Geometry is a major driver: fence distances, wall heights, foul territory, and unique angles all shape the game.</li>
          <li>Atmospheric conditions (altitude, temperature, humidity, wind) also matter, but are covered in the Environment module.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">MLB Context: Why Ballpark Factors Matter</h2>
        <p className="text-base text-neutral-700 mb-4">
          Statcast and other advanced metrics use ballpark factors to &quot;normalize&quot; player stats, making it possible to compare hitters and pitchers fairly across different stadiums. For example, Coors Field in Denver is famously hitter-friendly due to its altitude and spacious outfield, while Oracle Park in San Francisco suppresses home runs with its deep right-center field.
        </p>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/geometry/field-geometry/outfield-wall-quirks" prevLabel="Previous: Outfield Wall Quirks" nextHref="/learn/geometry/launch-angle" nextLabel="Next: Launch Angle" />
      </div>
    </main>
  );
} 