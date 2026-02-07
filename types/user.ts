export interface User {
  user_id: string;
  access_token: string;
  secret_token: string;
  user_hash: string;
  status: "active" | "inactive";
  member_linked: boolean;
  member_gic: string | null;
  created_at: string;
  created_by_admin: string;
  blockchain_tx: string | null;
}

export interface UsersFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  status?: UserStatus;
}

export interface GetUsersParams {
  page: number;
  limit: number;
  filters: UsersFilters;
}

export interface UserItem {
  user_id: string;
  client_id: string;
  entity_type: "individual" | "company" | "institution";
  member_gic: string | null;
  status: UserStatus;
  can_sign_transactions: boolean;
  created_at: string;
}

export interface UsersResponse {
  count: number;
  limit: number;
  page: number;
  users: UserItem[];
}

export type UserStatus = "active" | "inactive";

export interface CreateUserForm {
  offchain_user_id: string;
  member_gic: string;
}

// UpdateUserStatus 
export interface UpdateUserStatusPayload {
  user_id: string;
  action: "activate" | "deactivate";
}