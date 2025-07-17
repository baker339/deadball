import React from 'react';

interface ExplainerProps {
  title: string;
  children: React.ReactNode;
}

export default function Explainer({ title, children }: ExplainerProps) {
  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-base max-w-2xl">{children}</div>
    </section>
  );
} 