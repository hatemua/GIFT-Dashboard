"use client";

import React from "react";

export default function AccountsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-slate-50 rounded-xl shadow-sm p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-slate-200 rounded" />
              <div className="h-5 w-24 bg-slate-200 rounded" />
            </div>
            <div className="h-5 w-16 bg-slate-200 rounded" />
          </div>

          {/* IGAN */}
          <div className="flex justify-between items-center p-2 bg-slate-200 rounded-lg">
            <div className="h-3 w-16 bg-slate-300 rounded" />
            <div className="h-4 w-20 bg-slate-300 rounded" />
          </div>

          {/* Purpose */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-300 rounded" />
          </div>

          {/* Member */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-300 rounded" />
          </div>

          {/* Vault */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-300 rounded" />
          </div>

          {/* Created At */}
          <div className="pt-2 border-t border-slate-200">
            <div className="h-3 w-32 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
