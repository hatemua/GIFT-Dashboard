"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastProps {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  onClose: (id: string) => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-green-500 bg-green-50 text-green-800",
  error: "border-red-500 bg-red-50 text-red-800",
  info: "border-blue-500 bg-blue-50 text-blue-800",
  warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
};

export function Toast({
  id,
  title,
  message,
  variant = "info",
  onClose,
}: ToastProps) {
  return (
    <div
      className={cn(
        "pointer-events-auto w-96 rounded-lg border shadow-lg p-4 flex gap-3",
        variantStyles[variant]
      )}
    >
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>

      <button
        onClick={() => onClose(id)}
        className="opacity-70 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
