import { useState } from 'react';
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TodaySubTab } from './TodaySubTab';
import { RegisterSubTab } from './RegisterSubTab';
import { DashboardNavbar } from '@/components/DashboardNavbar';
import { BackgroundGlow } from '@/components/BackgroundGlow';

export function HabitsPage() {
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'register'>('today');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text-primary font-sans relative overflow-hidden">
      <BackgroundGlow />
      <div className="relative z-10">
        <DashboardNavbar activeTab="habits" />

        <div className="w-full px-4 md:px-6 py-6 md:py-8">
        {/* Mobile Navigation: Segmented Control */}
        <div className="md:hidden mb-6 flex justify-center">
          <div className="inline-flex p-1 bg-gh-card/40 border border-gh-border/60 rounded-xl relative shadow-inner">
            <button 
              onClick={() => setActiveSubTab('today')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all rounded-lg ${
                activeSubTab === 'today' ? 'text-white' : 'text-gh-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <CalendarIcon size={16} className={activeSubTab === 'today' ? 'text-gh-blue' : ''} />
              Hoje
              {activeSubTab === 'today' && (
                <motion.div 
                  layoutId="activeTabMobile"
                  className="absolute inset-0 bg-gh-bg rounded-lg -z-10 shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button 
              onClick={() => setActiveSubTab('register')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all rounded-lg ${
                activeSubTab === 'register' ? 'text-white' : 'text-gh-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <List size={16} className={activeSubTab === 'register' ? 'text-gh-blue' : ''} />
              Cadastro
              {activeSubTab === 'register' && (
                <motion.div 
                  layoutId="activeTabMobile"
                  className="absolute inset-0 bg-gh-bg rounded-lg -z-10 shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation: Sleek Underline Tabs */}
        <div className="hidden md:flex items-center gap-8 mb-8 border-b border-gh-border">
          <button 
            onClick={() => setActiveSubTab('today')}
            className={`relative pb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeSubTab === 'today' ? 'text-white' : 'text-gh-text-secondary hover:text-white'
            }`}
          >
            <CalendarIcon size={18} />
            Hoje
            {activeSubTab === 'today' && (
              <motion.div 
                layoutId="activeTabDesktop"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gh-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
          <button 
            onClick={() => setActiveSubTab('register')}
            className={`relative pb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeSubTab === 'register' ? 'text-white' : 'text-gh-text-secondary hover:text-white'
            }`}
          >
            <List size={18} />
            Cadastro
            {activeSubTab === 'register' && (
              <motion.div 
                layoutId="activeTabDesktop"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gh-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        </div>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSubTab === 'today' ? (
                <TodaySubTab isModalOpen={isTaskModalOpen} setIsModalOpen={setIsTaskModalOpen} />
              ) : (
                <RegisterSubTab isModalOpen={isHabitModalOpen} setIsModalOpen={setIsHabitModalOpen} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      </div>

      {/* Floating Action Button - Fixed Position Outside Animated Container */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none md:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => activeSubTab === 'today' ? setIsTaskModalOpen(true) : setIsHabitModalOpen(true)}
          className={`pointer-events-auto w-14 h-14 rounded-full text-white flex items-center justify-center transition-colors ${
            activeSubTab === 'today' 
              ? 'bg-gh-blue shadow-[0_8px_30px_rgba(47,129,247,0.4)] hover:bg-gh-blue/90' 
              : 'bg-gh-green shadow-[0_8px_30px_rgba(35,134,54,0.4)] hover:bg-gh-green-hover'
          }`}
        >
          <Plus size={28} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
}
