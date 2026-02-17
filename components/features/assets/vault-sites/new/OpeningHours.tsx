"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Weekday = (typeof weekdays)[number];

interface OpeningHourRule {
  days: Weekday[];
  from: string;
  to: string;
}

interface OpeningHoursInputProps {
  label?: string;
  value?: string;
  onChange?: (formatted: string) => void;
}

export function OpeningHours({
  label = "Opening Hours",
  value,
  onChange,
}: OpeningHoursInputProps) {
  const [rules, setRules] = useState<OpeningHourRule[]>([
    { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], from: "09:00", to: "17:00" },
  ]);

  const formatRules = (items: OpeningHourRule[]) =>
    items
      .map((rule) => `${rule.days.join(", ")}: ${rule.from}-${rule.to}`)
      .join("; ");

  const updateRules = (updated: OpeningHourRule[]) => {
    setRules(updated);
    onChange?.(formatRules(updated));
  };

  const addRule = () => {
    // Determine unused days
    const usedDays = rules.flatMap((r) => r.days);
    const firstUnusedDay = weekdays.find((d) => !usedDays.includes(d));
    updateRules([
      ...rules,
      {
        days: firstUnusedDay ? [firstUnusedDay] : [],
        from: "09:00",
        to: "12:00",
      },
    ]);
  };

  const removeRule = (index: number) =>
    updateRules(rules.filter((_, i) => i !== index));

  const toggleDay = (ruleIndex: number, day: Weekday) => {
    const updated = [...rules];
    const currentRule = updated[ruleIndex];
    const usedInOtherRules = rules
      .filter((_, i) => i !== ruleIndex)
      .flatMap((r) => r.days);

    // Skip if the day is used in another rule
    if (usedInOtherRules.includes(day)) return;

    currentRule.days = currentRule.days.includes(day)
      ? currentRule.days.filter((d) => d !== day)
      : [...currentRule.days, day];

    updated[ruleIndex] = currentRule;
    updateRules(updated);
  };

  const updateTime = (index: number, field: "from" | "to", value: string) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [field]: value };
    updateRules(updated);
  };

  // Get all days used in other rules for disabling buttons
  const getUsedDays = (ruleIndex: number) =>
    rules.filter((_, i) => i !== ruleIndex).flatMap((r) => r.days);

  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Clock className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <CardTitle className="text-lg">{label}</CardTitle>
          <CardDescription>Define when this location is open</CardDescription>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-3">
        {rules.map((rule, index) => {
          const usedDays = getUsedDays(index);
          return (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-lg border bg-background p-3 shadow-sm"
            >
              {/* Day selection */}
              <div className="flex flex-wrap gap-2">
                {weekdays.map((day) => (
                  <Button
                    type="button"
                    key={day}
                    size="sm"
                    variant={rule.days.includes(day) ? "default" : "outline"}
                    disabled={usedDays.includes(day)}
                    onClick={() => toggleDay(index, day)}
                  >
                    {day}
                  </Button>
                ))}
              </div>

              {/* Time selection */}
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={rule.from}
                  onChange={(e) => updateTime(index, "from", e.target.value)}
                  className="w-[120px]"
                />
                <span className="text-xs text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={rule.to}
                  onChange={(e) => updateTime(index, "to", e.target.value)}
                  className="w-[120px]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-muted-foreground hover:text-destructive"
                  onClick={() => removeRule(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add rule */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRule}
        className="w-fit"
        disabled={rules.flatMap((r) => r.days).length >= weekdays.length} // disable if all days used
      >
        + Add day range
      </Button>

      {/* Preview */}
      <div className="rounded-lg border bg-muted/40 p-3 text-sm">
        <span className="font-medium">Formatted:</span>{" "}
        <span className="text-muted-foreground">{formatRules(rules)}</span>
      </div>
    </div>
  );
}
