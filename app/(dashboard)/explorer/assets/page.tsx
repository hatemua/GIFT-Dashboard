import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockAssets, mockMembers } from "@/lib/mock-data";
import { formatWeight, formatCurrency, formatDate } from "@/lib/utils";
import { Package, Search, Filter, Grid3x3, List } from "lucide-react";

export default function ExplorerAssetsPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Asset Explorer"
        description="All gold assets minted on the blockchain"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer", href: "/explorer" },
          { label: "Assets" },
        ]}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search by Token ID, Serial Number, or Refiner..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockAssets.slice(0, 12).map((asset) => {
          const refiner = mockMembers.find(
            (m) => m.member_gic === asset.traceability_gic
          );

          return (
            <Card
              key={asset.token_id}
              className="hover:shadow-lg transition-all hover:border-gold-300 cursor-pointer overflow-hidden group"
            >
              {/* Asset Image/Icon */}
              <div className="relative h-40 bg-gradient-to-br from-gold-50 via-gold-100 to-gold-200 flex items-center justify-center">
                <Package className="h-16 w-16 text-gold-600 opacity-50 group-hover:scale-110 transition-transform" />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={asset.asset_status} />
                </div>
                <div className="absolute bottom-3 left-3">
                  <StatusBadge status={asset.blockchain_status} />
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Token ID */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Token ID</p>
                  <AddressDisplay
                    address={asset.token_id}
                    truncate={true}
                    startChars={8}
                    endChars={6}
                  />
                </div>

                {/* Bullion ID */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Bullion ID</p>
                  <p className="font-mono text-sm font-semibold text-slate-900">
                    {asset.gift_bullion_id}
                  </p>
                </div>

                {/* Refiner */}
                <div>
                  <p className="text-xs text-slate-500 mb-1">Refiner</p>
                  <p className="text-sm font-medium text-slate-700">
                    {asset.refiner_name}
                  </p>
                </div>

                {/* Weight & Fineness */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Weight</p>
                    <p className="text-sm font-bold text-slate-900">
                      {formatWeight(asset.weight_grams)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Fineness</p>
                    <p className="text-sm font-bold text-slate-900">
                      {asset.fineness}‰
                    </p>
                  </div>
                </div>

                {/* Value */}
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Asset Value</p>
                  <p className="text-lg font-bold text-gold-700">
                    {formatCurrency(asset.asset_value_at_minting)}
                  </p>
                  <p className="text-xs text-slate-400">
                    @ {formatCurrency(asset.gold_rate_at_minting)}/g
                  </p>
                </div>

                {/* Minted Date */}
                <div className="pt-2">
                  <p className="text-xs text-slate-400">
                    Minted {formatDate(asset.created_on_chain_at, "relative")}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {[1, 2, 3, "...", 8].map((page, index) => (
            <Button
              key={index}
              variant={page === 1 ? "default" : "ghost"}
              size="sm"
              className="w-10"
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </DashboardShell>
  );
}
