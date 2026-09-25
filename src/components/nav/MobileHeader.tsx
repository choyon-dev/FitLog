"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import type { NavHeaderActionProps } from "@/types/Types";

export function MobileHeader({
  onOpenDrawer,
  planCount = 0,
  savedCount = 0,
}: NavHeaderActionProps) {
  return (
    <div className="w-full py-3 px-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onOpenDrawer}
          className="p-2 -ml-2 text-neutral-300 hover:text-white transition cursor-pointer"
          aria-label="Open mobile menu"
        >
          <FiMenu size={22} />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white font-display">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-xs text-neutral-300 font-medium">Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-extrabold text-[11px] flex items-center justify-center">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-xs text-neutral-400 font-medium">Saved</span>
            <span className="w-5 h-5 rounded-full border border-neutral-700 text-neutral-300 font-semibold text-[11px] flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
