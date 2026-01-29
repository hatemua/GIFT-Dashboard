import { api } from "@/lib/axios";
import { Block } from "@/types/block";

export const blocksService = {
  getBlocks: async (page: number = 1, limit: number = 10) => {
    // const res = await api.get(`/blocks`, { params: { page, limit } });
    // return res.data as {
    //   data: Block[];
    //   totalCount: number;
    // };
    
    // Mocked response
    return {
      data: MOCK_BLOCKS.slice((page - 1) * limit, page * limit),
      totalCount: MOCK_BLOCKS.length,
    };
  },
};

export const MOCK_BLOCKS: Block[] = [
  {
    height: 128950,
    hash: "0x9a3b7c2d1e8f4b91c0a6d7e9f1b2c3a4d5e6f7b8",
    timestamp: "2026-01-29 14:40:12",
    transactionsCount: 10,
    producer: "GIFT-VALIDATOR-01",
    size: 48231,
  },
  {
    height: 128949,
    hash: "0x7d1c4e9b3a2f6c8e1b0d9f4c2e7a6b8d1c5e4f3",
    timestamp: "2026-01-29 14:39:59",
    transactionsCount: 7,
    producer: "GIFT-VALIDATOR-02",
    size: 45102,
  },
  {
    height: 128948,
    hash: "0x4b2d9e1a7c6f3e8b0d5a9f1c2e4b6a7d8c9f3e1",
    timestamp: "2026-01-29 14:39:45",
    transactionsCount: 15,
    producer: "GIFT-VALIDATOR-03",
    size: 52988,
  },
  {
    height: 128947,
    hash: "0x1f9b3a8e4c6d7a2e5f0b9c1d4e8a6f3b2d7c9f0",
    timestamp: "2026-01-29 14:39:30",
    transactionsCount: 6,
    producer: "GIFT-VALIDATOR-01",
    size: 39842,
  },
  {
    height: 128946,
    hash: "0x8d4c2a6f1b3e9c0d7a5f4e2b8c1d9a6e3f7b1c5",
    timestamp: "2026-01-29 14:39:15",
    transactionsCount: 12,
    producer: "GIFT-VALIDATOR-04",
    size: 50671,
  },
];
