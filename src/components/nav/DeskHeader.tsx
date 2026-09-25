"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { HeaderProps } from "@/types/Types";

export function DeskHeader({ planCount = 0, savedCount = 0 }: HeaderProps) {
  const pathname = usePathname();
  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <div className="w-full py-3.5">
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-7 h-7 shrink-0">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <span className="font-extrabold text-xl tracking-wider text-white font-display">
            FITLOG
          </span>
        </Link>

        <nav className="flex items-center bg-[#13151b] border border-[#1e222d] rounded-full p-1">
          <Link
            href="/"
            className={`text-sm px-5 py-1.5 rounded-full transition-all duration-200 font-medium ${
              isWorkoutsActive
                ? "bg-[#1c2912] text-[#ccff00] shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm px-5 py-1.5 rounded-full transition-all duration-200 font-medium ${
              isMyPlanActive
                ? "bg-[#1c2912] text-[#ccff00] shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-sm text-neutral-300 font-medium group-hover:text-white transition-colors">
              Plan
            </span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-extrabold text-xs flex items-center justify-center transition-transform group-hover:scale-105">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-sm text-neutral-400 font-medium group-hover:text-neutral-200 transition-colors">
              Saved
            </span>
            <span className="w-6 h-6 rounded-full border border-neutral-700 text-neutral-300 font-semibold text-xs flex items-center justify-center transition-colors group-hover:border-neutral-500">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
