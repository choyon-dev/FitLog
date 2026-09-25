export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlanItem extends Workout {
  completed?: boolean;
}

export type SortOption = "duration" | "caloriesBurned" | "rating";

export interface HeaderProps {
  planCount?: number;
  savedCount?: number;
}

export interface NavHeaderActionProps {
  onOpenDrawer: () => void;
  planCount?: number;
  savedCount?: number;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  planCount?: number;
  savedCount?: number;
}

export interface WorkoutCardProps {
  workout: Workout;
}

export interface WorkoutGridProps {
  workouts: Workout[];
}
