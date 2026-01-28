import { api } from "@/lib/axios";
import { BlockchainTransaction } from "@/types/blockchainTransaction";

export const blockchainTransactionService = {
  getTransactions: async (
    page: number = 1,
    limit: number = 10,
  ) => {
    const response = await api.get(`/transactions`, {
      params: { page, limit },
    });
    return response.data as {
      data: BlockchainTransaction[];
      totalCount: number;
    };
  },
};
