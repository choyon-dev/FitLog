import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Hero />
      <div id="library" />
    </div>
  );
}
