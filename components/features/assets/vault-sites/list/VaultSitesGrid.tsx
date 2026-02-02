import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/data-display/status-badge";
import { MapPin, Package, Scale, Calendar } from "lucide-react";
import { useVaultSite } from "@/hooks/useVaultSite";
import { formatDate, formatWeight } from "@/lib/utils";

interface VaultSitesGridProps {
  vaultSites: ReturnType<typeof useVaultSite>["vaultSites"];
}  
export function VaultSitesGrid({ vaultSites }: VaultSitesGridProps) {

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vaultSites.map((vaultSite) => {
        const capacityPercentage =
          (vaultSite.current_weight_in_gold_kg / vaultSite.maximum_weight_in_gold_kg) *
          100;

        return (
          <Card
            key={vaultSite.vault_site_id}
            className="group transition-all hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div className="space-y-1">
                <CardTitle className="text-base">
                  {vaultSite.vault_site_name}
                </CardTitle>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  {vaultSite.city}, {vaultSite.country}
                </div>
              </div>
              <StatusBadge status={vaultSite.status} />
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Metadata */}
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-slate-400" />
                  {vaultSite.number_of_vaults} vaults
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {formatDate(vaultSite.last_audit_date)}
                </div>
              </div>

              {/* Gold Capacity */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span className="flex items-center gap-1">
                    <Scale className="h-3 w-3" />
                    Gold stored
                  </span>
                  <span>{Math.round(capacityPercentage)}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gold-500 transition-all"
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {formatWeight(vaultSite.current_weight_in_gold_kg)} /{" "}
                  {formatWeight(vaultSite.maximum_weight_in_gold_kg)}
                </div>
              </div>

              {/* Action */}
              <Link href={`/assets/vaults/${vaultSite.vault_site_id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full group-hover:border-gold-400"
                >
                  View details
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
