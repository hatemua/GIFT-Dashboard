import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles = {
  // Transaction statuses
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  Created: "bg-blue-50 text-blue-700 border-blue-200",
  "Submitted for approval": "bg-purple-50 text-purple-700 border-purple-200",
  "Approved by Counterparty": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "RFQ generated": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Transportation plan completed": "bg-teal-50 text-teal-700 border-teal-200",
  "Documentation completed": "bg-lime-50 text-lime-700 border-lime-200",
  Validated: "bg-green-50 text-green-700 border-green-200",
  "In execution": "bg-amber-50 text-amber-700 border-amber-200",
  Investigation: "bg-orange-50 text-orange-700 border-orange-200",
  Settled: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Closed: "bg-slate-100 text-slate-600 border-slate-200",
  Suspended: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Canceled: "bg-red-50 text-red-700 border-red-200",

  // Asset statuses
  IN_VAULT: "bg-emerald-50 text-emerald-700 border-emerald-200",
  IN_TRANSIT: "bg-blue-50 text-blue-700 border-blue-200",
  PLEDGED: "bg-purple-50 text-purple-700 border-purple-200",
  LOCKED: "bg-amber-50 text-amber-700 border-amber-200",
  MISSING: "bg-red-50 text-red-700 border-red-200",
  STOLEN: "bg-red-100 text-red-800 border-red-300",

  // Member statuses
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
  Revoked: "bg-red-50 text-red-700 border-red-200",

  // Blockchain statuses
  Minted: "bg-green-50 text-green-700 border-green-200",
  Transferred: "bg-blue-50 text-blue-700 border-blue-200",
  Burnt: "bg-red-50 text-red-700 border-red-200",

  // Certified statuses
  Certified: "bg-green-50 text-green-700 border-green-200",
  "Not Certified": "bg-red-50 text-red-700 border-red-200",

  // Gold product types
  bar: "bg-yellow-50 text-yellow-700 border-yellow-200",
  coin: "bg-amber-50 text-amber-700 border-amber-200",
  ingot: "bg-orange-50 text-orange-700 border-orange-200",
} as const;

interface StatusBadgeProps {
  status: keyof typeof statusStyles | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const isKnownStatus = status in statusStyles;
  const statusStyle = isKnownStatus
    ? statusStyles[status as keyof typeof statusStyles]
    : "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <Badge
      variant="outline"
      className={cn("font-medium border capitalize", statusStyle, className)}
    >
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
