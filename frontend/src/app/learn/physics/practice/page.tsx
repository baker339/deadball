"use client";

import React, { useState } from 'react';
import LessonNav from '@/components/LessonNav';

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
    question: "Which of Newton's laws explains why a baseball continues moving after being hit?",
    options: ["First Law (Inertia)", "Second Law (F=ma)", "Third Law (Action-Reaction)", "Law of Universal Gravitation"],
    correctAnswer: "First Law (Inertia)",
    explanation: "Newton's First Law states that an object in motion stays in motion unless acted upon by an external force. The ball continues moving until gravity and air resistance slow it down.",
    type: 'multiple-choice'
  },
  {
    id: 2,
    question: "If a baseball has a mass of 0.145 kg and an exit velocity of 100 mph (44.7 m/s), what is its kinetic energy?",
    correctAnswer: 145,
    explanation: "KE = ½mv² = ½ × 0.145 kg × (44.7 m/s)² = 145 Joules",
    type: 'calculation'
  },
  {
    id: 3,
    question: "The Magnus effect is responsible for making baseballs curve. True or False?",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The Magnus effect occurs when a spinning ball creates a pressure difference, causing it to curve. This is how pitchers make the ball move.",
    type: 'true-false'
  },
  {
    id: 4,
    question: "Which force always acts downward on a baseball?",
    options: ["Drag", "Gravity", "Lift", "Thrust"],
    correctAnswer: "Gravity",
    explanation: "Gravity always pulls objects toward Earth, acting downward regardless of the ball's motion.",
    type: 'multiple-choice'
  },
  {
    id: 5,
    question: "If a ball's momentum is 6.5 kg⋅m/s and its mass is 0.145 kg, what is its velocity?",
    correctAnswer: 44.8,
    explanation: "p = mv, so v = p/m = 6.5 kg⋅m/s ÷ 0.145 kg = 44.8 m/s",
    type: 'calculation'
  },
  {
    id: 6,
    question: "Backspin on a baseball creates upward force, helping it stay in the air longer. True or False?",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Backspin creates the Magnus effect in the upward direction, providing lift that helps the ball stay airborne longer.",
    type: 'true-false'
  }
];

export default function PhysicsPracticePage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Physics Practice Results</h1>
          <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
          <p className="text-lg text-gray-600 mb-6">
            You got {Math.round((score / 100) * problems.length)} out of {problems.length} problems correct!
          </p>
          
          <div className="mb-8">
            {score >= 80 && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                🎉 Excellent work! You have a strong understanding of baseball physics.
              </div>
            )}
            {score >= 60 && score < 80 && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                👍 Good job! Review the explanations to strengthen your understanding.
              </div>
            )}
            {score < 60 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                📚 Keep studying! Review the physics concepts and try again.
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

        <LessonNav 
          prevHref="/learn/physics"
          prevLabel="Physics"
          nextHref="/learn/exit-velocity"
          nextLabel="Exit Velocity"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Physics Practice</h1>
        <p className="text-lg text-gray-600 mb-4">
          Test your understanding of the physics behind baseball flight
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

        {currentProblemData.type === 'calculation' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer (rounded to 1 decimal place):
            </label>
            <input
              type="number"
              step="0.1"
              value={userAnswer || ''}
              onChange={(e) => handleAnswer(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your answer..."
            />
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

      <LessonNav 
        prevHref="/learn/physics"
        prevLabel="Physics"
        nextHref="/learn/exit-velocity"
        nextLabel="Exit Velocity"
      />
    </div>
  );
} 