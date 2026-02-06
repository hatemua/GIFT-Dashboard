import { api } from "@/lib/axios";
import { GetTransactionsParams, Transaction, TransactionOrdersResponse } from "@/types/transaction";

export const transactionService = {
  createTransaction: async (data: Transaction) => {
    const response = await api.post("/transactions/create", data);
    return response.data;
  },

  getTransactions: async ({
    page,
    limit,
    filters = {},
  }: GetTransactionsParams): Promise<TransactionOrdersResponse> => {
    const response = await api.get<TransactionOrdersResponse>(
      "/dashboard/transaction-orders",
      {
        params: {
          page,
          limit,
          search: filters.search,
          from_date: filters.from_date,
          to_date: filters.to_date,
          status: filters.status,
        },
      },
    );

    return response.data;
  },
};
