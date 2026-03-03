import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-gh-border bg-gh-bg/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative flex items-center justify-center">
              <svg width="0" height="0" className="absolute">
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </svg>
              <CheckCircle2 size={32} stroke="url(#logo-gradient)" className="drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]" />
            </div>
            <span className="text-lg font-bold text-white hidden sm:inline">HabitTracker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Entrar</Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
