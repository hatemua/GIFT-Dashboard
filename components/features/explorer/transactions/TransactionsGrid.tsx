import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockchainTransaction } from "@/types/blockchainTransaction";
import { cn, formatDate } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          key={tx.tx_hash}
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
                  title={tx.tx_hash}
                >
                  <AddressDisplay
                    address={tx.tx_hash}
                    truncate={true}
                    startChars={4}
                    endChars={4}
                  />
                </p>
              </div>

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
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Block</span>
              <span className="font-medium">#{tx.block_number}</span>
            </div>

            {/* Addresses */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">From</span>
                <span
                  className="max-w-[65%] truncate text-right font-mono"
                  title={tx.from_address}
                >
                  <AddressDisplay
                    address={tx.from_address}
                    truncate={true}
                    startChars={4}
                    endChars={4}
                  />
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">To</span>
                <span
                  className="max-w-[65%] truncate text-right font-mono"
                  title={tx.to_address}
                >
                  <AddressDisplay
                    address={tx.to_address}
                    truncate={true}
                    startChars={4}
                    endChars={4}
                  />
                </span>
              </div>
            </div>

            {/* Footer with date and actions */}
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={tx.createdAt.toString()}>
                  {formatDate(tx.createdAt, "short")}
                </time>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
