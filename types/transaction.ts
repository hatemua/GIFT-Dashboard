export interface Transaction {
  id?: string;
  transaction_reference: string;
  transaction_type: string;
  counterparty_gic: string;
  requested_assets: string[];
  valuation_date: string;
  valuation_currency: string;
  transaction_value: number | null;
}

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error?: string;
}