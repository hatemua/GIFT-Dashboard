"use client";

import { useSearchStore } from "@/store/searchStore";
import { Pagination } from "@/components/ui/pagination";

export const ResultsStats = () => {
  const { page, limit, total, setPage } = useSearchStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 mb-2">
      {/* Left: stats */}
      <div className="flex items-center text-xs text-gray-500 text-muted-foreground">
        {total > 0 ? (
          <>
            Showing{" "}
            <span className="mx-1 font-medium text-foreground">
              {(page - 1) * limit + 1}–{Math.min(page * limit, total)}
            </span>{" "}
            of <span className="mx-1 font-medium text-foreground">{total}</span>{" "}
            results
          </>
        ) : (
          <span>No results found</span>
        )}
      </div>

      {/* Right: pagination */}
      {total > limit && (
        <div className="flex items-center">
          <Pagination
            page={page}
            limit={limit}
            total={total}
            setPage={setPage}
            size="sm"
            variant="simple"
          />
        </div>
      )}
    </div>
  );
};
