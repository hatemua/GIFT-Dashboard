import { Input } from "@/components/ui/input";
import { Search, Calendar, ChevronDown, X } from "lucide-react";

import { useState } from "react";
import { cn, getDateRange } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DATE_OPTIONS } from "@/constants/filters";
import { useBlocks } from "@/hooks/useBlocks";

const BlocksFilters = () => {
  const { setFilters } = useBlocks();

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<"24h" | "7d" | "30d">("24h");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters({
      search: value || undefined,
    });
  };

  const handleDateChange = (value: "24h" | "7d" | "30d") => {
    setDateRange(value);
    setFilters(getDateRange(value));
  };

  const handleClearFilters = () => {
    setSearch("");
    setDateRange("24h");

    setFilters({
      search: undefined,
      ...getDateRange("24h"),
    });
  };

  const hasActiveFilters = search !== "" || dateRange !== "24h";

  return (
    <div className="mb-3 rounded-xl border border-border/60 bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[260px]">
          <Input
            icon={
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            }
            placeholder="Search by hash, block number"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-10 pl-9"
          />
        </div>

        {/* Date dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              role="button"
              tabIndex={0}
              className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              {DATE_OPTIONS.find((d) => d.value === dateRange)?.label}
              <ChevronDown className="h-4 w-4 opacity-60" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            {DATE_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  handleDateChange(option.value as "24h" | "7d" | "30d")
                }
                className={cn(dateRange === option.value && "font-medium")}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="
      group relative
      h-9 w-9
      inline-flex items-center justify-center
      rounded-md
      overflow-hidden
      bg-white
      hover:bg-rose-50 dark:hover:bg-rose-950/30
      border border-muted/30
      hover:border-rose-200 dark:hover:border-rose-800
      transition-all duration-300
      hover:scale-110 active:scale-90
    "
            title="Clear filters"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/10 group-hover:to-rose-500/0 transition-all duration-500" />
            <X className="h-4 w-4 text-muted-foreground/70 transition-all duration-300 group-hover:text-rose-500 group-hover:rotate-90" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlocksFilters;
