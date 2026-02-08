import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockchainTransaction } from "@/types/blockchainTransaction";
import { cn, formatDate } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { Calendar } from "lucide-react";

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
            <div className="flex items-center justify-between text-xs pt-2 border-t">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-slate-400" />
              <span className="text-slate-500">Created At</span>
            </div>
            <span className="font-medium">
              {formatDate(tx.createdAt, "short")}
            </span>
          </div>
            
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
