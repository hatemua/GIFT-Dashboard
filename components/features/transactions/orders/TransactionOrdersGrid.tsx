import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Calendar,
  ArrowLeftRight,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { TransactionItem } from "@/types/transaction";
import { cn } from "@/lib/utils";

interface Props {
  transactions: TransactionItem[];
}

const statusStyles: Record<
  TransactionItem["status"],
  { label: string; className: string }
> = {
  EXECUTED: {
    label: "Executed",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  PENDING_EXECUTION: {
    label: "Pending execution",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  PENDING_COUNTERPARTY: {
    label: "Pending counterparty",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
  },
};

const transactionTypeStyles: Record<
  TransactionItem["transaction_type"],
  { label: string; icon: React.ReactNode; className: string }
> = {
  TRANSFER: {
    label: "Transfer",
    icon: <ArrowLeftRight className="h-3 w-3" />,
    className: "bg-slate-100 text-slate-700 ring-slate-200",
  },
  SALE: {
    label: "Sale",
    icon: <ShoppingCart className="h-3 w-3" />,
    className: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  PURCHASE: {
    label: "Purchase",
    icon: <CreditCard className="h-3 w-3" />,
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  COLLATERAL: {
    label: "Collateral",
    icon: <ShieldCheck className="h-3 w-3" />,
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
};

const TransactionOrdersGrid = ({ transactions }: Props) => {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {transactions.map((transaction) => {
        const status = statusStyles[transaction.status];

        return (
          <Card
            key={transaction.transaction_reference}
            className="
              relative overflow-hidden
              border border-slate-200/70
              bg-white
              transition-all duration-200
              hover:shadow-md
            "
          >
            {/* Soft accent */}
            <span className="absolute left-0 top-0 h-full w-[2px] bg-slate-200" />

            {/* Header */}
            <CardHeader className="px-4 pt-4 pb-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[13px] font-semibold text-slate-900 truncate">
                  {transaction.transaction_reference}
                </h3>

                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 whitespace-nowrap",
                    status.className,
                  )}
                >
                  {status.label}
                </span>
              </div>

              {/* Transaction type badge */}
              {/* Transaction type */}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 w-fit",
                  transactionTypeStyles[transaction.transaction_type].className,
                )}
              >
                {transactionTypeStyles[transaction.transaction_type].icon}
                {transactionTypeStyles[transaction.transaction_type].label}
              </span>
            </CardHeader>

            {/* Content */}
            <CardContent className="px-4 pb-4 pt-0 space-y-4">
              {/* Info */}
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Counterparty</span>
                  <span className="font-medium text-slate-800 truncate max-w-[60%] text-right">
                    {transaction.counterparty_gic}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Initiator</span>
                  <span className="font-medium text-slate-800">
                    {transaction.initiator_gic}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Value</span>
                  <span className="font-semibold text-slate-900">
                    {transaction.transaction_value
                      ? transaction.transaction_value.toLocaleString() +
                        " " +
                        transaction.valuation_currency
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                {/* Date */}
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </div>

                {/* Action */}
                <Link
                  href={`/transactions/${transaction.transaction_reference}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[11px]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TransactionOrdersGrid;
