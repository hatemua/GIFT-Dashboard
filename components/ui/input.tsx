import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  prefix?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      required,
      error,
      prefix,
      icon,
      ...props
    },
    ref,
  ) => {
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

        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {prefix}
            </span>
          )}

          {icon && icon}

          <input
            type={type}
            ref={ref}
            className={cn(
              "flex w-full rounded-card border bg-white text-sm text-slate-900",
              "placeholder:text-slate-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              prefix || icon ? "pl-10" : "px-3", // add padding if prefix or icon exists
              "h-10 border-slate-200",
              error && "border-red-500 focus-visible:ring-red-500",
              className,
            )}
            {...props}
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
