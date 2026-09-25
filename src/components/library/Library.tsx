"use client";

import { useState, useEffect, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import WorkoutGrid from "./WorkoutGrid";
import type { Workout, SortOption } from "@/types/Types";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to load workout library");
        const data: Workout[] = await res.json();
        setWorkouts(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching library");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="w-full py-8 sm:py-12 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase font-display tracking-tight">
              THE LIBRARY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-400 font-medium">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{ backgroundColor: "#13151b" }}
                className="appearance-none bg-[#13151b] border border-[#1e232e] hover:border-neutral-500 text-white text-xs font-semibold rounded-xl pl-3 pr-7 py-1.5 cursor-pointer focus:outline-none focus:border-[#ccff00] transition"
              >
                <option value="duration">Duration</option>
                <option value="caloriesBurned">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <FiChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
                size={13}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-[#ccff00] border-t-transparent animate-spin" />
            <p className="text-neutral-400 text-xs sm:text-sm font-medium">
              Loading workouts...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#141720] border border-[#202532] text-white text-xs font-semibold rounded-xl hover:border-neutral-500 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : (
          <WorkoutGrid workouts={sortedWorkouts} />
        )}
      </div>
    </section>
  );
}
