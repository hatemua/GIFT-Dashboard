import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({
  offset,
  limit,
  total,
  onPrev,
  onNext,
}: PaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      {/* Previous */}
      <Button
        size="icon"
        variant="outline"
        onClick={onPrev}
        disabled={currentPage === 1}
        className="h-9 w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page indicator */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="rounded-md bg-gold-50 px-3 py-1 text-gold-700">
          {currentPage}
        </span>
        <span className="text-slate-400">/</span>
        <span className="text-slate-500">{totalPages}</span>
      </div>

      {/* Next */}
      <Button
        size="icon"
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="h-9 w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
