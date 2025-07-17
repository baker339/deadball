import LessonNav from "../../../../components/LessonNav";

export default function SOHCAHTOALesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Trigonometry</div>
      <h1 className="text-4xl font-extrabold mb-6 text-black">SOHCAHTOA Refresher</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          SOHCAHTOA is a mnemonic for remembering the definitions of sine, cosine, and tangent in right triangles. These functions are essential for analyzing the components of a baseball’s flight.
        </p>
      </section>
      <LessonNav prevHref="/learn/trigonometry" prevLabel="Previous: Trigonometry Intro" nextHref="/learn/trigonometry/velocity-components" nextLabel="Next: Velocity Components" />
    </main>
  );
} 