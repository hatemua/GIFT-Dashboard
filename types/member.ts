export interface Member {
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
