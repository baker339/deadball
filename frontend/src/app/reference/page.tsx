import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface RelatedLesson {
  label: string;
  href: string;
}

interface EquationBlockProps {
  title: string;
  equation: string;
  explanation: string;
  variables: string[];
  assumptions: string[];
  usedIn?: string;
  relatedLessons?: RelatedLesson[];
}

// Reusable component for displaying an equation, explanation, variables, and assumptions
function EquationBlock({ title, equation, explanation, variables, assumptions, usedIn, relatedLessons }: EquationBlockProps) {
  return (
    <section className="mb-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="mb-2">
        <BlockMath math={equation} />
      </div>
      <p className="mb-2 text-gray-700">{explanation}</p>
      <div className="mb-2">
        <strong>Variables:</strong>
        <ul className="list-disc list-inside ml-4">
          {variables.map((v: string, i: number) => <li key={i}>{v}</li>)}
        </ul>
      </div>
      <div className="mb-2">
        <strong>Assumptions & Limitations:</strong>
        <ul className="list-disc list-inside ml-4">
          {assumptions.map((a: string, i: number) => <li key={i}>{a}</li>)}
        </ul>
      </div>
      {usedIn && (
        <div className="mb-2">
          <strong>Used In:</strong> {usedIn}
        </div>
      )}
      {relatedLessons && relatedLessons.length > 0 && (
        <div>
          <strong>Related Lessons:</strong>
          <ul className="list-disc list-inside ml-4">
            {relatedLessons.map((l: RelatedLesson, i: number) => (
              <li key={i}><a href={l.href} className="text-blue-600 underline">{l.label}</a></li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function ReferencePage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Equations & Assumptions Reference</h1>
      <EquationBlock
        title="Drag Coefficient (Physics-Based)"
        equation={String.raw`C_d = \frac{2 m g (d_{vacuum} - d_{actual})}{\rho A d_{actual} v_0^2}`}
        explanation={"This formula estimates the drag coefficient using physical constants and compares the actual distance a ball traveled to the distance it would have traveled in a vacuum (no air resistance)."}
        variables={[
          "C_d: Drag coefficient (dimensionless)",
          "m: Mass of baseball (kg)",
          "g: Acceleration due to gravity (9.8 m/s²)",
          "d_{vacuum}: Calculated distance in a vacuum (meters)",
          "d_{actual}: Actual hit distance (meters)",
          "\rho: Air density (kg/m³)",
          "A: Cross-sectional area of baseball (m²)",
          "v_0: Initial velocity (m/s)"
        ]}
        assumptions={[
          "No wind or environmental effects",
          "Ball is a perfect sphere",
          "Only air resistance is considered",
          "Data quality filters applied (e.g., plausible values for all variables)"
        ]}
        usedIn="ETL drag coefficient calculation, Drag vs HR chart, Physics lesson: 'Air Resistance'"
        relatedLessons={[
          { label: "Physics: Drag and Distance", href: "/learn/physics/drag" },
          { label: "Practice: Drag Coefficient", href: "/learn/physics/practice/drag" }
        ]}
      />
      <EquationBlock
        title="Vacuum Distance Formula"
        equation={String.raw`d_{vacuum} = \frac{v_0^2 \sin(2\theta)}{g}`}
        explanation={"This formula calculates the distance a ball would travel in a vacuum (no air resistance), based on its initial velocity and launch angle."}
        variables={[
          "d_{vacuum}: Distance in a vacuum (meters)",
          "v_0: Initial velocity (m/s)",
          "\theta: Launch angle (radians)",
          "g: Acceleration due to gravity (9.8 m/s²)"
        ]}
        assumptions={[
          "No air resistance",
          "No wind or environmental effects",
          "Ball is a point mass",
          "Flat ground, no spin effects"
        ]}
        usedIn="Drag coefficient calculation, Physics lesson: 'Projectile Motion'"
        relatedLessons={[
          { label: "Physics: Drag and Distance", href: "/learn/physics/drag" },
          { label: "Practice: Drag Coefficient", href: "/learn/physics/practice/drag" }
        ]}
      />
      {/* Add more <EquationBlock />s here for other equations as needed */}
    </main>
  );
} 