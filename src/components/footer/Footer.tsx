import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#090a0f] border-t border-[#1c202a] py-6 sm:py-8 mt-auto">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white font-display">
            FITLOG
          </span>
        </Link>

        <p className="text-xs sm:text-sm text-neutral-500 text-center sm:text-right">
          &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
