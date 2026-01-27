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

export interface CreateVaultSitePayload {
  vault_site_id: string;
  vault_site_name: string;
  member_gic: string;
  location_name: string;
  registered_address: string;
  operational_address: string;
  city: string;
  state_or_province: string;
  postal_code: string;
  country: string;
  timezone: string;
  gps_coordinates: string;
  number_of_vaults: number;
  maximum_weight_in_gold_kg: number;
  opening_hours: string;
  insurance_coverage_name_of_insurer: string;
  insurance_coverage_expiration_date: string; // ISO string
  insurance_coverage_documentation: string;
  audit_documentation: string;
  last_audit_date: string; // ISO string
}


export interface VaultSiteStore {
  vaultSites: VaultSite[];
  vaultSiteDetails: VaultSite | null;
  totalCount: number;
  limit: number;
  offset: number;
  country?: string;
  loading: boolean;
  error: string | null;

  fetchVaultSites: (
    limit?: number,
    offset?: number,
    country?: string,
  ) => Promise<void>;

  fetchVaultSiteById: (id: string) => Promise<void>;

  createVaultSite: (
    payload: CreateVaultSitePayload
  ) => Promise<VaultSite>;

  setCountry: (country?: string) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  resetVaultSiteDetails: () => void;
}
