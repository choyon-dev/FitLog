"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiCheck, FiBookmark } from "react-icons/fi";
import { useFitLog } from "@/context/FitLogContext";
import { toSlug } from "@/utils/slug";
import type { Workout } from "@/types/Types";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToPlan, saveForLater, isPlanned, isSaved } = useFitLog();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);
        const isNumeric = /^\d+$/.test(id);
        if (isNumeric) {
          const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
          if (!res.ok) throw new Error("Workout not found");
          const data: Workout = await res.json();
          setWorkout(data);
        } else {
          const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
          if (!res.ok) throw new Error("Workout not found");
          const allWorkouts: Workout[] = await res.json();
          const match = allWorkouts.find((w) => toSlug(w.name) === id);
          if (!match) throw new Error("Workout not found");
          setWorkout(match);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching workout");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#ccff00] border-t-transparent animate-spin" />
        <p className="text-neutral-400 text-sm font-medium">
          Loading workout details...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 font-display uppercase">
          Workout Not Found
        </h2>
        <p className="text-neutral-400 text-sm mb-6">
          The requested exercise could not be loaded.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase rounded-xl hover:bg-[#b8e600] transition"
        >
          <FiArrowLeft size={16} />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  const planned = isPlanned(workout.id);
  const saved = isSaved(workout.id);

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: `${workout.rating} / 5.0` },
  ];

  return (
    <div className="w-full py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#library"
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#ccff00] mb-6 sm:mb-8 transition-colors group"
        >
          <FiArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-semibold uppercase tracking-wider">
            Back to Library
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] relative rounded-3xl overflow-hidden border border-[#1e232e] bg-[#12141a] shadow-xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="bg-[#ccff00] text-black text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display tracking-tight leading-tight">
                {workout.name}
              </h1>

              <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                {workout.description}
              </p>
            </div>

            <div
              style={{ backgroundColor: "#13151b" }}
              className="rounded-2xl border border-[#1e232e] p-5 sm:p-6"
            >
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#ccff00] mb-3 font-display">
                KEY SPECIFICATIONS
              </h2>
              <div className="flex flex-col divide-y divide-[#1c202a]">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between py-2.5"
                  >
                    <span className="text-xs text-neutral-400 uppercase font-semibold tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#ccff00] mb-3.5 font-display">
                INSTRUCTIONS
              </h2>
              <ol className="flex flex-col gap-3.5">
                {workout.instructions.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#1c2813] text-[#ccff00] border border-[#2e401b] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => addToPlan(workout)}
                disabled={planned}
                className={`w-full sm:flex-1 py-4 px-6 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                  planned
                    ? "bg-[#1c2813] text-[#ccff00] border border-[#2e401b] cursor-default"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-black active:scale-95"
                }`}
              >
                {planned ? (
                  <>
                    <FiCheck size={18} />
                    <span>Added to Today&apos;s Plan</span>
                  </>
                ) : (
                  <>
                    <FiPlus size={18} />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => saveForLater(workout)}
                disabled={saved}
                className={`w-full sm:w-auto py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border ${
                  saved
                    ? "bg-[#1c2813] text-[#ccff00] border-[#2e401b] cursor-default"
                    : "bg-[#13151b] border-[#1e232e] hover:border-neutral-500 text-white"
                }`}
              >
                <FiBookmark size={16} />
                <span>{saved ? "Saved" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
