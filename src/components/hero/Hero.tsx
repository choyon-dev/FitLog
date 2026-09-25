import Image from "next/image";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="w-full py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{ backgroundColor: "#13151b" }}
          className="relative overflow-hidden rounded-3xl border border-[#1e232e] p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
        >
          <div className="flex flex-col items-start gap-4 sm:gap-6 max-w-xl text-left z-10">
            <span className="text-[#ccff00] text-xs sm:text-sm font-bold tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white uppercase font-display leading-[1.08] tracking-tight">
              TRAIN WITH INTENT. LOG <br className="hidden sm:inline" />
              EVERY SET.
            </h1>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-2 inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>BROWSE WORKOUTS</span>
              <FiArrowDown size={16} />
            </Link>
          </div>

          <div className="w-full max-w-[280px] sm:max-w-sm lg:max-w-[420px] flex justify-center items-center z-10">
            <Image
              src="/banner.png"
              alt="Gym training workout machine"
              width={420}
              height={420}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
