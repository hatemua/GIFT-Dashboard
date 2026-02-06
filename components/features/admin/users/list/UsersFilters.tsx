import { Input } from "@/components/ui/input";
import {
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronDown,
  MinusCircle,
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
import { USER_STATUS_OPTIONS } from "@/constants/user";
import { UserStatus } from "@/types/user";
import { useUser } from "@/hooks/useUser";

/* ---------------------------------------
 * Status icons mapping
 * ------------------------------------- */
export const STATUS_ICONS: Record<UserStatus, React.ReactNode> = {
  active: <CheckCircle className="h-4 w-4 text-emerald-500" />,
  inactive: <XCircle className="h-4 w-4 text-rose-500" />,
};

const UsersFilters = () => {
  const { setFilters } = useUser();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus | "">("");
  const [dateRange, setDateRange] = useState<
    "24h" | "7d" | "30d" | "today" | "yesterday" | "this_month" | "this_year"
  >("24h");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilters({
      search: value || undefined,
    });
  };

  const handleStatusChange = (value: UserStatus | "") => {
    setStatus(value);
    setFilters({
      status: value === "" ? undefined : value,
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
            placeholder="Search by User ID or Member GIC"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-10 pl-9"
          />
          </div>

        {/* Status filter */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              role="button"
              tabIndex={0}
              className="h-10 px-3 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
            >
              Status:
              {status && STATUS_ICONS[status]}
              <span className="font-medium">
                {status
                  ? USER_STATUS_OPTIONS.find((r) => r.value === status)?.label
                  : "All"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            {USER_STATUS_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleStatusChange(option.value as UserStatus)}
                className={cn(
                  "flex items-center gap-2",
                  status === option.value && "font-medium",
                )}
              >
                {option.value === "" ? (
                  <MinusCircle className="h-4 w-4 text-slate-400" />
                ) : (
                  STATUS_ICONS[option.value as UserStatus]
                )}
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date filter */}
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

export default UsersFilters;
