import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/data-display/status-badge";
import { MapPin, Package, Scale, Calendar } from "lucide-react";
import { formatDate, formatWeight } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface VaultSite {
  vault_site_id: string;
  vault_site_name: string;
  member_gic: string;
  city: string;
  country: string;
  number_of_vaults: number;
  maximum_weight_in_gold_kg: number;
  current_weight_in_gold_kg: number;
  status: string;
  last_audit_date: string;
}

interface VaultSitesTableProps {
  vaultSites: VaultSite[];
}

export function VaultSitesTable({ vaultSites }: VaultSitesTableProps) {
  return (
    <div className="overflow-x-auto w-full rounded-lg border border-slate-200 shadow-sm">
      <Table className="min-w-full border border-slate-200">
        {/* Table Header */}
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Vault Site</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Vaults</TableHead>
            <TableHead>Gold Stored</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Audit</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {vaultSites.map((vaultSite) => {
            const capacityPercentage =
              (vaultSite.current_weight_in_gold_kg /
                vaultSite.maximum_weight_in_gold_kg) *
              100;

            return (
              <TableRow
                key={vaultSite.vault_site_id}
                className="hover:bg-slate-50 transition-colors"
              >
                {/* Vault Name */}
                <TableCell>
                  <div className="font-semibold text-slate-900">
                    {vaultSite.vault_site_name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {vaultSite.member_gic}
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell>
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>
                      {vaultSite.city}, {vaultSite.country}
                    </span>
                  </div>
                </TableCell>

                {/* Number of Vaults */}
                <TableCell>
                  <div className="flex gap-2">
                    <Package className="h-4 w-4 text-slate-400" />
                    {vaultSite.number_of_vaults}
                  </div>
                </TableCell>

                {/* Gold Stored */}
                <TableCell>
                  <div className="flex gap-1 items-center">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {Math.round(capacityPercentage)}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      ({formatWeight(vaultSite.current_weight_in_gold_kg)} /{" "}
                      {formatWeight(vaultSite.maximum_weight_in_gold_kg)})
                    </div>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={vaultSite.status} />
                </TableCell>

                {/* Last Audit */}
                <TableCell>
                  <div className="flex gap-2">
                    <Calendar className="h-4 w-4 text-slate-400 text-xs" />
                    {formatDate(vaultSite.last_audit_date)}
                  </div>
                </TableCell>

                {/* Action */}
                <TableCell>
                  <Link href={`/vault-sites/${vaultSite.vault_site_id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full sm:w-auto hover:bg-yellow-50 hover:border-yellow-400 transition-colors"
                    >
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
