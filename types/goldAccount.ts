export interface GoldAccount {
  igan: string;
  gold_account_purpose: string;
  active: boolean;
  member_gic: string;
  vault_site_id: string;
  created_at: string;
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
