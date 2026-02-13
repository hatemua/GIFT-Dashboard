"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Gem,
  Barcode,
  Package,
  TrendingUp,
  AlertTriangle,
  Copy,
} from "lucide-react";
import { StatusBadge } from "@/components/data-display/status-badge";
import { getAssetStatusLabel } from "@/lib/assets";

interface Props {
  asset: any;
}
export function AssetHeader({ asset }: Props) {
  return (
    <div
      className="
        flex flex-col lg:flex-row lg:items-center justify-between gap-4
        mb-2 p-4 bg-white rounded-xl
        border border-gray-200
        transition-all duration-200
        hover:border-gray-300 hover:shadow-md
      "
    >
      {/* ================= LEFT SECTION ================= */}
      <div className="flex items-start gap-4 flex-1">
        {/* Icon */}
        <div className="relative">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 via-yellow-50 to-white border border-amber-200 shadow-sm">
            <Gem className="h-7 w-7 text-amber-700" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* Identity */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              {asset.metadata.gold_product_type_id}
            </h1>

            {/* Token ID – desktop */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
              <Barcode className="h-3 w-3" />
              <span className="font-mono">TOKEN ID: {asset.token_id}</span>
            </div>
          </div>

          {/* Status + metadata */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              status={getAssetStatusLabel(asset.ownership.asset_status)}
            />

            {/* Desktop metadata */}
            <div className="hidden md:flex items-center text-xs text-gray-500 gap-2 ml-2">
              <span className="font-medium">{asset.metadata.refiner_name}</span>
              <span>•</span>
              <span className="font-mono">
                SN: {asset.metadata.serial_number}
              </span>
            </div>
          </div>

          {/* Mobile metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 md:hidden">
            <div className="flex items-center gap-1">
              <Barcode className="h-3 w-3" />
              <span className="font-mono">{asset.token_id}</span>
            </div>
            <span>•</span>
            <span className="font-medium">{asset.metadata.refiner_name}</span>
            <span>•</span>
            <span className="font-mono">
              SN: {asset.metadata.serial_number}
            </span>
          </div>
        </div>
      </div>

      {/* Divider (mobile) */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:hidden" />

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Current Value
          </p>
          <div className="flex items-baseline gap-2 justify-end">
            <span className="text-2xl font-bold text-gray-900">
              {asset.valuation.asset_value}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {asset.valuation.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
