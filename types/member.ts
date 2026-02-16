import { COMPLIANCE_LEVELS, ENTITY_TYPES, ROLES } from "@/constants/member";

export interface CreateMemberInput {
  member_gic: string;
  entity_type: (typeof ENTITY_TYPES)[number]["value"];
  compliance_level: (typeof COMPLIANCE_LEVELS)[number]["value"];
  roles: (typeof ROLES)[number]["value"][];
}

export interface CreateMemberResponse {
    member_gic: string;
  access_token: string;
  secret_token: string;

  status: "active" | "inactive" | "suspended";
  entity_type: "company" | "individual";
  compliance_level: "basic" | "standard" | "enhanced";

  created_at: string; // ISO date
  created_by_admin: string;

  member_hash: string;
  blockchain_tx: string;
}

export interface BlacklistedMember {
  member_gic: string;
  blacklisted_at: string;
  created_by_admin: string;
}

export interface MembersFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  roles?: string;
}

export interface GetMembersParams {
  page: number;
  limit: number;
  filters?: MembersFilters;
}


export interface Member {
  member_gic: string;
  status: "active" | string;
  compliance_level: "enhanced" | string;
  member_role: number;
  entity_type: "company" | "institution" | string;
  member_hash: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  added_by: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  roles: string[];
}

export interface MembersResponse {
  count: number;
  limit: string;
  page: string;
  members: Member[];
}

export interface MemberDetails {
  member_gic: string;
  status: "active" | "blacklisted";
  compliance_level: string;
  member_role: number;
  entity_type: string;
  member_hash: string;
  createdAt: string;
  updatedAt: string;
  added_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MemberAccount {
  igan: string;
  gold_account_purpose: string;
  active: boolean;
  member_gic: string;
  vault_site_id: string;
  created_at: string;
  vault_id: string | null;
}

export interface GetMemberResponse {
  member: MemberDetails;
  roles: string[];
}

export interface GetMemberAccountsResponse {
  member_gic: string;
  goldAccounts: MemberAccount[];
}

