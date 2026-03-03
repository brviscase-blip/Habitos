import { Button } from './ui/Button';

export function CTA() {
  return (
    <section className="py-24 border-t border-gh-border bg-gh-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gh-blue/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          Ready to build?
        </h2>
        <p className="text-xl text-gh-text-secondary mb-10 max-w-2xl mx-auto">
          Join millions of developers around the world and start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 border-transparent">
            Start a free trial
          </Button>
          <Button size="lg" variant="secondary">
            Contact sales
          </Button>
        </div>
      </div>
    </section>
  );
}
