"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AssetDetails, AssetSummary } from "@/types/asset";
import { User, Home } from "lucide-react";
import { StatusBadge } from "@/components/data-display/status-badge";
import { getAssetStatusLabel } from "@/lib/assets";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface Props {
  asset: AssetSummary;
}

export function OwnershipLocationCard({ asset }: Props) {
  const statusLabel = getAssetStatusLabel(asset?.current_status);

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
        <CardTitle className="text-base flex items-center gap-2">
          <User className="h-4 w-4 text-emerald-500" />
          Ownership & Location
        </CardTitle>

        {/* Status Badge */}
        <StatusBadge status={statusLabel} />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Current Owner */}
          <InfoItem
            label="Current Owner"
            icon={<User className="h-3 w-3 text-emerald-500" />}
          >
            <AddressDisplay
              address={asset.current_owner_igan}
              truncate
              startChars={4}
              endChars={4}
              className="font-medium text-slate-700"
            />
          </InfoItem>

          {/* Vault Site */}
          <InfoItem
            label="Vault Site ID / Vault ID"
            icon={<Home className="h-3 w-3 text-blue-500" />}
          >
            {asset.current_vault_site_id ?? "N/A"} / {asset.current_vault_id ?? "N/A"}
          </InfoItem>
        </div>
      </CardContent>
    </Card>
  );
}

/* ================= HELPER COMPONENT ================= */
function InfoItem({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
        {icon && <span className="text-gray-400">{icon}</span>}
        {children}
      </div>
    </div>
  );
}
