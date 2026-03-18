import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page?: number;
  offset?: number;
  limit: number;
  total: number;
  setPage?: (page: number) => void;
  setOffset?: (offset: number) => void;
  size?: "sm" | "md";
  variant?: "default" | "simple";
}

export function Pagination({
  page,
  offset,
  limit,
  total,
  setPage,
  setOffset,
  size = "md",
  variant = "default",
}: PaginationProps) {
  const currentPage =
    page !== undefined
      ? page
      : offset !== undefined
        ? Math.floor(offset / limit) + 1
        : 1;

  const totalPages = Math.ceil(total / limit);

  const goToPage = (targetPage: number) => {
    const bounded = Math.min(Math.max(1, targetPage), totalPages);
    if (page !== undefined && setPage) {
      setPage(bounded);
    } else if (offset !== undefined && setOffset) {
      setOffset((bounded - 1) * limit);
    }
  };

  const handleNextPage = () => goToPage(currentPage + 1);
  const handlePrevPage = () => goToPage(currentPage - 1);
  const handleFastNext = () => goToPage(currentPage + 10);
  const handleFastPrev = () => goToPage(currentPage - 10);

  if (totalPages <= 1) return null;

  // Size-based styles
  const buttonClasses =
    size === "sm"
      ? "h-7 w-7 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-gold-50 hover:text-gold-700 hover:border-gold-400 disabled:text-slate-300 disabled:border-slate-100"
      : "h-9 w-9 text-base rounded-xl border border-slate-200 text-slate-600 hover:bg-gold-50 hover:text-gold-700 hover:border-gold-400 disabled:text-slate-300 disabled:border-slate-100";

  const pageIndicatorClasses =
    size === "sm"
      ? "min-w-[28px] text-center rounded-lg bg-gold-500 px-2 py-0.5 text-white text-sm shadow-sm"
      : "min-w-[36px] text-center rounded-xl bg-gold-500 px-3 py-1 text-white shadow-sm";

  return (
    <div className={cn("flex justify-center", variant === "default" && "mt-4")}>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Fast Previous */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleFastPrev}
          disabled={currentPage <= 1}
          className={buttonClasses}
        >
          <ChevronsLeft className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        </Button>

        {/* Previous */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={buttonClasses}
        >
          <ChevronLeft className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        </Button>

        {/* Page indicator (default variant only) */}
        {variant === "default" && (
          <div className="flex items-center gap-1 sm:gap-2 font-medium">
            <span className={pageIndicatorClasses}>{currentPage}</span>
            <span
              className={
                size === "sm" ? "text-slate-400 text-sm" : "text-slate-400"
              }
            >
              /
            </span>
            <span
              className={
                size === "sm" ? "text-slate-500 text-sm" : "text-slate-500"
              }
            >
              {totalPages}
            </span>
          </div>
        )}

        {/* Next */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={buttonClasses}
        >
          <ChevronRight className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        </Button>

        {/* Fast Next */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleFastNext}
          disabled={currentPage >= totalPages}
          className={buttonClasses}
        >
          <ChevronsRight className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        </Button>
      </div>
    </div>
  );
}
