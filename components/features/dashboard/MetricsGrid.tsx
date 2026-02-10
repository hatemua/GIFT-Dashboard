"use client";
import { MetricCard } from "@/components/data-display/metric-card";
import { Package, ArrowLeftRight, Wallet, Users } from "lucide-react";
import { formatWeight, formatCurrencyCompact } from "@/lib/utils";
import { useKPIs } from "@/hooks/useKpi";
import { useEffect } from "react";

export default function MetricsGrid() {
  const sparklineData = [45, 52, 48, 65, 58, 72, 68, 75, 80, 85];
  const { kpis, loading, fetchKPIs } = useKPIs();

  useEffect(() => {
    fetchKPIs();
  }, []);

  // Array to render skeletons
  const skeletons = Array.from({ length: 4 });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {loading ? (
        skeletons.map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm animate-pulse h-28"
          >
            {/* Title */}
            <div className="h-4 w-2/3 bg-slate-100 rounded mb-2" />

            {/* Value */}
            <div className="h-6 w-full bg-slate-100 rounded mb-2" />

            {/* Change / trend */}
            <div className="h-3 w-1/3 bg-slate-100 rounded" />
          </div>
        ))
      ) : (
        <>
          <MetricCard
            title="Total Gold Under Management"
            value={`${formatWeight(kpis.gold_weight)} / ${formatCurrencyCompact(kpis.value_in_dollars)}`}
            change={{ value: 8.2, trend: "up" }}
            sparklineData={sparklineData}
            icon={<Package className="h-5 w-5" />}
          />
          <MetricCard
            title="Active Transactions"
            value={kpis.number_of_transactions.toString()}
            change={{ value: 12.5, trend: "up" }}
            icon={<ArrowLeftRight className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Gold Accounts"
            value={kpis.number_of_gold_accounts.toString()}
            change={{ value: 3.1, trend: "up" }}
            icon={<Wallet className="h-5 w-5" />}
          />
          <MetricCard
            title="Members Network"
            value={kpis.number_of_members.toString()}
            change={{ value: 0, trend: "up" }}
            icon={<Users className="h-5 w-5" />}
          />
        </>
      )}
    </div>
  );
}
