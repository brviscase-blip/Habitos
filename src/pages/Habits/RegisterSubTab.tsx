import React, { useState, useEffect } from 'react';
import { format, getDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/Button';
import { CustomCalendar } from './CustomCalendar';
import { Plus, X, Calendar, Hash, Trash2, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Habit {
  id: string;
  name: string;
  frequency: number[];
  startDate: string;
  executionsPerDay: number;
  completedDates: Record<string, number>;
}

interface RegisterSubTabProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function RegisterSubTab({ isModalOpen, setIsModalOpen }: RegisterSubTabProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  
  // Form State
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [executions, setExecutions] = useState(1);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = () => {
    const savedHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    setHabits(savedHabits);
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

  const toggleDay = (dayId: number) => {
    setFrequency(prev => 
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
    if (startDate && getDay(startDate) === dayId) {
      setStartDate(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) return setMessage({ type: 'error', text: 'Informe o nome do hábito.' });
    if (frequency.length === 0) return setMessage({ type: 'error', text: 'Selecione pelo menos um dia da semana.' });
    if (!startDate) return setMessage({ type: 'error', text: 'Selecione a data de início.' });

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      frequency,
      startDate: startDate.toISOString(),
      executionsPerDay: executions,
      completedDates: {}
    };

    const existingHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    const updatedHabits = [...existingHabits, newHabit];
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    setHabits(updatedHabits);

    setMessage({ type: 'success', text: 'Hábito cadastrado com sucesso!' });
    
    setTimeout(() => {
      setIsModalOpen(false);
      setName('');
      setFrequency([]);
      setStartDate(null);
      setExecutions(1);
      setMessage(null);
    }, 1500);
  };

  const [deleteModal, setDeleteModal] = useState<{ id: string, name: string } | null>(null);

  const confirmDeleteHabit = () => {
    if (!deleteModal) return;
    const updatedHabits = habits.filter(h => h.id !== deleteModal.id);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
    setDeleteModal(null);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ id, name });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gh-card border border-gh-border p-6 rounded-xl shadow-sm">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-white">Meus Hábitos</h2>
          <p className="text-sm text-gh-text-secondary">Gerencie e cadastre novos hábitos para sua rotina.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="hidden md:flex w-full sm:w-auto gap-2 bg-gh-green hover:bg-gh-green-hover text-white font-bold">
          <Plus size={18} /> Novo Hábito
        </Button>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gh-card border border-gh-border border-dashed rounded-xl">
            <p className="text-gh-text-secondary">Você ainda não cadastrou nenhum hábito.</p>
            <Button variant="ghost" onClick={() => setIsModalOpen(true)} className="mt-4 text-gh-blue hover:underline">
              Cadastrar meu primeiro hábito
            </Button>
          </div>
        ) : (
          habits.map(habit => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={habit.id} 
              className="bg-gh-card border border-gh-border p-5 rounded-xl hover:border-gh-blue/50 transition-all group relative"
            >
              <button 
                onClick={() => handleDeleteClick(habit.id, habit.name)}
                className="absolute top-4 right-4 text-gh-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>

              <h3 className="text-lg font-bold text-white mb-4 pr-8">{habit.name}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gh-text-secondary">
                  <Calendar size={14} />
                  <span>Início: {format(parseISO(habit.startDate), "dd/MM/yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gh-text-secondary">
                  <Hash size={14} />
                  <span>{habit.executionsPerDay}x por dia</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-bold text-gh-text-secondary mb-2">Frequência</p>
                  <div className="flex gap-1">
                    {weekDays.map(day => (
                      <div 
                        key={day.id}
                        className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold border ${
                          habit.frequency.includes(day.id) 
                            ? 'bg-gh-blue/20 border-gh-blue text-gh-blue' 
                            : 'bg-gh-bg border-gh-border text-gray-600'
                        }`}
                      >
                        {day.label.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
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
              <h2 className="text-lg font-bold text-white mb-2">Excluir Hábito?</h2>
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
                  onClick={confirmDeleteHabit}
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                >
                  Excluir
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
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
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="relative w-full h-full md:h-auto md:max-w-xl bg-gh-bg md:border md:border-gh-border md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gh-border bg-gh-card/80 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gh-blue/10 flex items-center justify-center text-gh-blue border border-gh-blue/20">
                    <Plus size={20} className="md:w-[22px] md:h-[22px]" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight">Novo Hábito</h2>
                    <p className="text-[9px] md:text-[10px] text-gh-text-secondary font-bold uppercase tracking-widest">Configuração de rotina</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gh-bg text-gh-text-secondary hover:text-white transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 md:p-6 flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-gh-bg md:max-h-[85vh]">
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 pb-20 md:pb-0">
                  {/* 1. Nome Hábito */}
                  <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em] group-focus-within:text-gh-blue transition-colors">
                      <Book size={12} /> Nome do Hábito
                    </label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Meditação Matinal"
                      className="w-full rounded-xl border border-gh-border bg-gh-bg px-4 py-3 md:py-3.5 text-sm md:text-base text-white placeholder-gray-600 focus:border-gh-blue focus:ring-4 focus:ring-gh-blue/10 outline-none transition-all font-medium shadow-inner"
                    />
                  </div>

                  {/* 2. Frequencia Semanal */}
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em]">
                        <Calendar size={12} /> Frequência Semanal
                      </label>
                      {frequency.length > 0 && (
                        <button 
                          type="button" 
                          onClick={() => setFrequency([])}
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
                          onClick={() => toggleDay(day.id)}
                          className={`
                            py-2.5 md:py-3 rounded-lg text-[9px] md:text-[10px] font-black border transition-all uppercase
                            ${frequency.includes(day.id) 
                              ? 'bg-gh-blue border-gh-blue text-white shadow-lg shadow-gh-blue/20' 
                              : 'bg-gh-card border-gh-border text-gh-text-secondary hover:border-gray-500 hover:text-white'}
                          `}
                        >
                          {day.label.charAt(0)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Início do Hábito */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em]">
                      <Plus size={12} /> Data de Início
                    </label>
                    <CustomCalendar 
                      selectedDate={startDate}
                      onDateSelect={setStartDate}
                      allowedDays={frequency}
                    />
                  </div>

                  {/* 4. Quantidade de execuções */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-gh-text-secondary uppercase tracking-[0.2em]">
                      <Hash size={12} /> Meta Diária
                    </label>
                    <div className="flex items-center justify-between bg-gh-card border border-gh-border rounded-xl p-2 md:p-2.5 shadow-inner">
                      <button 
                        type="button"
                        onClick={() => setExecutions(Math.max(1, executions - 1))}
                        className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gh-bg text-white flex items-center justify-center hover:bg-gh-border transition-all border border-gh-border active:scale-95"
                      >
                        -
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-xl md:text-2xl font-black text-white leading-none">{executions}</span>
                        <span className="text-[8px] md:text-[9px] text-gh-text-secondary font-black uppercase tracking-widest mt-1">vezes / dia</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setExecutions(executions + 1)}
                        className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gh-bg text-white flex items-center justify-center hover:bg-gh-border transition-all border border-gh-border active:scale-95"
                      >
                        +
                      </button>
                    </div>
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

                  <div className="flex gap-3 pt-4">
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
                      className="flex-[2] font-black uppercase tracking-[0.15em] text-xs bg-gh-green hover:bg-gh-green-hover text-white shadow-[0_10px_30px_rgba(35,134,54,0.3)] h-11 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Salvar Hábito
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
