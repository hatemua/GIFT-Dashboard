import React from "react";
import { Card } from "@/components/ui/card";

export function VaultSkeleton() {
  return (
    <Card className="p-6 rounded-2xl border border-slate-200 shadow-md bg-gradient-to-b from-white to-slate-50/30 space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-24 bg-slate-200 rounded" />
      </div>

      {/* Capacity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="h-28 rounded-xl border border-slate-200 bg-white p-4">
            <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
            <div className="h-6 w-16 bg-slate-200 rounded mb-1" />
            <div className="h-8 w-12 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Utilization Bar */}
      <div className="space-y-2">
        <div className="h-4 w-40 bg-slate-200 rounded" />
        <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full w-1/2 bg-slate-300" />
        </div>
      </div>

      {/* Metadata / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-200" />
              <div className="space-y-1">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-3 w-24 bg-slate-200 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, idx2) => (
                <div key={idx2} className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Assets Section */}
      <div className="pt-6 border-t border-slate-200">
        <div className="h-6 w-32 bg-slate-200 rounded mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-24 rounded-lg border border-slate-200 bg-white p-3" />
          ))}
        </div>
      </div>
    </Card>
  );
}
