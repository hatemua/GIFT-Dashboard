import { api } from "@/lib/axios";
import { Transaction } from "@/types/transaction";

export const transactionService = {
  createTransaction: async (data: Transaction) => {
    const response = await api.post("/transactions/create", data);
    return response.data;
  },

  getTransactions: async () => {
    const response = await api.get("/transactions");
    return response.data as Transaction[];
  },
};
