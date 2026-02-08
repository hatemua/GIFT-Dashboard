export interface AssetDetails {
  token_id: string;
  metadata: {
    serial_number: string;
    refiner_name: string;
    weight_grams: number;
    fineness: number;
    fine_weight_grams: number;
    gold_product_type_id: "bar" | "coin" | "ingot";
    manufacture_date: string; // ISO date string
    certificate_origin_hash: string;
    traceability_gic: string;
  };
  ownership: {
    current_owner_igan: string;
    vault_site_id: string;
    asset_status: "stationary" | "in_transit" | "liquidated"; // example statuses
  };
  compliance: {
    certification_framework: string;
    certified: boolean;
    conflict_free: boolean;
    last_audit: string; // ISO date string
  };
  valuation: {
    asset_value: number;
    gold_rate: number;
    currency: string;
    as_of: string; // ISO datetime string
  };
}

export interface MintAssetForm {
  serial_number: string;
  refiner_name: string;
  weight_grams: number;
  fineness: number;
  gold_product_type_id: string;
  traceability_gic: string;
  initial_owner_igan: string;
  certificate_file: File | null;
  manufacture_date?: string;
  certification_framework: string;
  certified: boolean;
  auto_verify_hash: boolean;
  certificate_base64: string;
  certificate_path?: string;
}

export interface GetAssetsParams {
  page: number;
  limit: number;
  filters?: AssetsFilters;
}

export interface AssetsFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  status?: string;
}

export interface Asset {
  token_id: string;
  serial_number: string;
  refiner_name: string;
  weight_grams: number;
  assetValueInDollar: number;
  fineness: number;
  gold_product_type_id: string;
  certificate_path: string;
  certificate_hash: string;
  manufacture_date: string; // ISO date string
  status: "stationary" | "in_transit" | "liquidated"

  custody_party_type: string | null;
  custody_type: string | null;
  custody_agreement_ref: string | null;

  certification_framework: string;
  certified: boolean;
  traceability_gic: string;
  owner_igan: string;

  custody_party_id: string | null;
  vault_site_id: string | null;
  vault_id: string | null;

  added_by: string;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface AssetsResponse {
  count: number;
  limit: number;
  page: number;
  assets: Asset[];
}
