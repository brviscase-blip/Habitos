import { motion } from 'motion/react';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative w-full h-full flex items-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gh-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
          <div className="max-w-3xl flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center rounded-full border border-gh-border bg-gh-card/50 px-3 py-1 text-sm text-gray-400 backdrop-blur-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-gh-purple mr-2 animate-pulse"></span>
                Organize sua rotina: Comece hoje mesmo
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                Domine seus <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600">
                  hábitos
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gh-text-secondary mb-8 max-w-2xl leading-relaxed">
                Transforme sua rotina com o registro de hábitos e tarefas. Alcance seus objetivos diários com organização e foco total no que importa.
              </p>
            </motion.div>
          </div>

          {/* Globe/Visual Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex relative h-full w-full items-center justify-center"
          >
             <div className="relative w-[450px] h-[450px] rounded-full border border-gh-border/30 animate-[spin_60s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-gh-blue/20 rotate-45"></div>
                  <div className="absolute inset-0 rounded-full border border-gh-purple/20 -rotate-12"></div>
                  
                  {/* Glowing Core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gh-blue/5 blur-[80px] rounded-full"></div>
                  
                  {/* Orbiting Elements */}
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)]"></div>
                  <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
