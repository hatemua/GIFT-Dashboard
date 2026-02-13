"use client";

import { Input } from "@/components/ui/input";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn, getDateRange } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DATE_OPTIONS } from "@/constants/filters";
import { ASSET_STATUS_OPTIONS, AssetStatus } from "@/constants/assets";
import { useAsset } from "@/hooks/useAsset";

interface AssetsFiltersProps {
  filterByStatus?: boolean;
}

const AssetsFilters: React.FC<AssetsFiltersProps> = ({ filterByStatus }) => {
  const { setFilters } = useAsset();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AssetStatus>("all");
  const [dateRange, setDateRange] = useState<
    "24h" | "7d" | "30d" | "today" | "yesterday" | "this_month" | "this_year"
  >("24h");

  const selectedStatus = ASSET_STATUS_OPTIONS.find((s) => s.value === status);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters({
      search: value || undefined,
    });
  };

  const handleStatusChange = (value: AssetStatus) => {
    setStatus(value);
    setFilters({
      status: value === "all" ? undefined : value,
    });
  };

  const handleDateChange = (value: "24h" | "7d" | "30d") => {
    setDateRange(value);
    setFilters(getDateRange(value));
  };

  return (
    <div className="mb-3 rounded-xl border border-border/60 bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[260px]">
          <Input
            icon={
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            }
            placeholder="Search by Token ID, Owner, Serial Number or Product Type…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-10 pl-9"
          />
        </div>

        {/* Status dropdown */}
        {filterByStatus && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                role="button"
                tabIndex={0}
                className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-border bg-background hover:bg-muted cursor-pointer"
              >
                {selectedStatus?.icon && (
                  <selectedStatus.icon
                    className={cn("h-4 w-4", selectedStatus.color)}
                  />
                )}
                <span className="text-sm font-medium">
                  {selectedStatus?.label}
                </span>
                <ChevronDown className="h-4 w-4 opacity-60" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              {ASSET_STATUS_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={cn(
                      "flex items-center gap-2",
                      status === option.value && "font-medium",
                    )}
                  >
                    {Icon && <Icon className={cn("h-4 w-4", option.color)} />}
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Date dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              role="button"
              tabIndex={0}
              className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-border bg-background hover:bg-muted cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {DATE_OPTIONS.find((d) => d.value === dateRange)?.label}
              </span>
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
      </div>
    </div>
  );
};

export default AssetsFilters;
