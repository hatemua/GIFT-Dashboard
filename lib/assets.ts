import { ASSET_STATUS_LABELS } from "@/constants/assets";
import { AssetStatus } from "@/types/asset";

export function getAssetStatusLabel(
  status: AssetStatus
): string {
  return ASSET_STATUS_LABELS[status] ?? "";
}