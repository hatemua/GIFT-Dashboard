import {
  LayoutDashboard,
  Search,
  ArrowLeftRight,
  Package,
  FileCheck,
  Users,
  Settings,
  Receipt,
  FileText,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Blockchain Explorer",
    href: "/explorer",
    icon: Search,
    children: [
      {
        title: "Transactions",
        href: "/explorer/transactions",
        icon: ArrowLeftRight,
      },
      {
        title: "Assets (NFTs)",
        href: "/explorer/assets",
        icon: Package,
      },
      {
        title: "Blocks",
        href: "/explorer/blocks",
        icon: FileText,
      },
    ],
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
    children: [
      {
        title: "Orders",
        href: "/transactions/orders",
        icon: Receipt,
      },
      {
        title: "Create New",
        href: "/transactions/new",
        icon: FileText,
      },
    ],
  },
  {
    title: "Asset Management",
    href: "/assets",
    icon: Package,
    children: [
      {
        title: "Gold Assets",
        href: "/assets",
        icon: Package,
      },
      {
        title: "Mint New Asset",
        href: "/assets/mint",
        icon: FileText,
      },
      {
        title: "Gold Accounts",
        href: "/assets/accounts",
        icon: Receipt,
      },
      {
        title: "Vaults",
        href: "/assets/vaults",
        icon: Settings,
      },
    ],
  },
  {
    title: "Traceability",
    href: "/traceability",
    icon: FileCheck,
    children: [
      {
        title: "Asset Provenance",
        href: "/traceability/provenance",
        icon: FileCheck,
      },
      {
        title: "Audit Trail",
        href: "/traceability/audit",
        icon: FileText,
      },
    ],
  },
  {
    title: "Members",
    href: "/members",
    icon: Users,
  },
  {
    title: "Administration",
    href: "/admin",
    icon: Settings,
    children: [
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Whitelist",
        href: "/admin/whitelist",
        icon: FileCheck,
      },
      {
        title: "Configuration",
        href: "/admin/config",
        icon: Settings,
      },
    ],
  },
  {
    title: "Billing",
    href: "/billing",
    icon: Receipt,
  },
];
