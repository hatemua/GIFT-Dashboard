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

export interface AssetMetadata {
  serial_number: string;
  refiner_name: string;
  weight_grams: number;
  fineness: number;
  fine_weight_grams: number;
  gold_product_type_id: string;
  manufacture_date: string; // YYYY-MM-DD
  certificate_origin_hash: string;
  traceability_gic: string;
}

export interface AssetOwnership {
  current_owner_igan: string;
  vault_site_id: string;
  asset_status: "stationary" | "in_transit" | "liquidated";
}

export interface AssetCompliance {
  certification_framework: string;
  certified: boolean;
  conflict_free: boolean;
  last_audit: string; // YYYY-MM-DD
}

export interface AssetValuation {
  asset_value: number;
  gold_rate: number;
  currency: string;
  as_of: string; // ISO date
}

export interface AssetDetails {
  token_id: string;
  metadata: AssetMetadata;
  ownership: AssetOwnership;
  compliance: AssetCompliance;
  valuation: AssetValuation;
}

export interface AssetSummary {
  serial_number: string;
  refiner_name: string;
  weight_grams: number;
  fineness: number;
  fine_weight_grams: number;
  gold_product_type_id: string;
  current_status: string;
  current_owner_igan: string;
  current_vault_site_id: string;
  current_vault_id: string;
  current_custody_party_type: string;
  current_custody_party_id: string;
}

export interface ValuationSnapshot {
  asset_value: number;
  gold_rate: number;
  currency: string;
}

export interface TrackingEvent {
  event_id?: string;
  event_type?: string;
  timestamp: string;
  description?: string;
  details?: Record<string, any>;
  valuation_snapshot?: ValuationSnapshot;

  // Blockchain info
  block_number: number | string;
  transaction_hash: string;

  // Optional transaction metadata
  transaction_reference?: string;
  transaction_type?: string;
}


export interface OwnershipChainItem {
  owner_igan: string;
  owner_gic: string;
  from_date: string;
  to_date: string | null;
  duration_days: number;
  is_current_owner?: boolean;
}

export interface CustodyChainItem {
  custody_party_type: string;
  custody_party_id: string;
  from_date: string;
  to_date: string | null;
  is_current_custodian?: boolean;
}

export interface LocationHistoryItem {
  vault_site_id: string;
  vault_id: string;
  from_date: string;
  to_date: string | null;
  is_current_location?: boolean;
}

export interface LifecycleTimeline {
  total_events: number;
  first_event: string;
  last_event: string;
  total_transfers: number;
  total_custody_changes: number;
  total_status_changes: number;
  total_vault_movements: number;
}

export interface QueryMetadata {
  from_date: string;
  to_date: string;
  event_types_included: string[];
  include_documents: boolean;
  include_valuations: boolean;
  generated_at: string;
}

export interface AssetTrackingResponse {
  token_id: string;
  asset_summary: AssetSummary;
  lifecycle_timeline: LifecycleTimeline;
  tracking_events: TrackingEvent[];
  ownership_chain: OwnershipChainItem[];
  custody_chain: CustodyChainItem[];
  location_history: LocationHistoryItem[];
  query_metadata: QueryMetadata;
}

