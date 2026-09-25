import type { PlanMetricsProps } from "@/types/Types";

export default function PlanMetrics({
  exercisesCount,
  totalMinutes,
  totalCalories,
}: PlanMetricsProps) {
  return (
    <div
      style={{ backgroundColor: "#13151b" }}
      className="rounded-2xl border border-[#1e232e] p-6 sm:p-8 mt-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
    >
      <div>
        <span className="text-xs text-neutral-400 font-medium">Exercises</span>
        <div className="text-[#ccff00] text-3xl sm:text-4xl font-extrabold font-display mt-2">
          {exercisesCount}
        </div>
      </div>

      <div>
        <span className="text-xs text-neutral-400 font-medium">Minutes</span>
        <div className="text-white text-3xl sm:text-4xl font-extrabold font-display mt-2">
          {totalMinutes}
        </div>
      </div>

      <div>
        <span className="text-xs text-neutral-400 font-medium">Calories</span>
        <div className="text-white text-3xl sm:text-4xl font-extrabold font-display mt-2">
          {totalCalories}
        </div>
      </div>
    </div>
  );
}
