export interface Block {
  height: number;
  hash: string;
  timestamp: string;
  transactionsCount: number;
  producer: string;
  size: number;
}
