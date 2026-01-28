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
import { cn } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface Transaction {
  hash: string;
  block: number;
  type: string;
  asset: string;
  from: string;
  to: string;
  status: string;
  timestamp: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Tx Hash</TableHead>
                <TableHead>Block</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Asset</TableHead>
                <TableHead className="hidden xl:table-cell">From</TableHead>
                <TableHead className="hidden xl:table-cell">To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.hash}
                  className="transition hover:bg-muted/30"
                >
                  {/* Hash */}
                  <TableCell
                    className="max-w-[160px] truncate font-mono text-sm"
                    title={tx.hash}
                  >
                    <AddressDisplay
                      address={tx.hash}
                      truncate={true}
                      startChars={6}
                      endChars={6}
                    />
                  </TableCell>

                  {/* Block */}
                  <TableCell className="font-medium">#{tx.block}</TableCell>

                  {/* Type */}
                  <TableCell className="hidden md:table-cell">
                    {tx.type}
                  </TableCell>

                  {/* Asset */}
                  <TableCell className="hidden lg:table-cell">
                    {tx.asset}
                  </TableCell>

                  {/* From */}
                  <TableCell
                    className="hidden max-w-[180px] truncate font-mono xl:table-cell"
                    title={tx.from}
                  >
                    <AddressDisplay
                      address={tx.from}
                      truncate={true}
                      startChars={6}
                      endChars={6}
                    />
                  </TableCell>

                  {/* To */}
                  <TableCell
                    className="hidden max-w-[180px] truncate font-mono xl:table-cell"
                    title={tx.to}
                  >
                    <AddressDisplay
                      address={tx.to}
                      truncate={true}
                      startChars={6}
                      endChars={6}
                    />
                  </TableCell>

                  {/* Status */}
                  <TableCell>
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
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {tx.timestamp}
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
