export interface BlockchainTransaction {
  hash: string;
  block: number;
  type: string;
  asset: string;
  from: string;
  to: string;
  status: string;
  timestamp: string;
}

export interface PaginatedTransactions {
  items: BlockchainTransaction[];
  totalCount: number;
  page: number;
  limit: number;
}
