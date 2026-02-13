"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useSearchStore } from "@/store/searchStore";
import { Pagination } from "@/components/ui/pagination";
import {
  Search,
  Loader2,
  FileText,
  Users,
  Hash,
  Clock,
  X,
  ArrowRight,
  FileSearch,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Skeleton Components
const SearchResultSkeleton = () => (
  <Card className="rounded-xl border border-muted/30 bg-gradient-to-br from-white to-muted/5 animate-pulse">
    <CardHeader className="p-4 flex items-start gap-4">
      <div className="p-2 rounded-lg bg-muted/20 flex-shrink-0">
        <div className="h-5 w-5 rounded bg-muted/30" />
      </div>
      
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-32 bg-muted/30 rounded-full" />
          <div className="h-4 w-12 bg-muted/20 rounded-full" />
        </div>
        
        <div className="h-3 w-48 bg-muted/20 rounded-full" />
        
        <div className="flex items-center gap-3">
          <div className="h-3 w-20 bg-muted/20 rounded-full" />
        </div>
      </div>
      
      <div className="h-5 w-5 rounded-full bg-muted/20" />
    </CardHeader>
  </Card>
);

const ResultsSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <SearchResultSkeleton key={i} />
    ))}
  </div>
);

export const GlobalSearchModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const {
    query,
    setQuery,
    results,
    loading,
    reset,
    page,
    limit,
    total,
    setPage,
  } = useSearchStore();

  const handleClose = () => {
    onClose();
    reset();
  };

  const getIcon = (type: string) => {
    const sizeClass = "h-5 w-5";
    switch (type) {
      case "asset":
        return <FileText className={sizeClass} />;
      case "transaction":
        return <Hash className={sizeClass} />;
      case "member":
        return <Users className={sizeClass} />;
      default:
        return <FileText className={sizeClass} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "asset":
        return "bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 border-blue-200/50";
      case "transaction":
        return "bg-gradient-to-br from-purple-50 to-purple-100/50 text-purple-600 border-purple-200/50";
      case "member":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-600 border-emerald-200/50";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100/50 text-gray-600 border-gray-200/50";
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Global Search"
    >
      <div className="space-y-6">
        {/* Search Input with soft design */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary/70 h-5 w-5 transition-colors" />
          <Input
            placeholder="Search assets, transactions, members..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-xl bg-gradient-to-br from-muted/10 to-muted/5 border border-muted/30 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/30 transition-all placeholder:text-muted-foreground/40"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors bg-background/80 rounded-full p-1 backdrop-blur-xs"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results with soft loading states */}
        <div className="min-h-[300px]">
          {loading ? (
            <div className="space-y-4">
              {/* Soft loading header */}
              <div className="flex items-center justify-between mb-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-24 bg-muted/20 rounded-full" />
                  <div className="h-3 w-16 bg-muted/10 rounded-full" />
                </div>
                <div className="h-3 w-16 bg-muted/20 rounded-full" />
              </div>
              
              {/* Skeleton results */}
              <ResultsSkeleton />
            </div>
          ) : results.length === 0 ? (
            query ? (
              <div className="flex flex-col items-center justify-center h-[300px] gap-4 bg-gradient-to-b from-muted/5 to-transparent rounded-2xl p-8">
                <div className="rounded-full bg-gradient-to-br from-muted/20 to-muted/10 p-6">
                  <FileSearch className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground/70">
                    No results for "<span className="font-medium text-foreground/80">{query}</span>"
                  </p>
                  <p className="text-xs text-muted-foreground/40 max-w-[200px]">
                    Try different keywords or check your spelling
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] gap-4 bg-gradient-to-b from-muted/5 to-transparent rounded-2xl p-8">
                <div className="rounded-full bg-gradient-to-br from-muted/20 to-muted/10 p-6">
                  <Search className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground/70">
                    Start typing to search...
                  </p>
                  <p className="text-xs text-muted-foreground/40 max-w-[200px]">
                    Search across assets, transactions, and members
                  </p>
                </div>
              </div>
            )
          ) : (
            <>
              {/* Results Header with soft design */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground/70 bg-muted/10 px-2 py-1 rounded-full">
                    Found {total} result{total !== 1 ? "s" : ""}
                  </span>
                  <Badge 
                    variant="outline" 
                    className="text-[10px] px-2 py-0.5 border-muted/20 bg-muted/5 text-muted-foreground/60"
                  >
                    Page {page} of {Math.ceil(total / limit)}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground/40">
                  {results.length} shown
                </span>
              </div>

              {/* Results List with soft cards */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-muted/20 scrollbar-track-transparent">
                {results.map((item, index) => (
                  <Link
                    key={`${item.type}-${item.id}-${index}`}
                    href={`/${item.type}s/${item.id}`}
                    className="block group"
                    onClick={handleClose}
                  >
                    <Card
                      className={cn(
                        "transition-all duration-300 rounded-xl border border-muted/20",
                        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                        "group-hover:translate-x-0.5 bg-gradient-to-br from-white to-muted/5",
                        "backdrop-blur-xs"
                      )}
                    >
                      <CardHeader className="p-4 flex items-start gap-4">
                        {/* Icon with soft gradient */}
                        <div
                          className={cn(
                            "p-2.5 rounded-xl border flex-shrink-0 shadow-sm",
                            getTypeColor(item.type)
                          )}
                        >
                          {getIcon(item.type)}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <CardTitle className="text-sm font-medium truncate text-foreground/90">
                              {item.name}
                            </CardTitle>
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 h-5 capitalize bg-muted/10 text-muted-foreground/70 border-muted/20 font-normal"
                            >
                              {item.type}
                            </Badge>
                          </div>

                          {item.extra && (
                            <p className="text-xs text-muted-foreground/60 line-clamp-1 mb-2">
                              {item.extra}
                            </p>
                          )}

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              ID: {item.id.slice(0, 8)}...
                            </span>
                          </div>
                        </div>

                        {/* Arrow with soft animation */}
                        <div className="flex-shrink-0">
                          <ArrowRight className="h-5 w-5 text-muted-foreground/20 group-hover:text-primary/40 transition-all group-hover:translate-x-1 group-hover:scale-110" />
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination with soft design */}
              {total > limit && (
                <div className="mt-5 pt-4 border-t border-muted/10">
                  <Pagination 
                    page={page} 
                    limit={limit} 
                    total={total} 
                    setPage={setPage} 
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};