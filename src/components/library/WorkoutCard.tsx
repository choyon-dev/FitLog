import Image from "next/image";
import Link from "next/link";
import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { toSlug } from "@/utils/slug";
import type { WorkoutCardProps } from "@/types/Types";

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${toSlug(workout.name)}`}
      style={{ backgroundColor: "#13151b" }}
      className="rounded-2xl border border-[#1e232e] hover:border-[#ccff00]/60 p-4 transition-colors duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#181b24] mb-3.5">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-[#ccff00] text-black text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-white uppercase font-display leading-tight line-clamp-1">
          {workout.name}
        </h3>

        <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
          {workout.equipment}
        </p>
      </div>

      <div className="border-t border-[#1e232e] pt-3 mt-4 flex items-center gap-4 sm:gap-5 text-xs text-neutral-400 font-medium">
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
    </Link>
  );
}
