"use client";

import { useSearchStore } from "@/store/searchStore";
import { Search } from "lucide-react";

export const NoResults = () => {
  const { query } = useSearchStore();

  return (
    <div className="flex flex-col items-center justify-center h-[320px] gap-5 rounded-3xl bg-gradient-to-b from-muted/10 via-background/40 to-transparent backdrop-blur-sm border border-border/40 shadow-sm">
      {/* Icon Section */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 rounded-full bg-primary/10 blur-2xl opacity-60" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 border border-border/30 backdrop-blur-md">
          <Search className="h-7 w-7 text-primary/60" />
        </div>
      </div>

      {/* Content */}
      {query ? (
        <div className="flex flex-col items-center gap-2 text-center px-6">
          <p className="text-sm text-muted-foreground/80">
            No results found for{" "}
            <span className="font-medium text-foreground">"{query}"</span>
          </p>

          <p className="text-xs text-muted-foreground/50 max-w-xs leading-relaxed">
            Try adjusting your search or using different keywords
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center px-6">
          <p className="text-sm text-muted-foreground/80">
            Start typing to search
          </p>

          <p className="text-xs text-muted-foreground/50 max-w-xs leading-relaxed">
            Search across members, gold assets, and transactions
          </p>
        </div>
      )}
    </div>
  );
};
