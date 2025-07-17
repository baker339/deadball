"use client";

import React from 'react';

interface EquationBlockProps {
  title?: string;
  equation: string;
  explanation?: string;
  variables?: { [key: string]: string };
  assumptions?: string[];
  usedIn?: string[];
  relatedLessons?: string[];
}

export function EquationBlock({ 
  title, 
  equation, 
  explanation, 
  variables, 
  assumptions, 
  usedIn, 
  relatedLessons 
}: EquationBlockProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
      {title && (
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      )}
      
      <div className="bg-white border border-gray-300 rounded p-3 mb-3">
        <div className="text-center font-mono text-lg">
          {equation}
        </div>
      </div>
      
      {explanation && (
        <p className="text-sm text-gray-600 mb-3">{explanation}</p>
      )}
      
      {variables && Object.keys(variables).length > 0 && (
        <div className="mb-3">
          <h5 className="font-medium text-gray-700 mb-1">Variables:</h5>
          <div className="text-sm text-gray-600">
            {Object.entries(variables).map(([symbol, description]) => (
              <div key={symbol} className="flex">
                <span className="font-mono mr-2">{symbol}:</span>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {assumptions && assumptions.length > 0 && (
        <div className="mb-3">
          <h5 className="font-medium text-gray-700 mb-1">Assumptions:</h5>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      )}
      
      {usedIn && usedIn.length > 0 && (
        <div className="mb-3">
          <h5 className="font-medium text-gray-700 mb-1">Used in:</h5>
          <div className="text-sm text-gray-600">
            {usedIn.join(', ')}
          </div>
        </div>
      )}
      
      {relatedLessons && relatedLessons.length > 0 && (
        <div>
          <h5 className="font-medium text-gray-700 mb-1">Related lessons:</h5>
          <div className="text-sm text-gray-600">
            {relatedLessons.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
} 