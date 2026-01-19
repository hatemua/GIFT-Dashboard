import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/data-display/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeftRight, Wallet, Users, Plus } from "lucide-react";
import { mockTransactions, mockAssets, mockAccounts, mockMembers } from "@/lib/mock-data";
import { formatDate, formatCurrency, formatWeight } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  // Calculate metrics
  const totalGoldWeight = mockAssets.reduce((sum, asset) => sum + asset.weight_grams, 0);
  const totalGoldValue = mockAssets.reduce((sum, asset) => sum + asset.asset_value_at_minting, 0);
  const activeTransactions = mockTransactions.filter(
    (tx) => tx.transaction_status === "In execution" || tx.transaction_status === "Submitted for approval"
  ).length;

  // Recent transactions (last 5)
  const recentTransactions = mockTransactions.slice(0, 5);

  // Sparkline data (mock)
  const sparklineData = [45, 52, 48, 65, 58, 72, 68, 75, 80, 85];

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Total Gold Under Management"
          value={`${formatWeight(totalGoldWeight)} / ${formatCurrency(totalGoldValue)}`}
          change={{ value: 8.2, trend: "up" }}
          sparklineData={sparklineData}
          icon={<Package className="h-5 w-5" />}
        />
        <MetricCard
          title="Active Transactions"
          value={activeTransactions.toString()}
          change={{ value: 12.5, trend: "up" }}
          icon={<ArrowLeftRight className="h-5 w-5" />}
        />
        <MetricCard
          title="Total Gold Accounts"
          value={mockAccounts.length.toString()}
          change={{ value: 3.1, trend: "up" }}
          icon={<Wallet className="h-5 w-5" />}
        />
        <MetricCard
          title="Members Network"
          value={mockMembers.length.toString()}
          change={{ value: 0, trend: "up" }}
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Transactions - 2 columns */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href="/explorer/transactions">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <Link
                    key={tx.transaction_reference}
                    href={`/transactions/${tx.transaction_reference}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-gold-300 hover:bg-gold-50/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <ArrowLeftRight className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-semibold text-slate-900">
                          {tx.transaction_reference}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(tx.initiation_timestamp, "relative")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatWeight(tx.cargo_weight_grams)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatCurrency(tx.transaction_value)}
                        </p>
                      </div>
                      <StatusBadge status={tx.transaction_status} />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed - 1 column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: Package,
                    title: "New asset minted",
                    description: "VALCAMBY-SN-100240",
                    time: "2 hours ago",
                    color: "text-emerald-600",
                  },
                  {
                    icon: ArrowLeftRight,
                    title: "Transaction settled",
                    description: "TX-A1B2C completed",
                    time: "5 hours ago",
                    color: "text-blue-600",
                  },
                  {
                    icon: Users,
                    title: "New member joined",
                    description: "Tokyo Gold Trading",
                    time: "1 day ago",
                    color: "text-purple-600",
                  },
                  {
                    icon: Wallet,
                    title: "Account created",
                    description: "GIFT-CH-GOLDBNK1-010-0001",
                    time: "2 days ago",
                    color: "text-amber-600",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 ${activity.color}`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
