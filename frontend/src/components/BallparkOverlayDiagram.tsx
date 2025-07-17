import React from "react";

// Realistic outfield wall data (LF, LCF, CF, RCF, RF) from Swish Analytics/MLB
const parks = [
  {
    name: "Fenway Park",
    color: "#22c55e",
    points: [
      [310, -45], [379, -22.5], [390, 0], [380, 22.5], [302, 45]
    ],
    label: { angle: -35, r: 320, text: "Green Monster" }
  },
  {
    name: "Yankee Stadium",
    color: "#2563eb",
    points: [
      [314, -45], [399, -22.5], [408, 0], [385, 22.5], [318, 45]
    ],
    label: { angle: 45, r: 330, text: "Short Porch" }
  },
  {
    name: "Oracle Park",
    color: "#f59e42",
    points: [
      [339, -45], [399, -22.5], [421, 0], [415, 22.5], [309, 45]
    ],
    label: { angle: 20, r: 390, text: "Deep Right-Center" }
  },
  {
    name: "MLB Average",
    color: "#a3a3a3",
    points: [
      [330, -45], [400, -22.5], [410, 0], [400, 22.5], [330, 45]
    ],
    label: null
  }
];

// Convert (distance, angle) to SVG (x, y) for a true fan overlay
function polarToSvg(r: number, theta: number, cx: number, cy: number) {
  // theta in degrees, 0 = up (center field), -45 = left, +45 = right
  const rad = (theta - 90) * Math.PI / 180; // rotate so 0° is up
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

const cx = 200; // SVG center x (home plate at horizontal center)
const cy = 400; // SVG bottom y (home plate at bottom)
const scale = 0.5; // 1 SVG unit = 1 foot * scale
const foulLineAngle = 45; // degrees

const BallparkOverlayDiagram: React.FC = () => {
  // Foul lines (90 degree fan)
  const leftFoul = polarToSvg(420 * scale, -foulLineAngle, cx, cy);
  const rightFoul = polarToSvg(420 * scale, foulLineAngle, cx, cy);
  return (
    <svg width={400} height={420} viewBox="0 0 400 420" fill="none" aria-label="MLB Ballpark Overlay Diagram">
      {/* Foul lines */}
      <line x1={cx} y1={cy} x2={leftFoul[0]} y2={leftFoul[1]} stroke="#bbb" strokeWidth={2} />
      <line x1={cx} y1={cy} x2={rightFoul[0]} y2={rightFoul[1]} stroke="#bbb" strokeWidth={2} />
      {/* Home plate */}
      <polygon points={`${cx-8},${cy} ${cx},${cy-12} ${cx+8},${cy} ${cx},${cy+8}`} fill="#fff" stroke="#222" strokeWidth={2} />
      {/* Outfield walls as polygons */}
      {parks.map((park, i) => {
        const path = park.points.map(([r, theta], j) => {
          const [x, y] = polarToSvg(r * scale, theta, cx, cy);
          return `${j === 0 ? "M" : "L"}${x},${y}`;
        }).join(" ") + " Z";
        return (
          <path key={park.name} d={path} fill="none" stroke={park.color} strokeWidth={4} opacity={0.85} />
        );
      })}
      {/* Labels for features */}
      {parks.map(park => park.label && (
        <text
          key={park.name + "-label"}
          x={polarToSvg(park.label.r * scale, park.label.angle, cx, cy)[0]}
          y={polarToSvg(park.label.r * scale, park.label.angle, cx, cy)[1]}
          fontSize={13}
          fill={park.color}
          fontWeight="bold"
          opacity={0.85}
        >{park.label.text}</text>
      ))}
      {/* Legend */}
      <rect x={18} y={18} width={160} height={70} rx={10} fill="#fff" stroke="#ddd" />
      {parks.map((park, i) => (
        <g key={park.name + "-legend"}>
          <line x1={30} y1={36 + i*18} x2={50} y2={36 + i*18} stroke={park.color} strokeWidth={4} />
          <text x={58} y={41 + i*18} fontSize={13} fill="#222">{park.name}</text>
        </g>
      ))}
      {/* Center field label */}
      <text x={cx-18} y={cy-180} fontSize={12} fill="#888">Center Field</text>
      {/* Left/Right field labels */}
      <text x={cx-120} y={cy-30} fontSize={12} fill="#888">Left Field</text>
      <text x={cx+100} y={cy-30} fontSize={12} fill="#888">Right Field</text>
    </svg>
  );
};

export default BallparkOverlayDiagram; 