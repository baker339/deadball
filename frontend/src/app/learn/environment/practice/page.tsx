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
    question: "How does higher temperature affect air density and baseball flight?",
    options: ["Higher temperature = higher air density = shorter distance", "Higher temperature = lower air density = longer distance", "Higher temperature = no effect on air density", "Higher temperature = higher air density = longer distance"],
    correctAnswer: "Higher temperature = lower air density = longer distance",
    explanation: "Warmer air is less dense, creating less drag on the baseball and allowing it to travel farther.",
    type: 'multiple-choice'
  },
  {
    id: 2,
    question: "What is the approximate distance increase for a baseball hit at Coors Field (5,280 feet elevation) compared to sea level?",
    options: ["3%", "6%", "9%", "15%"],
    correctAnswer: "9%",
    explanation: "Coors Field's altitude creates about 9% less air density, allowing baseballs to travel approximately 9% farther than at sea level.",
    type: 'multiple-choice'
  },
  {
    id: 3,
    question: "How does humidity affect air density?",
    options: ["Higher humidity = higher air density", "Higher humidity = lower air density", "Humidity has no effect on air density", "Humidity only affects temperature"],
    correctAnswer: "Higher humidity = lower air density",
    explanation: "Water vapor (H₂O) has a lower molecular weight than air, so higher humidity makes air less dense.",
    type: 'multiple-choice'
  },
  {
    id: 4,
    question: "A tailwind (wind blowing toward the outfield) will help a baseball travel farther. True or False?",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "A tailwind reduces the apparent drag on the baseball, allowing it to travel farther than it would in still air.",
    type: 'true-false'
  },
  {
    id: 5,
    question: "For every 10°F increase in temperature, a baseball typically travels how much farther?",
    options: ["1-2 feet", "2-3 feet", "5-6 feet", "10 feet"],
    correctAnswer: "2-3 feet",
    explanation: "The rule of thumb is that for every 10°F increase in temperature, a baseball travels approximately 2-3 feet farther due to reduced air density.",
    type: 'multiple-choice'
  },
  {
    id: 6,
    question: "Which environmental factor has the greatest effect on baseball flight distance?",
    options: ["Humidity", "Temperature", "Altitude", "Wind speed"],
    correctAnswer: "Altitude",
    explanation: "Altitude has the most significant effect because it directly affects atmospheric pressure, which is the primary determinant of air density.",
    type: 'multiple-choice'
  },
  {
    id: 7,
    question: "What type of weather condition typically creates the longest ball flight?",
    options: ["Cold, dry air", "Warm, humid air", "Cold, humid air", "Warm, dry air"],
    correctAnswer: "Warm, humid air",
    explanation: "Both higher temperature and higher humidity reduce air density, so warm, humid conditions create the least drag and longest ball flight.",
    type: 'multiple-choice'
  },
  {
    id: 8,
    question: "A headwind (wind blowing toward home plate) will reduce the distance a baseball travels. True or False?",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "A headwind increases the apparent drag on the baseball, reducing its travel distance compared to still air conditions.",
    type: 'true-false'
  },
  {
    id: 9,
    question: "What is the main reason Coors Field has a higher home run rate than other ballparks?",
    options: ["Smaller outfield dimensions", "Lower air density due to altitude", "Warmer temperatures", "Wind patterns"],
    correctAnswer: "Lower air density due to altitude",
    explanation: "Coors Field's elevation of 5,280 feet creates significantly lower air density, allowing baseballs to travel much farther than at sea level.",
    type: 'multiple-choice'
  },
  {
    id: 10,
    question: "How do crosswinds affect baseball flight?",
    options: ["They only affect distance", "They only affect accuracy", "They affect both distance and accuracy", "They have no effect"],
    correctAnswer: "They affect both distance and accuracy",
    explanation: "Crosswinds can push the ball sideways, affecting both its path (accuracy) and potentially its distance by changing the effective wind resistance.",
    type: 'multiple-choice'
  }
];

export default function EnvironmentPracticePage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Environment Practice Results</h1>
          <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
          <p className="text-lg text-gray-600 mb-6">
            You got {Math.round((score / 100) * problems.length)} out of {problems.length} problems correct!
          </p>
          
          <div className="mb-8">
            {score >= 80 && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                🎉 Excellent! You have a strong understanding of environmental factors in baseball.
              </div>
            )}
            {score >= 60 && score < 80 && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                👍 Good job! Review the explanations to strengthen your understanding of environmental effects.
              </div>
            )}
            {score < 60 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                📚 Keep studying! Review the environment lesson and try again.
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
            href="/learn/environment" 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            ← Environment
          </a>
          <a 
            href="/reference" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reference →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Environment Practice</h1>
        <p className="text-lg text-gray-600 mb-4">
          Test your understanding of environmental factors affecting baseball performance
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
          href="/learn/environment" 
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Environment
        </a>
        <a 
          href="/reference" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Reference →
        </a>
      </div>
    </div>
  );
} 