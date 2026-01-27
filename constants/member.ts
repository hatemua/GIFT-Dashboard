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
] as const;