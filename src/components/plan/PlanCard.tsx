import Image from "next/image";
import Link from "next/link";
import { FiClock, FiStar, FiCheck, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { toSlug } from "@/utils/slug";
import type { PlanCardProps } from "@/types/Types";

export default function PlanCard({
  workout,
  isPlanTab,
  onToggleDone,
  onRemove,
}: PlanCardProps) {
  return (
    <div
      style={{ backgroundColor: "#13151b" }}
      className="rounded-2xl border border-[#1e232e] hover:border-[#ccff00]/40 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
        <div className="relative w-full sm:w-44 aspect-[16/9] sm:h-24 rounded-xl overflow-hidden bg-[#181b24] shrink-0">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 176px"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-extrabold text-white uppercase font-display leading-snug line-clamp-1">
              {workout.name}
            </h3>
            {workout.completed && (
              <span className="text-[10px] bg-[#1c2813] text-[#ccff00] border border-[#2e401b] font-bold px-2 py-0.5 rounded-full uppercase">
                Completed
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
            {workout.equipment}
          </p>

          <div className="flex items-center gap-4 text-xs text-neutral-400 font-medium mt-2.5">
            <div className="flex items-center gap-1.5">
              <FiClock size={13} className="text-neutral-400" />
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FaFire size={13} className="text-neutral-400" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FiStar size={13} className="text-neutral-400" />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
        <Link
          href={`/workout/${toSlug(workout.name)}`}
          className="px-4 py-2.5 bg-transparent border border-[#2a3040] hover:border-neutral-500 text-neutral-200 text-xs font-semibold rounded-xl transition cursor-pointer"
        >
          View Details
        </Link>

        {isPlanTab && onToggleDone && (
          <button
            onClick={() => onToggleDone(workout.id)}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
              workout.completed
                ? "bg-[#1c2813] text-[#ccff00] border border-[#2e401b]"
                : "bg-[#ccff00] hover:bg-[#b8e600] text-black active:scale-95"
            }`}
          >
            <FiCheck size={14} />
            <span>{workout.completed ? "Done" : "Mark as Done"}</span>
          </button>
        )}

        <button
          onClick={() => onRemove(workout.id)}
          className="text-neutral-500 hover:text-red-400 p-2 transition cursor-pointer"
          aria-label="Remove workout"
        >
          <FiX size={17} />
        </button>
      </div>
    </div>
  );
}
