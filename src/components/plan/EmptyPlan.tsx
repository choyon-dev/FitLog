import Link from "next/link";

export default function EmptyPlan() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#1e232e] py-16 sm:py-24 px-6 flex flex-col items-center justify-center text-center">
      <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-display tracking-wide">
        NOTHING HERE YET
      </h3>
      <p className="text-neutral-400 text-xs sm:text-sm mt-2 mb-6 max-w-sm">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/#library"
        className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition shadow-md active:scale-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}
