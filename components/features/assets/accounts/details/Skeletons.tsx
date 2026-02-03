
"use client";
import RealSkeleton from "@/components/ui/real-skeleton";

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-xl bg-card border border-gray-100 p-5 shadow-xs animate-pulse"
      >
        {/* Top badge + icon placeholder */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-gray-200" />
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>

        {/* Label */}
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-1" />

        {/* Value */}
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />

        {/* Footer placeholder */}
        <div className="h-3 w-full bg-gray-200 rounded mt-2" />
        <div className="h-3 w-2/3 bg-gray-200 rounded mt-1" />
      </div>
    ))}
  </div>
);

export const AccountDetailsSkeleton = () => (
  <div className="border border-gray-100 rounded-xl shadow-sm p-5 animate-pulse bg-card">
    {/* Card header */}
    <div className="flex items-center gap-2 pb-3 mb-3 border-b">
      <div className="h-6 w-6 rounded-md bg-gray-200" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>

    {/* Key Identifiers */}
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded" /> {/* icon */}
            <div className="h-4 w-20 bg-gray-200 rounded" /> {/* label */}
          </div>
          <div className="h-4 w-24 bg-gray-300 rounded" /> {/* value */}
        </div>
      ))}
    </div>

    {/* Purpose Badge */}
    <div className="pt-3 border-t mt-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 rounded" /> {/* icon */}
        <div className="h-4 w-32 bg-gray-200 rounded" /> {/* label */}
      </div>
      <div className="h-4 w-20 bg-gray-300 rounded" /> {/* badge */}
    </div>

    {/* Timeline */}
    <div className="pt-2 border-t mt-3 space-y-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 bg-gray-200 rounded" /> {/* icon */}
            <div className="h-4 w-24 bg-gray-200 rounded" /> {/* label */}
          </div>
          <div className="h-4 w-20 bg-gray-300 rounded" /> {/* value */}
        </div>
      ))}
    </div>
  </div>
);

export const ValuationAnalysisSkeleton = () => (
  <div className="border border-gray-100 rounded-xl shadow-none p-5 animate-pulse bg-card">
    {/* Header */}
    <div className="flex items-center justify-between pb-3 mb-4 border-b">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-gray-200" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      <div className="h-3 w-20 bg-gray-200 rounded" />
    </div>

    {/* Rate Comparison */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-gray-100 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-md bg-gray-200" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-20 bg-gray-300 rounded" /> {/* value */}
          <div className="h-3 w-16 bg-gray-200 rounded" /> {/* subtext */}
        </div>
      ))}
    </div>

    {/* Value Breakdown */}
    <div className="space-y-3 mb-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-100">
          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-200 rounded" /> {/* label */}
            <div className="h-3 w-20 bg-gray-200 rounded" /> {/* subtext */}
          </div>
          <div className="h-5 w-20 bg-gray-300 rounded" /> {/* value */}
        </div>
      ))}
    </div>

    {/* Additional Metrics */}
    <div className="pt-3 border-t grid grid-cols-2 gap-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="text-center p-3 rounded-lg bg-gray-100 space-y-1">
          <div className="h-3 w-16 bg-gray-200 rounded mx-auto" /> {/* label */}
          <div className="h-5 w-20 bg-gray-300 rounded mx-auto" /> {/* value */}
        </div>
      ))}
    </div>
  </div>
);

