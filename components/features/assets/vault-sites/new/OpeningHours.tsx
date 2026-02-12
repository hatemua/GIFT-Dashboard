"use client";
import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface OpeningHoursProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  error?: string;
}

export const OpeningHours: React.FC<OpeningHoursProps> = ({
  value,
  onChange,
  className,
  label = "Opening Hours",
  error,
}) => {
  // Parse the value into from/to times
  const parseTimes = React.useMemo(() => {
    if (!value) return { from: "", to: "" };

    // Try to parse different formats
    const match = value.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
    if (match) {
      return { from: match[1], to: match[2] };
    }

    // Try 24-hour format without separator
    const split = value.split(/[-–]/);
    if (split.length === 2) {
      return { from: split[0].trim(), to: split[1].trim() };
    }

    return { from: "", to: "" };
  }, [value]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value;
    const newValue =
      newFrom && parseTimes.to ? `${newFrom} - ${parseTimes.to}` : "";
    onChange(newValue);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value;
    const newValue =
      parseTimes.from && newTo ? `${parseTimes.from} - ${newTo}` : "";
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <Clock className="h-4 w-4 text-gold-600" />
          {label}
        </label>
        <span className="text-xs text-gray-500">24-hour format</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label htmlFor="opening-from" className="text-xs text-gray-600">
            From
          </label>
          <div className="relative">
            <Input
              id="opening-from"
              type="time"
              value={parseTimes.from}
              onChange={handleFromChange}
              className={cn(
                "w-full pl-10",
                error &&
                  "border-red-300 focus:ring-red-200 focus:border-red-400",
              )}
              placeholder="09:00"
              step="900" // 15-minute intervals
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="opening-to" className="text-xs text-gray-600">
            To
          </label>
          <div className="relative">
            <Input
              id="opening-to"
              type="time"
              value={parseTimes.to}
              onChange={handleToChange}
              className={cn(
                "w-full pl-10",
                error &&
                  "border-red-300 focus:ring-red-200 focus:border-red-400",
              )}
              placeholder="17:00"
              step="900"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Display formatted value */}
      {value && (
        <div className="mt-2 rounded-lg bg-gray-50 border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gold-100 flex items-center justify-center">
                <Clock className="h-3 w-3 text-gold-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {parseTimes.from} - {parseTimes.to}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Use 24-hour format (e.g., 13:30 for 1:30 PM)</p>
      </div>
    </div>
  );
};
