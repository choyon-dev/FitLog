import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist in the workout library.",
};

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="container max-w-lg mx-auto flex flex-col items-center">
        <div className="relative w-12 h-12 mb-4">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        <div className="text-8xl sm:text-9xl font-black text-[#ccff00] font-display tracking-tight leading-none">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-display tracking-tight mt-4 mb-2">
          PAGE NOT FOUND
        </h1>

        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-8">
          The lift or page you are looking for has been moved, removed, or never
          existed in the workout library.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <FiArrowLeft size={16} />
            <span>Back to Workouts</span>
          </Link>

          <Link
            href="/my-plan"
            style={{ backgroundColor: "#13151b" }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#1e232e] hover:border-neutral-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all active:scale-95"
          >
            <FiCalendar size={16} />
            <span>Go to My Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
