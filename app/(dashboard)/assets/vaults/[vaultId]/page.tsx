"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import EmptyState from "@/components/features/common/EmptyState";
import { Card } from "@/components/ui/card";
import { useVault } from "@/hooks/useVault";
import { formatDate } from "@/lib/utils";
import {
  Package,
  Scale,
  BarChart3,
  Ruler,
  Calendar,
  TrendingUp,
  Shield,
  Building,
  type LucideIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/data-display/status-badge";
import { VaultSkeleton } from "@/components/features/assets/vaults/details/VaultDetailsSkeleton";

interface VaultDetailsPageProps {
  params: Promise<{ vaultId: string }>;
}

export default function VaultDetailsPage({ params }: VaultDetailsPageProps) {
  const { vaultId } = React.use(params);
  const { vault, loading, fetchVault } = useVault();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (vaultId) {
      fetchVault(vaultId);
      setHasFetched(true);
    }
  }, [vaultId, fetchVault]);
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Vault Sites", href: "/assets/vault-sites" },

    ...(vault
      ? [
          {
            label: vault.vault_site_name || "Vault Site",
            href: `/assets/vault-sites/${vault.vault_site_id}`,
          },
        ]
      : []),

    { label: "Vaults" },

    {
      label: vaultId || "Vault ID",
      href: `/assets/vaults/${vaultId}`,
    },
  ];

  return (
    <DashboardShell>
      <PageHeader className="mb-6" title="" breadcrumbs={breadcrumbs} />

      {loading || !hasFetched ? (
        <VaultSkeleton />
      ) : vault ? (
        <Card className="p-6 rounded-2xl border border-slate-200 shadow-md bg-gradient-to-b from-white to-slate-50/30 space-y-8">
          {/* ================= Header ================= */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {vault.vault_site_name}
                </h1>
                <p className="text-sm text-slate-500">
                  Vault ID · {vault.vault_id} · Member ID ·{" "}
                  {vault.member_internal_vault_id}
                </p>
              </div>
            </div>

            <StatusBadge status={vault.vault_status} />
          </div>

          {/* ================= Capacity Cards ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CapacityCard
              label="Gold Capacity"
              value={vault.vault_gold_capacity_kg}
              unit="kg"
              icon={Package}
              color="text-blue-600"
              bgColor="bg-blue-50"
              trend="Max capacity"
            />
            <CapacityCard
              label="Current Weight"
              value={vault.current_weight_kg}
              unit="kg"
              icon={Scale}
              color="text-emerald-600"
              bgColor="bg-emerald-50"
              trend="Actual storage"
            />
            <CapacityCard
              label="Available Capacity"
              value={vault.available_capacity_kg}
              unit="kg"
              icon={BarChart3}
              color="text-purple-600"
              bgColor="bg-purple-50"
              trend="Remaining space"
            />
          </div>

          {/* ================= Utilization ================= */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-slate-500" />
                Storage Utilization
              </h3>
              <span className="text-lg font-bold">
                {vault.utilization_percent}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                style={{ width: `${vault.utilization_percent}%` }}
              />
            </div>
          </div>

          {/* ================= Metadata ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vault Specifications */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <Ruler className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-base">
                    Vault Specifications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Physical dimensions and properties
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-slate-100 bg-gradient-to-r from-white to-blue-50/30 hover:bg-blue-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 flex items-center justify-center rounded-md bg-blue-100">
                        <Ruler className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        Dimensions
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 font-mono">
                      {vault.vault_dimensions}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Information */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-base">
                    Audit Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Compliance and verification dates
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: "Last Audit Date",
                    value: vault.last_audit_date
                      ? formatDate(vault.last_audit_date, "long")
                      : "—",
                    status: "completed",
                    description: "Previous compliance check",
                  },
                  {
                    label: "Next Audit Due",
                    value: vault.next_audit_due
                      ? formatDate(vault.next_audit_due, "long")
                      : "—",
                    status:
                      vault.next_audit_due &&
                      new Date(vault.next_audit_due) > new Date()
                        ? "upcoming"
                        : "overdue",
                    description: "Scheduled compliance check",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-lg border border-slate-100 bg-gradient-to-r from-white to-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">
                          {item.label}
                        </span>
                      </div>
                      {item.status === "completed" && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          Completed
                        </div>
                      )}
                      {item.status === "upcoming" && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          Upcoming
                        </div>
                      )}
                      {item.status === "overdue" && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                          Due Soon
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {item.description}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= Assets ================= */}
          {vault.assets && (
            <div className="pt-6 border-t border-slate-200">
              <SectionTitle icon={Package} title="Assets Overview" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  label="Total Assets"
                  value={vault.assets.total_count}
                  icon={Package}
                />
                <StatCard
                  label="Total Weight"
                  value={(vault.assets.total_weight_grams / 1000).toFixed(2)}
                  unit="kg"
                  icon={Scale}
                />
                <StatCard
                  label="Fine Weight"
                  value={(vault.assets.total_fine_weight_grams / 1000).toFixed(
                    2,
                  )}
                  unit="kg"
                  icon={Scale}
                />
                <StatCard
                  label="Valuation"
                  value={`$${vault.assets.total_valuation.amount.toLocaleString()}`}
                  icon={BarChart3}
                />
              </div>
            </div>
          )}
        </Card>
      ) : (
        <EmptyState type="vault" />
      )}
    </DashboardShell>
  );
}

/* ================= Reusable Components ================= */

function CapacityCard({
  label,
  value,
  unit,
  icon: Icon,
  color,
  bgColor,
  trend,
}: {
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex justify-between mb-2">
        <div
          className={`h-9 w-9 flex items-center justify-center rounded-lg ${bgColor}`}
        >
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <span className="text-xs text-slate-500">{trend}</span>
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold">
        {value}
        {unit && <span className="text-sm text-slate-500 ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-slate-500" />
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <p className="text-lg font-bold">
        {value}
        {unit && <span className="text-sm text-slate-500 ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-slate-500" />
      {title}
    </h3>
  );
}
