import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';

export function LandingPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-gh-bg text-gh-text-primary font-sans selection:bg-gh-blue/30 selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <Hero />
      </main>
    </div>
  );
}
