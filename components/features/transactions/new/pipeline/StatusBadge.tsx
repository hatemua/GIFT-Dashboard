import React from "react";
import { cn } from "@/lib/utils";
import { AssetStatus } from "@/types/asset";

export const STATUS_BADGE_CONFIG: Record<AssetStatus, { label: string; className: string }> = {
  stationary: { label: "Stationary", className: "bg-gray-100 text-gray-600 border-gray-200" },
  locked:     { label: "Locked",     className: "bg-amber-100 text-amber-700 border-amber-200" },
  in_transit: { label: "In Transit", className: "bg-blue-100 text-blue-700 border-blue-200" },
  liquidated: { label: "Liquidated", className: "bg-purple-100 text-purple-700 border-purple-200" },
  burned:     { label: "Burned",     className: "bg-red-100 text-red-700 border-red-200" },
  missing:    { label: "Missing",    className: "bg-orange-100 text-orange-700 border-orange-200" },
  stolen:     { label: "Stolen",     className: "bg-red-100 text-red-700 border-red-200" },
};

export function StatusBadge({ status }: { status: AssetStatus }) {
  const cfg = STATUS_BADGE_CONFIG[status] ?? { label: status, className: "bg-gray-100 text-gray-600 border-gray-200" };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", cfg.className)}>
      {cfg.label}
    </span>
  );
}
