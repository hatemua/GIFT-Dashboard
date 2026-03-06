"use client";

import React from "react";
import { GoldAccountDetails } from "@/types/goldAccount";
import {
  Shield,
  Scale,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatsProps {
  account?: GoldAccountDetails;
}

export const Stats: React.FC<StatsProps> = ({ account }) => {
  if (!account) return null;

  const { account_status, creation_date, compliance_status, total_holdings } =
    account;

  const {
    current_valuation_amount,
    total_valuation_amount,
    total_valuation_currency,
    total_weight_grams,
    total_fine_weight_grams,
    total_gold_assets,
  } = total_holdings;

  /* ───────── Derived values ───────── */

  const valueChange = current_valuation_amount - total_valuation_amount;
  const isPositive = valueChange >= 0;

  const valueChangePercent =
    total_valuation_amount > 0
      ? ((valueChange / total_valuation_amount) * 100).toFixed(1)
      : "0.0";

  const purity =
    total_weight_grams > 0
      ? ((total_fine_weight_grams / total_weight_grams) * 100).toFixed(1)
      : "0.0";

  const formatted = {
    currentValueK: (current_valuation_amount / 1000).toFixed(1),
    weightKg: (total_weight_grams / 1000).toFixed(1),
    fineWeightKg: (total_fine_weight_grams / 1000).toFixed(1),
  };

  const createdAt = new Date(creation_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  /* ───────── UI ───────── */

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* TOTAL VALUE */}
      <StatCard
        icon={<DollarSign className="h-5 w-5 text-white" />}
        gradient="gold"
        badge={<ChangeBadge positive={isPositive} value={valueChangePercent} />}
        label="Current Value"
        value={`${total_valuation_currency} ${formatted.currentValueK}K`}
        footer="Since minting"
      />

      {/* GOLD HOLDINGS */}
      <StatCard
        icon={<Scale className="h-5 w-5 text-white" />}
        gradient="blue"
        badge={
          <Badge
            variant="outline"
            className="text-xs font-medium border-blue-200 text-blue-700"
          >
            Physical
          </Badge>
        }
        label="Gold Holdings"
        value={
          <>
            {formatted.weightKg}{" "}
            <span className="text-sm font-normal text-gray-500">kg</span>
          </>
        }
        footer={
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">{total_fine_weight_grams} fine gold</span>
          </div>
        }
      />

      {/* ACCOUNT STATUS */}
      <StatCard
        icon={<Shield className="h-5 w-5 text-white" />}
        gradient="emerald"
        badge={<StatusBadge status={compliance_status} />}
        label="Account Status"
        value={account_status.toLowerCase()}
        footer={
          <div className="flex items-center gap-2 mt-2">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              Active since {createdAt}
            </span>
          </div>
        }
      />

      {/* ASSETS SUMMARY */}
      <StatCard
        icon={<Layers className="h-5 w-5 text-white" />}
        gradient="purple"
        badge={
          <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
            {total_gold_assets} items
          </span>
        }
        label="Assets & Purity"
        value={
          <>
            {total_fine_weight_grams} <span className="text-sm text-gray-500">fine gold</span>
          </>
        }
        footer={
          <p className="text-xs text-gray-400 mt-2">
            {formatted.fineWeightKg}kg fine weight
          </p>
        }
      />
    </div>
  );
};

/* ───────── Reusable UI blocks ───────── */

const StatCard = ({ icon, label, value, footer, badge, gradient }: any) => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-white border border-gray-100 p-5 shadow-xs hover:shadow-sm transition-shadow">
    <div
      className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${gradient}-100 to-transparent rounded-full -translate-y-6 translate-x-6`}
    />
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`h-10 w-10 rounded-lg bg-gradient-to-br from-${gradient}-500 to-${gradient}-600 flex items-center justify-center shadow-xs`}
        >
          {icon}
        </div>
        {badge}
      </div>

      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {footer}
    </div>
  </div>
);

const ChangeBadge = ({
  positive,
  value,
}: {
  positive: boolean;
  value: string;
}) => (
  <div
    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
      positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
    }`}
  >
    {positive ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    )}
    {positive ? "+" : ""}
    {value}%
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <div
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === "COMPLIANT"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-amber-50 text-amber-700"
    }`}
  >
    {status}
  </div>
);