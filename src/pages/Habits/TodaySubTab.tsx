import React, { useState, useEffect } from 'react';
import { format, addDays, subDays, isSameDay, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Plus, X, Book, Calendar, Hash, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface Habit {
  id: string;
  name: string;
  frequency: number[];
  startDate: string;
  executionsPerDay: number;
  completedDates: Record<string, number>;
}

interface Task {
  id: string;
  name: string;
  executionsPerDay: number;
  frequency: number[]; // Empty = one-time
  createdAt: string;
  completedDates: Record<string, number>;
  fullyCompletedAt?: string;
}

interface TodaySubTabProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function TodaySubTab({ isModalOpen, setIsModalOpen }: TodaySubTabProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Task Modal State
  const [taskName, setTaskName] = useState('');
  const [taskExecutions, setTaskExecutions] = useState(1);
  const [taskFrequency, setTaskFrequency] = useState<number[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ type: 'habit' | 'task', id: string, name: string } | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleDelete = () => {
    if (!deleteModal) return;

    if (deleteModal.type === 'habit') {
      const updatedHabits = habits.filter(h => h.id !== deleteModal.id);
      setHabits(updatedHabits);
      localStorage.setItem('habits', JSON.stringify(updatedHabits));
    } else {
      const updatedTasks = tasks.filter(t => t.id !== deleteModal.id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    setDeleteModal(null);
  };

  const handleContextMenu = (e: React.MouseEvent, type: 'habit' | 'task', id: string, name: string) => {
    e.preventDefault();
    setDeleteModal({ type, id, name });
  };

  const weekDays = [
    { id: 1, label: 'Seg' },
    { id: 2, label: 'Ter' },
    { id: 3, label: 'Qua' },
    { id: 4, label: 'Qui' },
    { id: 5, label: 'Sex' },
    { id: 6, label: 'Sáb' },
    { id: 0, label: 'Dom' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  };

  const toggleHabitExecution = (habitId: string) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const updatedHabits = habits.map(h => {
      if (h.id === habitId) {
        const currentCount = h.completedDates[dateKey] || 0;
        const newCount = currentCount >= h.executionsPerDay ? 0 : currentCount + 1;
        return {
          ...h,
          completedDates: { ...h.completedDates, [dateKey]: newCount }
        };
      }
      return h;
    });
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const toggleTaskExecution = (taskId: string) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        const currentCount = t.completedDates[dateKey] || 0;
        const newCount = currentCount >= t.executionsPerDay ? 0 : currentCount + 1;
        
        let fullyCompletedAt = t.fullyCompletedAt;
        
        // If it's a one-time task (frequency empty)
        if (t.frequency.length === 0) {
          if (newCount >= t.executionsPerDay) {
            fullyCompletedAt = dateKey;
          } else {
            fullyCompletedAt = undefined;
          }
        }

        return {
          ...t,
          completedDates: { ...t.completedDates, [dateKey]: newCount },
          fullyCompletedAt
        };
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return setMessage({ type: 'error', text: 'Informe o nome da tarefa.' });

    const newTask: Task = {
      id: crypto.randomUUID(),
      name: taskName,
      executionsPerDay: taskExecutions,
      frequency: taskFrequency,
      createdAt: format(selectedDate, 'yyyy-MM-dd'),
      completedDates: {}
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setMessage({ type: 'success', text: 'Tarefa criada com sucesso!' });
    setTimeout(() => {
      setIsModalOpen(false);
      setTaskName('');
      setTaskExecutions(1);
      setTaskFrequency([]);
      setMessage(null);
    }, 1500);
  };

  const toggleFrequencyDay = (dayId: number) => {
    setTaskFrequency(prev => 
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const filteredHabits = habits.filter(h => {
    const start = startOfDay(parseISO(h.startDate));
    const current = startOfDay(selectedDate);
    if (current < start) return false;
    const dayOfWeek = selectedDate.getDay();
    return h.frequency.includes(dayOfWeek);
  });

  const filteredTasks = tasks.filter(t => {
    const created = startOfDay(parseISO(t.createdAt));
    const current = startOfDay(selectedDate);
    if (current < created) return false;

    if (t.frequency.length > 0) {
      // Recurring task
      const dayOfWeek = selectedDate.getDay();
      return t.frequency.includes(dayOfWeek);
    } else {
      // One-time task
      if (!t.fullyCompletedAt) return true;
      const completed = startOfDay(parseISO(t.fullyCompletedAt));
      return current <= completed;
    }
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-gh-card border border-gh-border p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <Button variant="ghost" size="sm" onClick={() => setSelectedDate(subDays(selectedDate, 1))} className="hover:bg-gh-bg h-10 w-10 p-0 flex-shrink-0">
            <ChevronLeft size={20} />
          </Button>
          <div className="text-center w-[220px] sm:w-[260px] md:w-[320px] flex-shrink-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white capitalize tracking-tight truncate px-2">
              {isSameDay(selectedDate, new Date()) ? 'Hoje' : format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </h2>
            <p className="text-[10px] font-black text-gh-text-secondary uppercase tracking-widest mt-1">
              {format(selectedDate, 'dd/MM/yyyy')}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="hover:bg-gh-bg h-10 w-10 p-0 flex-shrink-0">
            <ChevronRight size={20} />
          </Button>
        </div>

        <Button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex gap-2 bg-gh-blue hover:bg-gh-blue/80 text-white font-black text-xs uppercase tracking-widest h-11 px-6 rounded-xl shadow-lg shadow-gh-blue/20"
        >
          <Plus size={18} /> Nova Tarefa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Habits Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-gh-green rounded-full" />
            <h3 className="text-xs font-black text-gh-text-secondary uppercase tracking-[0.2em]">Hábitos do Dia</h3>
          </div>
          
          {filteredHabits.length === 0 ? (
            <div className="text-center py-12 bg-gh-card border border-gh-border border-dashed rounded-xl">
              <p className="text-gh-text-secondary text-sm">Nenhum hábito planejado para este dia.</p>
            </div>
          ) : (
            filteredHabits.map(habit => {
              const dateKey = format(selectedDate, 'yyyy-MM-dd');
              const completedCount = habit.completedDates[dateKey] || 0;
              const isFullyCompleted = completedCount >= habit.executionsPerDay;

              return (
                <motion.div 
                  layout
                  key={habit.id}
                  onContextMenu={(e) => handleContextMenu(e, 'habit', habit.id, habit.name)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-context-menu ${
                    isFullyCompleted ? 'bg-green-500/5 border-green-500/20' : 'bg-gh-card border-gh-border hover:border-gh-border/80'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <button 
                      onClick={() => toggleHabitExecution(habit.id)}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isFullyCompleted 
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                          : 'bg-gh-bg border border-gh-border text-gh-text-secondary hover:text-white'
                      }`}
                    >
                      {isFullyCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </button>
                    <div>
                      <h3 className={`font-bold text-xs md:text-sm ${isFullyCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                        {habit.name}
                      </h3>
                      <p className="text-[9px] md:text-[10px] font-bold text-gh-text-secondary uppercase tracking-wider mt-0.5">
                        {completedCount} / {habit.executionsPerDay} execuções
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: habit.executionsPerDay }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i < completedCount ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gh-border'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Tasks Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-gh-blue rounded-full" />
            <h3 className="text-xs font-black text-gh-text-secondary uppercase tracking-[0.2em]">Tarefas</h3>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-gh-card border border-gh-border border-dashed rounded-xl">
              <p className="text-gh-text-secondary text-sm">Nenhuma tarefa para este dia.</p>
            </div>
          ) : (
            filteredTasks.map(task => {
              const dateKey = format(selectedDate, 'yyyy-MM-dd');
              const completedCount = task.completedDates[dateKey] || 0;
              const isFullyCompleted = completedCount >= task.executionsPerDay;

              return (
                <motion.div 
                  layout
                  key={task.id}
                  onContextMenu={(e) => handleContextMenu(e, 'task', task.id, task.name)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-context-menu ${
                    isFullyCompleted ? 'bg-gh-blue/5 border-gh-blue/20' : 'bg-gh-card border-gh-border hover:border-gh-border/80'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <button 
                      onClick={() => toggleTaskExecution(task.id)}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isFullyCompleted 
                          ? 'bg-gh-blue text-white shadow-lg shadow-gh-blue/20' 
                          : 'bg-gh-bg border border-gh-border text-gh-text-secondary hover:text-white'
                      }`}
                    >
                      {isFullyCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </button>
                    <div>
                      <h3 className={`font-bold text-xs md:text-sm ${isFullyCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                        {task.name}
                      </h3>
                      <p className="text-[9px] md:text-[10px] font-bold text-gh-text-secondary uppercase tracking-wider mt-0.5">
                        {completedCount} / {task.executionsPerDay} execuções
                        {task.frequency.length === 0 && <span className="ml-2 text-gh-blue hidden sm:inline">• Única</span>}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: task.executionsPerDay }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i < completedCount ? 'bg-gh-blue shadow-[0_0_8px_rgba(47,129,247,0.6)]' : 'bg-gh-border'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Floating Action Button - Moved to HabitsPage */}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-gh-bg border border-gh-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden p-6"
            >
              <h2 className="text-lg font-bold text-white mb-2">Excluir {deleteModal.type === 'habit' ? 'Hábito' : 'Tarefa'}?</h2>
              <p className="text-sm text-gh-text-secondary mb-6">
                Tem certeza que deseja excluir <strong>"{deleteModal.name}"</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setDeleteModal(null)} 
                  className="flex-1 text-gh-text-secondary hover:text-white"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleDelete}
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                >
                  Excluir
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Task Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center md:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full h-full md:h-auto md:max-w-md bg-gh-bg md:border md:border-gh-border md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gh-border bg-gh-card/80 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gh-blue/10 flex items-center justify-center text-gh-blue border border-gh-blue/20">
                    <ClipboardList size={20} className="md:w-[22px] md:h-[22px]" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight">Nova Tarefa</h2>
                    <p className="text-[9px] md:text-[10px] text-gh-text-secondary font-bold uppercase tracking-widest">Adicionar à lista</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gh-bg text-gh-text-secondary hover:text-white transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="flex-1 flex flex-col overflow-hidden overscroll-none">
                <div className="p-4 md:p-6 flex-1 overflow-hidden bg-gradient-to-b from-transparent to-gh-bg">
                  <div className="space-y-5 md:space-y-6">
                    {/* 1. Nome Tarefa */}
                    <div className="space-y-2 group">
                      <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em] group-focus-within:text-gh-blue transition-colors">
                        <Book size={12} /> Nome da Tarefa
                      </label>
                      <input 
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Ex: Comprar mantimentos"
                        className="w-full rounded-xl border border-gh-border bg-gh-bg px-4 py-3 md:py-3.5 text-sm md:text-base text-white placeholder-gray-600 focus:border-gh-blue focus:ring-4 focus:ring-gh-blue/10 outline-none transition-all font-medium shadow-inner"
                      />
                    </div>

                    {/* 2. Meta Diária */}
                    <div className="space-y-2 md:space-y-3">
                      <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em]">
                        <Hash size={12} /> Meta Diária
                      </label>
                      <div className="flex items-center justify-between bg-gh-card border border-gh-border rounded-xl p-1 md:p-1.5 shadow-inner">
                        <button 
                          type="button"
                          onClick={() => setTaskExecutions(Math.max(1, taskExecutions - 1))}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gh-bg text-white flex items-center justify-center hover:bg-gh-border transition-all border border-gh-border active:scale-95"
                        >
                          -
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-base md:text-lg font-black text-white leading-none">{taskExecutions}</span>
                          <span className="text-[7px] md:text-[8px] text-gh-text-secondary font-black uppercase tracking-widest mt-0.5">vezes / dia</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setTaskExecutions(taskExecutions + 1)}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gh-bg text-white flex items-center justify-center hover:bg-gh-border transition-all border border-gh-border active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 3. Frequencia */}
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em]">
                          <Calendar size={12} /> Frequência (Opcional)
                        </label>
                        {taskFrequency.length > 0 && (
                          <button 
                            type="button" 
                            onClick={() => setTaskFrequency([])}
                            className="text-[8px] md:text-[9px] font-black text-gh-blue uppercase tracking-widest hover:underline"
                          >
                            Limpar
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {weekDays.map(day => (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => toggleFrequencyDay(day.id)}
                            className={`
                              py-2.5 md:py-3 rounded-lg text-[9px] md:text-[10px] font-black border transition-all uppercase
                              ${taskFrequency.includes(day.id) 
                                ? 'bg-gh-blue border-gh-blue text-white shadow-lg shadow-gh-blue/20' 
                                : 'bg-gh-card border-gh-border text-gh-text-secondary hover:border-gray-500 hover:text-white'}
                            `}
                          >
                            {day.label.charAt(0)}
                          </button>
                        ))}
                      </div>
                      <p className="text-[9px] md:text-[10px] text-gh-text-secondary italic">
                        {taskFrequency.length === 0 
                          ? "* Se não selecionar frequência, a tarefa será única e persistirá até ser concluída." 
                          : "* Tarefa recorrente nos dias selecionados."}
                      </p>
                    </div>

                    {message && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-xs font-black text-center uppercase tracking-widest ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                      >
                        {message.text}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="p-4 md:p-6 border-t border-gh-border bg-gh-card/80 backdrop-blur-xl flex gap-3 shrink-0">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 text-gh-text-secondary hover:text-white font-bold text-xs uppercase tracking-widest h-11"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 font-black uppercase tracking-[0.15em] text-xs bg-gh-blue hover:bg-gh-blue/80 text-white shadow-[0_10px_30px_rgba(47,129,247,0.3)] h-11 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Criar Tarefa
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
