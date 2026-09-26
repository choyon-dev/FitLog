"use client";

import { useState, useEffect, useMemo } from "react";
import { FiChevronDown, FiSearch, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import WorkoutGrid from "./WorkoutGrid";
import type { Workout, SortOption } from "@/types/Types";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
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

  const filteredAndSortedWorkouts = useMemo(() => {
    let result = workouts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((g) => g.toLowerCase().includes(q)) ||
          w.equipment.toLowerCase().includes(q)
      );
    }
    return [...result].sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [workouts, searchQuery, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedWorkouts.length / itemsPerPage) || 1;
  const paginatedWorkouts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedWorkouts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedWorkouts, currentPage, itemsPerPage]);

  return (
    <section id="library" className="w-full py-8 sm:py-12 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase font-display tracking-tight">
              THE LIBRARY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <div className="relative">
              <FiSearch
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or muscle..."
                style={{ backgroundColor: "#13151b" }}
                className="bg-[#13151b] border border-[#1e232e] focus:border-[#ccff00] text-white text-xs rounded-xl pl-8 pr-7 py-2 focus:outline-none transition w-44 sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <FiX size={13} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-medium">
                Sort By:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{ backgroundColor: "#13151b" }}
                  className="appearance-none bg-[#13151b] border border-[#1e232e] hover:border-neutral-500 text-white text-xs font-semibold rounded-xl pl-3 pr-7 py-2 cursor-pointer focus:outline-none focus:border-[#ccff00] transition"
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
        ) : filteredAndSortedWorkouts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#1e232e] py-16 px-6 text-center">
            <p className="text-neutral-300 text-sm font-medium mb-3">
              No workouts found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#ccff00] font-bold hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <WorkoutGrid workouts={paginatedWorkouts} />

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-[#202532] bg-[#141720] text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#ccff00] hover:text-[#ccff00] transition cursor-pointer"
                  aria-label="Previous page"
                >
                  <FiChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      backgroundColor: currentPage === pageNum ? "#ccff00" : "#141720",
                      color: currentPage === pageNum ? "#000000" : "#ffffff",
                    }}
                    className="w-10 h-10 rounded-xl border border-[#202532] text-xs font-bold transition cursor-pointer hover:border-neutral-500"
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-[#202532] bg-[#141720] text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#ccff00] hover:text-[#ccff00] transition cursor-pointer"
                  aria-label="Next page"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
