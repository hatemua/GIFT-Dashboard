import { api } from "@/lib/axios";
import { Asset } from "@/types/asset";

export const assetService = {
  mintAsset: async (data: Asset) => {
    const response = await api.post("/assets/register", data);
    return response.data;
  },

  getAssets: async (page: number = 1, limit: number = 10) => {
    // const response = await api.get(`/assets?page=${page}&limit=${limit}`);
    // return response.data as {
    //   data: Asset[];
    //   totalCount: number;
    // };

    return {
      data: mockAssets.slice((page - 1) * limit, page * limit),
      totalCount: mockAssets.length,
    };
  },
};

export const mockAssets: Asset[] = [
  {
    token_id: "GIFT-ASSET-2025-001",
    metadata: {
      serial_number: "REF2025001",
      refiner_name: "Swiss Refinery AG",
      weight_grams: 1000,
      fineness: 0.9999,
      fine_weight_grams: 999.9,
      gold_product_type_id: "bar",
      manufacture_date: "2025-01-15",
      certificate_origin_hash:
        "0xdef789012345678901234567890123456789012345678901234567890123456789",
      traceability_gic: "GIC-2025-0001",
    },
    ownership: {
      current_owner_igan: "IGAN-2025-12345",
      vault_site_id: "VAULT-SITE-ZH-001",
      asset_status: "stationary",
    },
    compliance: {
      certification_framework: "LBMA",
      certified: true,
      conflict_free: true,
      last_audit: "2025-01-20",
    },
    valuation: {
      asset_value: 65000,
      gold_rate: 65,
      currency: "USD",
      as_of: "2025-11-28T10:00:00Z",
    },
  },
  {
    token_id: "GIFT-ASSET-2025-002",
    metadata: {
      serial_number: "REF2025002",
      refiner_name: "Gold Refinery Ltd",
      weight_grams: 500,
      fineness: 0.999,
      fine_weight_grams: 499.5,
      gold_product_type_id: "coin",
      manufacture_date: "2025-02-01",
      certificate_origin_hash:
        "0xabc1234567890123456789012345678901234567890123456789012345678901",
      traceability_gic: "GIC-2025-0002",
    },
    ownership: {
      current_owner_igan: "IGAN-2025-54321",
      vault_site_id: "VAULT-SITE-ZH-002",
      asset_status: "stationary",
    },
    compliance: {
      certification_framework: "LBMA",
      certified: true,
      conflict_free: true,
      last_audit: "2025-02-05",
    },
    valuation: {
      asset_value: 32500,
      gold_rate: 65,
      currency: "USD",
      as_of: "2025-11-28T10:00:00Z",
    },
  },
  {
    token_id: "GIFT-ASSET-2025-003",
    metadata: {
      serial_number: "REF2025003",
      refiner_name: "Global Gold Inc",
      weight_grams: 250,
      fineness: 0.995,
      fine_weight_grams: 248.75,
      gold_product_type_id: "bar",
      manufacture_date: "2025-03-10",
      certificate_origin_hash:
        "0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef",
      traceability_gic: "GIC-2025-0003",
    },
    ownership: {
      current_owner_igan: "IGAN-2025-67890",
      vault_site_id: "VAULT-SITE-ZH-003",
      asset_status: "stationary",
    },
    compliance: {
      certification_framework: "LBMA",
      certified: false,
      conflict_free: true,
      last_audit: "2025-03-15",
    },
    valuation: {
      asset_value: 16250,
      gold_rate: 65,
      currency: "USD",
      as_of: "2025-11-28T10:00:00Z",
    },
  },
];
