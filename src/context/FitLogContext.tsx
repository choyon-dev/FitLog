"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Workout, PlanItem } from "@/types/Types";

interface FitLogContextType {
  plan: PlanItem[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  toggleDone: (id: number) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  isPlanned: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  planCount: number;
  savedCount: number;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch {
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    }
  }, [plan, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [saved, isHydrated]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.warning(`${workout.name} is already in today's plan!`);
      return;
    }
    if (plan.length >= 5) {
      toast.error("Cap reached: Maximum 5 lifts for today's plan!");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, completed: false }]);
    toast.success(`${workout.name} added to today's plan!`);
  };

  const removeFromPlan = (id: number) => {
    const target = plan.find((item) => item.id === id);
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.info(`${target?.name || "Workout"} removed from today's plan`);
  };

  const toggleDone = (id: number) => {
    const target = plan.find((item) => item.id === id);
    if (!target) return;
    const nextCompleted = !target.completed;
    if (nextCompleted) {
      toast.success(`${target.name} marked as done!`);
    } else {
      toast.info(`${target.name} marked as incomplete`);
    }
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: nextCompleted } : item
      )
    );
  };

  const saveForLater = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.warning(`${workout.name} is already saved!`);
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

  const removeFromSaved = (id: number) => {
    const target = saved.find((item) => item.id === id);
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.info(`${target?.name || "Workout"} removed from saved lifts`);
  };

  const isPlanned = (id: number) => plan.some((item) => item.id === id);
  const isSaved = (id: number) => saved.some((item) => item.id === id);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        toggleDone,
        saveForLater,
        removeFromSaved,
        isPlanned,
        isSaved,
        planCount: plan.length,
        savedCount: saved.length,
      }}
    >
      {children}
      <ToastContainer position="bottom-right" theme="dark" autoClose={2000} />
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}
