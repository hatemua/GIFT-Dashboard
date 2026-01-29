"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { Asset } from "@/types/asset"; // Use the new type
import { formatCurrency, formatWeight, formatDate } from "@/lib/utils"; // assuming you have these utilities

interface AssetsGridProps {
  assets: Asset[];
}

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusColors: Record<string, string> = {
    stationary: "bg-emerald-100 text-emerald-800",
    in_transit: "bg-amber-100 text-amber-800",
    liquidated: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={`text-xs px-2 py-1 ${statusColors[status] ?? "bg-gray-100 text-gray-800"}`}>
      {status.replace("_", " ").toUpperCase()}
    </Badge>
  );
};

export default function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {assets.slice(0, 12).map((asset) => (
        <Card
          key={asset.token_id}
          className="hover:shadow-lg transition-all hover:border-gold-300 cursor-pointer overflow-hidden group"
        >
          {/* Asset Image/Icon */}
          <div className="relative h-40 bg-gradient-to-br from-gold-50 via-gold-100 to-gold-200 flex items-center justify-center">
            <Package className="h-16 w-16 text-gold-600 opacity-50 group-hover:scale-110 transition-transform" />
            <div className="absolute top-3 right-3">
              <StatusBadge status={asset.ownership.asset_status} />
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Token ID */}
            <div>
              <p className="text-xs text-slate-500 mb-1">Token ID</p>
              <p className="font-mono text-sm font-semibold text-slate-900 truncate">
                {asset.token_id}
              </p>
            </div>

            {/* Refiner */}
            <div>
              <p className="text-xs text-slate-500 mb-1">Refiner</p>
              <p className="text-sm font-medium text-slate-700">
                {asset.metadata.refiner_name}
              </p>
            </div>

            {/* Weight & Fineness */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
              <div>
                <p className="text-xs text-slate-500 mb-1">Weight</p>
                <p className="text-sm font-bold text-slate-900">
                  {formatWeight(asset.metadata.weight_grams)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Fineness</p>
                <p className="text-sm font-bold text-slate-900">
                  {asset.metadata.fineness}‰
                </p>
              </div>
            </div>

            {/* Value */}
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Asset Value</p>
              <p className="text-lg font-bold text-gold-700">
                {formatCurrency(asset.valuation.asset_value)}
              </p>
              <p className="text-xs text-slate-400">
                @ {formatCurrency(asset.valuation.gold_rate)}/g
              </p>
            </div>

            {/* Minted Date */}
            <div className="pt-2">
              <p className="text-xs text-slate-400">
                Minted {formatDate(asset.valuation.as_of, "relative")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
