import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label?: string;
  required?: boolean;
  error?: string;
  prefix?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      className,
      type = "text",
      label,
      required,
      error,
      prefix,
      icon,
      multiline = false,
      rows = 3,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    // Prevent invalid keys and handle replacing initial 0
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (type === "number") {
    // Block invalid keys
    if (["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Replace leading zero if input is "0" and user types 1-9
    if (/^[1-9]$/.test(e.key) && value === "0") {
      e.preventDefault();
      onChange?.({
        ...({} as React.ChangeEvent<HTMLInputElement>),
        target: { ...({} as any), value: e.key },
      });
    }
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  let newValue = e.target.value;

  if (type === "number") {
    // Remove invalid characters
    newValue = newValue.replace(/[eE+-]/g, "");

    // Remove leading zeros
    newValue = newValue.replace(/^0+(\d+)/, "$1");

    // Allow empty input (so user can type) or positive numbers
    if (newValue === "") newValue = "0";
  }

  // Trim trailing spaces for text
  if (!multiline) {
    newValue = newValue.replace(/\s+$/g, "");
  }

  onChange?.({
    ...e,
    target: { ...e.target, value: newValue },
  });
};



    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {required ? (
              <span className="text-red-500">*</span>
            ) : (
              <span className="text-gray-400 text-xs ml-1">(optional)</span>
            )}
          </label>
        )}

        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              {prefix}
            </span>
          )}

          {icon && icon}

          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              className={cn(
                "flex w-full rounded-card border bg-white text-sm text-slate-900",
                "placeholder:text-slate-400",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1",
                "disabled:cursor-not-allowed disabled:opacity-50",
                prefix || icon ? "pl-10" : "px-3",
                "border-slate-200 py-3",
                error && "border-red-500 focus-visible:ring-red-500",
                className,
              )}
              value={value}
              onChange={handleChange}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              type={type}
              ref={ref as React.Ref<HTMLInputElement>}
              className={cn(
                "flex w-full rounded-card border bg-white text-sm text-slate-900",
                "placeholder:text-slate-400",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1",
                "disabled:cursor-not-allowed disabled:opacity-50",
                prefix || icon ? "pl-10" : "px-3",
                "h-10 border-slate-200",
                error && "border-red-500 focus-visible:ring-red-500",
                className,
              )}
              value={value}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
