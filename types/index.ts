// GIFT Member Types
export type MemberType =
  | "Bullion Bank"
  | "Gold Trader"
  | "Gold Custodian"
  | "Refinery"
  | "Guarantee Trusted Third Party";

export type MemberRole =
  | "ROLE_REFINER"
  | "ROLE_MINTER"
  | "ROLE_TRADER"
  | "ROLE_CUSTODIAN"
  | "ROLE_VAULT_OP"
  | "ROLE_LSP"
  | "ROLE_AUDITOR"
  | "ROLE_PLATFORM"
  | "ROLE_GOVERNANCE";

export type MemberStatus = "Active" | "Suspended" | "Revoked";

export interface GiftMember {
  member_gic: string; // Primary Key - 8 chars (ISO 9362 based)
  entity_name: string;
  type_member: MemberType;
  country: string;
  member_roles: MemberRole[];
  current_member_status: MemberStatus;
  membership_effective_date: string;
  contact_email?: string;
  contact_phone?: string;
  registered_address?: string;
  city?: string;
  postal_code?: string;
  website?: string;
}

// Gold Asset (NFT) Types
export type AssetStatus =
  | "IN_VAULT"
  | "IN_TRANSIT"
  | "PLEDGED"
  | "LOCKED"
  | "MISSING"
  | "STOLEN";

export type BlockchainStatus = "Minted" | "Transferred" | "Burnt";

export type CustodyPartyType =
  | "Member"
  | "Logistics Services Provider"
  | "Participating Customs";

export interface GoldAsset {
  token_id: string; // Primary Key - NFT hash
  gift_bullion_id: string; // ${Refiner_Name}-${Serial}
  traceability_gic: string; // Member who introduced asset
  refiner_name: string;
  serial_number: string;
  gold_product_type_id: string;
  fineness: number; // 999.5, 999.9
  weight_grams: number;
  asset_value_at_minting: number;
  gold_rate_at_minting: number;
  certificate_of_origin?: string;
  custody_party_type: CustodyPartyType;
  custody_party_id: string;
  asset_status: AssetStatus;
  blockchain_status: BlockchainStatus;
  created_on_chain_at: string;
  last_on_chain_update: string;
  image_url?: string;
}

// Gold Account (IGAN) Types
export type GoldAccountStatus = "Active" | "Suspended" | "Closed";
export type AllocationMode = "Allocated" | "Unallocated";
export type HolderType = "Member" | "End_Customer";

export interface GoldAccount {
  igan: string; // Primary Key - similar to IBAN
  managing_member_gic: string;
  holder_type: HolderType;
  holder_id: string;
  vault_site_id: string;
  vault_id: string;
  gold_account_status: GoldAccountStatus;
  allocation_mode: AllocationMode;
  guarantee_deposit_account: boolean;
  total_gold_assets: number;
  total_weight_grams: number;
  total_fine_weight_grams: number;
  total_valuation_currency: string;
  total_valuation_amount: number;
}

// Transaction Types
export type TransactionStatus =
  | "Draft"
  | "Created"
  | "Submitted for approval"
  | "Approved by Counterparty"
  | "RFQ generated"
  | "Transportation plan completed"
  | "Documentation completed"
  | "Validated"
  | "In execution"
  | "Investigation"
  | "Settled"
  | "Closed"
  | "Suspended"
  | "Canceled";

export interface TransactionOrder {
  transaction_reference: string; // Primary Key - 8 chars
  transaction_type: string;
  transaction_status: TransactionStatus;
  sender_igan: string;
  receiver_igan: string;
  initiator_gic: string;
  counterparty_gic: string;
  cargo_weight_grams: number;
  cargo_fineness_millieme: number;
  transaction_value: number;
  valuation_currency: string;
  initiation_timestamp: string;
  completion_timestamp?: string;
  assets?: string[]; // Array of token_ids
}

// Transaction Event Types
export type EventCriticality =
  | "Nominal performance"
  | "Critical"
  | "Highly critical";

export type TriggeringEntityType = "GIFT Member" | "LSP" | "SYSTEM";

export interface TransactionEvent {
  event_id: string;
  transaction_id: string;
  event_timestamp: string;
  event_gps_coordinates?: string;
  event_type: string;
  event_criticality: EventCriticality;
  triggering_entity_type: TriggeringEntityType;
  triggering_entity_id: string;
  event_description?: string;
}

// Vault Site Types
export interface VaultSite {
  vault_site_id: string;
  vault_site_name: string;
  member_gic: string;
  location_name: string;
  city: string;
  country: string;
  number_of_vaults: number;
  maximum_weight_ingold_kg: number;
  insurance_coverage_name_of_insurer: string;
  insurance_coverage_expiration_date: string;
  last_audit_date: string;
}

// Logistics Service Provider Types
export type LSPStatus = "Active" | "Inactive" | "Suspended" | "Revoked";

export interface LogisticsServiceProvider {
  lsp_id: string;
  lsp_name: string;
  lsp_type: string;
  legal_entity_name: string;
  incorporation_country: string;
  lsp_status: LSPStatus;
  countries_of_operations: string[];
  weight_limit_kg: number;
}

// Transportation Plan Types
export type TransferType = "Physical" | "Virtual";
export type TransportMode = "Air" | "Road" | "Rail" | "Mixed";

export interface TransportationLeg {
  leg_number: number;
  departure_country: string;
  arrival_country: string;
  estimated_departure_date: string;
  estimated_arrival_date: string;
  transport_mode: TransportMode;
}

export interface TransportationPlan {
  transportation_plan_id: string;
  transaction_id: string;
  transfer_type: TransferType;
  departure_storage_id: string;
  arrival_storage_id: string;
  lsp_id: string;
  legs: TransportationLeg[];
  transportation_price: number;
  transportation_price_currency: string;
  customs_duties: number;
  customs_duties_currency: string;
}

// GIFT User Types
export type UserStatus = "Active" | "Inactive" | "Suspended" | "Revoked";
export type UserEntityType = "Member" | "GMO" | "LSP";

export interface GiftUser {
  user_id: string;
  entity_type: UserEntityType;
  entity_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  status: UserStatus;
  last_login_at: string;
  roles?: MemberRole[];
}

// Blockchain Types
export interface BlockInfo {
  block_number: number;
  block_hash: string;
  timestamp: string;
  transactions_count: number;
  validator?: string;
}

export interface BlockchainTransaction {
  tx_hash: string;
  block_number: number;
  from_address: string;
  to_address: string;
  transaction_type: string;
  timestamp: string;
  status: "Success" | "Failed" | "Pending";
  gas_used?: number;
}
