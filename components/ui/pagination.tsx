import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page?: number;
  offset?: number;
  limit: number;
  total: number;
  setPage?: (page: number) => void;
  setOffset?: (offset: number) => void;
}

export function Pagination({
  page,
  offset,
  limit,
  total,
  setPage,
  setOffset,
}: PaginationProps) {
  const currentPage =
    page !== undefined
      ? page
      : offset !== undefined
        ? Math.floor(offset / limit) + 1
        : 1;

  const totalPages = Math.ceil(total / limit);

  const handleNextPage = () => {
    if (page !== undefined && page < totalPages && setPage) {
      setPage(page + 1);
    } else if (offset !== undefined && offset + limit < total && setOffset) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (page !== undefined && page > 1 && setPage) {
      setPage(page - 1);
    } else if (offset !== undefined && offset - limit >= 0 && setOffset) {
      setOffset(offset - limit);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex justify-center">
      <div
        className="
          flex items-center gap-3
        "
      >
        {/* Previous */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="
            h-9 w-9 rounded-xl
            border border-slate-200
            text-slate-600
            hover:bg-gold-50 hover:text-gold-700 hover:border-gold-400
            disabled:text-slate-300 disabled:border-slate-100
          "
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page indicator */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span
            className="
              min-w-[36px] text-center
              rounded-xl bg-gold-500 px-3 py-1
              text-white shadow-sm
            "
          >
            {currentPage}
          </span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">{totalPages}</span>
        </div>

        {/* Next */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="
            h-9 w-9 rounded-xl
            border border-slate-200
            text-slate-600
            hover:bg-gold-50 hover:text-gold-700 hover:border-gold-400
            disabled:text-slate-300 disabled:border-slate-100
          "
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
