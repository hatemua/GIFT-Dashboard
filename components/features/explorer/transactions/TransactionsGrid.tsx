import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockchainTransaction } from "@/types/blockchainTransaction";
import { cn } from "@/lib/utils";

interface TransactionsGridProps {
  transactions: BlockchainTransaction[];
}

const statusStyles: Record<string, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function TransactionsGrid({
  transactions,
}: TransactionsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {transactions.map((tx) => (
        <Card
          key={tx.hash}
          className="group relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="space-y-4 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  Transaction hash
                </p>
                <p
                  className="truncate font-mono text-sm font-medium"
                  title={tx.hash}
                >
                  {tx.hash}
                </p>
              </div>

              <Badge variant="outline" className="shrink-0">
                {tx.type}
              </Badge>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Block</span>
              <span className="font-medium">#{tx.block}</span>
            </div>

            {/* Asset */}
            <div>
              <p className="text-xs text-muted-foreground">Asset</p>
              <p className="font-semibold">{tx.asset}</p>
            </div>

            {/* Addresses */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">From</span>
                <span
                  className="max-w-[65%] truncate text-right font-mono"
                  title={tx.from}
                >
                  {tx.from}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">To</span>
                <span
                  className="max-w-[65%] truncate text-right font-mono"
                  title={tx.to}
                >
                  {tx.to}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
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

              <span className="text-xs text-muted-foreground">
                {tx.timestamp}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
