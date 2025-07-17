"use client";

import React, { useState } from 'react';

interface Problem {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  type: 'multiple-choice' | 'calculation' | 'true-false';
}

const problems: Problem[] = [
  {
    id: 1,
    question: "What is the minimum exit velocity typically needed for a home run?",
    options: ["85 mph", "90 mph", "95 mph", "100 mph"],
    correctAnswer: "95 mph",
    explanation: "While home runs can occur with lower exit velocities, 95+ mph is generally considered the threshold for consistent home run potential.",
    type: 'multiple-choice'
  },
  {
    id: 2,
    question: "What is the optimal launch angle range for maximum distance?",
    options: ["15-25 degrees", "25-35 degrees", "35-45 degrees", "45-55 degrees"],
    correctAnswer: "25-35 degrees",
    explanation: "Research shows that 25-35 degrees provides the optimal balance between distance and air time for maximum home run potential.",
    type: 'multiple-choice'
  },
  {
    id: 3,
    question: "A ball hit with 100 mph exit velocity and 30° launch angle has a higher home run probability than a ball hit with 90 mph exit velocity and 30° launch angle. True or False?",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Higher exit velocity with the same launch angle will result in greater distance and higher home run probability.",
    type: 'true-false'
  },
  {
    id: 4,
    question: "If a ball is hit with 98 mph exit velocity and 28° launch angle, what type of contact is this?",
    options: ["Barrel", "Solid contact", "Weak contact", "Pop-up"],
    correctAnswer: "Barrel",
    explanation: "This meets the barrel criteria: exit velocity ≥ 98 mph and launch angle between 26-30°.",
    type: 'multiple-choice'
  },
  {
    id: 5,
    question: "A ball hit with 85 mph exit velocity and 15° launch angle will likely result in what type of hit?",
    options: ["Home run", "Line drive", "Ground ball", "Pop-up"],
    correctAnswer: "Line drive",
    explanation: "85 mph exit velocity with 15° launch angle typically produces a line drive, which is too low for a home run but too high for a ground ball.",
    type: 'multiple-choice'
  },
  {
    id: 6,
    question: "What happens to the distance a ball travels if you double the exit velocity (all else equal)?",
    options: ["Distance doubles", "Distance quadruples", "Distance increases by 50%", "Distance stays the same"],
    correctAnswer: "Distance quadruples",
    explanation: "Distance is proportional to the square of exit velocity, so doubling exit velocity results in 4x the distance.",
    type: 'multiple-choice'
  },
  {
    id: 7,
    question: "A ball hit with 92 mph exit velocity and 40° launch angle will likely result in what?",
    options: ["Home run", "Deep fly out", "Line drive", "Ground ball"],
    correctAnswer: "Deep fly out",
    explanation: "92 mph exit velocity is good, but 40° launch angle is too high for optimal distance, likely resulting in a deep fly out.",
    type: 'multiple-choice'
  },
  {
    id: 8,
    question: "What is the primary factor that determines exit velocity?",
    options: ["Bat speed at contact", "Ball weight", "Air temperature", "Field conditions"],
    correctAnswer: "Bat speed at contact",
    explanation: "Bat speed at the moment of contact is the primary factor determining exit velocity, along with the quality of contact.",
    type: 'multiple-choice'
  }
];

export default function ExitVelocityPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string | number) => {
    setUserAnswers(prev => ({
      ...prev,
      [problems[currentProblem].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentProblem > 0) {
      setCurrentProblem(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    problems.forEach(problem => {
      const userAnswer = userAnswers[problem.id];
      if (userAnswer === problem.correctAnswer) {
        correct++;
      }
    });
    setScore(Math.round((correct / problems.length) * 100));
  };

  const resetQuiz = () => {
    setCurrentProblem(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentProblemData = problems[currentProblem];
  const userAnswer = userAnswers[currentProblemData.id];
  const isCorrect = userAnswer === currentProblemData.correctAnswer;

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Exit Velocity Practice Results</h1>
          <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
          <p className="text-lg text-gray-600 mb-6">
            You got {Math.round((score / 100) * problems.length)} out of {problems.length} problems correct!
          </p>
          
          <div className="mb-8">
            {score >= 80 && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                🎉 Excellent! You have a strong understanding of exit velocity and launch angle relationships.
              </div>
            )}
            {score >= 60 && score < 80 && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                👍 Good job! Review the explanations to strengthen your understanding of exit velocity concepts.
              </div>
            )}
            {score < 60 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                📚 Keep studying! Review the exit velocity lesson and try again.
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Try Again
            </button>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowResults(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {problems.map((problem, index) => (
            <div key={problem.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold">Problem {index + 1}:</span>
                {userAnswers[problem.id] === problem.correctAnswer ? (
                  <span className="text-green-600">✓ Correct</span>
                ) : (
                  <span className="text-red-600">✗ Incorrect</span>
                )}
              </div>
              
              <p className="mb-4">{problem.question}</p>
              
              {problem.options && (
                <div className="mb-4">
                  {problem.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name={`problem-${problem.id}`}
                        value={option}
                        checked={userAnswers[problem.id] === option}
                        disabled
                        className="text-blue-600"
                      />
                      <span className={userAnswers[problem.id] === option ? 'font-semibold' : ''}>
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Correct Answer:</strong> {problem.correctAnswer}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Explanation:</strong> {problem.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <a 
            href="/learn/exit-velocity" 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            ← Exit Velocity
          </a>
          <a 
            href="/learn/data-visualization" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Data Visualization →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Exit Velocity Practice</h1>
        <p className="text-lg text-gray-600 mb-4">
          Test your understanding of exit velocity, launch angle, and barrel rate
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Problem {currentProblem + 1} of {problems.length}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{currentProblemData.question}</h2>
        
        {currentProblemData.options && (
          <div className="space-y-3 mb-6">
            {currentProblemData.options.map((option, index) => (
              <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`problem-${currentProblemData.id}`}
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => handleAnswer(option)}
                  className="text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        {userAnswer !== undefined && (
          <div className={`p-4 rounded-lg mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className={`text-sm mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {currentProblemData.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentProblem === 0}
          className="px-6 py-2 border border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={userAnswer === undefined}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          {currentProblem === problems.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <a 
          href="/learn/exit-velocity" 
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Exit Velocity
        </a>
        <a 
          href="/learn/data-visualization" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Data Visualization →
        </a>
      </div>
    </div>
  );
} 