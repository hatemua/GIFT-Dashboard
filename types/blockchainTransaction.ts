export interface BlockchainTransaction {
  tx_hash: string;
  status: string;
  from_address: string;
  to_address: string;
  gaz_used: string;
  block_number: string;
  timestamp: number;
  active: boolean;
  creator_gic: string;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
}

export interface BlockchainTransactionResponse {
  count: number;
  limit: number;
  page: number;
  transactions: BlockchainTransaction[];
}

export interface BlockchainTransactionFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  status?: string;
}
