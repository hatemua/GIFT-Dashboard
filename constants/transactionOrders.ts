import {
  ArrowRightLeft,
  CheckCircle2,
  ShoppingCart,
  Archive,
  Hourglass,
  Clock,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export const TRANSACTION_TYPE_OPTIONS = [
  { label: "All", value: "", icon: Archive },
  { label: "Transfer", value: "TRANSFER", icon: ArrowRightLeft },
  { label: "Sale", value: "SALE", icon: ShoppingCart },
  { label: "Purchase", value: "PURCHASE", icon: CreditCard },
  { label: "Collateral", value: "COLLATERAL", icon: ShieldCheck },
] as const;

export const TRANSACTION_STATUS_OPTIONS = [
  { label: "All", value: "", icon: Archive },
  { label: "Executed", value: "EXECUTED", icon: CheckCircle2 },
  { label: "Pending execution", value: "PENDING_EXECUTION", icon: Hourglass },
  { label: "Pending counterparty", value: "PENDING_COUNTERPARTY", icon: Clock },
] as const;
