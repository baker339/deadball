import React from 'react';

interface ChartProps {
  title: string;
  children?: React.ReactNode;
}

export default function Chart({ title, children }: ChartProps) {
  return (
    <div className="bg-gray-50 p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="h-64 flex items-center justify-center text-gray-400">
        {children || '[Chart Placeholder]'}
      </div>
    </div>
  );
} 