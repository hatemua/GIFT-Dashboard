import { COMPLIANCE_LEVELS, ENTITY_TYPES, ROLES } from "@/constants/member";

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

export interface CreateMemberInput {
  member_gic: string;
  entity_type: (typeof ENTITY_TYPES)[number]["value"];
  compliance_level: (typeof COMPLIANCE_LEVELS)[number]["value"];
  roles: (typeof ROLES)[number]["value"][];
}

