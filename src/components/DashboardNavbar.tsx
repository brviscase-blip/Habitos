import { useNavigate } from 'react-router-dom';
import { Bell, Menu, X, Check, Home, List, CheckCircle2, LogOut, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardNavbarProps {
  activeTab: 'habits';
}

export function DashboardNavbar({ activeTab }: DashboardNavbarProps) {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') || 'User';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <header className="bg-gh-bg py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-50 border-b border-white/5 md:border-none">
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
            Hábitos
          </span>

          <button onClick={() => navigate('/habits')} className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-white/10">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Check size={12} className="text-[#070e18] stroke-[4]" />
              </div>
            </div>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-white h-8">
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
              className={`text-gray-400 hover:text-white p-1.5 transition-colors relative ${isNotificationsOpen ? 'bg-gh-border text-white rounded-md' : ''}`}
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-gh-blue rounded-full border-2 border-gh-card"></span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className={`fixed inset-0 bg-black/50 md:bg-transparent ${isMobile ? 'z-[2000]' : 'z-40'}`} 
                    onClick={() => setIsNotificationsOpen(false)} 
                  />
                  
                  {/* Modal/Dropdown */}
                  <motion.div
                    initial={isMobile ? { y: "100%" } : { opacity: 0, y: 10, scale: 0.95 }}
                    animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                    exit={isMobile ? { y: "100%" } : { opacity: 0, y: 10, scale: 0.95 }}
                    transition={isMobile ? { type: "spring", damping: 30, stiffness: 300 } : { duration: 0.15 }}
                    className={`
                      bg-[#070e18] border-gh-border md:border md:rounded-xl md:shadow-2xl overflow-hidden flex flex-col
                      ${isMobile 
                        ? 'fixed inset-0 z-[2001] w-full h-full' 
                        : 'absolute right-0 top-full mt-2 w-80 z-50'
                      }
                    `}
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="px-4 pt-4 pb-2 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setIsNotificationsOpen(false)}
                            className="md:hidden text-white hover:opacity-70 transition-opacity"
                          >
                            <X size={20} />
                          </button>
                          <h3 className="text-lg font-bold text-white tracking-tight">Notificações</h3>
                        </div>
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-[10px] font-medium text-gh-text-secondary hover:text-white transition-colors"
                        >
                          Limpar
                        </button>
                      </div>



                      {/* Content List */}
                      <div className="flex-1 overflow-y-auto px-4">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center flex flex-col items-center justify-center h-full text-gh-text-secondary">
                            <Bell size={32} className="mb-3 opacity-20" />
                            <p className="text-xs font-medium">Nenhuma notificação por aqui.</p>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            {notifications.map((notif) => (
                              <div key={notif.id} className="py-3 border-b border-gh-border last:border-0 flex gap-3 group cursor-pointer">
                                <div className="flex-1 flex flex-col justify-center">
                                  <div>
                                    <h4 className="text-xs font-bold text-white mb-1 leading-tight line-clamp-1">
                                      {notif.title}
                                    </h4>
                                    <p className="text-[10px] text-gh-text-secondary line-clamp-2 mb-1.5 leading-relaxed">
                                      {notif.description}
                                    </p>
                                  </div>
                                  <p className="text-[9px] font-bold text-gh-text-secondary uppercase tracking-wider opacity-60">
                                    Sistema • {notif.time}
                                  </p>
                                </div>
                                
                                {/* Right Thumbnail/Icon */}
                                <div className="w-12 h-12 rounded-lg bg-gh-card border border-gh-border flex items-center justify-center shrink-0 group-hover:border-gh-blue/30 transition-colors">
                                  {notif.title.includes('Hábito') ? (
                                    <CheckCircle2 size={18} className="text-gh-green" />
                                  ) : notif.title.includes('Tarefa') ? (
                                    <List size={18} className="text-gh-blue" />
                                  ) : (
                                    <Bell size={18} className="text-purple-400" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#070e18] border-r border-gh-border z-50 shadow-2xl flex flex-col"
            >
              <div className="flex-1 flex flex-col">
                <div className="p-4 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-white/10">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check size={12} className="text-[#070e18] stroke-[4]" />
                      </div>
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

                <nav className="flex flex-col mt-2">
                  <h3 className="px-4 text-xs font-bold text-gh-text-secondary uppercase tracking-wider mb-2">Navegação</h3>
                  <div className="flex flex-col">
                    <button 
                      onClick={() => { navigate('/habits'); setIsMenuOpen(false); }}
                      className={`w-full px-4 py-3 border-l-2 transition-all group ${
                        activeTab === 'habits' 
                          ? 'bg-gh-blue/5 border-gh-blue' 
                          : 'bg-transparent border-transparent hover:bg-gh-card/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            activeTab === 'habits'
                              ? 'bg-gh-blue text-white shadow-lg shadow-gh-blue/20 ring-1 ring-gh-blue/20'
                              : 'bg-gh-card border border-gh-border text-gh-text-secondary group-hover:text-white group-hover:border-gh-border/80'
                          }`}>
                            <List size={16} strokeWidth={2.5} />
                          </div>
                          <div className="text-left">
                            <p className={`text-xs font-bold leading-tight mb-0.5 ${activeTab === 'habits' ? 'text-white' : 'text-gh-text-secondary group-hover:text-white'}`}>
                              Hábitos
                            </p>
                            <p className="text-[9px] font-bold text-gh-text-secondary uppercase tracking-wider opacity-80">
                              Gerenciar
                            </p>
                          </div>
                        </div>
                        
                        <ChevronRight size={16} className={`text-gh-text-secondary transition-transform group-hover:translate-x-1 ${activeTab === 'habits' ? 'text-gh-blue' : ''}`} />
                      </div>
                    </button>
                  </div>
                </nav>
              </div>

              <div className="border-t border-gh-border p-3 bg-gh-bg">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
