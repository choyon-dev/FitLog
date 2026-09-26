"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { useFitLog } from "@/context/FitLogContext";
import PlanMetrics from "@/components/plan/PlanMetrics";
import PlanCard from "@/components/plan/PlanCard";
import EmptyPlan from "@/components/plan/EmptyPlan";
import type { SortOption } from "@/types/Types";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const { plan, saved, removeFromPlan, toggleDone, removeFromSaved } = useFitLog();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [tabParam]);

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

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-8 pb-4 border-b border-[#1c212d]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("plan")}
              style={{
                backgroundColor: activeTab === "plan" ? "#ccff00" : "#141720",
                color: activeTab === "plan" ? "#000000" : "#ffffff",
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-transparent hover:border-neutral-600"
            >
              Today&apos;s Plan ({plan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              style={{
                backgroundColor: activeTab === "saved" ? "#ccff00" : "#141720",
                color: activeTab === "saved" ? "#000000" : "#ffffff",
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer border border-transparent hover:border-neutral-600"
            >
              Saved Lifts ({saved.length})
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <FiSearch
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plan or tag..."
                style={{ backgroundColor: "#141720" }}
                className="w-full pl-10 pr-9 py-2 rounded-xl text-xs text-white placeholder-neutral-500 border border-[#202532] focus:outline-none focus:border-[#ccff00] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            <div className="relative flex items-center">
              <label
                htmlFor="plan-sort"
                className="text-xs text-neutral-400 mr-2 whitespace-nowrap"
              >
                Sort by:
              </label>
              <div className="relative inline-block">
                <select
                  id="plan-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{ backgroundColor: "#141720" }}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs text-white border border-[#202532] focus:outline-none focus:border-[#ccff00] transition cursor-pointer"
                >
                  <option value="duration">Duration (High-Low)</option>
                  <option value="caloriesBurned">Calories (High-Low)</option>
                  <option value="rating">Rating (High-Low)</option>
                </select>
                <FiChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {filteredAndSortedList.length === 0 ? (
          searchQuery.trim() ? (
            <div className="py-16 text-center">
              <p className="text-neutral-400 text-sm mb-2">
                No exercises found matching &quot;{searchQuery}&quot;
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

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-12 min-h-screen container mx-auto px-4 text-neutral-400">
          Loading plan...
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
