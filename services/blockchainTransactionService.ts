import { api } from "@/lib/axios";
import {
  BlockchainTransactionFilters,
  BlockchainTransactionResponse,
} from "@/types/blockchainTransaction";

interface GetTransactionsParams {
  page: number;
  limit: number;
  filters?: BlockchainTransactionFilters;
}

export const blockchainTransactionService = {
  getTransactions: async ({
    page,
    limit,
    filters = {},
  }: GetTransactionsParams): Promise<BlockchainTransactionResponse> => {
    const response = await api.get<BlockchainTransactionResponse>(
      "/dashboard/transactions",
      {
        params: {
          page,
          limit,
          search: filters.search,
          from_date: filters.from_date,
          to_date: filters.to_date,
          status: filters.status,
        },
      }
    );

    return response.data;
  },
};
