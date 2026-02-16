"use client";

const SearchResultSkeleton = () => (
  <div className="relative overflow-hidden rounded-lg border border-muted/10 bg-white/80 backdrop-blur-sm animate-pulse p-3">
    {/* Shimmer overlay */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

    <div className="flex items-start gap-2.5 relative z-10">
      {/* Icon placeholder */}
      <div className="flex-shrink-0 p-2 rounded-lg border bg-muted/20 h-8 w-8" />

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Primary Row - title + badge + date */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div className="h-3 w-28 bg-muted/30 rounded-full" />
            <div className="h-4 w-14 bg-muted/20 rounded-full" />
          </div>
          <div className="h-2.5 w-12 bg-muted/20 rounded-full" />
        </div>

        {/* Secondary Info - badges/chips */}
        <div className="flex flex-wrap items-center gap-1">
          <div className="h-4 w-16 bg-muted/20 rounded-full" />
          <div className="h-4 w-20 bg-muted/20 rounded-full" />
          <div className="h-4 w-14 bg-muted/20 rounded-full" />
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-muted/20 rounded-full" />
            <div className="h-2 w-14 bg-muted/20 rounded-full" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-muted/20 rounded-full" />
            <div className="h-2 w-12 bg-muted/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Arrow placeholder */}
      <div className="flex-shrink-0 h-3.5 w-3.5 bg-muted/20 rounded-full" />
    </div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="space-y-2">
    {[...Array(3)].map((_, i) => (
      <SearchResultSkeleton key={i} />
    ))}
  </div>
);
