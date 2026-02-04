export interface GoldAccount {
  igan: string;
  gold_account_purpose: string;
  active: boolean;
  member_gic: string;
  vault_id: string;
  vault_site_id: string;
  created_at: string;
}

export interface CreateGoldAccountPayload {
  member_gic: string;
  igan?: string;
  vault_id: string;
  guarantee_deposit_account: string;
  gold_account_purpose: "trading" | "custody" | "collateral" | "savings";
  initial_deposit?: number;
  certificate_absence_reason?: string;
}

export interface CreateGoldAccountResponse {
  igan: string;
  member_gic: string;
  vault_id: string;
  guarantee_deposit_account: string;
  gold_account_purpose: "trading" | "custody" | "collateral" | "savings";
  total_gold_assets: number;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  gold_rate_at_minting: number;
  total_valuation_currency: string;
  total_valuation_amount: number;
  account_status: string;
  created_at: string;
  created_by_admin: string;
  blockchain_tx?: string;
}

export interface GetAllAccountsParams {
  limit?: number;
  page?: number;
}

export interface GoldAccountsResponse {
  accounts: GoldAccount[];
  total_count: number;
  limit: number;
  page: number;
}

export interface GoldAccountDetails {
  igan: string;
  member_gic: string;
  vault_site_id: string;
  vault_id: string;
  guarantee_deposit_account: string;
  gold_account_purpose: string;
  account_status: string;
  creation_date: string;
  total_holdings: {
    total_gold_assets: number;
    total_weight_grams: number;
    total_fine_weight_grams: number;
    gold_rate_at_minting: number;
    total_valuation_currency: string;
    total_valuation_amount: number;
    current_gold_rate: number;
    current_valuation_amount: number;
  };
  compliance_status: string;
  last_activity: string;
}

export interface GoldAccountBalance {
  igan: string;
  vault_site_id: string;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  by_product_type: {
    gold_product_type_id: string;
    weight_grams: number;
    fine_weight_grams: number;
    asset_count: number;
  }[];
  valuation: {
    currency: string;
    total_value: number;
    spot_price: number;
    as_of: string;
  };
}

// Query parameters for fetching assets
export interface GetAccountAssetsParams {
  include_history?: boolean;
  filter_by?:
    | { asset_status: string }
    | { refiner: string }
    | { serial_range: string };
}

// Single asset type
export interface GoldAccountAsset {
  token_id: string;
  serial_number: string;
  weight_grams: number;
  fineness: number;
  fine_weight_grams: number;
  gold_product_type_id: string;
  refiner_name: string;
  asset_status: "stationary" | "in_transit" | "liquidated";
  created_on_chain_at: string;
  certificate_hash: string;
}

// Response type for account assets
export interface GoldAccountAssetsResponse {
  igan: string;
  vault_site_id: string;
  assets: GoldAccountAsset[];
  total_weight_grams: number;
  total_fine_weight_grams: number;
  total_count: number;
}

// Query parameters for searching assets
export interface SearchAccountAssetsParams {
  serial_number?: string;
  refiner_name?: string;
  min_weight?: number;
  max_weight?: number;
}

// Single asset type for search results
export interface GoldAccountAssetSearchResult {
  token_id: string;
  serial_number: string;
  weight_grams: number;
  fineness: number;
  fine_weight_grams: number;
  refiner_name: string;
  asset_status: string;
}

// Response type for the search endpoint
export interface GoldAccountAssetsSearchResponse {
  igan: string;
  search_criteria: {
    serial_number: string | null;
    refiner_name: string | null;
    min_weight: number | null;
    max_weight: number | null;
  };
  matching_assets: GoldAccountAssetSearchResult[];
  total_matches: number;
}

// Query parameters for account movements
export interface GetAccountMovementsParams {
  offset?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
}

// Asset details in a movement
export interface MovementAssetDetails {
  token_ids: string[];
  asset_count: number;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  valuation_at_movement: {
    value_usd: number;
    gold_rate: number;
  };
}

// Single movement entry
export interface GoldAccountMovement {
  date: string;
  type: string;
  reference: string;
  counterparty_igan: string;
  asset_details: MovementAssetDetails;
  balance_after_grams: number;
  transaction_id: string;
}

// Response type for movements
export interface GoldAccountMovementsResponse {
  igan: string;
  total_movements: number;
  movements: GoldAccountMovement[];
  limit: number;
  from_date: string | null;
  to_date: string | null;
}