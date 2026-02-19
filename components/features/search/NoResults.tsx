"use client";

import { useSearchStore } from "@/store/searchStore";
import { Search } from "lucide-react";

export const NoResults = () => {
  const { query } = useSearchStore();

  return (
    <div className="flex flex-col items-center justify-center h-[320px] gap-5 rounded-3xl border border-dashed border-slate-200 bg-slate-50">
      {/* Icon Section */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 rounded-full bg-primary/10 blur-2xl opacity-60" />
        <Search className="h-7 w-7 text-gray-400" />
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
