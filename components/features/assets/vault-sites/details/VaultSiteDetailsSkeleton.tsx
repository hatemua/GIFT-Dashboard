"use client";

export function VaultSiteDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-200 rounded" />
            <div className="h-3 w-32 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="h-8 w-28 bg-slate-200 rounded-lg" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-slate-200 rounded-lg" />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Site Information */}
        <div className="lg:col-span-2 space-y-4">
          <SkeletonCard>
            <div className="h-5 w-40 bg-slate-200 rounded mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-md border border-slate-200"
                >
                  <div className="h-8 w-8 bg-slate-200 rounded-md" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 w-24 bg-slate-200 rounded" />
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-200 space-y-3"
                >
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                  <div className="h-6 w-16 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* Storage Overview */}
        <SkeletonCard>
          <div className="h-4 w-36 bg-slate-200 rounded mb-4" />

          <div className="space-y-3">
            <div className="h-3 w-full bg-slate-200 rounded" />
            <div className="h-2 w-full bg-slate-200 rounded" />

            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 w-24 bg-slate-200 rounded" />
                <div className="h-3 w-16 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <SkeletonCard className="h-32" />
        <SkeletonCard className="h-32" />
      </div>
    </div>
  );
}

/* Small reusable card wrapper */
function SkeletonCard({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
}
