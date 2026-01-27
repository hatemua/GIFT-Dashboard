"use client";

import * as React from "react";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  ReactNode,
} from "react";
import { X } from "lucide-react";

interface SelectProps {
  children: ReactNode[];
  value?: string | string[];
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string | string[]) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ children, value, multiple, placeholder, label, error, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine selected values
    const selectedValues = multiple
      ? Array.isArray(value)
        ? value
        : value
        ? [value]
        : []
      : value ?? "";

    // Close dropdown on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Toggle dropdown & check space
    const handleToggleDropdown = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Open upwards if not enough space below
        setOpenUpwards(spaceBelow < 200 && spaceAbove > spaceBelow);
      }
      setIsOpen((prev) => !prev);
    };

    // Handle selecting an item
    const handleSelect = (val: string) => {
      if (multiple && Array.isArray(selectedValues)) {
        if (selectedValues.includes(val)) {
          const newValues = selectedValues.filter((v) => v !== val);
          onChange?.(newValues);
        } else {
          const newValues = [...selectedValues, val];
          onChange?.(newValues);
        }
      } else {
        onChange?.(val);
        setIsOpen(false);
      }
    };

    // Remove a tag in multi-select
    const removeTag = (val: string) => {
      if (multiple && Array.isArray(selectedValues)) {
        const newValues = selectedValues.filter((v) => v !== val);
        onChange?.(newValues);
      } else {
        onChange?.("");
      }
    };

    return (
      <div className="space-y-1">
        {/* Label */}
        {label && (
          <label className="text-sm font-medium text-slate-700">{label}</label>
        )}

        {/* Select container */}
        <div ref={containerRef} className="relative w-full">
          {/* Trigger */}
          <div
            ref={ref}
            className="w-full min-h-[42px] border border-slate-300 rounded-lg px-3 py-2 text-sm flex flex-wrap items-center gap-1 cursor-pointer transition hover:border-gold-400"
            onClick={handleToggleDropdown}
          >
            {selectedValues.length === 0 ? (
              <span className="text-slate-400">
                {placeholder || "Select..."}
              </span>
            ) : (
              <>
                {!multiple && selectedValues && <span>{selectedValues}</span>}
                {multiple &&
                  Array.isArray(selectedValues) &&
                  selectedValues.map((val) => (
                    <span
                      key={val}
                      className="bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-medium shadow-sm hover:bg-gold-200 transition"
                    >
                      {val}
                      <X
                        size={14}
                        className="cursor-pointer text-gold-700 hover:text-gold-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTag(val);
                        }}
                      />
                    </span>
                  ))}
              </>
            )}
            <span className="ml-auto text-slate-400 select-none">
              {isOpen ? "▲" : "▼"}
            </span>
          </div>

          {/* Dropdown */}
          {isOpen && containerRef.current && (
            <div
              className={`absolute z-50 w-full max-h-48 overflow-auto border border-slate-300 rounded-lg bg-white shadow-lg`}
              style={{
                top: openUpwards ? undefined : "100%",
                bottom: openUpwards ? "100%" : undefined,
                marginTop: openUpwards ? undefined : "0.25rem",
                marginBottom: openUpwards ? "0.25rem" : undefined,
              }}
            >
              {React.Children.map(children, (child: any) => {
                const val = child.props.value;
                const isSelected = multiple
                  ? Array.isArray(selectedValues) && selectedValues.includes(val)
                  : selectedValues === val;

                return (
                  <div
                    key={val}
                    onClick={() => handleSelect(val)}
                    className={`px-3 py-2 cursor-pointer transition rounded hover:bg-gold-50 flex items-center justify-between
                      ${isSelected ? "bg-gold-100 font-medium" : ""}`}
                  >
                    <span>{child.props.children}</span>
                    {isSelected && multiple && (
                      <X size={14} className="text-gold-500" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => <>{children}</>;
