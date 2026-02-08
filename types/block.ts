export interface BlockItem {
  block_number: string;
  block_hash: string;
  number_of_transactions: number;
  timestamp: number;
}

export interface BlocksResponse {
  count: number;
  limit: string;
  page: string;
  blocks: BlockItem[];
}

export interface BlocksFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
}

export interface GetBlocksParams {
  page: number;
  limit: number;
  filters?: BlocksFilters;
}
