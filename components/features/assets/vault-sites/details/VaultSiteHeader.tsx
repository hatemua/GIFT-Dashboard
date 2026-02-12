"use client";

import { AlertCircle, Building, CheckCircle, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";

interface Props {
  vault: any;
}

export function VaultSiteHeader({ vault }: Props) {
  const { isAdmin } = useAuthStore();
  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        color: "bg-emerald-500",
        icon: CheckCircle,
        text: "Active",
        badge: "success",
      },
      inactive: {
        color: "bg-gray-400",
        icon: AlertCircle,
        text: "Inactive",
        badge: "secondary",
      },
      under_audit: {
        color: "bg-amber-500",
        icon: AlertCircle,
        text: "Under Audit",
        badge: "warning",
      },
      suspended: {
        color: "bg-rose-500",
        icon: AlertCircle,
        text: "Suspended",
        badge: "destructive",
      },
    };
    return configs[status as keyof typeof configs] || configs.inactive;
  };

  const statusConfig = getStatusConfig(vault.status);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-gold-100 to-amber-100 rounded-lg">
            <Building className="h-5 w-5 text-gold-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {vault.vault_site_name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={statusConfig.badge as any} className="text-xs">
                {statusConfig.text}
              </Badge>
              <span className="text-xs text-gray-500 font-mono">
                ID: {vault.vault_site_id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-xs text-gray-500">Member GIC</p>
          <p className="text-sm font-semibold text-gray-900">
            {vault.member_gic}
          </p>
        </div>
        {isAdmin && (
          <Link href="/vault-sites/new">
            <Button
              variant="gold"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              New Vault
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
