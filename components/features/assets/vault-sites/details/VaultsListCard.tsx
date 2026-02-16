"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import {
  Package,
  Search,
  Eye,
  AlertCircle,
  Lock,
  Filter,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useVault } from "@/hooks/useVault";
import { Tooltip } from "@/components/ui/tooltip";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";
import { VaultStatus } from "@/types/vault";
import { useVaultSite } from "@/hooks/useVaultSite";

export function VaultsListCard() {
  const {
    vaults = [],
    page,
    limit,
    count,
    filters,
    loading,
    fetchVaultsByVaultSiteId,
    setPage,
    setFilters,
    resetFilters,
  } = useVault();

  const vaultSiteId = useVaultSite().vaultSiteDetails?.vault_site_id;
  const [searchTerm, setSearchTerm] = useState("");

  // Refetch vaults when page, limit, or filters change
  useEffect(() => {
    if (vaultSiteId) fetchVaultsByVaultSiteId(vaultSiteId);
  }, [vaultSiteId, page, limit, filters, fetchVaultsByVaultSiteId]);

  // Vault status options for dropdown
  const vaultStatusOptions: { label: string; value: VaultStatus }[] = [
    { label: "All", value: "" as VaultStatus },
    { label: "Unused", value: "UNUSED" },
    { label: "Used", value: "USED" },
    { label: "Out of Service", value: "OUT_OF_SERVICE" },
  ];

  const getVaultStatusConfig = (status: string) => {
    const configs = {
      UNUSED: {
        color: "text-gray-600",
        bg: "bg-gray-50",
        text: "Unused",
        icon: Lock,
      },
      USED: {
        color: "text-blue-600",
        bg: "bg-blue-50",
        text: "Used",
        icon: Lock,
      },
      OUT_OF_SERVICE: {
        color: "text-amber-600",
        bg: "bg-amber-50",
        text: "Out of Service",
        icon: AlertCircle,
      },
    };
    return (
      configs[status.toUpperCase() as keyof typeof configs] || configs.UNUSED
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-4 w-4 text-purple-500" />
          Vaults ({count})
        </CardTitle>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          {/* Search */}
          <div className="relative">
            <Input
              icon={
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              }
              placeholder="Search vaults..."
              className="pl-8 h-8 text-sm w-44"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFilters({ search: e.target.value });
              }}
            />
          </div>

          {/* Status Dropdown */}
          <Select
            value={filters.status || ""}
            onChange={(value) => setFilters({ status: value as VaultStatus })}
            size="sm"
          >
            {vaultStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => {
              resetFilters();
              setSearchTerm("");
            }}
          >
            <RotateCcw size={13} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
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
        ) : vaults.length > 0 ? (
          <div className="space-y-3">
            {vaults.map((vault) => {
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
                          {vault.vault_id} |{" "}
                          <span className="text-xs text-gray-400">
                            Member Internal Vault ID:{" "}
                            {vault.member_internal_vault_id}
                          </span>
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

                    <Link href={`/assets/vaults/${vault.vault_id}`}>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Eye className="h-3.5 w-3.5" />
                        <span className="sr-only">View</span>
                      </Button>
                    </Link>
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

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          page={page}
          limit={limit}
          total={count}
          setPage={setPage}
          size="sm"
        />
      </div>
    </Card>
  );
}
