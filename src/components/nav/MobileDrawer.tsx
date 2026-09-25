"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiX, FiGrid, FiCalendar, FiBookmark, FiChevronRight } from "react-icons/fi";
import type { MobileDrawerProps } from "@/types/Types";

export default function MobileDrawer({
  isOpen,
  onClose,
  planCount = 0,
  savedCount = 0,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div
        onClick={onClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        className="fixed inset-0 backdrop-blur-sm transition-opacity duration-300"
      />

      <div
        style={{ backgroundColor: "#0c0e14" }}
        className="relative w-[310px] max-w-[85vw] h-full border-r border-[#1c212d] p-6 flex flex-col justify-between z-10 shadow-2xl"
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#1c212d]">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 shrink-0">
                <Image
                  src="/logo.png"
                  alt="FitLog Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white font-display">
                FITLOG
              </span>
            </Link>
            <button
              onClick={onClose}
              style={{ backgroundColor: "#141720" }}
              className="w-8 h-8 rounded-lg border border-[#202532] text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Close menu"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <Link
              href="/"
              onClick={onClose}
              style={{ backgroundColor: isWorkoutsActive ? "#1c2813" : "transparent" }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                isWorkoutsActive
                  ? "text-[#ccff00] border border-[#2e401b]"
                  : "text-neutral-300 hover:bg-[#141720] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FiGrid className={isWorkoutsActive ? "text-[#ccff00]" : "text-neutral-400"} size={17} />
                <span>Workouts</span>
              </div>
              <FiChevronRight size={15} className={isWorkoutsActive ? "text-[#ccff00]" : "text-neutral-600"} />
            </Link>

            <Link
              href="/my-plan"
              onClick={onClose}
              style={{ backgroundColor: isMyPlanActive ? "#1c2813" : "transparent" }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                isMyPlanActive
                  ? "text-[#ccff00] border border-[#2e401b]"
                  : "text-neutral-300 hover:bg-[#141720] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FiCalendar className={isMyPlanActive ? "text-[#ccff00]" : "text-neutral-400"} size={17} />
                <span>My Plan</span>
              </div>
              <FiChevronRight size={15} className={isMyPlanActive ? "text-[#ccff00]" : "text-neutral-600"} />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1c212d] flex flex-col gap-3">
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold px-1">
              Your Workout Deck
            </div>

            <Link
              href="/my-plan"
              onClick={onClose}
              style={{ backgroundColor: "#141720" }}
              className="flex items-center justify-between p-3.5 border border-[#202532] rounded-xl hover:border-neutral-600 transition group"
            >
              <div className="flex items-center gap-3">
                <div style={{ backgroundColor: "#1c2813" }} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ccff00]">
                  <FiCalendar size={16} />
                </div>
                <span className="text-sm font-medium text-white group-hover:text-[#ccff00] transition">
                  Today&apos;s Plan
                </span>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-extrabold text-xs flex items-center justify-center">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={onClose}
              style={{ backgroundColor: "#141720" }}
              className="flex items-center justify-between p-3.5 border border-[#202532] rounded-xl hover:border-neutral-600 transition group"
            >
              <div className="flex items-center gap-3">
                <div style={{ backgroundColor: "#191d28" }} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-300">
                  <FiBookmark size={16} />
                </div>
                <span className="text-sm font-medium text-white group-hover:text-neutral-300 transition">
                  Saved Lifts
                </span>
              </div>
              <span className="w-6 h-6 rounded-full border border-neutral-700 text-neutral-300 font-semibold text-xs flex items-center justify-center">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1c212d] flex items-center justify-between text-xs text-neutral-500">
          <span>FitLog Gym Companion</span>
          <span className="text-[#ccff00] font-semibold">&bull; v1.0</span>
        </div>
      </div>
    </div>
  );
}
