"use client";

import { Asset } from "@/types/asset";
import { ShieldCheck, ShieldX, Coins } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AssetsTableProps {
  assets: Asset[];
}

export function AssetsTable({ assets }: AssetsTableProps) {
  if (!assets.length) {
    return <p className="text-center py-10 text-slate-500">No assets found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border border-slate-200">
        <TableHeader>
          <TableRow className="bg-slate-100 text-left text-sm text-slate-600">
            <TableHead>Serial</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Refiner</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Fineness</TableHead>
            <TableHead>GIC</TableHead>
            <TableHead>Manufacture Date</TableHead>
            <TableHead>Certified</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assets.map((asset) => (
            <TableRow
              key={asset.serial_number}
              className="hover:bg-slate-50 transition-colors"
            >
              <TableCell>{asset.serial_number}</TableCell>
              <TableCell className="flex items-center gap-1 capitalize">
                <Coins className="h-4 w-4" />
                {asset.gold_product_type_id}
              </TableCell>
              <TableCell>{asset.refiner_name}</TableCell>
              <TableCell>{asset.weight_grams} g</TableCell>
              <TableCell>{asset.fineness}‰</TableCell>
              <TableCell>{asset.traceability_gic}</TableCell>
              <TableCell>
                {new Date(asset.manufacture_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {asset.certified ? (
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                ) : (
                  <ShieldX className="h-4 w-4 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
