"use client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import MetricsGrid from "@/components/features/dashboard/MetricsGrid";
import RecentTransactions from "@/components/features/dashboard/RecentTransactions";
import ActivityFeed from "@/components/features/dashboard/ActivityFeed";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Dashboard"
        description="Gold International Fast Transfer Platform"
        action={
          <div className="flex gap-2">
            <Link href="/transactions/new">
              <Button variant="gold">
                <Plus className="h-4 w-4" />
                New Transaction
              </Button>
            </Link>
            <Link href="/assets/mint">
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                Mint Asset
              </Button>
            </Link>
          </div>
        }
      />

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Transactions - 2 columns */}
        <RecentTransactions />

        {/* Activity Feed - 1 column */}
        <ActivityFeed />
      </div>
    </DashboardShell>
  );
}
