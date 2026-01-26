import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface TransactionsGridProps {
  transactions: Transaction[];
}

export default function TransactionsGrid({
  transactions,
}: TransactionsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {transactions.map((tx) => (
        <Card key={tx.hash} className="hover:shadow-md transition">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{tx.hash}</span>
              <Badge variant="outline">{tx.type}</Badge>
            </div>

            <div className="text-sm text-muted-foreground">
              Block #{tx.block}
            </div>

            <div className="font-medium">{tx.asset}</div>

            <div className="text-sm">From: {tx.from}</div>
            <div className="text-sm">To: {tx.to}</div>

            <div className="flex items-center justify-between pt-2">
              <Badge variant="success">{tx.status}</Badge>
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
