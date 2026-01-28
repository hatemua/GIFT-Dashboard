import React from "react";
import { EMPTY_STATES, EmptyStateType } from "@/constants/emptyStates";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  type: EmptyStateType;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ type, action, className }: EmptyStateProps) {
  const { title, description, icon } = EMPTY_STATES[type];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-24 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        {icon}
      </div>

      <p className="text-sm font-semibold text-slate-800">{title}</p>

      {description && (
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
