export interface Vault {
  vault_id: string;
  member_internal_vault_id: string;
  vault_dimensions: string;
  vault_gold_capacity_kg: number;
  current_weight_kg: number;
  available_capacity_kg: number;
  utilization_percent: number;
  vault_status: "Used" | "Active" | "Inactive" | "Under Audit" | string;
  last_audit_date: string;
  asset_count: number;
}
