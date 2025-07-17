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
    question: "What type of chart is best for showing how home run rates change over multiple seasons?",
    options: ["Bar chart", "Time series chart", "Scatter plot", "Heat map"],
    correctAnswer: "Time series chart",
    explanation: "Time series charts are specifically designed to show how values change over time, making them perfect for tracking trends across seasons.",
    type: 'multiple-choice'
  },
  {
    id: 2,
    question: "If a scatter plot shows exit velocity on the x-axis and distance on the y-axis, and the points trend upward from left to right, what does this indicate?",
    options: ["No relationship", "Negative correlation", "Positive correlation", "Random data"],
    correctAnswer: "Positive correlation",
    explanation: "An upward trend from left to right indicates that as exit velocity increases, distance also increases - a positive correlation.",
    type: 'multiple-choice'
  },
  {
    id: 3,
    question: "What is the primary purpose of a trend line on a chart?",
    options: ["To connect all data points", "To show the overall pattern in the data", "To highlight outliers", "To make the chart look better"],
    correctAnswer: "To show the overall pattern in the data",
    explanation: "Trend lines help identify the general direction and strength of relationships in the data, smoothing out individual variations.",
    type: 'multiple-choice'
  },
  {
    id: 4,
    question: "If drag coefficients are decreasing over time while home run rates are increasing, this shows correlation but not necessarily causation. True or False?",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "While the variables move in opposite directions (negative correlation), this doesn't prove that one directly causes the other. Other factors could be involved.",
    type: 'true-false'
  },
  {
    id: 5,
    question: "What is the best way to identify outliers in a dataset?",
    options: ["Remove them immediately", "Ignore them completely", "Investigate them but keep them if they're real data", "Always exclude them from analysis"],
    correctAnswer: "Investigate them but keep them if they're real data",
    explanation: "Outliers should be investigated to understand if they represent real events or errors, but legitimate outliers should be included in analysis.",
    type: 'multiple-choice'
  },
  {
    id: 6,
    question: "Which axis typically represents the independent variable in a scatter plot?",
    options: ["X-axis", "Y-axis", "Both axes", "Neither axis"],
    correctAnswer: "X-axis",
    explanation: "The x-axis typically represents the independent variable (the one being controlled or measured), while the y-axis represents the dependent variable.",
    type: 'multiple-choice'
  },
  {
    id: 7,
    question: "What does a confidence interval show on a chart?",
    options: ["The exact value", "The uncertainty in the data", "The maximum value", "The minimum value"],
    correctAnswer: "The uncertainty in the data",
    explanation: "Confidence intervals show the range where we expect the true value to fall, indicating the level of uncertainty in our measurements or predictions.",
    type: 'multiple-choice'
  },
  {
    id: 8,
    question: "If you see a cyclical pattern in home run data over multiple years, what might this indicate?",
    options: ["Random variation", "Seasonal effects", "Equipment changes", "All of the above"],
    correctAnswer: "All of the above",
    explanation: "Cyclical patterns could result from seasonal weather effects, equipment changes, or even random variation that appears cyclical in small samples.",
    type: 'multiple-choice'
  },
  {
    id: 9,
    question: "What is the main advantage of larger sample sizes in baseball analytics?",
    options: ["Faster analysis", "More reliable conclusions", "Easier to collect", "Cheaper to obtain"],
    correctAnswer: "More reliable conclusions",
    explanation: "Larger sample sizes reduce the impact of random variation and provide more statistically reliable conclusions.",
    type: 'multiple-choice'
  },
  {
    id: 10,
    question: "When reading a chart, what should you check first?",
    options: ["The data points", "The trend line", "The axis labels and units", "The title"],
    correctAnswer: "The axis labels and units",
    explanation: "Understanding what's being measured (axis labels) and how it's measured (units) is crucial for interpreting any chart correctly.",
    type: 'multiple-choice'
  }
];

export default function DataVisualizationPracticePage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Visualization Practice Results</h1>
          <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
          <p className="text-lg text-gray-600 mb-6">
            You got {Math.round((score / 100) * problems.length)} out of {problems.length} problems correct!
          </p>
          
          <div className="mb-8">
            {score >= 80 && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                🎉 Excellent! You have a strong understanding of data visualization and baseball analytics.
              </div>
            )}
            {score >= 60 && score < 80 && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                👍 Good job! Review the explanations to strengthen your chart reading skills.
              </div>
            )}
            {score < 60 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                📚 Keep studying! Review the data visualization lesson and try again.
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
            href="/learn/data-visualization" 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            ← Data Visualization
          </a>
          <a 
            href="/learn/environment" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Environment →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Visualization Practice</h1>
        <p className="text-lg text-gray-600 mb-4">
          Test your understanding of reading charts and interpreting baseball analytics
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
          href="/learn/data-visualization" 
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Data Visualization
        </a>
        <a 
          href="/learn/environment" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Environment →
        </a>
      </div>
    </div>
  );
} 