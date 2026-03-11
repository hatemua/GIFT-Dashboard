export type AssetStatus =
  | "stationary"
  | "in_transit"
  | "liquidated"
  | "burned"
  | "locked"
  | "missing"
  | "stolen";

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
  owner?: string;
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
  manufacture_date: string;
  status: AssetStatus;

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

  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
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
  manufacture_date: string;
  certificate_origin_hash: string;
  traceability_gic: string;
}

export interface AssetOwnership {
  current_owner_igan: string;
  vault_site_id: string;
  asset_status: AssetStatus;
}

export interface AssetCompliance {
  certification_framework: string;
  certified: boolean;
  conflict_free: boolean;
  last_audit: string;
}

export interface AssetValuation {
  asset_value: number;
  gold_rate: number;
  currency: string;
  as_of: string;
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
  current_status: AssetStatus;
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
  block_number: number | string;
  transaction_hash: string;
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
  lsp_id: string | null;
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

export interface BurnAssetRequest {
  token_id: string;
  burn_reason: string;
  justification_document: string;
  authorized_by: string;
  irreversible: boolean;
}

export interface BurnAssetResponse {
  status: string;
  token_id: string;
  burn_status: string;
  burn_reason: string;
  authorized_by: string;
  justification_document_hash: string;
  burned_at: string;
  blockchain_tx: string;
  irreversible: boolean;
  final_owner_igan: string;
}

export interface UpdateCustodyRequest {
  token_id: string;
  custody_party_type: string;
  custody_party_id?: string;
  lsp_id?: string;
  vault_site_id?: string;
  vault_id?: string;
  custody_type: string;
  custody_agreement_ref: string;
}

export interface UpdateCustodyResponse {
  status: string;
  token_id: string;
  custody_party_type: string;
  custody_party_id: string;
  vault_site_id: string;
  vault_id: string;
  custody_type: string;
  custody_agreement_ref: string;
  previous_custody_party: string;
  updated_at: string;
  blockchain_tx: string;
}

export interface UpdateStatusRequest {
  token_id: string;
  new_status: AssetStatus;
  reason: string;
  effective_date: string;
  supporting_document?: string;
}

export interface UpdateStatusResponse {
  status: string;
  token_id: string;
  previous_status: AssetStatus;
  new_status: AssetStatus;
  reason: string;
  effective_date: string;
  changed_at: string;
  blockchain_tx: string;
}

export interface AssetTransferRequest {
  token_id: string;
  from_igan: string;
  to_igan: string;
  quantity: number;
  transaction_reference: string;
  transfer_reason: string;
  compliance_check: boolean;
}

export interface AssetTransferResponse {
  status: string;
  transaction_id: string;
  token_id: string;
  from_igan: string;
  to_igan: string;
  quantity: number;
  transfer_reason: string;
  compliance_status: string;
  blockchain_tx: string;
  executed_at: string;
}
