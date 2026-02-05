"use client";

import { Asset } from "@/types/asset";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/data-display/status-badge";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { formatDate, formatWeight, formatCurrency } from "@/lib/utils";
import { getAssetStatusLabel } from "@/lib/assets";
import {
  User,
  Scale,
  Gem,
  DollarSign,
  Calendar,
  Hash,
  Tag,
  Barcode,
} from "lucide-react";

interface AssetsTableProps {
  assets: Asset[];
}

export default function AssetsTable({ assets }: AssetsTableProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader className="bg-slate-50 dark:bg-gray-900">
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                <Barcode className="h-3.5 w-3.5" />
                Serial
              </div>
            </TableHead>

            <TableHead>
              <div className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5" />
                Type
              </div>
            </TableHead>

            <TableHead>
              <div className="flex items-center gap-2">
                <Hash className="h-3.5 w-3.5" />
                Token ID
              </div>
            </TableHead>

            <TableHead>
              <div className="flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5" />
                Value
              </div>
            </TableHead>

            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {assets.map((asset) => (
            <TableRow
              key={asset.token_id}
              className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {/* Serial */}
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {asset.serial_number}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <User className="h-3 w-3" />
                    <span className="truncate max-w-[120px]">
                      {asset.owner_igan}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Type */}
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {asset.gold_product_type_id.toUpperCase()}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Scale className="h-3 w-3" />
                    <span>{formatWeight(asset.weight_grams)}</span>
                    <Gem className="h-3 w-3" />
                    <span>{asset.fineness}‰</span>
                  </div>
                </div>
              </TableCell>

              {/* Token ID */}
              <TableCell>
                <div className="space-y-0.5">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    <AddressDisplay
                      address={asset.token_id}
                      truncate
                      startChars={4}
                      endChars={4}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(asset.createdAt, "short")}
                  </div>
                </div>
              </TableCell>

              {/* Value */}
              <TableCell>
                <p className="font-semibold text-gold-700 dark:text-gold-300">
                  {formatCurrency(0)}
                </p>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge
                  status={getAssetStatusLabel(asset.status)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
