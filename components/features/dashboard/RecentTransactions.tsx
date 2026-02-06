"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ShoppingCart, CreditCard, ShieldCheck } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";
import { useTransaction } from "@/hooks/useTransaction";

const transactionTypeStyles: Record<
  string,
  { label: string; icon: React.ReactNode; className: string }
> = {
  TRANSFER: {
    label: "Transfer",
    icon: <ArrowLeftRight className="h-4 w-4" />,
    className: "bg-slate-100 text-slate-700 ring-slate-200",
  },
  SALE: {
    label: "Sale",
    icon: <ShoppingCart className="h-4 w-4" />,
    className: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  PURCHASE: {
    label: "Purchase",
    icon: <CreditCard className="h-4 w-4" />,
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  COLLATERAL: {
    label: "Collateral",
    icon: <ShieldCheck className="h-4 w-4" />,
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
};

export default function RecentTransactions() {
  const { transactions, loading, fetchTransactions } = useTransaction();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const skeletonRows = Array.from({ length: 4 });

  return (
    <div className="md:col-span-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Link href="/transactions/orders">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading
              ? skeletonRows.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 animate-pulse"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-slate-200" />
                      <div className="flex flex-col gap-1">
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1 text-right">
                        <div className="h-3 w-16 bg-slate-200 rounded" />
                      </div>
                      <div className="h-6 w-12 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))
              : transactions.map((tx) => {
                  const type = transactionTypeStyles[tx.transaction_type] || transactionTypeStyles.TRANSFER;

                  return (
                    <Link
                      key={tx.transaction_id}
                      href={`/transactions/${tx.transaction_id}`}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-gold-300 hover:bg-gold-50/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${type.className}`}
                        >
                          {type.icon}
                        </div>
                        <div>
                          <p className="font-mono text-sm font-semibold text-slate-900">
                            {tx.transaction_reference}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatDate(tx.createdAt, "relative")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-slate-500">
                            {formatCurrency(tx.transaction_value)}
                          </p>
                        </div>
                        <StatusBadge status={tx.transaction_type} />
                      </div>
                    </Link>
                  );
                })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
