"use client";

import { Asset } from "@/types/asset";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { StatusBadge } from "@/components/data-display/status-badge";
import { formatDate, formatWeight } from "@/lib/utils";

interface AssetsGridProps {
  assets: Asset[];
}

export function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <Card
          key={asset.serial_number}
          className="hover:shadow-lg transition-all hover:border-gold-300 cursor-pointer overflow-hidden group"
        >
          {/* Asset Image/Icon */}
          <div className="relative h-40 bg-gradient-to-br from-gold-50 via-gold-100 to-gold-200 flex items-center justify-center">
            <Package className="h-16 w-16 text-gold-600 opacity-50 group-hover:scale-110 transition-transform" />
            <div className="absolute top-3 right-3">
              <StatusBadge
                status={asset.certified ? "Certified" : "Not Certified"}
              />
            </div>
            <div className="absolute bottom-3 left-3">
              <StatusBadge status={asset.gold_product_type_id} />
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Token ID */}
            <div>
              <p className="text-xs text-slate-500 mb-1">Serial Number</p>
              <p className="font-mono text-sm font-semibold text-slate-900">
                {asset.serial_number}
              </p>
            </div>

            {/* Bullion ID */}
            <div>
              <p className="text-xs text-slate-500 mb-1">Refiner</p>
              <p className="font-mono text-sm font-semibold text-slate-900">
                {asset.refiner_name}
              </p>
            </div>

            {/* GIC */}
            <div>
              <p className="text-xs text-slate-500 mb-1">GIC</p>
              <p className="font-mono text-sm font-semibold text-slate-900">
                {asset.traceability_gic}
              </p>
            </div>

            {/* Initial Owner IGAN */}
            <div>
              <p className="text-xs text-slate-500 mb-1">Initial Owner IGAN</p>
              <p className="font-mono text-sm font-semibold text-slate-900">
                {asset.initial_owner_igan}
              </p>
            </div>

            {/* Certification Framework */}
            <div>
              <p className="text-xs text-slate-500 mb-1">
                Certification Framework
              </p>
              <p className="font-mono text-sm font-semibold text-slate-900">
                {asset.certification_framework}
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

            {/* Minted Date */}
            <div className="pt-2">
              <p className="text-xs text-slate-400">
                Manufactured {formatDate(asset.manufacture_date, "relative")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}