"use client";

import * as React from "react";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import clsx from "clsx";

interface DropdownContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used inside DropdownMenu");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                  Root                                      */
/* -------------------------------------------------------------------------- */

export function DropdownMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Trigger                                    */
/* -------------------------------------------------------------------------- */

export function DropdownMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDropdown();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={clsx(
        "inline-flex items-center justify-center",
        className
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Content                                    */
/* -------------------------------------------------------------------------- */

export function DropdownMenuContent({
  children,
  className,
  align = "end",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
}) {
  const { open } = useDropdown();

  if (!open) return null;

  return (
    <div
      className={clsx(
        "absolute z-50 mt-2 min-w-[160px] rounded-lg border border-slate-200 bg-white shadow-lg",
        align === "start" ? "left-0" : "right-0",
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Item                                      */
/* -------------------------------------------------------------------------- */

export function DropdownMenuItem({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const { setOpen } = useDropdown();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={clsx(
        "w-full text-left px-3 py-2 text-sm rounded-md",
        "hover:bg-slate-100 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
