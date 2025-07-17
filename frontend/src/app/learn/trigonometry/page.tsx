import LessonNav from "../../../components/LessonNav";

export default function TrigonometryLesson() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-900 font-sans">
      <div className="uppercase text-xs tracking-widest text-neutral-500 font-bold mb-4">Trigonometry</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-black">Trigonometry in Baseball</h1>
      <section className="mb-8">
        <p className="text-lg text-neutral-700 mb-4">
          Trigonometry helps us break down a batted ball’s motion into vertical and horizontal components using SOHCAHTOA. This is key for understanding how launch angle and exit velocity affect the ball’s flight.
        </p>
      </section>
      <LessonNav prevHref="/learn/geometry/practice" prevLabel="Previous: Geometry Practice" nextHref="/learn/trigonometry/sohcahtoa" nextLabel="Next: SOHCAHTOA Refresher" />
    </main>
  );
} 