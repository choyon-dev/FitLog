import WorkoutCard from "./WorkoutCard";
import type { WorkoutGridProps } from "@/types/Types";

export default function WorkoutGrid({ workouts }: WorkoutGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
