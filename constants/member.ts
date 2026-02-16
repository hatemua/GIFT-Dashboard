export const ENTITY_TYPES = [
  {
    label: "Company",
    value: "company",
    description: "Registered legal entity operating as a business",
  },
  {
    label: "Individual",
    value: "individual",
    description: "Natural person acting in a personal capacity",
  },
  {
    label: "Institution",
    value: "institution",
    description: "Bank, fund, or regulated financial institution",
  },
] as const;

export const COMPLIANCE_LEVELS = [
  {
    label: "Standard",
    value: "standard",
    description: "Standard KYC with basic regulatory checks",
  },
  {
    label: "Enhanced",
    value: "enhanced",
    description: "Enhanced due diligence and extended compliance review",
  },
] as const;

export const ROLES = [
  {
    label: "Refiner",
    value: "ROLE_REFINER",
    description: "Authorized to refine and process precious metals",
  },
  {
    label: "Minter",
    value: "ROLE_MINTER",
    description: "Authorized to mint and issue digital assets",
  },
  {
    label: "Custodian",
    value: "ROLE_CUSTODIAN",
    description: "Responsible for secure storage and custody of assets",
  },
  {
    label: "Vault Operator",
    value: "ROLE_VAULT_OP",
    description: "Manages operations of vaults and storage facilities",
  },
  {
    label: "LSP",
    value: "ROLE_LSP",
    description: "Logistics Service Provider managing transport of assets",
  },
  {
    label: "Auditor",
    value: "ROLE_AUDITOR",
    description: "Authorized to audit transactions and processes",
  },
  {
    label: "GMO",
    value: "ROLE_GMO",
    description: "Governance/Management Officer overseeing compliance",
  },
  {
    label: "Trader",
    value: "ROLE_TRADER",
    description: "Authorized to trade assets on the market",
  },
] as const;

export const ROLE_COLORS: Record<string, string> = {
  ROLE_REFINER: "bg-yellow-50 text-yellow-700 border-yellow-200",
  ROLE_MINTER: "bg-blue-50 text-blue-700 border-blue-200",
  ROLE_CUSTODIAN: "bg-purple-50 text-purple-700 border-purple-200",
  ROLE_VAULT_OP: "bg-pink-50 text-pink-700 border-pink-200",
  ROLE_LSP: "bg-amber-50 text-amber-700 border-amber-200",
  ROLE_AUDITOR: "bg-teal-50 text-teal-700 border-teal-200",
  ROLE_GMO: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  ROLE_TRADER: "bg-indigo-50 text-indigo-700 border-indigo-200",
};
