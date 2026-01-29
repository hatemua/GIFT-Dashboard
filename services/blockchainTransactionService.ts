import { api } from "@/lib/axios";
import { BlockchainTransaction } from "@/types/blockchainTransaction";

export const blockchainTransactionService = {
  getTransactions: async (page: number = 1, limit: number = 10) => {
    // const response = await api.get(`/transactions`, {
    //   params: { page, limit },
    // });
    // return response.data as {
    //   data: BlockchainTransaction[];
    //   totalCount: number;
    // };

    // Mocked response
    return {
      data: MOCK_BLOCKCHAIN_TRANSACTIONS.slice((page - 1) * limit, page * limit),
      totalCount: MOCK_BLOCKCHAIN_TRANSACTIONS.length,
    };
  },
};

export const MOCK_BLOCKCHAIN_TRANSACTIONS: BlockchainTransaction[] = [
  {
    hash: "0xa9f4e7b3c8d2e1f6b0a5c4d9e8f1a2b3c7d8e9",
    block: 128950,
    type: "Mint",
    asset: "Gold Bar 1kg",
    from: "0x0000000000000000000000000000000000000000",
    to: "0x91bA34fE8d2c9F17A9E4b7cD1A3F5C8D9E2aB7C",
    status: "Success",
    timestamp: "2026-01-29 14:40:11",
  },
  {
    hash: "0x7d1e8c9f3b4a5e6c2d0f9a8b7e1c4f6d3a5b9",
    block: 128950,
    type: "Transfer",
    asset: "Gold Bar 100g",
    from: "0x91bA34fE8d2c9F17A9E4b7cD1A3F5C8D9E2aB7C",
    to: "0x3A9cE17D8F1b4e5A7c2D6B9f0A8C1E4D5B7F9",
    status: "Pending",
    timestamp: "2026-01-29 14:40:08",
  },
  {
    hash: "0x5e4c3a1b9d8f7a6e2c0b4f1d5a9c8e7b6f3d2",
    block: 128949,
    type: "Burn",
    asset: "Gold Token",
    from: "0x3A9cE17D8F1b4e5A7c2D6B9f0A8C1E4D5B7F9",
    to: "0x0000000000000000000000000000000000000000",
    status: "Success",
    timestamp: "2026-01-29 14:39:58",
  },
  {
    hash: "0x9c1b2f8e4d6a7c0e5b3f9a8d1c2e4b7f6a5",
    block: 128949,
    type: "Transfer",
    asset: "Gold Bar 250g",
    from: "0xF1A9c8D7B3e2A5F4E6C9D1B8a0f4C5E7d9",
    to: "0x8A3C5D9E4F1B7c2E6A0D9F8B4aC1E5D7",
    status: "Failed",
    timestamp: "2026-01-29 14:39:53",
  },
  {
    hash: "0x4f8e1c5d9b6a7e3a2c0f4b1d8f9e7c5a6b",
    block: 128948,
    type: "Mint",
    asset: "Gold Bar 500g",
    from: "0x0000000000000000000000000000000000000000",
    to: "0x7E9B5A8D4C1F6B3E2A0C9D8F5E7B1A",
    status: "Success",
    timestamp: "2026-01-29 14:39:44",
  },
];
