import { ASSET_STATUS_LABELS } from "@/constants/assets";

export function getAssetStatusLabel(
  status: "stationary" | "in_transit" | "liquidated"
): string {
  return ASSET_STATUS_LABELS[status];
}