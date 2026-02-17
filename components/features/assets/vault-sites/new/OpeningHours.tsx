"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";

type DayRange =
  | "Mon-Fri"
  | "Mon-Sat"
  | "Mon-Sun"
  | "Sat"
  | "Sun";

interface OpeningHourRule {
  days: DayRange;
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
    { days: "Mon-Fri", from: "09:00", to: "17:00" },
  ]);

  const formatRules = (items: OpeningHourRule[]) =>
    items
      .map(rule => `${rule.days}: ${rule.from}-${rule.to}`)
      .join(", ");

  const updateRules = (updated: OpeningHourRule[]) => {
    setRules(updated);
    onChange?.(formatRules(updated));
  };

  const addRule = () =>
    updateRules([
      ...rules,
      { days: "Sat", from: "09:00", to: "12:00" },
    ]);

  const removeRule = (index: number) =>
    updateRules(rules.filter((_, i) => i !== index));

  const updateRule = (
    index: number,
    field: keyof OpeningHourRule,
    value: string
  ) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [field]: value };
    updateRules(updated);
  };

  return (
    <div className="space-y-4">
      {/* Label */}
<div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Opening Hours</CardTitle>
                    <CardDescription>
                      Define when this location is open


                    </CardDescription>
                  </div>
                </div>

      {/* Rules */}
      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center gap-3 rounded-lg border bg-background p-3 shadow-sm"
          >
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={rule.days}
              onChange={e =>
                updateRule(index, "days", e.target.value)
              }
            >
              <option>Mon-Fri</option>
              <option>Mon-Sat</option>
              <option>Mon-Sun</option>
              <option>Sat</option>
              <option>Sun</option>
            </select>

            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={rule.from}
                onChange={e =>
                  updateRule(index, "from", e.target.value)
                }
                className="w-[120px]"
              />
              <span className="text-xs text-muted-foreground">
                to
              </span>
              <Input
                type="time"
                value={rule.to}
                onChange={e =>
                  updateRule(index, "to", e.target.value)
                }
                className="w-[120px]"
              />
            </div>

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
        ))}
      </div>

      {/* Add rule */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRule}
        className="w-fit"
      >
        + Add day range
      </Button>

      {/* Preview */}
      <div className="rounded-lg border bg-muted/40 p-3 text-sm">
        <span className="font-medium">Formatted:</span>{" "}
        <span className="text-muted-foreground">
          {formatRules(rules)}
        </span>
      </div>
    </div>
  );
}
