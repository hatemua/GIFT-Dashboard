import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  ChevronDown,
  ArrowLeftRight,
  CheckCircle2,
  RefreshCw,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { cn, getDateRange } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DATE_OPTIONS } from "@/constants/filters";
import { useTransaction } from "@/hooks/useTransaction";
import {
  TRANSACTION_STATUS_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/constants/transactionOrders";

const TransactionOrdersFilters = () => {
  const { setFilters } = useTransaction();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [dateRange, setDateRange] = useState<any>("24h");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters({ search: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setFilters({ status: value || undefined });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    setFilters({ type: value || undefined });
  };

  const handleDateChange = (value: any) => {
    setDateRange(value);
    setFilters(getDateRange(value));
  };

  // Helper to get icon component
  const renderIcon = (icon: typeof ArrowLeftRight | undefined) => {
    if (!icon) return null;
    const Icon = icon;
    return <Icon className="h-4 w-4 text-slate-500" />;
  };

  const selectedType = TRANSACTION_TYPE_OPTIONS.find((t) => t.value === type);
  const selectedStatus = TRANSACTION_STATUS_OPTIONS.find(
    (s) => s.value === status,
  );

  return (
    <div className="mb-3 rounded-xl border border-border/60 bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <Input
            icon={
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            }
            placeholder="Search by Reference"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>

        {/* Type dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="h-9 px-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-sm">
              {renderIcon(selectedType?.icon) || (
                <ArrowLeftRight className="h-4 w-4 text-slate-500" />
              )}
              <span>Type:</span>
              <span className="font-medium">
                {selectedType?.label || "All Types"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 text-sm">
            {TRANSACTION_TYPE_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleTypeChange(option.value)}
                className={cn(
                  "flex gap-2",
                  type === option.value && "font-medium",
                )}
              >
                {renderIcon(option.icon) || (
                  <ArrowLeftRight className="h-4 w-4 text-slate-500" />
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="h-9 px-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-sm">
              {renderIcon(selectedStatus?.icon) || (
                <CheckCircle2 className="h-4 w-4 text-slate-500" />
              )}
              <span>Status:</span>
              <span className="font-medium">
                {selectedStatus?.label || "All Statuses"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52 text-sm">
            {TRANSACTION_STATUS_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={cn(
                  "flex gap-2",
                  status === option.value && "font-medium",
                )}
              >
                {renderIcon(option.icon) || (
                  <CheckCircle2 className="h-4 w-4 text-slate-500" />
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="h-9 px-2 flex items-center gap-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-sm">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="font-medium">
                {DATE_OPTIONS.find((d) => d.value === dateRange)?.label}
              </span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40 text-sm">
            {DATE_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleDateChange(option.value)}
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

export default TransactionOrdersFilters;