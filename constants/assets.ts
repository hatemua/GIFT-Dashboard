import { Archive, Truck, Flame, HelpCircle, AlertTriangle, LockIcon } from "lucide-react";

export const ASSET_STATUS_LABELS = {
  stationary: "IN_VAULT",
  in_transit: "IN_TRANSIT",
  liquidated: "LIQUIDATED",
  burned: "BURNED",
  locked: "LOCKED",
  missing: "MISSING",
  stolen: "STOLEN",
} as const;

export const ASSET_CONDITION_LABELS = {
  stationary: "STATIONARY",
  locked: "LOCKED",
  in_transit: "IN_TRANSIT",
  missing: "MISSING",
  stolen: "STOLEN",
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
  {
    label: "Burned",
    value: "burned",
    icon: Flame,
    color: "text-gray-600",
  },
  {
    label: "Locked",
    value: "locked",
    icon: LockIcon,
    color: "text-amber-600",
  },
  {
    label: "Missing",
    value: "missing",
    icon: HelpCircle,
    color: "text-orange-600",
  },
  {
    label: "Stolen",
    value: "stolen",
    icon: AlertTriangle,
    color: "text-red-700",
  },
] as const;

export type AssetStatus = (typeof ASSET_STATUS_OPTIONS)[number]["value"];

export const CUSTODY_PARTY_TYPES = [
  {
    value: "owner",
    label: "Owner",
    description: "Direct owner custody",
  },
  {
    value: "custodian",
    label: "Custodian",
    description: "Third-party custodian",
  },
  {
    value: "lsp",
    label: "LSP",
    description: "Logistics service provider",
  },
  {
    value: "vault_operator",
    label: "Vault Operator",
    description: "Vault facility operator",
  },
] as const;

export const CUSTODY_ARRANGEMENTS = [
  {
    value: "direct",
    label: "Direct",
    description: "Exclusive access",
  },
  {
    value: "segregated",
    label: "Segregated",
    description: "Separated but shared facility",
  },
  {
    value: "pooled",
    label: "Pooled",
    description: "Commingled storage",
  },
] as const;

export const TRANSFER_REASONS = [
  { value: "sale", label: "Sale" },
  { value: "custody", label: "Custody" },
  { value: "collateral", label: "Collateral" },
  { value: "other", label: "Other" },
];


