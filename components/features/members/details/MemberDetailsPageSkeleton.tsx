import React from "react";

export function MemberDetailsPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="relative bg-slate-100 rounded-2xl h-48 w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Tabs List */}
        <div className="flex space-x-2 bg-slate-100/50 p-2 rounded-xl w-fit mx-4 mt-4">
          <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
          <div className="h-8 w-28 bg-slate-200 rounded-lg"></div>
        </div>

        {/* Tabs Content */}
        <div className="p-6 space-y-4">
          {/* Details Skeleton Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 p-4 bg-slate-100 rounded-lg h-20"
              >
                <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                <div className="h-5 w-full bg-slate-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* Roles Skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-slate-200 rounded-full"
              ></div>
            ))}
          </div>

          {/* Timeline Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-16 bg-slate-200 rounded"></div>
                  <div className="h-4 w-24 bg-slate-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-slate-100 rounded-2xl p-4 flex flex-col justify-between"
          >
            <div className="h-4 w-16 bg-slate-200 rounded"></div>
            <div className="h-6 w-12 bg-slate-300 rounded mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
