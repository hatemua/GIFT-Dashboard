import React from "react";
import { Inbox, Package as PackageIcon, Box, Layers, Users, User, CreditCard } from "lucide-react";

export type EmptyStateType =
  | "transactions"
  | "blockchainTransactions"
  | "vaults"
  | "assets"
  | "blocks"
  | "goldAccounts"
  | "vaultSites"
  | "members"
  | "users";

interface EmptyStateConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const EMPTY_STATES: Record<EmptyStateType, EmptyStateConfig> = {
  transactions: {
    title: "No transactions found",
    description: "Transactions will appear here once available.",
    icon: <Inbox className="h-6 w-6" />,
  },
  blockchainTransactions: {
    title: "No blockchain transactions",
    description: "On-chain transactions will appear here once they are available.",
    icon: <Layers className="h-6 w-6" />,
  },
  vaults: {
    title: "No vaults found",
    description: "Vaults linked to your organization will be displayed here.",
    icon: <PackageIcon className="h-6 w-6" />,
  },
  assets: {
    title: "No assets yet",
    description: "Minted gold assets will appear here once created.",
    icon: <Box className="h-6 w-6" />,
  },
  blocks: {
    title: "No blocks available",
    description: "Blockchain blocks will show up here once indexed.",
    icon: <Layers className="h-6 w-6" />,
  },
  goldAccounts: {
    title: "No gold accounts",
    description: "Gold accounts will be displayed here once created.",
    icon: <CreditCard className="h-6 w-6" />,
  },
  vaultSites: {
    title: "No vault sites",
    description: "Vault sites linked to your organization will appear here.",
    icon: <PackageIcon className="h-6 w-6" />,
  },
  members: {
    title: "No members found",
    description: "Members will appear here once added.",
    icon: <User className="h-6 w-6" />,
  },
  users: {
    title: "No users found",
    description: "Users will be displayed here once registered.",
    icon: <Users className="h-6 w-6" />,
  },
};
