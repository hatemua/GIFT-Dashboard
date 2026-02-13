"use client";

import { Card, CardHeader } from "@/components/ui/card";

const SearchResultSkeleton = () => (
  <Card className="rounded-xl border border-muted/10 bg-white/50 backdrop-blur-sm overflow-hidden relative">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    <CardHeader className="p-4 flex items-start gap-3">
      <div className="p-2.5 rounded-xl bg-muted/20 flex-shrink-0">
        <div className="h-4 w-4 rounded bg-muted/30" />
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-muted/30 rounded-full" />
          <div className="h-3 w-20 bg-muted/20 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-muted/20 rounded-full" />
          <div className="h-5 w-20 bg-muted/20 rounded-full" />
          <div className="h-5 w-24 bg-muted/20 rounded-full" />
        </div>
      </div>
    </CardHeader>
  </Card>
);

export const SearchSkeleton = () => {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <SearchResultSkeleton key={i} />
      ))}
    </div>
  );
};
