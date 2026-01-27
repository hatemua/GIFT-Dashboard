import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page?: number;
  offset?: number;
  limit: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({
  page,
  offset,
  limit,
  total,
  onPrev,
  onNext,
}: PaginationProps) {
  const currentPage =
    page !== undefined
      ? page
      : offset !== undefined
        ? Math.floor(offset / limit) + 1
        : 1;

  const totalPages = Math.ceil(total / limit);

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
          size="icon"
          variant="ghost"
          onClick={onPrev}
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
          size="icon"
          variant="ghost"
          onClick={onNext}
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
