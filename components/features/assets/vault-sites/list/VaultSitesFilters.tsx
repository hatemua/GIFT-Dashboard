import { Input } from "@/components/ui/input";
import { Search, Calendar, ChevronDown } from "lucide-react";

import { useMemo, useState } from "react";
import { cn, getDateRange } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DATE_OPTIONS } from "@/constants/filters";
import { useVaultSite } from "@/hooks/useVaultSite";
import { DateRange } from "@/types";
import { ClearFiltersButton } from "@/components/features/common/ClearFiltersButton";

const VaultSitesFilters = () => {
  const { setFilters } = useVaultSite();

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters({ search: value || undefined });
  };

  const handleDateChange = (value: DateRange) => {
    setDateRange(value);
    setFilters(getDateRange(value));
  };

  const hasActiveFilters = useMemo(() => {
    return search !== "" || dateRange !== "all";
  }, [search, dateRange]);

  const handleClearFilters = () => {
    setSearch("");
    setDateRange("all");

    setFilters({
      search: undefined,
      ...getDateRange("all"),
    });
  };

  return (
    <div className="mb-3 roundaed-xl border border-border/60 bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[260px]">
          <Input
            icon={
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            }
            // type="search"
            placeholder="Search by ID, Name or Member GIC"
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
                onClick={() => handleDateChange(option.value as DateRange)}
                className={cn(dateRange === option.value && "font-medium")}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Clear Filters */}
        {hasActiveFilters && (
          <ClearFiltersButton onClick={handleClearFilters} />
        )}
      </div>
    </div>
  );
};

export default VaultSitesFilters;
