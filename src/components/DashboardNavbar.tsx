import { useNavigate } from 'react-router-dom';
import { Bell, Menu, X, Check, Home, List, CheckCircle2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardNavbarProps {
  activeTab: 'home' | 'habits';
}

export function DashboardNavbar({ activeTab }: DashboardNavbarProps) {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || 'User';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Hábito Concluído', description: 'Você completou "Beber 2L de água"', time: '5 min atrás' },
    { id: 2, title: 'Tarefa Finalizada', description: 'A tarefa "Leitura diária" foi marcada como feita', time: '1 hora atrás' },
    { id: 3, title: 'Meta Atingida', description: 'Parabéns! Você atingiu sua meta de exercícios hoje', time: '3 horas atrás' },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="bg-gh-card border-b border-gh-border py-3 px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle - Moved to Left */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-gray-300 hover:text-white p-1 transition-colors -ml-2"
          >
            <Menu size={24} />
          </button>

          {/* Mobile Active Tab Name */}
          <span className="md:hidden font-bold text-white text-lg ml-2">
            {activeTab === 'home' ? 'Home' : 'Hábitos'}
          </span>

          <button onClick={() => navigate('/home')} className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative flex items-center justify-center">
              <svg width="0" height="0" className="absolute">
                <linearGradient id="dash-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </svg>
              <CheckCircle2 size={24} stroke="url(#dash-logo-gradient)" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]" />
            </div>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-white h-8">
            <button 
              onClick={() => navigate('/home')} 
              className={`h-full px-1 transition-all border-b-2 flex items-center ${activeTab === 'home' ? 'font-bold text-white border-gh-blue' : 'text-gh-text-secondary hover:text-white border-transparent'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/habits')} 
              className={`h-full px-1 transition-all border-b-2 flex items-center ${activeTab === 'habits' ? 'font-bold text-white border-gh-blue' : 'text-gh-text-secondary hover:text-white border-transparent'}`}
            >
              Hábitos
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications - Bell */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`text-gray-400 hover:text-white border border-gh-border rounded-md p-1.5 transition-colors relative ${isNotificationsOpen ? 'bg-gh-border text-white' : ''}`}
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-gh-blue rounded-full border-2 border-gh-card"></span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="fixed left-4 right-4 top-[60px] md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-80 bg-gh-card border border-gh-border rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gh-border bg-gh-bg/50 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Notificações de Hábitos</h3>
                      {notifications.length > 0 && (
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-[10px] text-gh-text-secondary hover:text-red-400 transition-colors"
                        >
                          Limpar tudo
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                          <p className="text-sm text-gh-text-secondary">Nenhuma notificação por aqui.</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className="group px-4 py-3 border-b border-gh-border last:border-0 hover:bg-gh-bg/30 transition-colors flex gap-3 relative">
                            <div className="w-8 h-8 rounded-full bg-gh-green/20 flex items-center justify-center text-gh-green shrink-0">
                              <Check size={14} />
                            </div>
                            <div className="flex-1 pr-6">
                              <p className="text-xs font-bold text-white">{notif.title}</p>
                              <p className="text-[11px] text-gh-text-secondary mt-0.5">{notif.description}</p>
                              <p className="text-[10px] text-gh-blue mt-1">{notif.time}</p>
                            </div>
                            <button 
                              onClick={() => removeNotification(notif.id)}
                              className="absolute right-4 top-3 text-gh-text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-2 bg-gh-bg/50 text-center">
                        <button className="text-[10px] font-bold text-gh-text-secondary hover:text-white transition-colors">
                          Ver todas as atividades
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Profile - Desktop Only */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-6 h-6 rounded-full bg-gh-blue flex items-center justify-center text-[10px] text-white font-bold shadow-lg shadow-gh-blue/20 hover:ring-2 hover:ring-gh-blue/50 transition-all">
                {user.charAt(0).toUpperCase()}
              </div>
            </button>
            
            <AnimatePresence>
              {isProfileOpen && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 bg-gh-card border border-gh-border rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-gh-border mb-1">
                      <p className="text-[10px] font-black text-gh-text-secondary uppercase tracking-widest">Conectado como</p>
                      <p className="font-bold text-white truncate">{user}</p>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gh-blue transition-colors"
                    >
                      Sair da conta
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-gh-card border-r border-gh-border z-50 shadow-2xl"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <svg width="0" height="0" className="absolute">
                        <linearGradient id="sidebar-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="50%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </svg>
                      <CheckCircle2 size={24} stroke="url(#sidebar-logo-gradient)" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]" />
                    </div>
                    <span className="font-bold text-white">Menu</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 mt-2">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gh-text-secondary uppercase tracking-wider mb-2">Navegação</h3>
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => { navigate('/home'); setIsMenuOpen(false); }}
                        className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors w-full text-left ${activeTab === 'home' ? 'text-white bg-white/5 font-medium' : 'text-gh-text-secondary hover:text-white hover:bg-white/5'}`}
                      >
                        <Home size={16} className={activeTab === 'home' ? 'text-gh-blue' : 'text-gh-text-secondary'} />
                        Home
                      </button>
                      <button 
                        onClick={() => { navigate('/habits'); setIsMenuOpen(false); }}
                        className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors w-full text-left ${activeTab === 'habits' ? 'text-white bg-white/5 font-medium' : 'text-gh-text-secondary hover:text-white hover:bg-white/5'}`}
                      >
                        <List size={16} className={activeTab === 'habits' ? 'text-gh-blue' : 'text-gh-text-secondary'} />
                        Hábitos
                      </button>
                    </div>
                  </div>
                </nav>

                <div className="mt-auto border-t border-gh-border p-3 bg-gh-bg/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gh-blue flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-gh-blue/20 ring-1 ring-gh-blue/20">
                        {user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{user}</p>
                        <p className="text-[9px] font-bold text-gh-text-secondary uppercase tracking-wider">Conectado</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-gh-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
