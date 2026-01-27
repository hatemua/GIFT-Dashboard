export interface User {
  user_id: string;
  access_token: string;
  secret_token: string;
  user_hash: string;
  status: "active" | "inactive" | "suspended";
  member_linked: boolean;
  member_gic: string | null;
  created_at: string;
  created_by_admin: string;
  blockchain_tx: string | null;
}