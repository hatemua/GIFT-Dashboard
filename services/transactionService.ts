import { api } from "@/lib/axios";
import { Transaction } from "@/types/transaction";

export const transactionService = {
  createTransaction: async (data: Transaction) => {
    const response = await api.post("/transactions/create", data);
    return response.data;
  },

  getTransactions: async (
    page: number = 1,
    limit: number = 10,
    filters?: { transaction_reference?: string; transaction_type?: string },
  ) => {
    const response = await api.get("/transactions", {
      params: { page, limit, ...filters },
    });
    return response.data as {
      data: Transaction[];
      totalCount: number;
    };
  },
};
