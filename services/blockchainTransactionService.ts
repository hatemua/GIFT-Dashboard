import { api } from "@/lib/axios";
import { BlockchainTransaction } from "@/types/blockchainTransaction";

export const blockchainTransactionService = {
  getTransactions: async (
    page: number = 1,
    limit: number = 10,
    filters?: { blockHash?: string; walletAddress?: string },
  ) => {
    const response = await api.get(`/transactions`, {
      params: { page, limit, ...filters },
    });
    return response.data as {
      data: BlockchainTransaction[];
      totalCount: number;
    };
  },
};
