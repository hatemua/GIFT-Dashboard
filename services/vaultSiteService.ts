import { api } from "@/lib/axios";
import {
  CreateVaultSitePayload,
  GetVaultSitesParams,
} from "@/types/vault-site";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get list of vault sites
export const fetchVaultSitesApi = async ({
  page,
  limit,
  filters = {},
}: GetVaultSitesParams) => {
  const response = await api.get(`${API_URL}/dashboard/vault-sites`, {
    params: {
      page,
      limit,
      country: filters.country,
      search: filters.search,
      from_date: filters.from_date,
      to_date: filters.to_date,
    },
  });

  return response.data;
};

// Get vault site by ID
export const fetchVaultSiteByIdApi = async (id: string) => {
  const response = await api.get(`${API_URL}/vault-sites/${id}`);
  return response.data;
};

// Create vault site
export const createVaultSiteApi = async (payload: CreateVaultSitePayload) => {
  const response = await api.post(`${API_URL}/vault-sites/create`, payload);
  return response.data;
};

// Get inventory for a specific vault site, with optional grouping
export const fetchVaultSiteInventoryApi = async (
  vaultSiteId: string,
  groupBy?: "owner" | "product_type" | "asset_status" | "vault_id" | undefined,
) => {
  const params: any = {};
  if (groupBy) params.group_by = groupBy;

  const response = await api.get(
    `${API_URL}/vault-sites/${vaultSiteId}/inventory`,
    { params },
  );
  return response.data;
};
