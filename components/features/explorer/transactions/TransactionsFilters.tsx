import { Input } from "@/components/ui/input";
import {
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronDown,
} from "lucide-react";

import { useBlockchainTransactions } from "@/hooks/useBlockchainTransaction";
import { useState } from "react";
import { cn, getDateRange } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DATE_OPTIONS } from "@/constants/filters";
import { STATUS_OPTIONS } from "@/constants/transactions";

const TransactionsFilters = () => {
  const { setFilters } = useBlockchainTransactions();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "success" | "failed">("all");
  const [dateRange, setDateRange] = useState<"24h" | "7d" | "30d">("24h");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters({
      search: value || undefined,
    });
  };

  const handleStatusChange = (value: "all" | "success" | "failed") => {
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
            // type="search"
            placeholder="Search by hash, from, to, block…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-10 pl-9"
          />
        </div>

        {/* Status dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              role="button"
              tabIndex={0}
              className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
            >
              {status === "success" && (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              )}
              {status === "failed" && (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
              Status:
              <span className="font-medium capitalize">{status}</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            {STATUS_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  handleStatusChange(
                    option.value as "all" | "success" | "failed",
                  )
                }
                className={cn(
                  "flex items-center gap-2",
                  status === option.value && "font-medium",
                )}
              >
                {option.value === "success" && (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                )}
                {option.value === "failed" && (
                  <XCircle className="h-4 w-4 text-rose-500" />
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
      </div>
    </div>
  );
};

export default TransactionsFilters;