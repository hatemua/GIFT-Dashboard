export interface Asset {
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
}
