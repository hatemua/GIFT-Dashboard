import { api } from "@/lib/axios";
import { GetAllAccountsParams, GoldAccountsResponse } from "@/types/goldAccount";

export const goldAccountService = {
  getAllAccounts: async (
    params: GetAllAccountsParams = {},
  ): Promise<GoldAccountsResponse> => {
    const { limit = 10, page = 1 } = params;
    console.log("Fetching accounts with params:", params);
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

    const response = await api.get(`/accounts?${queryParams.toString()}`);

    return response.data as GoldAccountsResponse;
  },
};
