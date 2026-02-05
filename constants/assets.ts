import { Archive, Truck, Flame } from "lucide-react";

export const ASSET_STATUS_LABELS = {
  stationary: "IN_VAULT",
  in_transit: "IN_TRANSIT",
  liquidated: "LIQUIDATED",
} as const;

export const ASSET_STATUS_OPTIONS = [
  {
    label: "All",
    value: "all",
    icon: null,
  },
  {
    label: "In Vault",
    value: "stationary",
    icon: Archive,
    color: "text-emerald-600",
  },
  {
    label: "In Transit",
    value: "in_transit",
    icon: Truck,
    color: "text-blue-600",
  },
  {
    label: "Liquidated",
    value: "liquidated",
    icon: Flame,
    color: "text-rose-600",
  },
] as const;

export type AssetStatus =
  (typeof ASSET_STATUS_OPTIONS)[number]["value"];

