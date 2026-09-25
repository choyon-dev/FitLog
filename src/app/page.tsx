import Hero from "@/components/hero/Hero";
import Library from "@/components/library/Library";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Hero />
      <Library />
    </div>
  );
}
