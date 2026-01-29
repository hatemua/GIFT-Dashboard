import { api } from "@/lib/axios";
import { Transaction } from "@/types/transaction";

export const transactionService = {
  createTransaction: async (data: Transaction) => {
    const response = await api.post("/transactions/create", data);
    return response.data;
  },

  getTransactions: async (
    page: number = 1,
    limit: number = 6,
  ) => {
    // const response = await api.get("/transactions", {
    //   params: { page, limit },
    // });
    // return response.data as {
    //   data: Transaction[];
    //   totalCount: number;
    // };

    // Mocked response for demonstration purposes
    return {
      data: TRANSACTIONS_MOCK.slice((page - 1) * limit, page * limit),
      totalCount: TRANSACTIONS_MOCK.length,
    };
  },
};


// Mock data
export const TRANSACTIONS_MOCK: Transaction[] = [
  {
    id: "1",
    transaction_reference: "TX-ORD-0001",
    transaction_type: "transfer",
    counterparty_gic: "GIC-ALPHA-001",
    requested_assets: ["GOLD-001", "GOLD-002"],
    valuation_date: "2026-01-20",
    valuation_currency: "USD",
    transaction_value: 150000,
  },
  {
    id: "2",
    transaction_reference: "TX-ORD-0002",
    transaction_type: "sale",
    counterparty_gic: "GIC-BETA-014",
    requested_assets: ["GOLD-010"],
    valuation_date: "2026-01-21",
    valuation_currency: "EUR",
    transaction_value: 72500,
  },
  {
    id: "3",
    transaction_reference: "TX-ORD-0003",
    transaction_type: "purchase",
    counterparty_gic: "GIC-GAMMA-203",
    requested_assets: ["GOLD-021", "GOLD-022", "GOLD-023"],
    valuation_date: "2026-01-22",
    valuation_currency: "USD",
    transaction_value: 210000,
  },
  {
    id: "4",
    transaction_reference: "TX-ORD-0004",
    transaction_type: "collateral",
    counterparty_gic: "GIC-DELTA-088",
    requested_assets: ["GOLD-045"],
    valuation_date: "2026-01-23",
    valuation_currency: "USD",
    transaction_value: null, // pending valuation
  },
  {
    id: "5",
    transaction_reference: "TX-ORD-0005",
    transaction_type: "transfer",
    counterparty_gic: "GIC-OMEGA-999",
    requested_assets: ["GOLD-100", "GOLD-101"],
    valuation_date: "2026-01-24",
    valuation_currency: "GBP",
    transaction_value: 98000,
  },
  {
    id: "6",
    transaction_reference: "TX-ORD-0006",
    transaction_type: "sale",
    counterparty_gic: "GIC-SIGMA-456",
    requested_assets: ["GOLD-200"],
    valuation_date: "2026-01-25",
    valuation_currency: "USD",
    transaction_value: 45500,
  },
];
