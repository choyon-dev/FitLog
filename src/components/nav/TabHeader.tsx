"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import type { NavHeaderActionProps } from "@/types/Types";

export function TabHeader({
  onOpenDrawer,
  planCount = 0,
  savedCount = 0,
}: NavHeaderActionProps) {
  const pathname = usePathname();
  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <div className="w-full py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenDrawer}
            className="p-1.5 text-neutral-300 hover:text-white transition cursor-pointer"
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={26}
              height={26}
              className="object-contain"
            />
            <span className="font-extrabold text-xl tracking-wider text-white font-display">
              FITLOG
            </span>
          </Link>
        </div>

        <nav className="flex items-center bg-[#13151b] border border-[#1e222d] rounded-full p-1">
          <Link
            href="/"
            className={`text-sm px-4 py-1.5 rounded-full transition-all font-medium ${
              isWorkoutsActive
                ? "bg-[#1c2912] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm px-4 py-1.5 rounded-full transition-all font-medium ${
              isMyPlanActive
                ? "bg-[#1c2912] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-sm text-neutral-300 font-medium">Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-extrabold text-xs flex items-center justify-center">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-sm text-neutral-400 font-medium">Saved</span>
            <span className="w-6 h-6 rounded-full border border-neutral-700 text-neutral-300 font-semibold text-xs flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
