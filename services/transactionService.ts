import { api } from "@/lib/axios";
import {
  CreateTransactionInput,
  GetTransactionsParams,
  Transaction,
  TransactionDetails,
  TransactionEventsResponse,
  TransactionOrdersResponse,
} from "@/types/transaction";

export const transactionService = {
  createTransaction: async (data: CreateTransactionInput) => {
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
  getTransactionByReference: async (
    transaction_reference: string,
  ): Promise<TransactionDetails> => {
    const response = await api.get<TransactionDetails>(
      `/transactions/${transaction_reference}`,
    );
    return response.data;
  },

  getTransactionEventsByReference: async (
    transaction_reference: string,
  ): Promise<TransactionEventsResponse> => {
    const response = await api.get<TransactionEventsResponse>(
      `/transactions/${transaction_reference}/events`,
    );
    return response.data;
  },
};
