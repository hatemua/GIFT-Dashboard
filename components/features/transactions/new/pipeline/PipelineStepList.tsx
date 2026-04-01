import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Step } from "./types";
import { StepIcon } from "./StepIcon";

/* ------------------------------------------------------------------ */
/*  Case badge                                                          */
/* ------------------------------------------------------------------ */

export function PipelineCaseBadge({ pipelineCase }: { pipelineCase: "case1" | "case2" }) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border",
      pipelineCase === "case1"
        ? "bg-amber-50 border-amber-200 text-amber-800"
        : "bg-blue-50 border-blue-200 text-blue-800",
    )}>
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      {pipelineCase === "case1"
        ? "Case 1 detected — vaults differ, transit via LSP required"
        : "Case 2 detected — same vault, direct transfer"}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                        */
/* ------------------------------------------------------------------ */

export function PipelineProgressBar({ completedCount, total, progress }: {
  completedCount: number;
  total: number;
  progress: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{completedCount} / {total} steps completed</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step chips                                                          */
/* ------------------------------------------------------------------ */

export function PipelineStepChips({ steps, currentIdx }: { steps: Step[]; currentIdx: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, i) => (
        <div
          key={step.id}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
            step.status === "success" && "bg-emerald-50 border-emerald-200 text-emerald-700",
            step.status === "error"   && "bg-red-50 border-red-200 text-red-700",
            step.status === "running" && "bg-blue-50 border-blue-200 text-blue-700",
            (step.status === "pending" || step.status === "waiting") && i === currentIdx
              ? "bg-amber-50 border-amber-300 text-amber-700"
              : step.status === "pending" && "bg-gray-50 border-gray-200 text-gray-400",
          )}
        >
          <StepIcon status={step.status} icon={step.icon} />
          {step.label}
        </div>
      ))}
    </div>
  );
}
