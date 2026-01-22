"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Transaction } from "@/types/transaction";

// Static mock data
const transactions: Transaction[] = [
  {
    transaction_reference: "PO-2025-8901",
    transaction_type: "Transfer",
    counterparty_gic: "GIC-2025-0002",
    requested_assets: ["asset-2024-001", "asset-2024-003"],
    transaction_value: 15000,
    valuation_currency: "USD",
    valuation_date: "2026-01-21",
  },
  {
    transaction_reference: "PO-2025-8902",
    transaction_type: "Deposit",
    counterparty_gic: "GIC-2025-0005",
    requested_assets: ["asset-2024-002"],
    transaction_value: 5000,
    valuation_currency: "EUR",
    valuation_date: "2026-01-20",
  },
  {
    transaction_reference: "PO-2025-8903",
    transaction_type: "Withdrawal",
    counterparty_gic: "GIC-2025-0003",
    requested_assets: ["asset-2024-001", "asset-2024-002"],
    transaction_value: 12000,
    valuation_currency: "CHF",
    valuation_date: "2026-01-19",
  },
];

// Map transaction types to colors
const typeColors: Record<string, string> = {
  Transfer: "bg-blue-100 text-blue-800",
  Deposit: "bg-green-100 text-green-800",
  Withdrawal: "bg-red-100 text-red-800",
};

export default function TransactionOrdersPage() {
  const loading = false;

  return (
    <DashboardShell>
      <PageHeader
        title="Transaction Orders"
        description="All submitted transactions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transactions", href: "/transactions/orders" },
        ]}
        action={
          <Link href="/transactions/new">
            <Button variant="gold">
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </Link>
        }
      />

      {loading ? (
        <p className="text-slate-500">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-slate-500">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((tx) => (
            <Card
              key={tx.transaction_reference}
              className="transition-shadow hover:shadow-xl hover:scale-[1.03] duration-200 border border-slate-200 rounded-2xl overflow-hidden"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                  {tx.transaction_reference}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[tx.transaction_type]}`}
                  >
                    {tx.transaction_type}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Counterparty:</span>{" "}
                  {tx.counterparty_gic}
                </p>

                <div>
                  <span className="font-medium text-slate-700 text-sm">Assets:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tx.requested_assets.map((asset) => (
                      <span
                        key={asset}
                        className="bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm"
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Value:</span>{" "}
                    <span className="text-gold-800 font-semibold">
                      {tx.transaction_value} {tx.valuation_currency}
                    </span>
                  </p>
                  <p className="text-sm text-slate-500">{tx.valuation_date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
