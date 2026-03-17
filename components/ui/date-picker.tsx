"use client";

import * as React from "react";
import { useState, useEffect, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  showTime?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    { value, onChange, placeholder = "Select date", label, error, required, showTime = false },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [time, setTime] = useState({ hours: "00", minutes: "00", seconds: "00" });

    const selectedDate = value || "";

    // Sync time state from value when showTime is enabled
    React.useEffect(() => {
      if (showTime && value && value.includes("T")) {
        const [, timePart] = value.split("T");
        const [h, m, s] = timePart.split(":");
        setTime({ hours: h ?? "00", minutes: m ?? "00", seconds: s ?? "00" });
      }
    }, []);

    /* Close on outside click */
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          !containerRef.current?.contains(e.target as Node) &&
          !popupRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* Calculate position dynamically */
    const openCalendar = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const calendarHeight = 250; // approximate calendar popup height
        let top = rect.bottom + window.scrollY + 4;

        // Check if there is enough space below
        if (rect.bottom + calendarHeight > window.innerHeight) {
          top = rect.top + window.scrollY - calendarHeight - 4; // open above
        }

        setPosition({
          top,
          left: rect.left + window.scrollX,
        });
      }
      setIsOpen((prev) => !prev);
    };

    const handleDateClick = (date: dayjs.Dayjs) => {
      if (showTime) {
        onChange?.(`${date.format("YYYY-MM-DD")}T${time.hours}:${time.minutes}:${time.seconds}`);
      } else {
        onChange?.(date.format("YYYY-MM-DD"));
        setIsOpen(false);
      }
    };

    const handleTimeChange = (field: "hours" | "minutes" | "seconds", val: string) => {
      const sanitized = val.replace(/\D/g, "").slice(0, 2);
      const newTime = { ...time, [field]: sanitized.padStart(2, "0") };
      setTime(newTime);
      const datePart = selectedDate.includes("T")
        ? selectedDate.split("T")[0]
        : selectedDate;
      if (datePart) {
        onChange?.(`${datePart}T${newTime.hours}:${newTime.minutes}:${newTime.seconds}`);
      }
    };

    const startDay = currentMonth.startOf("month").day();
    const daysInMonth = currentMonth.daysInMonth();

    const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
    const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

    const renderCalendarDays = () => {
      const blanks = Array.from({ length: startDay }, (_, i) => (
        <div key={`b${i}`} />
      ));

      const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = currentMonth.date(i + 1);
        const isSelected =
          selectedDate === date.format("YYYY-MM-DD");

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleDateClick(date)}
            className={`w-8 h-8 rounded flex items-center justify-center
              hover:bg-gold-100 transition
              ${isSelected ? "bg-gold-500 text-white" : ""}`}
          >
            {i + 1}
          </button>
        );
      });

      return [...blanks, ...days];
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}{" "}
            {required ? (
              <span className="text-red-500">*</span>
            ) : (
              <span className="text-gray-400 text-xs ml-1">(optional)</span>
            )}
          </label>
        )}

        <div ref={containerRef} className="relative">
          <input
            ref={ref}
            readOnly
            value={
              selectedDate
                ? showTime
                  ? (() => {
                      const datePart = selectedDate.includes("T") ? selectedDate.split("T")[0] : selectedDate;
                      return `${dayjs(datePart).format("DD/MM/YYYY")} ${time.hours}:${time.minutes}:${time.seconds}`;
                    })()
                  : dayjs(selectedDate).format("DD/MM/YYYY")
                : ""
            }
            placeholder={placeholder}
            onClick={openCalendar}
            className={`w-full min-h-[42px] rounded-lg border px-3 py-2 text-sm
              cursor-pointer bg-white placeholder:text-slate-400
              focus:outline-none focus:ring-2
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:ring-gold-500 hover:border-slate-400"
              }`}
          />

          <Calendar
            size={16}
            onClick={openCalendar}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-slate-400 cursor-pointer hover:text-gold-500"
          />
        </div>

        {isOpen &&
          createPortal(
            <div
              ref={popupRef}
              className="absolute z-[9999] w-64 bg-white border border-slate-300 rounded shadow-lg p-3"
              style={{ top: position.top, left: position.left }}
            >
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="font-medium text-sm">
                  {currentMonth.format("MMMM YYYY")}
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-xs text-slate-500 mb-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-sm text-center">
                {renderCalendarDays()}
              </div>

              {showTime && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-2">
                    <label className="text-xs text-slate-500">Time</label>
                    <input
                      type="number"
                      min={0}
                      max={23}
                      value={time.hours}
                      onChange={(e) => handleTimeChange("hours", e.target.value)}
                      className="w-12 text-center text-sm border border-slate-300 rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                    <span className="text-slate-500 font-medium">:</span>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={time.minutes}
                      onChange={(e) => handleTimeChange("minutes", e.target.value)}
                      className="w-12 text-center text-sm border border-slate-300 rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                    <span className="text-slate-500 font-medium">:</span>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={time.seconds}
                      onChange={(e) => handleTimeChange("seconds", e.target.value)}
                      className="w-12 text-center text-sm border border-slate-300 rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-xs px-3 py-1 bg-gold-500 text-white rounded hover:bg-gold-600 transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>,
            document.body
          )}

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";