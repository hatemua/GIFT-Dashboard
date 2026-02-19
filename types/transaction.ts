import { AssetStatus } from "./asset";

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
export interface CreateTransactionInput {
  transaction_reference: string;
  transaction_type: TransactionType;
  counterparty_gic: string;
  initiator_gic: string;
  requested_assets: string[];
  valuation_date: string;
  valuation_currency: string;
  transaction_value: number;
  reciever_igan: string;
  sender_igan: string;
  initiator_signature: string;
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
  transaction_type: TransactionType;
  valuation_date: string;
  valuation_currency: string;
  status: TransactionStatus;
  transaction_value: number;
  counterparty_gic: string;
  initiator_gic: string;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionDetails {
  transaction_reference: string;
  transaction_id: string;
  type: string; // e.g., "transfer"
  status: string; // e.g., "executed"
  parties: {
    initiator: {
      gic: string;
      igan: string;
    };
    counterparty: {
      gic: string;
      igan: string;
    };
  };
  assets: {
    token_id: string;
    quantity: number;
    weight_grams: number;
    fine_weight_grams: number;
    status: AssetStatus;
  }[];
  valuation: {
    date: string; // ISO date string
    currency: string; // e.g., "USD"
    amount: number; // total value
    spot_price_reference: number; // e.g., 65
  };
  signatures: {
    signer: string;
    signing_role: "initiator" | "counterparty" | string;
    timestamp: string; // ISO datetime
    signature: string;
  }[];
  created_at: string; // ISO datetime
  executed_at: string; // ISO datetime
}

export interface TransactionEvent {
  event_id: string;
  event_type: "created" | "signed" | "executed" | string;
  timestamp: string;
  actor: string;
  block_number: string;
  transaction_hash: string;
}

export interface TransactionEventsResponse {
  transaction_reference: string;
  events: TransactionEvent[];
  total_events: number;
}

export interface SignTransactionResponse {
  status: string;
  transaction_reference: string;
  signature_added: boolean;
  signer: string;
  signing_role: "initiator" | "counterparty";
  signatures_collected: number;
  signatures_required: number;
  transaction_status: string;
  signed_at: string;
  blockchain_tx: string;
}

export interface UpdateTransactionStatusResponse {
  status: string;
  transaction_reference: string;
  previous_status: string;
  new_status: string;
  reason: string | null;
  updated_at: string;
  updated_by: string;
  blockchain_tx: string | null;
}

export type TransactionType = "TRANSFER" | "SALE" | "PURCHASE" | "COLLATERAL";
export type TransactionStatus =
  | "EXECUTED"
  | "PENDING_EXECUTION"
  | "PENDING_COUNTERPARTY"
  | "PENDING_SIGNATURE";
