"use client";

import React from "react";
import {
  TransactionDetails,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";
import { CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftRight,
  CalendarIcon,
  ClockIcon,
  CreditCard,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  TransactionStatus,
  { label: string; className: string }
> = {
  EXECUTED: {
    label: "Executed",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  PENDING_EXECUTION: {
    label: "Pending execution",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  PENDING_COUNTERPARTY: {
    label: "Pending counterparty",
    className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  },
  PENDING_SIGNATURE: {
    label: "Pending signature",
    className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  },
};

const transactionTypeStyles: Record<
  TransactionType,
  { label: string; icon: React.ReactNode; className: string }
> = {
  TRANSFER: {
    label: "Transfer",
    icon: <ArrowLeftRight className="h-4 w-4" />,
    className:
      "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 ring-1 ring-slate-200",
  },
  SALE: {
    label: "Sale",
    icon: <ShoppingCart className="h-4 w-4" />,
    className:
      "bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
  },
  PURCHASE: {
    label: "Purchase",
    icon: <CreditCard className="h-4 w-4" />,
    className:
      "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  },
  COLLATERAL: {
    label: "Collateral",
    icon: <ShieldCheck className="h-4 w-4" />,
    className:
      "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 ring-1 ring-amber-200",
  },
};

interface TransactionHeaderProps {
  transaction: TransactionDetails;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  transaction,
}) => {
  if (!transaction) return null;
  const typeStyle = transactionTypeStyles[transaction.type as TransactionType];
  const statusStyle = statusStyles[transaction.status as TransactionStatus];

  return (
    <div
      className={cn(
        "group relative flex flex-col lg:flex-row lg:items-center justify-between gap-6",
        "rounded-2xl border border-slate-200 bg-white/80 backdrop-blur",
        "p-6",
      )}
    >
      {/* Left */}
      <div className="flex-1">
        {/* Title */}
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl p-3",
              "transition-transform group-hover:scale-105",
              typeStyle.className,
            )}
          >
            {typeStyle.icon}
          </div>

          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Transaction{" "}
              <span className="text-slate-500 font-normal">
                {transaction.transaction_reference}
              </span>
            </CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {typeStyle.label}
              </Badge>

              {transaction.valuation.amount && (
                <span className="text-sm font-semibold text-slate-900">
                  {formatCurrency(
                    transaction.valuation.amount,
                    transaction.valuation.currency,
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-slate-600">
            <ClockIcon className="h-4 w-4" />
            <span>
              Created{" "}
              <span className="font-medium text-slate-900">
                {formatDate(transaction.created_at, "long")}
              </span>
            </span>
          </div>

          {transaction.executed_at && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-slate-600">
              <CalendarIcon className="h-4 w-4" />
              <span>
                Executed{" "}
                <span className="font-medium text-slate-900">
                  {formatDate(transaction.executed_at, "long")}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-3">
        <StatusBadge
          status={statusStyle.label}
          className={statusStyle.className}
        />

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>ID</span>
          <AddressDisplay
            address={transaction.transaction_id}
            truncate
            startChars={4}
            endChars={4}
          />
        </div>
      </div>
    </div>
  );
};
