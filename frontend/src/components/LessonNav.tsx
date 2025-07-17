import Link from "next/link";

interface LessonNavProps {
  nextHref?: string;
  nextLabel?: string;
  prevHref?: string;
  prevLabel?: string;
}

export default function LessonNav({ nextHref, nextLabel, prevHref, prevLabel }: LessonNavProps) {
  return (
    <div className="flex justify-between mt-12">
      {prevHref ? (
        <Link href={prevHref} className="bg-neutral-100 text-black px-6 py-2 rounded font-semibold border border-neutral-200 hover:bg-neutral-200 transition">
          ← {prevLabel || "Previous"}
        </Link>
      ) : <div />}
      {nextHref ? (
        <Link href={nextHref} className="bg-black text-white px-6 py-2 rounded font-semibold shadow hover:bg-neutral-800 transition">
          {nextLabel || "Next"} →
        </Link>
      ) : <div />}
    </div>
  );
} 