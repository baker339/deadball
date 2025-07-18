import Link from "next/link";

export default function LearnOverview() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Learn</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">
        Deadball Academy
      </h1>
      <section className="mb-10">
        <p className="text-lg text-neutral-700 mb-4">
          Welcome to your comprehensive guide to the math and science behind every chart and insight on Deadball. Explore interactive lessons, practice questions, and real-world baseball analytics. Choose a module below to begin your journey!
        </p>
      </section>
      <nav className="mb-12">
        <ul className="space-y-4">
          <li>
            <Link href="/learn/geometry" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition">
              <span className="font-bold">1. Geometry of Baseball and Ballparks</span><br />
              <span className="text-sm text-neutral-600">Field layouts, wall quirks, launch angle, and the geometry of batted ball flight</span>
              <span className="block text-xs text-blue-700 mt-1">(3D geometry coming soon: see how it’s used in advanced topics like drag calculations!)</span>
              <ul className="list-disc pl-6 mt-2 text-xs text-neutral-500">
                <li>Field Geometry & Ballparks
                  <ul className="list-disc pl-6 mt-1 text-neutral-400">
                    <li>Field Layout & Dimensions</li>
                    <li>Outfield Wall Quirks</li>
                    <li>Ballpark Factors</li>
                  </ul>
                </li>
                <li>Launch Angle</li>
              </ul>
            </Link>
          </li>
          <li>
            <Link href="/learn/trigonometry" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition">
              <span className="font-bold">2. Trigonometry in Baseball</span><br />
              <span className="text-sm text-neutral-600">Multi-lesson course: SOHCAHTOA, velocity components, triangle diagrams, and more</span>
            </Link>
          </li>
          <li>
            <Link href="/learn/physics" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition">
              <span className="font-bold">3. Newtonian Physics & Ball Flight</span><br />
              <span className="text-sm text-neutral-600">Projectile motion, distance, apex, drag, and forces</span>
              <ul className="list-disc pl-6 mt-2 text-xs text-neutral-500">
                <li>Projectile Motion Overview</li>
                <li>Distance Calculation</li>
                <li>Apex & Hang Time</li>
                <li>Drag & Gravity</li>
                <li>Newton’s Laws in Baseball</li>
              </ul>
            </Link>
          </li>
          <li><Link href="/learn/exit-velocity" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition"><span className="font-bold">4. Exit Velocity & Home Run Probability</span><br /><span className="text-sm text-neutral-600">Exit velocity, distance, and home run odds</span></Link></li>
          <li><Link href="/learn/environment" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition"><span className="font-bold">5. Environmental Factors</span><br /><span className="text-sm text-neutral-600">Air density, wind, temperature, and weather effects</span></Link></li>
          <li><Link href="/learn/data-visualization" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition"><span className="font-bold">6. Data Analysis & Visualization</span><br /><span className="text-sm text-neutral-600">Reading Statcast charts, scatterplots, and more</span></Link></li>
          <li><Link href="/learn/practice" className="block p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 transition"><span className="font-bold">7. Practice & Mastery</span><br /><span className="text-sm text-neutral-600">Mixed questions and challenge mode</span></Link></li>
        </ul>
      </nav>
      <div className="mt-12 text-center">
        <Link href="/" className="text-sm text-neutral-500 underline hover:text-black">← Back to Home</Link>
      </div>
    </main>
  );
} 