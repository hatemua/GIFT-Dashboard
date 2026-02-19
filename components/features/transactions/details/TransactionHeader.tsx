"use client";

import React, { useState } from "react";
import {
  TransactionDetails,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftRight,
  CreditCard,
  ShieldCheck,
  ShoppingCart,
  Clock,
  ChevronRight,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignTransactionModal } from "./SignTransactionModal";
import { useAuthStore } from "@/store/authStore";
import { useAsset } from "@/hooks/useAsset";
import { useTransaction } from "@/hooks/useTransaction";
import { useToast } from "@/providers/toast-provider";

const statusConfig: Record<
  TransactionStatus,
  { label: string; dot: string; bg: string }
> = {
  EXECUTED: {
    label: "Executed",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
  },
  PENDING_EXECUTION: {
    label: "Pending",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
  },
  PENDING_COUNTERPARTY: {
    label: "Needs signature",
    dot: "bg-blue-500",
    bg: "bg-blue-50",
  },
  PENDING_SIGNATURE: {
    label: "Awaiting",
    dot: "bg-blue-500",
    bg: "bg-blue-50",
  },
};

const typeIcons = {
  TRANSFER: ArrowLeftRight,
  SALE: ShoppingCart,
  PURCHASE: CreditCard,
  COLLATERAL: ShieldCheck,
};

interface TransactionHeaderProps {
  transaction: TransactionDetails;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  transaction,
}) => {
  const { showToast } = useToast();

  const { isAdmin } = useAuthStore();
  const { transferAsset } = useAsset();
  const { updateTransactionStatus } = useTransaction();
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!transaction) return null;

  const Icon = typeIcons[transaction.type as TransactionType];
  const status = statusConfig[transaction.status as TransactionStatus];
  const isPendingCounterparty = transaction.status === "PENDING_COUNTERPARTY";
  const isPendingExecution = transaction.status === "PENDING_EXECUTION";

  const onTransferAssets = async () => {
    setLoading(true);

    try {
      const allStationary = transaction.assets.every(
        (asset) => asset.status === "stationary",
      );

      if (!allStationary) {
        showToast({
          title: "Cannot transfer",
          message: "Some assets are not stationary and cannot be transferred.",
          variant: "error",
        });
        return;
      }
      await Promise.all(
        transaction.assets.map((asset) => {
          const payload = {
            token_id: asset.token_id,
            from_igan: transaction.parties.initiator.igan,
            to_igan: transaction.parties.counterparty.igan,
            quantity: 1,
            transaction_reference: transaction.transaction_reference,
            transfer_reason: "other",
            compliance_check: true,
          };

          return transferAsset(payload);
        }),
      );

      await updateTransactionStatus(
        transaction.transaction_reference,
        "executed",
        "other",
      );

      showToast({
        title: "Transfer successful",
        message:
          "All assets have been transferred and the transaction is executed.",
        variant: "success",
      });
    } catch (err: any) {
      showToast({
        title: "Transfer failed",
        message:
          err?.message || "An error occurred while transferring the assets.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {/* Main row - ultra compact */}
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          {/* Left: Icon + Reference + Amount */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="shrink-0 w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <Badge
                variant="outline"
                className="font-mono text-[10px] h-5 px-1.5 bg-slate-50 border-slate-200"
              >
                {transaction.transaction_reference}
              </Badge>

              {transaction.valuation.amount && (
                <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                  {formatCurrency(
                    transaction.valuation.amount,
                    transaction.valuation.currency,
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Right: Status + Action */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full",
                status.bg,
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
              <span className="text-[11px] font-medium text-slate-700">
                {status.label}
              </span>
            </div>

            {isPendingCounterparty && isAdmin && (
              <Button
                size="sm"
                onClick={() => setIsSignModalOpen(true)}
                className="h-7 px-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1"
              >
                Sign
                <ChevronRight className="w-3 h-3" />
              </Button>
            )}
            {isPendingExecution && isAdmin && (
              <Button
                size="sm"
                variant={"gold"}
                onClick={onTransferAssets}
                className="h-7 px-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1"
                disabled={loading}
              >
                {loading ? "Transfering..." : "Transfer Assets"}
                <ChevronRight className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Metadata row - condensed */}
        <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(transaction.created_at, "short")}</span>
          </div>

          {transaction.executed_at && (
            <>
              <span className="text-slate-300">|</span>
              <span>✓ {formatDate(transaction.executed_at, "short")}</span>
            </>
          )}

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1">
            <span className="font-mono">
              <AddressDisplay
                address={transaction.transaction_id}
                truncate
                startChars={4}
                endChars={3}
                className="text-slate-600"
              />
            </span>
          </div>

          {transaction.type && (
            <>
              <span className="text-slate-300">|</span>
              <Badge
                variant="secondary"
                className="text-[10px] h-5 px-1.5 bg-slate-200/50"
              >
                {transaction.type}
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Sign Transaction Modal */}
      {isSignModalOpen && (
        <SignTransactionModal
          transaction={transaction}
          isOpen={isSignModalOpen}
          onClose={() => setIsSignModalOpen(false)}
        />
      )}
    </>
  );
};
