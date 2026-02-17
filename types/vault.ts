export interface VaultItem {
  vault_id: string;
  member_internal_vault_id: string;
  vault_dimensions: string;
  vault_gold_capacity_kg: number;
  current_weight_kg: number;
  available_capacity_kg: number;
  utilization_percent: number;
  vault_status: VaultStatus;
  last_audit_date: string;
  asset_count: number;
}

export type VaultStatus = "UNUSED" | "USED" | "OUT_OF_SERVICE";

export interface VaultValuation {
  currency: string;
  amount: number;
  gold_rate: number;
}

export interface VaultAssetsByProductType {
  gold_product_type_id: string;
  count: number;
  weight_grams: number;
}

export interface VaultAssetsByOwner {
  igan: string;
  asset_count: number;
  weight_grams: number;
}

export interface VaultAssets {
  total_count: number;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  total_valuation: VaultValuation;
  by_product_type: VaultAssetsByProductType[];
  by_owner: VaultAssetsByOwner[];
}

export interface Vault {
  vault_id: string;
  vault_site_id: string;
  vault_site_name?: string;

  member_internal_vault_id?: string;
  vault_dimensions?: string;

  vault_gold_capacity_kg: number;
  current_weight_kg: number;
  available_capacity_kg: number;
  utilization_percent?: number;

  vault_status: VaultStatus;

  last_audit_date?: string;
  next_audit_due?: string;

  assets?: VaultAssets;

  created_at: string;
}

/* ---------- API payloads ---------- */

export interface CreateVaultPayload {
  vault_site_id: string;
  vault_id?: string;
  member_internal_vault_id?: string;
  vault_dimensions?: string;
  vault_gold_capacity_kg: number;
  vault_status: VaultStatus;
  last_audit_date?: string;
}

export interface UpdateVaultStatusPayload {
  vault_status: VaultStatus;
  reason: string;
  last_audit_date?: string;
}

export interface VaultFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  status?: string;
}

export interface GetVaultsParams {
  vaultSiteId: string;
  page: number;
  limit: number;
  filters: VaultFilters;
}

export interface VaultsResponse {
  count: number;
  limit: number;
  page: number;
  vaults: VaultItem[];
}
