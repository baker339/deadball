// Deadball Academy: Geometry Module Lesson Plan & Practice Questions

export const geometryLessonPlan = [
  {
    title: "Introduction to Geometry in Baseball",
    path: "/learn/geometry/intro",
    description: "Why geometry matters in baseball, the role of angles, distances, and trajectories, and how geometry connects to the deadball debate.",
    keyPoints: [
      "Launch angle and exit velocity determine how far a ball travels.",
      "Ballpark shapes and fence distances change home run odds.",
      "Changes in the baseball itself affect flight paths and outcomes."
    ]
  },
  {
    title: "Launch Angle",
    path: "/learn/geometry/launch-angle",
    description: "Definition, measurement, and impact of launch angle on distance and home run probability.",
    keyPoints: [
      "Measured in degrees (°), typically 0°–50°.",
      "Optimal home run launch angles: 25°–35° (MLB avg ~28°).",
      "Too low: grounders; too high: pop-ups."
    ],
    practice: [
      {
        type: "numeric",
        question: "What is the typical launch angle (in degrees) for most MLB home runs?",
        answer: 28,
        tolerance: 1
      },
      {
        type: "multiple-choice",
        question: "Which launch angle range is most likely to result in a pop-up?",
        options: ["10°–20°", "40°–50°", "20°–30°"],
        answer: 1
      }
    ]
  },
  {
    title: "Distance Calculations",
    path: "/learn/geometry/distance",
    description: "Projectile motion formula, how launch angle and exit velocity determine distance, and worked examples.",
    keyPoints: [
      "Distance = (v₀² * sin(2θ)) / g",
      "Higher exit velocity = much greater distance.",
      "Air resistance reduces real-world distance."
    ],
    practice: [
      {
        type: "numeric",
        question: "If a ball leaves the bat at 45 m/s with a launch angle of 30°, how far will it travel (ignoring air resistance)?",
        answer: 198,
        tolerance: 2
      },
      {
        type: "multiple-choice",
        question: "Which change will increase the distance a ball travels the most?",
        options: [
          "Increase launch angle from 30° to 35°",
          "Increase exit velocity from 45 m/s to 50 m/s",
          "Decrease gravity from 9.8 to 9.0 m/s²"
        ],
        answer: 1
      }
    ]
  },
  {
    title: "Apex & Hang Time",
    path: "/learn/geometry/apex",
    description: "How to calculate the apex (maximum height) and hang time of a batted ball, with baseball examples.",
    keyPoints: [
      "Apex = (v₀ * sin(θ))² / (2g)",
      "Hang Time = 2 * v₀ * sin(θ) / g"
    ],
    practice: [
      {
        type: "numeric",
        question: "What is the apex (maximum height, in meters) for a ball hit at 45 m/s and 30°?",
        answer: 51,
        tolerance: 1
      },
      {
        type: "numeric",
        question: "What is the hang time (in seconds) for the same ball?",
        answer: 4.6,
        tolerance: 0.5
      }
    ]
  },
  {
    title: "Field Geometry & Ballparks",
    path: "/learn/geometry/field-geometry",
    description: "How outfield wall shapes and distances affect home run rates, with ballpark overlays and MLB examples.",
    keyPoints: [
      "Shorter fences = more home runs; deeper alleys = more triples.",
      "High outfield walls (e.g., Green Monster) can turn home runs into doubles."
    ],
    practice: [
      {
        type: "multiple-choice",
        question: "Which ballpark feature is most likely to turn a would-be home run into a double?",
        options: [
          "Short right field porch",
          "High outfield wall (e.g., Green Monster)",
          "Artificial turf"
        ],
        answer: 1
      },
      {
        type: "multiple-choice",
        question: "In which scenario is a home run least likely?",
        options: [
          "Deep center field in Comerica Park",
          "Left field in Yankee Stadium",
          "Right field in Fenway Park"
        ],
        answer: 0
      }
    ]
  },
  {
    title: "Deadball Context",
    path: "/learn/geometry/deadball-context",
    description: "How changes in ball construction affect geometry, launch angle, and distance, with case studies from MLB history.",
    keyPoints: [
      "Lower seams = less drag, longer flights.",
      "Different core materials = changes in exit velocity."
    ],
    practice: [
      {
        type: "multiple-choice",
        question: "A ball hit at 30° and 45 m/s in 2019 and 2021 travels different distances. In which year is it more likely to be a home run?",
        options: ["2021 (deadened ball)", "2019 (juiced ball)"],
        answer: 1
      }
    ]
  },
  {
    title: "Practice & Mastery",
    path: "/learn/geometry/practice",
    description: "Practice problems for each topic and challenge problems that synthesize multiple concepts.",
    keyPoints: [
      "Test your understanding of each concept.",
      "Challenge problems require synthesis of geometry and baseball context."
    ],
    practice: [
      {
        type: "multiple-choice",
        question: "Which of the following is most likely to result in a home run?",
        options: [
          "15° launch angle, 55 m/s exit velocity",
          "40° launch angle, 40 m/s exit velocity",
          "28° launch angle, 50 m/s exit velocity"
        ],
        answer: 2
      }
    ]
  }
]; 