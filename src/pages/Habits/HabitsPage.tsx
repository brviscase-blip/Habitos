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
      <DashboardNavbar activeTab="habits" />
      <div className={`relative ${isTaskModalOpen || isHabitModalOpen ? 'z-[2000]' : 'z-10'}`}>
        <div className="w-full px-4 md:px-6 pb-6 md:pb-8 pt-24">
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
            Hábitos
            {activeSubTab === 'register' && (
              <motion.div 
                layoutId="activeTabDesktop"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gh-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        </div>

        <main className="pb-24 md:pb-0">
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-gh-card border-t border-gh-border z-40 flex items-center justify-between px-10 pb-2">
        {/* Left Tab: Hoje */}
        <button 
          onClick={() => setActiveSubTab('today')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeSubTab === 'today' ? 'text-white' : 'text-gh-text-secondary hover:text-white'
          }`}
        >
          <CalendarIcon size={24} className={activeSubTab === 'today' ? 'text-gh-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Hoje</span>
        </button>

        {/* Center Action: + */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => activeSubTab === 'today' ? setIsTaskModalOpen(true) : setIsHabitModalOpen(true)}
            className="w-16 h-16 rounded-full text-white flex items-center justify-center transition-all shadow-[0_8px_25px_rgba(0,0,0,0.5)] bg-gh-blue shadow-[0_8px_30px_rgba(47,129,247,0.4)]"
          >
            <Plus size={32} strokeWidth={3} />
          </motion.button>
        </div>

        {/* Right Tab: Hábitos */}
        <button 
          onClick={() => setActiveSubTab('register')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeSubTab === 'register' ? 'text-white' : 'text-gh-text-secondary hover:text-white'
          }`}
        >
          <List size={24} className={activeSubTab === 'register' ? 'text-gh-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Hábitos</span>
        </button>
      </div>
    </div>
  );
}
