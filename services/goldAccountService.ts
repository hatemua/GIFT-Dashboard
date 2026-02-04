import { api } from "@/lib/axios";
import {
  CreateGoldAccountPayload,
  CreateGoldAccountResponse,
  GetAccountAssetsParams,
  GetAccountMovementsParams,
  GetAllAccountsParams,
  GoldAccountAssetsResponse,
  GoldAccountAssetsSearchResponse,
  GoldAccountBalance,
  GoldAccountDetails,
  GoldAccountMovementsResponse,
  GoldAccountsResponse,
  SearchAccountAssetsParams,
} from "@/types/goldAccount";

export const goldAccountService = {
  createAccount: async (
    payload: CreateGoldAccountPayload,
  ): Promise<CreateGoldAccountResponse> => {
    const { data } = await api.post<CreateGoldAccountResponse>(
      "/accounts/create",
      payload,
    );
    return data;
  },
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

  getAccountByIgan: async (igan: string): Promise<GoldAccountDetails> => {
    console.log("Fetching account with IGAN:", igan);
    const response = await api.get(`/accounts/${igan}`);
    return response.data as GoldAccountDetails;
  },

  getAccountBalance: async (
    igan: string,
    currency?: string,
  ): Promise<GoldAccountBalance> => {
    const query = currency ? `?currency=${currency}` : "";
    const response = await api.get(`/accounts/${igan}/balance${query}`);
    return response.data as GoldAccountBalance;
  },

  getAccountAssets: async (
    igan: string,
    params: GetAccountAssetsParams = {},
  ): Promise<GoldAccountAssetsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.include_history !== undefined) {
      queryParams.append("include_history", String(params.include_history));
    }

    // Only one filter_by is allowed
    if (params.filter_by) {
      const [key, value] = Object.entries(params.filter_by)[0];
      queryParams.append(key, value);
    }

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";
    const response = await api.get(`/accounts/${igan}/assets${queryString}`);
    return response.data as GoldAccountAssetsResponse;
  },

  searchAccountAssets: async (
    igan: string,
    params: SearchAccountAssetsParams = {},
  ): Promise<GoldAccountAssetsSearchResponse> => {
    const queryParams = new URLSearchParams();

    if (params.serial_number)
      queryParams.append("serial_number", params.serial_number);
    if (params.refiner_name)
      queryParams.append("refiner_name", params.refiner_name);
    if (params.min_weight !== undefined)
      queryParams.append("min_weight", params.min_weight.toString());
    if (params.max_weight !== undefined)
      queryParams.append("max_weight", params.max_weight.toString());

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";
    const response = await api.get(
      `/accounts/${igan}/assets/search${queryString}`,
    );
    return response.data as GoldAccountAssetsSearchResponse;
  },

  getAccountMovements: async (
    igan: string,
    params: GetAccountMovementsParams = {},
  ): Promise<GoldAccountMovementsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.offset !== undefined)
      queryParams.append("offset", params.offset.toString());
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());
    if (params.from_date) queryParams.append("from_date", params.from_date);
    if (params.to_date) queryParams.append("to_date", params.to_date);

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";
    const response = await api.get(`/accounts/${igan}/movements${queryString}`);
    return response.data as GoldAccountMovementsResponse;
  },
};