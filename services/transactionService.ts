import { api } from "@/lib/axios";
import {
  CreateTransactionInput,
  GetTransactionsParams,
  SignTransactionResponse,
  TransactionDetails,
  TransactionEventsResponse,
  TransactionOrdersResponse,
  UpdateTransactionStatusResponse,
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
  signTransaction: async (
    transaction_reference: string,
    data: {
      signature: string;
      signing_role: "counterparty" | "initiator";
    },
  ): Promise<SignTransactionResponse> => {
    const response = await api.post<SignTransactionResponse>(
      `/transactions/${transaction_reference}/sign`,
      data,
    );
    return response.data;
  },
  updateTransactionStatus: async (
    transaction_reference: string,
    data: {
      new_status: string;
      reason?: string | null;
    },
  ): Promise<UpdateTransactionStatusResponse> => {
    const response = await api.put<UpdateTransactionStatusResponse>(
      `/transactions/${transaction_reference}/status`,
      data,
    );
    return response.data;
  },
};
