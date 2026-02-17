"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClearFiltersButtonProps {
  onClick: () => void;
  className?: string;
  title?: string;
}

export const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({
  onClick,
  className,
  title = "Clear filters",
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        `
        group relative
        h-9 w-9
        inline-flex items-center justify-center
        rounded-md
        overflow-hidden
        bg-white
        border border-muted/30
        transition-all duration-300
        hover:bg-rose-50
        hover:border-rose-200
        hover:scale-110 active:scale-90
        `,
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/10 group-hover:to-rose-500/0 transition-all duration-500" />
      <X className="h-4 w-4 text-muted-foreground/70 transition-all duration-300 group-hover:text-rose-500 group-hover:rotate-90" />
    </button>
  );
};
