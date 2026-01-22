'use client';

import * as React from 'react';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, placeholder = 'Select date' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const selectedDate = value || '';

    // Close calendar on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateClick = (date: dayjs.Dayjs) => {
      onChange?.(date.format('YYYY-MM-DD'));
      setIsOpen(false);
    };

    const startDay = currentMonth.startOf('month').day();
    const daysInMonth = currentMonth.daysInMonth();

    const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
    const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

    const renderCalendarDays = () => {
      const blanks = Array.from({ length: startDay }, (_, i) => <div key={`b${i}`} />);
      const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = currentMonth.date(day);
        const isSelected = selectedDate === date.format('YYYY-MM-DD');

        return (
          <button
            key={day}
            type="button"
            onClick={() => handleDateClick(date)}
            className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gold-100 transition
              ${isSelected ? 'bg-gold-500 text-white' : ''}`}
          >
            {day}
          </button>
        );
      });

      return [...blanks, ...days];
    };

    return (
      <div className="relative w-full" ref={containerRef}>
        {/* Input */}
        <input
          type="text"
          readOnly
          value={selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY') : ''}
          placeholder={placeholder}
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer bg-white placeholder:text-slate-400 hover:border-slate-400 transition"
        />

        {/* Calendar icon */}
        <Calendar
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-gold-500 transition"
          onClick={() => setIsOpen(prev => !prev)}
        />

        {/* Calendar popup */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-64 bg-white border border-slate-300 rounded shadow-lg p-3">
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-2">
              <button type="button" onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded">
                <ChevronLeft size={16} />
              </button>
              <div className="font-medium text-sm">{currentMonth.format('MMMM YYYY')}</div>
              <button type="button" onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-xs text-slate-500 mb-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 text-sm text-center">{renderCalendarDays()}</div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
