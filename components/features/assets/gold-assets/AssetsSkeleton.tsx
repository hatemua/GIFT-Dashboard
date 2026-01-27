"use client";

export function AssetsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border border-slate-200 rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="h-40 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 flex items-center justify-center"></div>

          {/* Card content */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div> {/* Serial */}
            <div className="h-3 bg-slate-200 rounded w-2/3"></div> {/* Refiner */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-3 bg-slate-200 rounded w-full"></div> {/* Weight */}
              <div className="h-3 bg-slate-200 rounded w-full"></div> {/* Fineness */}
            </div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div> {/* GIC */}
            <div className="h-3 bg-slate-200 rounded w-1/3"></div> {/* Manufacture Date */}
          </div>
        </div>
      ))}
    </div>
  );
}
