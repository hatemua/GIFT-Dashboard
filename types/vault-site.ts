import { Vault } from "./vault";

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

export interface vaultSiteDetails {
  vault_site_id: string;
  vault_site_name: string;
  member_gic: string;

  location: {
    location_name: string;
    registered_address: string;
    operational_address: string;
    city: string;
    state_or_province: string;
    postal_code: string;
    country: string;
    timezone: string;
    gps_coordinates: string; // "lat,long" string
  };

  storage_capacity: {
    maximum_weight_in_gold_kg: number;
    current_weight_in_gold_kg: number;
    utilization_percent: number;
  };

  opening_hours: string;

  insurance_coverage: {
    name_of_insurer: string;
    expiration_date: string; // ISO date string
    documentation_sod_id: string;
    coverage_amount: number;
    coverage_currency: string;
  };

  audit_and_compliance: {
    audit_documentation_sod_id: string;
    last_audit_date: string; // ISO date string
    next_audit_due: string; // ISO date string
    audit_frequency: "annual" | "semi-annual" | "quarterly" | "monthly";
  };

  status: "active" | "inactive" | "under_audit" | "suspended";

  vaults: any[]; // if nested vault objects are added later, replace 'any' with a proper type
  total_assets: string; // number of assets as string
  total_weight_grams: number;

  created_at: string; // ISO datetime string
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

export type VaultSiteInventory = {
  vault_site_id: string;
  vault_site_name: string;
  inventory_date: string;
  total_assets: number;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  total_valuation: {
    currency: string;
    amount: number;
    gold_rate: number;
  };
  by_owner: {
    igan: string;
    member_gic: string;
    asset_count: number;
    total_weight_grams: number;
    total_fine_weight_grams: number;
  }[];
  product_type: {
    gold_product_type_id: string;
    asset_count: number;
    total_weight_grams: number;
    total_fine_weight_grams: number;
  }[];
  by_vault: {
    vault_id: string;
    asset_count: number;
    total_weight_grams: number;
  }[];
};

export interface InventorySummary {
  vault_site_id: string;
  vault_site_name: string;
  inventory_date: string;
  total_assets: number;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  total_valuation: {
    currency: string;
    amount: number;
    gold_rate: number;
  };
}

export interface VaultSiteStore {
  vaultSites: VaultSite[];
  vaultSiteDetails: vaultSiteDetails | null;
  vaults: Vault[];
  inventorySummary: InventorySummary | null;
  inventoryByOwner: VaultSiteInventory["by_owner"] | [];
  inventoryByProductType: VaultSiteInventory["product_type"] | [];
  inventoryByVault: VaultSiteInventory["by_vault"] | [];
  totalCount: number;
  limit: number;
  offset: number;
  country?: string;
  loading: boolean;
  error: string | null;
  filters: VaultSiteFilters;

  fetchVaultSites: (
    limit?: number,
    offset?: number,
    country?: string,
  ) => Promise<void>;

  fetchVaultSiteById: (id: string) => Promise<void>;

  createVaultSite: (payload: CreateVaultSitePayload) => Promise<VaultSite>;

  fetchVaultsByVaultSiteId: (vaultSiteId: string) => Promise<void>;

  fetchVaultSiteInventory: (
    vaultSiteId: string,
    groupBy?: "owner" | "product_type" | "asset_status" | "vault_id",
  ) => Promise<void>;

  setVaultSiteSummary: (summary: InventorySummary | null) => void;
  setCountry: (country?: string) => void;
  setFilters: (filters: VaultSiteFilters) => void;
  resetFilters: () => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  resetVaultSiteDetails: () => void;
}

export interface VaultSiteFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  country?: string;
}

export interface GetVaultSitesParams {
  limit: number;
  offset: number;
  country?: string;
  filters: VaultSiteFilters;
}
