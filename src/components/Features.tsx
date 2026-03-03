import { motion } from 'motion/react';
import { Users, Shield, Zap, Terminal } from 'lucide-react';

export function Features() {
  return (
    <section className="py-24 bg-gh-bg relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Accelerate your workflow</h2>
          <p className="text-xl text-gh-text-secondary">
            Tools designed to help you focus on the code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature 1: Collaborate */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-7 bg-gh-card border border-gh-border rounded-2xl p-8 overflow-hidden relative group"
          >
            <div className="relative z-10">
              <div className="mb-6 inline-flex p-3 rounded-lg bg-gh-border/30 text-blue-400">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Collaborate</h3>
              <p className="text-gh-text-secondary text-lg max-w-md">
                Streamline code reviews, manage projects, and build with millions of developers across the globe.
              </p>
            </div>
            
            {/* Abstract UI Mockup */}
            <div className="mt-12 ml-auto w-[90%] h-48 bg-[#0d1117] border-t border-l border-gh-border rounded-tl-xl p-4 shadow-2xl relative -right-8 -bottom-8 group-hover:scale-[1.02] transition-transform duration-500">
               <div className="flex gap-2 mb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
               </div>
               <div className="space-y-3">
                 <div className="h-2 w-3/4 bg-gh-border/50 rounded"></div>
                 <div className="h-2 w-1/2 bg-gh-border/50 rounded"></div>
                 <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-gh-border"></div>
                    <div className="h-2 w-24 bg-gh-border/50 rounded"></div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Feature 2: Security */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-5 bg-gh-card border border-gh-border rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-6 inline-flex p-3 rounded-lg bg-gh-border/30 text-green-400">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Security</h3>
              <p className="text-gh-text-secondary text-lg">
                Automated security scanning and secret protection to keep your code safe at every step.
              </p>
            </div>
            <div className="mt-8">
               <div className="flex items-center gap-3 text-sm text-green-400 bg-green-900/10 border border-green-900/30 p-3 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  No vulnerabilities found
               </div>
            </div>
          </motion.div>

          {/* Feature 3: AI (Full Width) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-12 bg-gh-card border border-gh-border rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center overflow-hidden"
          >
            <div className="order-2 md:order-1">
              <div className="mb-6 inline-flex p-3 rounded-lg bg-gh-border/30 text-purple-400">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Build with AI</h3>
              <p className="text-gh-text-secondary text-lg mb-6">
                Harness GitHub Copilot to write code faster, troubleshoot issues, and learn new technologies in real-time within your editor.
              </p>
              <a href="#" className="text-gh-blue font-semibold hover:underline inline-flex items-center gap-1">
                Explore Copilot features <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="order-1 md:order-2 bg-[#0d1117] border border-gh-border rounded-xl p-6 font-mono text-sm shadow-2xl relative group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
               <div className="text-gray-500 mb-2">// Copilot suggestion:</div>
               <div className="space-y-1">
                  <div><span className="text-purple-400">async function</span> <span className="text-yellow-200">fetchUserData</span>() {'{'}</div>
                  <div className="pl-4 text-gray-400 group-hover:text-white transition-colors duration-300">
                    <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> fetch('/api/user');
                  </div>
                  <div className="pl-4 text-gray-400 group-hover:text-white transition-colors duration-300 delay-75">
                    <span className="text-purple-400">return</span> <span className="text-purple-400">await</span> response.json();
                  </div>
                  <div>{'}'}</div>
                  <div className="h-4 w-2 bg-gray-500 animate-pulse mt-1"></div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
