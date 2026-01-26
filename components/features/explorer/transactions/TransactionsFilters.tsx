import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, List, Grid3x3, Filter } from "lucide-react";

interface TransactionsFiltersProps {
  view: "grid" | "table";
  onViewChange: (view: "grid" | "table") => void;
}

const TransactionsFilters = ({ view, onViewChange }: TransactionsFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search by reference, asset, or counterparty..."
          className="pl-10"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant={view === "table" ? "gold" : "outline"}
          size="icon"
          aria-label="List view"
          onClick={() => onViewChange("table")}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant={view === "grid" ? "gold" : "outline"}
          size="icon"
          aria-label="Grid view"
          onClick={() => onViewChange("grid")}
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>

        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default TransactionsFilters;
