import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightHint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, rightHint, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
       <div className="relative"><input
          type={type}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-card border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900",
            "placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            rightHint && "pr-14",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        /> {rightHint && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              {rightHint}
            </span>
          )}</div>
        

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
