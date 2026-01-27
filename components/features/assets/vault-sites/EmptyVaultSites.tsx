import { Card, CardContent } from "@/components/ui/card";
import { Package, Search } from "lucide-react";

interface EmptyVaultSitesProps {
  hasFilters?: boolean;
}

const EmptyVaultSites = ({ hasFilters = false }: EmptyVaultSitesProps) => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center py-14 space-y-5">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          {hasFilters ? (
            <Search className="h-7 w-7" />
          ) : (
            <Package className="h-7 w-7" />
          )}
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">
            {hasFilters ? "No results found" : "No vault sites yet"}
          </h3>

          <p className="text-sm text-slate-500 max-w-sm">
            {hasFilters
              ? "Try adjusting or clearing your filters to see more vault sites."
              : "Vault sites represent physical locations where gold assets are securely stored."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyVaultSites;
