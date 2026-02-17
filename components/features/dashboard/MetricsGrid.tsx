"use client";
import { MetricCard } from "@/components/data-display/metric-card";
import { Package, ArrowLeftRight, Wallet, Users } from "lucide-react";
import { formatWeight, formatCurrencyCompact } from "@/lib/utils";
import { useKPIs } from "@/hooks/useKpi";
import { useEffect } from "react";

export default function MetricsGrid() {
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
            icon={<Package className="h-5 w-5" />}
          />
          <MetricCard
            title="Active Transactions"
            value={kpis.number_of_transactions.toString()}
            icon={<ArrowLeftRight className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Gold Accounts"
            value={kpis.number_of_gold_accounts.toString()}
            icon={<Wallet className="h-5 w-5" />}
          />
          <MetricCard
            title="Members Network"
            value={kpis.number_of_members.toString()}
            icon={<Users className="h-5 w-5" />}
          />
        </>
      )}
    </div>
  );
}
