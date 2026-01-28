export interface BlockchainTransaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  status: string;
  timestamp: string;
}

export interface PaginatedTransactions {
  items: BlockchainTransaction[];
  totalCount: number;
  page: number;
  limit: number;
}
