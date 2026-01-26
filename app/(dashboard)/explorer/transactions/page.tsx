"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// UI-only mock data (replace later with real API)
const MOCK_TRANSACTIONS = [
  {
    hash: "0x8fa2...d91c",
    block: 1823401,
    type: "Mint",
    asset: "Gold Bar #A-1021",
    from: "Treasury",
    to: "Vault GIC-001",
    status: "Confirmed",
    timestamp: "2025-01-22 14:32",
  },
  {
    hash: "0x2c91...a3ff",
    block: 1823398,
    type: "Transfer",
    asset: "Gold Bar #A-0994",
    from: "Vault GIC-002",
    to: "Vault GIC-004",
    status: "Confirmed",
    timestamp: "2025-01-22 14:10",
  },
];

export default function BlockchainTransactionsPage() {
  const [view, setView] = useState<"table" | "grid">("grid");

  return (
    <DashboardShell>
      <PageHeader
        title="Blockchain Transactions"
        description="All on-chain transactions related to gold assets"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer", href: "/explorer" },
          { label: "Transactions" },
        ]}
      />


      {/* TABLE VIEW */}
      {view === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tx Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_TRANSACTIONS.map((tx) => (
                  <TableRow key={tx.hash}>
                    <TableCell className="font-mono text-sm">{tx.hash}</TableCell>
                    <TableCell>{tx.block}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.asset}</TableCell>
                    <TableCell>{tx.from}</TableCell>
                    <TableCell>{tx.to}</TableCell>
                    <TableCell>
                      <Badge variant="success">{tx.status}</Badge>
                    </TableCell>
                    <TableCell>{tx.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_TRANSACTIONS.map((tx) => (
            <Card key={tx.hash} className="hover:shadow-md transition">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{tx.hash}</span>
                  <Badge variant="outline">{tx.type}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Block #{tx.block}</div>
                <div className="font-medium">{tx.asset}</div>
                <div className="text-sm">From: {tx.from}</div>
                <div className="text-sm">To: {tx.to}</div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="success">{tx.status}</Badge>
                  <span className="text-xs text-muted-foreground">{tx.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
