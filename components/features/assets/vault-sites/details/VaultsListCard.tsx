"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Package,
  Search,
  Eye,
  AlertCircle,
  Unlock,
  Lock,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useVaultSiteStore } from "@/store/vaultSiteStore";
import { useVaultSite } from "@/hooks/useVaultSite";
import { Tooltip } from "@/components/ui/tooltip";

export interface Vault {
  vault_id: string;
  member_internal_vault_id: string;
  vault_gold_capacity_kg: number;
  current_weight_kg: number;
  utilization_percent: number;
  vault_status: "Used" | "Active" | "Inactive" | "Under Audit" | string;
  asset_count: number;
}

export function VaultsListCard() {
  const vaultSiteId = useVaultSite().vaultSiteDetails?.vault_site_id;
  const [searchTerm, setSearchTerm] = useState("");

  const {
    vaults = [],
    vaultsLoading,
    fetchVaultsByVaultSiteId,
  } = useVaultSiteStore();

  useEffect(() => {
    if (vaultSiteId) fetchVaultsByVaultSiteId(vaultSiteId);
  }, [vaultSiteId, fetchVaultsByVaultSiteId]);

  const getVaultStatusConfig = (status: string) => {
    const configs = {
      active: {
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        text: "Active",
        icon: Unlock,
      },
      inactive: {
        color: "text-gray-600",
        bg: "bg-gray-50",
        text: "Inactive",
        icon: Lock,
      },
      under_audit: {
        color: "text-amber-600",
        bg: "bg-amber-50",
        text: "Audit",
        icon: AlertCircle,
      },
      used: {
        color: "text-blue-600",
        bg: "bg-blue-50",
        text: "Used",
        icon: Lock,
      },
    };
    return (
      configs[status.toLowerCase() as keyof typeof configs] || configs.inactive
    );
  };

  const filteredVaults = vaults;

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-4 w-4 text-purple-500" />
          Vaults ({vaults.length})
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
            <Input
              placeholder="Search vaults..."
              className="pl-8 h-8 text-sm w-44"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            aria-label="filter"
            variant="outline"
            size="sm"
            className="h-8"
          >
            <Filter size={13} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {vaultsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse p-4 rounded-lg border border-gray-200 flex flex-col gap-3"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-2 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredVaults.length > 0 ? (
          <div className="space-y-3">
            {filteredVaults.map((vault) => {
              const statusConfig = getVaultStatusConfig(vault.vault_status);
              const StatusIcon = statusConfig.icon;
              return (
                <div
                  key={vault.vault_id}
                  className="group flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Tooltip placement="bottom" content={vault.vault_status}>
                      <div className={cn("p-1.5 rounded", statusConfig.bg)}>
                        <StatusIcon
                          className={cn("h-3.5 w-3.5", statusConfig.color)}
                        />
                      </div>
                    </Tooltip>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {vault.vault_id} | {vault.member_internal_vault_id}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>ID: {vault.vault_id}</span>
                        <span>{vault.asset_count ?? 0} assets</span>
                        <span>{vault.current_weight_kg} kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Use</span>
                        <span className="font-medium">
                          {vault.utilization_percent}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gold-500 transition-all"
                          style={{ width: `${vault.utilization_percent}%` }}
                        />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="h-3.5 w-3.5" />
                      <span className="sr-only">View</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="h-10 w-10 text-gray-300 mx-auto" />
            <p className="mt-2 text-gray-500">No vaults found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
