"use client";

import { useState, useMemo } from "react";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { useFitLog } from "@/context/FitLogContext";
import PlanMetrics from "@/components/plan/PlanMetrics";
import PlanCard from "@/components/plan/PlanCard";
import EmptyPlan from "@/components/plan/EmptyPlan";
import type { SortOption } from "@/types/Types";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, toggleDone, removeFromSaved } = useFitLog();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");

  const exercisesCount = plan.length;
  const totalMinutes = useMemo(
    () => plan.reduce((sum, item) => sum + item.duration, 0),
    [plan]
  );
  const totalCalories = useMemo(
    () => plan.reduce((sum, item) => sum + item.caloriesBurned, 0),
    [plan]
  );

  const filteredAndSortedList = useMemo(() => {
    let list = activeTab === "plan" ? [...plan] : [...saved];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((g) => g.toLowerCase().includes(q)) ||
          w.equipment.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [activeTab, plan, saved, searchQuery, sortBy]);

  return (
    <div className="w-full py-8 sm:py-12 min-h-[calc(100vh-160px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display tracking-tight">
            MY PLAN
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <PlanMetrics
          exercisesCount={exercisesCount}
          totalMinutes={totalMinutes}
          totalCalories={totalCalories}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div
            style={{ backgroundColor: "#13151b" }}
            className="flex items-center border border-[#1e232e] rounded-xl p-1 self-start"
          >
            <button
              onClick={() => setActiveTab("plan")}
              style={{
                backgroundColor: activeTab === "plan" ? "#1e222d" : "transparent",
              }}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === "plan"
                  ? "text-white border border-[#2e3444] shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              style={{
                backgroundColor: activeTab === "saved" ? "#1e222d" : "transparent",
              }}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === "saved"
                  ? "text-white border border-[#2e3444] shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Saved
            </button>
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
                placeholder="Search plan..."
                style={{ backgroundColor: "#13151b" }}
                className="bg-[#13151b] border border-[#1e232e] focus:border-[#ccff00] text-white text-xs rounded-xl pl-8 pr-7 py-2 focus:outline-none transition w-40 sm:w-48"
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
              <span className="text-xs text-neutral-400 font-medium">Sort By:</span>
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

        {filteredAndSortedList.length === 0 ? (
          searchQuery ? (
            <div className="rounded-2xl border-2 border-dashed border-[#1e232e] py-16 px-6 text-center">
              <p className="text-neutral-300 text-sm font-medium mb-3">
                No exercises found in {activeTab === "plan" ? "Today's Plan" : "Saved"} matching &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#ccff00] font-bold hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </div>
          ) : (
            <EmptyPlan />
          )
        ) : (
          <div className="flex flex-col gap-4">
            {filteredAndSortedList.map((item) => (
              <PlanCard
                key={item.id}
                workout={item}
                isPlanTab={activeTab === "plan"}
                onToggleDone={toggleDone}
                onRemove={activeTab === "plan" ? removeFromPlan : removeFromSaved}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
