import { api } from "@/lib/axios";
import { CreateVaultSitePayload } from "@/types/vault-site";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get list of vault sites
export const fetchVaultSitesApi = async (
  limit = 50,
  offset = 0,
  country?: string,
) => {
  const params: any = { limit, offset };
  if (country) params.country = country;

  const response = await api.get(`${API_URL}/vault-sites`, {
    params,
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
