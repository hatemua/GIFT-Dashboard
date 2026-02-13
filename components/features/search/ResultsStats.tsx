"use client";

import { useSearchStore } from "@/store/searchStore";
import { Badge } from "@/components/ui/badge";

export const ResultsStats = () => {
  const {
    results,
    page,
    limit,
    total,
  } = useSearchStore();

  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground/60 bg-muted/10 px-2 py-1 rounded-full">
          {total} result{total !== 1 ? "s" : ""}
        </span>
        <Badge
          variant="outline"
          className="text-[10px] px-2 py-0.5 border-muted/20 bg-muted/5 text-muted-foreground/50"
        >
          Page {page} of {Math.ceil(total / limit)}
        </Badge>
      </div>
      <span className="text-xs text-muted-foreground/40">
        Showing {results.length}
      </span>
    </div>
  );
};
