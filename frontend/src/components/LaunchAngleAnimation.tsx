"use client";

import React from "react";

const GROUND_Y = 120;
const ORIGIN_X = 80;
const ORIGIN_Y = GROUND_Y;
const PITCH_END_X = ORIGIN_X;
const PITCH_END_Y = ORIGIN_Y;
const PITCH_START_X = 320;
const PITCH_START_Y = GROUND_Y;
const LAUNCH_LENGTH = 180;
const LAUNCH_END_X = ORIGIN_X + LAUNCH_LENGTH * Math.cos((-30 * Math.PI) / 180);
const LAUNCH_END_Y = ORIGIN_Y - LAUNCH_LENGTH * Math.sin((30 * Math.PI) / 180);

// Arc for theta: true circular arc centered at the origin, above the pitch vector
const ARC_RADIUS = 52;
const ARC_START_ANGLE = 0; // pitch vector (right)
const ARC_END_ANGLE = -30 * (Math.PI / 180); // launch vector
const ARC_START_X = ORIGIN_X + ARC_RADIUS * Math.cos(ARC_START_ANGLE);
const ARC_START_Y = ORIGIN_Y + ARC_RADIUS * Math.sin(ARC_START_ANGLE);
const ARC_END_X = ORIGIN_X + ARC_RADIUS * Math.cos(ARC_END_ANGLE);
const ARC_END_Y = ORIGIN_Y + ARC_RADIUS * Math.sin(ARC_END_ANGLE);

const LaunchAngleAnimation: React.FC = () => {
  return (
    <svg
      width={400}
      height={180}
      viewBox="0 0 400 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Minimal launch angle diagram: pitch vector, launch vector, and angle theta"
      style={{ background: "none" }}
    >
      {/* Ground */}
      <line x1={40} y1={GROUND_Y} x2={360} y2={GROUND_Y} stroke="#bbb" strokeWidth={3} />
      {/* Pitch vector (arrow, right to origin) */}
      <line
        x1={PITCH_START_X}
        y1={PITCH_START_Y}
        x2={PITCH_END_X}
        y2={PITCH_END_Y}
        stroke="#2563eb"
        strokeWidth={5}
        markerEnd="url(#arrowhead-pitch)"
      />
      {/* Launch vector (arrow, up and right from origin, longer) */}
      <line
        x1={ORIGIN_X}
        y1={ORIGIN_Y}
        x2={LAUNCH_END_X}
        y2={LAUNCH_END_Y}
        stroke="#f59e42"
        strokeWidth={5}
        markerEnd="url(#arrowhead-launch)"
      />
      {/* Angle arc (theta, true circular arc centered at origin, above the pitch vector) */}
      <path
        d={`M${ARC_START_X} ${ARC_START_Y} A${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${ARC_END_X} ${ARC_END_Y}`}
        stroke="#eab308"
        strokeWidth={3}
        fill="none"
      />
      {/* Theta label */}
      <text x={ORIGIN_X + ARC_RADIUS / 2 + 38} y={ORIGIN_Y - 12} fontSize={20} fill="#eab308" fontWeight="bold">θ</text>
      <text x={ORIGIN_X + ARC_RADIUS / 2 + 60} y={ORIGIN_Y - 20} fontSize={13} fill="#eab308">Launch Angle</text>
      {/* Pitch label */}
      <text x={PITCH_START_X - 60} y={PITCH_START_Y - 10} fontSize={15} fill="#2563eb">Pitch</text>
      {/* Launch label */}
      <text x={LAUNCH_END_X + 10} y={LAUNCH_END_Y} fontSize={15} fill="#f59e42">Launch</text>
      {/* Arrowhead markers (smaller) */}
      <defs>
        <marker id="arrowhead-pitch" markerWidth="5" markerHeight="5" refX="3.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
          <polygon points="0,0 5,2.5 0,5" fill="#2563eb" />
        </marker>
        <marker id="arrowhead-launch" markerWidth="5" markerHeight="5" refX="3.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
          <polygon points="0,0 5,2.5 0,5" fill="#f59e42" />
        </marker>
      </defs>
    </svg>
  );
};

export default LaunchAngleAnimation; 