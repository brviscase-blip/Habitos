import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  getDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  allowedDays: number[]; // 0-6 (Sun-Sat)
}

export function CustomCalendar({ selectedDate, onDateSelect, allowedDays }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="bg-gh-card border border-gh-border rounded-xl py-2 px-3 w-full shadow-inner">
      <div className="flex items-center justify-between mb-1 px-1">
        <button 
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-gh-bg border border-transparent hover:border-gh-border rounded-lg text-gh-text-secondary hover:text-white transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <h3 className="text-xs font-bold text-white tracking-tight uppercase">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <button 
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gh-bg border border-transparent hover:border-gh-border rounded-lg text-gh-text-secondary hover:text-white transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-0.5">
        {weekDays.map(day => (
          <div key={day} className="text-[9px] font-black text-gh-text-secondary text-center uppercase tracking-widest opacity-50">
            {day.charAt(0)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          const isAllowed = allowedDays.includes(getDay(day));
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          
          return (
            <button
              key={i}
              type="button"
              disabled={!isAllowed}
              onClick={() => onDateSelect(day)}
              className={`
                h-7 w-full text-[10px] rounded-lg flex flex-col items-center justify-center transition-all relative border
                ${!isCurrentMonth ? 'opacity-20' : ''}
                ${isSelected 
                  ? 'bg-gh-blue border-gh-blue text-white font-bold shadow-[0_0_15px_rgba(47,129,247,0.4)] z-10' 
                  : isAllowed 
                    ? 'bg-gh-bg/50 border-gh-border hover:border-gray-500 text-white cursor-pointer' 
                    : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed opacity-30'}
              `}
            >
              <span>{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
