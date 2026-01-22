'use client';

import * as React from 'react';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { X } from 'lucide-react';

interface SelectProps {
  children: React.ReactNode[];
  value?: string | string[];
  multiple?: boolean;
  placeholder?: string;
  onChange?: (value: string | string[]) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ children, value, multiple, placeholder, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
const selectedValues = multiple
  ? Array.isArray(value) ? value : value ? [value] : []
  : value ?? "";
    // Close dropdown on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
      if (multiple && Array.isArray(selectedValues)) {
        if (selectedValues.includes(val)) {
          const newValues = selectedValues.filter(v => v !== val);
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

    const removeTag = (val: string) => {
      if(multiple && Array.isArray(selectedValues)){
      const newValues = selectedValues.filter(v => v !== val);
            onChange?.(newValues);


      }else{
        onChange?.("");
      }
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Trigger */}
        <div
          ref={ref}
          className="w-full min-h-[42px] border border-slate-300 rounded-lg px-3 py-2 text-sm flex flex-wrap items-center gap-1 cursor-pointer transition hover:border-gold-400"
          onClick={() => setIsOpen(prev => !prev)}
        >
          {selectedValues.length === 0 ? (
            <span className="text-slate-400">{placeholder || 'Select...'}</span>
          ) : (
            <>
            {!multiple && selectedValues && (
  <span>{selectedValues}</span>
)}
            {multiple && Array.isArray(selectedValues) && selectedValues.map(val => (
              <span
                key={val}
                className="bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-medium shadow-sm hover:bg-gold-200 transition"
              >
                {val}
                <X
                  size={14}
                  className="cursor-pointer text-gold-700 hover:text-gold-900"
                  onClick={(e) => { e.stopPropagation(); removeTag(val); }}
                />
              </span>
            ))}</>
          )}
          <span className="ml-auto text-slate-400 select-none">{isOpen ? '▲' : '▼'}</span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 max-h-48 overflow-auto border border-slate-300 rounded-lg bg-white shadow-lg">
            {React.Children.map(children, (child: any) => {
              const val = child.props.value;
              const isSelected = selectedValues.includes(val);
              return (
                <div
                  key={val}
                  onClick={() => handleSelect(val)}
                  className={`px-3 py-2 cursor-pointer transition rounded hover:bg-gold-50 flex items-center justify-between
                    ${isSelected ? 'bg-gold-100 font-medium' : ''}`}
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
    );
  }
);

Select.displayName = 'Select';

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
  return <>{children}</>;
};
