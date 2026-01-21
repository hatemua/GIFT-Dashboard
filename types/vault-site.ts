export interface VaultSite {
  vault_site_id: string;
  vault_site_name: string;
  member_gic: string;
  city: string;
  country: string;
  number_of_vaults: number;
  maximum_weight_in_gold_kg: number;
  current_weight_in_gold_kg: number;
  status: string;
  last_audit_date: string;
}

export interface VaultSiteStore {
  // List / pagination
  vaultSites: VaultSite[];
  totalCount: number;
  limit: number;
  offset: number;
  country: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchVaultSites: (
    limit?: number,
    offset?: number,
    country?: string,
  ) => Promise<void>;

  setCountry: (country: string | null) => void;
  setOffset: (offset: number) => void;
}