import { api } from "@/lib/axios";
import { SearchResponse, SearchResultItem, SourceType } from "@/types/search";

export const searchService = {
  searchAll: async (
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<SearchResponse> => {
    // if (!query.trim()) {
    //   return {
    //     page,
    //     limit,
    //     count: 0,
    //     data: [],
    //   };
    // }

    // const { data } = await api.get<SearchResponse>("/search", {
    //   params: { q: query, page, limit },
    // });

    return mockSearchResults;
  },
};

export const mockSearchResults: SearchResponse = {
  page: 1,
  limit: 10,
  count: 8,
  data: [
    {
      source_type: "member" as SourceType,
      member_gic: "GIC-2026-REFINER-007",
      roles: ["admin", "auditor"],
      entity_type: "Refinery",
      createdAt: "2026-02-12T09:30:00Z",
    },
    // {
    //   source_type: "member" as SourceType,
    //   member_gic: "GIC-2026-MINER-102",
    //   roles: ["miner"],
    //   entity_type: "Mining Company",
    //   createdAt: "2026-02-10T15:20:00Z",
    // },
    {
      source_type: "gold_asset" as SourceType,
      serial_number: "ASSET-2026-0101",
      token_id: "TOKEN-101",
      gold_product_type_id: "GOLD-BAR",
      asset_status: "available",
      createdAt: "2026-01-28T08:45:00Z",
    },
    // {
    //   source_type: "gold_asset" as SourceType,
    //   serial_number: "ASSET-2026-0102",
    //   token_id: "TOKEN-102",
    //   gold_product_type_id: "GOLD-COIN",
    //   asset_status: "locked",
    //   createdAt: "2026-01-30T12:10:00Z",
    // },
    // {
    //   source_type: "gold_asset" as SourceType,
    //   serial_number: "ASSET-2026-0103",
    //   token_id: "TOKEN-103",
    //   gold_product_type_id: "GOLD-BRACELET",
    //   asset_status: "available",
    //   createdAt: "2026-02-01T11:00:00Z",
    // },
    {
      source_type: "transaction_order" as SourceType,
      transaction_reference: "TXN-2026-0001",
      transaction_type: "purchase",
      transation_status: "completed",
      createdAt: "2026-02-05T14:20:00Z",
    },
    // {
    //   source_type: "transaction_order" as SourceType,
    //   transaction_reference: "TXN-2026-0002",
    //   transaction_type: "sale",
    //   transation_status: "pending",
    //   createdAt: "2026-02-07T10:15:00Z",
    // },
    // {
    //   source_type: "transaction_order" as SourceType,
    //   transaction_reference: "TXN-2026-0003",
    //   transaction_type: "transfer",
    //   transation_status: "failed",
    //   createdAt: "2026-02-09T16:40:00Z",
    // },
  ],
};

