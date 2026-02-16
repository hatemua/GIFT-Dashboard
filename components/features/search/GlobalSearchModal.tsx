"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/searchStore";
import { Pagination } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { SearchSkeleton } from "./SearchSkeleton";
import { NoResults } from "./NoResults";
import { ResultsStats } from "./ResultsStats";
import { SearchResultCard } from "./SearchResultCard";

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

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={"Global Search"}
      size="lg"
    >
      <div className="space-y-5">
        {/* Modern Search Input */}
        <Input
          icon={
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          }
          placeholder="Search members, assets, transactions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 pl-9"
          autoFocus
        />

        {/* Results Section */}
        <div className="min-h-[300px]">
          {loading ? (
            <SearchSkeleton />
          ) : results.length === 0 ? (
            <NoResults />
          ) : (
            <>
              {/* Results Stats */}
              <ResultsStats />

              {/* Results List */}
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-muted/20 scrollbar-track-transparent">
                {results.map((item, index) => (
                  <SearchResultCard
                    key={`${item.source_type}-${index}`}
                    item={item}
                    onClick={handleClose}
                  />
                ))}
                              {total > limit && (
                  <Pagination
                    page={page}
                    limit={limit}
                    total={total}
                    setPage={setPage}
                    size="sm"
                  />
              )}
              </div>

            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
