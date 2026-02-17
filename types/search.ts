import { AssetStatus } from "./asset";

export type SearchResultItem = {
  source_type: SourceType; //all
  member_gic?: string | null; //member
  serial_number?: string | null; //asset
  token_id?: string | null; //asset
  gold_product_type_id?: string | null; //assset
  transaction_reference?: string | null; //transaction
  asset_status?: AssetStatus; //asset
  created_at?: string; //all
  transaction_type?: string; //transaction
  transation_status?: string; //transaction
  roles?: string[]; //member
  entity_type?: string; //member
};

export interface SearchResponse {
  page: number;
  limit: number;
  count: number;
  data: SearchResultItem[];
}

export type SourceType = "member" | "transaction_order" | "gold_asset";
