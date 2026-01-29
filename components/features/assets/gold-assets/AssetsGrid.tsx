"use client";

import { Asset } from "@/types/asset";
import { Card, CardContent } from "@/components/ui/card";
import { Package, User, DollarSign, Scale, Calendar } from "lucide-react";
import { formatDate, formatWeight, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/data-display/status-badge";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { getAssetStatusLabel } from "@/lib/assets";

interface AssetsGridProps {
  assets: Asset[];
}

export default function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <Card
          key={asset.token_id}
          className="group hover:shadow-lg transition-shadow cursor-pointer rounded-xl border border-slate-200 overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {/* Compact Header */}
          <div className="relative h-24 bg-gradient-to-r from-gold-100 to-amber-100 dark:from-gold-900/30 dark:to-amber-900/30">
            <div className="absolute top-2 right-2">
              <StatusBadge status={asset.metadata.gold_product_type_id} />
            </div>
            <div className="absolute top-2 left-2">
              <StatusBadge
                status={getAssetStatusLabel(asset.ownership.asset_status)}
              />
            </div>
            <div className="h-full flex items-center justify-center p-2">
              <Package className="h-10 w-10 text-gold-600 dark:text-gold-400" />
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Serial Number - Compact */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  SERIAL
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {asset.metadata.serial_number}
                </p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  TOKEN
                </p>
                <span className="text-xs font-mono text-slate-400">
                  <AddressDisplay
                    address={asset.token_id}
                    truncate={true}
                    startChars={2}
                    endChars={2}
                  />
                </span>
              </div>
            </div>

            {/* Owner - Compact */}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-3 w-3 text-slate-400 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300 truncate text-xs">
                {asset.ownership.current_owner_igan}
              </span>
            </div>

            {/* Compact Stats Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-gray-700">
              {/* Weight */}
              <div className="flex items-center gap-1.5">
                <div className="p-1 bg-slate-100 dark:bg-gray-700 rounded">
                  <Scale className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Weight
                  </p>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    {formatWeight(asset.metadata.weight_grams)}
                  </p>
                </div>
              </div>

              {/* Value */}
              <div className="flex items-center gap-1.5">
                <div className="p-1 bg-gold-100 dark:bg-gold-900/30 rounded">
                  <DollarSign className="h-3 w-3 text-gold-600 dark:text-gold-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Value
                  </p>
                  <p className="text-xs font-semibold text-gold-700 dark:text-gold-300">
                    {formatCurrency(asset.valuation.asset_value)}
                  </p>
                </div>
              </div>

              {/* Fineness */}
              <div className="text-right">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Fineness
                </p>
                <p className="text-xs font-medium text-slate-900 dark:text-white">
                  {asset.metadata.fineness}‰
                </p>
              </div>
            </div>

            {/* Date - Simple */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">
                  Manufactured
                </span>
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {formatDate(asset.metadata.manufacture_date, "short")}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
