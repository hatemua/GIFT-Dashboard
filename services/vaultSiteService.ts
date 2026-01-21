import { api } from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
