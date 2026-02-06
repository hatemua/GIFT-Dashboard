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

export interface TransactionOrdersFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  status?: string;
  type?: string;
}

export interface GetTransactionsParams {
  page: number;
  limit: number;
  filters?: TransactionOrdersFilters;
}

export interface TransactionOrdersResponse {
  count: number;
  limit: number;
  page: number;
  transactions: TransactionItem[];
}

export interface TransactionItem {
  transaction_reference: string;
  transaction_id: string;
  transaction_type:  'TRANSFER'| 'SALE'| 'PURCHASE'| 'COLLATERAL';
  valuation_date: string;
  valuation_currency: string;
  status: "EXECUTED" | "PENDING_EXECUTION" | "PENDING_COUNTERPARTY";
  transaction_value: number;
  counterparty_gic: string;
  initiator_gic: string;
  createdAt: string; 
  updatedAt: string;   
  created_at: string;  
  updated_at: string;  
}
