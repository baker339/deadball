import LessonNav from "../../../../../components/LessonNav";

export default function FieldLayoutLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Geometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Field Layout & Dimensions</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Learning Objectives</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Identify and label all key parts of an MLB field</li>
          <li>Understand standard and variable field dimensions</li>
          <li>Explain how field layout affects gameplay and statistics</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">1. The Baseball Diamond: Infield Basics</h2>
        <p className="text-base text-neutral-700 mb-4">
          The infield is a perfect square, called the &quot;diamond,&quot; with each side measuring <b>90 feet</b>. The four corners are home plate, first base, second base, and third base. The pitcher’s mound is 60 feet 6 inches from home plate. The bases are arranged counterclockwise.
        </p>
        <div className="flex justify-center my-6">
          {/* SVG Diagram: Accurate Baseball Diamond, base labels higher and outward */}
          <svg viewBox="0 0 320 300" width="320" height="300" className="bg-white border rounded shadow">
            {/* Diamond (rotated square) */}
            <polygon points="160,70 260,170 160,270 60,170" fill="#e0e7ef" stroke="#3b82f6" strokeWidth="3" />
            {/* Bases */}
            <circle cx="160" cy="270" r="9" fill="#fff" stroke="#3b82f6" strokeWidth="2" /> {/* Home */}
            <circle cx="260" cy="170" r="9" fill="#fff" stroke="#3b82f6" strokeWidth="2" /> {/* First */}
            <circle cx="160" cy="70" r="9" fill="#fff" stroke="#3b82f6" strokeWidth="2" /> {/* Second */}
            <circle cx="60" cy="170" r="9" fill="#fff" stroke="#3b82f6" strokeWidth="2" /> {/* Third */}
            {/* Pitcher's mound */}
            <circle cx="160" cy="170" r="7" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            {/* Foul lines */}
            <line x1="160" y1="270" x2="60" y2="170" stroke="#ef4444" strokeWidth="2" />
            <line x1="160" y1="270" x2="260" y2="170" stroke="#ef4444" strokeWidth="2" />
            {/* Labels */}
            <text x="160" y="60" textAnchor="middle" fontSize="12" fill="#1e293b">Second Base</text>
            <text x="265" y="140" textAnchor="middle" fontSize="12" fill="#1e293b">First Base</text>
            <text x="160" y="288" textAnchor="middle" fontSize="12" fill="#1e293b">Home Plate</text>
            <text x="55" y="140" textAnchor="middle" fontSize="12" fill="#1e293b">Third Base</text>
            <text x="170" y="160" fontSize="11" fill="#b45309">Pitcher</text>
          </svg>
        </div>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li><b>Home plate</b> is where the batter stands and runs begin/end.</li>
          <li><b>First, second, and third base</b> are each 90 feet apart.</li>
          <li><b>Pitcher’s mound</b> is raised and centered between home and second base.</li>
        </ul>
      </section>
      {/* New section: Calculating Field Areas */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Calculating Field Areas</h2>
        <p className="text-base text-neutral-700 mb-4">
          Understanding the area of different parts of a baseball field is useful for comparing parks, planning groundskeeping, and even analyzing defensive strategy. Let’s look at how to calculate or estimate these areas:
        </p>
        <h3 className="text-lg font-semibold mb-1">1. Infield Area (the Diamond)</h3>
        <p className="text-base text-neutral-700 mb-2">
          The infield is a square, 90 feet on each side. The area is:
        </p>
        <div className="bg-neutral-100 border rounded px-4 py-2 mb-2 text-base">
          Area = side × side = 90 ft × 90 ft = <b>8,100 ft²</b>
        </div>
        <h3 className="text-lg font-semibold mb-1 mt-4">2. Estimating the Total Field Area</h3>
        <p className="text-base text-neutral-700 mb-2">
          The entire field is not a perfect shape, but you can estimate its area by breaking it into simpler polygons:
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-2">
          <li><b>Infield:</b> Square (as above)</li>
          <li><b>Outfield:</b> Some parks can be roughly estimated as a sector of a circle (from home plate to the outfield fence), but many—like Fenway Park—have polygonal outfields made of straight segments and corners. For these, break the outfield into triangles and rectangles, calculate each area, and sum them for a total.</li>
        </ul>
        <p className="text-base text-neutral-700 mb-2">
          <b>Example (circular):</b> If the outfield fence is roughly 400 feet from home plate all around, the outfield can be estimated as a quarter-circle:
        </p>
        <div className="bg-neutral-100 border rounded px-4 py-2 mb-2 text-base">
          Area = (π × r²) / 4 = (3.14 × 400²) / 4 ≈ 125,600 ft²
        </div>
        <p className="text-base text-neutral-700 mb-2">
          <b>Example (polygonal, like Fenway):</b> Suppose left field is 310 ft, center is 390 ft, and right field is 302 ft, with straight walls connecting these points. You can draw triangles from home plate to each pair of fence points, calculate each triangle’s area, and sum them for an estimate.
        </p>
        <p className="text-base text-neutral-700 mb-2">
          Real parks have irregular shapes, so for more accuracy, break the field into smaller triangles and rectangles, calculate each area, and sum them.
        </p>
        <h3 className="text-lg font-semibold mb-1 mt-4">3. Why Does Area Matter?</h3>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-2">
          <li>Bigger outfields mean more ground for outfielders to cover (more doubles/triples)</li>
          <li>Smaller fields can lead to more home runs</li>
          <li>Area affects how teams position defenders and design strategies</li>
        </ul>
        <h3 className="text-lg font-semibold mb-1 mt-4">Practice</h3>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-2">
          <li>Calculate the area of the infield if the bases were 80 feet apart instead of 90.</li>
          <li>Estimate the total field area for a park with a 330 ft left field, 400 ft center, and 320 ft right field by breaking it into triangles. (Hint: Use the formula for the area of a triangle with two sides and the included angle.)</li>
          <li>Look up Fenway Park’s outfield dimensions and sketch how you would break it into polygons to estimate its area.</li>
        </ul>
      </section>
      {/* Math Toolbox and Step-by-Step Example */}
      <section className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <h3 className="font-bold text-blue-800 mb-1">Math Toolbox</h3>
          <ul className="list-disc pl-6 text-blue-900 text-base">
            <li><b>Area of a triangle (SAS):</b> (1/2) × a × b × sin(C)</li>
            <li><b>Law of Cosines:</b> c² = a² + b² - 2ab·cos(C)</li>
            <li><b>Area of a square:</b> side × side</li>
            <li><b>Area of a sector:</b> (θ/360) × π × r² (θ in degrees)</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold mb-2">Step-by-Step Example: Polygonal Outfield Area</h2>
        <p className="text-base text-neutral-700 mb-2">
          Suppose a simplified outfield has these fence distances from home plate:
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-2">
          <li>Left Field (LF): 310 ft</li>
          <li>Center Field (CF): 400 ft</li>
          <li>Right Field (RF): 320 ft</li>
        </ul>
        <p className="text-base text-neutral-700 mb-2">
          Assume the angle between LF and CF and between CF and RF is 45° each (for simplicity). We can break the outfield into two triangles:
        </p>
        <ol className="list-decimal pl-6 text-base text-neutral-700 mb-2">
          <li>
            <b>Triangle 1 (Home–LF–CF):</b><br />
            Sides: 310 ft, 400 ft, angle = 45°<br />
            Area = (1/2) × 310 × 400 × sin(45°) ≈ (1/2) × 310 × 400 × 0.7071 ≈ 43,080 ft²
          </li>
          <li>
            <b>Triangle 2 (Home–CF–RF):</b><br />
            Sides: 400 ft, 320 ft, angle = 45°<br />
            Area = (1/2) × 400 × 320 × sin(45°) ≈ (1/2) × 400 × 320 × 0.7071 ≈ 45,255 ft²
          </li>
        </ol>
        <p className="text-base text-neutral-700 mb-2">
          <b>Total outfield area ≈ 43,080 + 45,255 = 88,335 ft²</b> (plus the infield area if you want the whole field).
        </p>
        <p className="text-base text-neutral-700 mb-2">
          <b>Note:</b> For real parks, use actual fence distances and angles (which you can estimate from diagrams or field data). For triangles where you know all three sides, use the Law of Cosines to find the angle, then the area formula above.
        </p>
      </section>
      {/* Try It Yourself Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Try It Yourself: Fenway Park</h2>
        <p className="text-base text-neutral-700 mb-2">
          Fenway Park’s outfield is famously irregular. Use the following fence distances (from home plate):
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-2">
          <li>Left Field: 310 ft</li>
          <li>Left-Center: 379 ft</li>
          <li>Center Field: 390 ft</li>
          <li>Right-Center: 420 ft</li>
          <li>Right Field: 302 ft</li>
        </ul>
        <ol className="list-decimal pl-6 text-base text-neutral-700 mb-2">
          <li>Sketch the outfield as a polygon with these points.</li>
          <li>Break the shape into triangles (e.g., Home–LF–LC, Home–LC–CF, etc.).</li>
          <li>Estimate the angles between each pair of fence points (or use a protractor on a diagram).</li>
          <li>Calculate the area of each triangle using the SAS formula.</li>
          <li>Add up the areas for a total outfield estimate.</li>
        </ol>
        <p className="text-base text-neutral-700 mb-2">
          <b>Challenge:</b> Look up a diagram of Fenway and try to get as accurate as possible. How does your estimate compare to a circular or sector-based estimate?
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">2. Outfield Dimensions</h2>
        <p className="text-base text-neutral-700 mb-4">
          Beyond the infield is the outfield, which extends to the outfield wall or fence. Unlike the infield, outfield dimensions vary widely between parks:
        </p>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Left field: typically 310–350 feet from home plate</li>
          <li>Center field: typically 390–435 feet</li>
          <li>Right field: typically 300–350 feet</li>
        </ul>
        <p className="text-base text-neutral-700 mb-4">
          <b>Example:</b> Fenway Park’s left field is just 310 feet, while Comerica Park’s center field is 420 feet. These differences affect home run rates and defensive strategy.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">3. Foul Territory</h2>
        <p className="text-base text-neutral-700 mb-4">
          Foul territory is the area outside the two foul lines but within the stadium. Parks with more foul territory (like the Oakland Coliseum) see more foul outs, which can help pitchers. Parks with less foul ground (like Fenway) give hitters more chances.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">4. Wall Heights & Shapes</h2>
        <p className="text-base text-neutral-700 mb-4">
          Outfield walls can be as low as 3 feet or as high as 37 feet (Fenway’s Green Monster). Odd angles and unique features (like Tal’s Hill in Houston, now removed) create unpredictable bounces and affect both offense and defense.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">5. MLB Rules & Minimums</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Infield: 90 feet between bases, 60’6” from mound to home plate</li>
          <li>Outfield: Minimum 325 feet down the lines, 400 feet to center (for new parks)</li>
          <li>Wall height: No official minimum or maximum</li>
        </ul>
        <p className="text-base text-neutral-700 mb-4">
          Parks built before 1958 (like Fenway) are &quot;grandfathered&quot; and can have shorter distances.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">6. Real-World Impact</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Short fences = more home runs; deep alleys = more triples</li>
          <li>High walls can turn home runs into doubles</li>
          <li>Unique layouts affect defensive positioning and player value</li>
        </ul>
        <p className="text-base text-neutral-700 mb-4">
          <b>MLB Example:</b> Coors Field’s spacious outfield leads to more doubles and triples, while Yankee Stadium’s short right field boosts home runs for left-handed hitters.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Practice & Exploration</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>Label the bases, pitcher’s mound, and foul lines on a blank field diagram.</li>
          <li>Compare the outfield dimensions of Fenway Park and Oracle Park. Which is more likely to see home runs to left field?</li>
          <li>If a ball travels 400 feet to center, is it a home run in every park? Why or why not?</li>
          <li>How does wall height affect the outcome of a deep fly ball?</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Summary & Key Takeaways</h2>
        <ul className="list-disc pl-6 text-base text-neutral-700 mb-4">
          <li>MLB fields share a basic layout, but outfield dimensions and wall heights vary widely.</li>
          <li>These differences shape the game, affecting everything from home run rates to defensive strategy.</li>
          <li>Understanding field geometry is essential for analyzing Statcast data and MLB outcomes.</li>
        </ul>
      </section>
      <div className="mt-12 text-center">
        <LessonNav prevHref="/learn/geometry/field-geometry" prevLabel="Back to Field Geometry Overview" nextHref="/learn/geometry/field-geometry/outfield-wall-quirks" nextLabel="Next: Outfield Wall Quirks" />
      </div>
    </main>
  );
} 