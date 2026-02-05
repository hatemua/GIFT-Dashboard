import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { BlockchainTransaction } from "@/types/blockchainTransaction";

interface TransactionsTableProps {
  transactions: BlockchainTransaction[];
}

const statusStyles: Record<string, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Horizontal scroll wrapper */}
        <div className="relative w-full overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="whitespace-nowrap">Tx Hash</TableHead>
                <TableHead className="whitespace-nowrap">Block</TableHead>
                <TableHead className="whitespace-nowrap">From</TableHead>
                <TableHead className="whitespace-nowrap">To</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.tx_hash}
                  className="transition hover:bg-muted/30"
                >
                  {/* Tx Hash */}
                  <TableCell
                    className="max-w-[180px] font-mono text-xs whitespace-nowrap"
                    title={tx.tx_hash}
                  >
                    <AddressDisplay
                      address={tx.tx_hash}
                      truncate
                      startChars={4}
                      endChars={4}
                    />
                  </TableCell>

                  {/* Block */}
                  <TableCell className="font-medium whitespace-nowrap">
                    #{tx.block_number}
                  </TableCell>

                  {/* From */}
                  <TableCell
                    className="max-w-[220px] font-mono text-xs whitespace-nowrap"
                    title={tx.from_address}
                  >
                    <AddressDisplay
                      address={tx.from_address}
                      truncate
                      startChars={4}
                      endChars={4}
                    />
                  </TableCell>

                  {/* To */}
                  <TableCell
                    className="max-w-[220px] font-mono text-xs whitespace-nowrap"
                    title={tx.to_address}
                  >
                    <AddressDisplay
                      address={tx.to_address}
                      truncate
                      startChars={4}
                      endChars={4}
                    />
                  </TableCell>

                  {/* Status */}
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        statusStyles[tx.status?.toLowerCase()] ??
                          "bg-slate-50 text-slate-700 border-slate-200",
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {formatDate(tx.createdAt, "long")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
