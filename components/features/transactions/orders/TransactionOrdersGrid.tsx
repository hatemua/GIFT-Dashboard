import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Transaction } from "@/types/transaction";

interface Props {
  transactions: Transaction[];
}

const TransactionOrdersGrid = ({ transactions }: Props) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {transactions.map(transaction => (
        <Card
          key={transaction.transaction_reference}
          className="
            relative overflow-hidden
            border border-slate-200
            bg-white
            transition-all
            hover:shadow-sm
            hover:border-amber-300
          "
        >
          {/* Gold accent bar */}
          <span className="absolute left-0 top-0 h-full w-[3px] bg-amber-400" />

          {/* Header */}
          <CardHeader className="px-4 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-slate-900 truncate tracking-tight">
                  {transaction.transaction_reference}
                </h3>
                <p className="text-[11px] text-slate-500 capitalize">
                  {transaction.transaction_type}
                </p>
              </div>

              <span
                className="
                  shrink-0
                  rounded-full
                  bg-amber-50
                  px-2 py-0.5
                  text-[11px]
                  font-medium
                  text-amber-700
                  ring-1 ring-amber-200
                "
              >
                Pending
              </span>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="px-4 pb-3 pt-0 space-y-2.5">
            {/* Info rows */}
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Counterparty</span>
                <span className="font-medium text-slate-800 truncate max-w-[60%] text-right">
                  {transaction.counterparty_gic}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Assets</span>
                <span className="font-medium text-slate-800">
                  {transaction.requested_assets.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Currency</span>
                <span className="font-medium text-slate-800">
                  {transaction.valuation_currency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Value</span>
                <span className="font-semibold text-slate-900">
                  {transaction.transaction_value
                    ? transaction.transaction_value.toLocaleString()
                    : "—"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 pt-1">
              <Link
                href={`/transactions/orders/${transaction.transaction_reference}`}
                className="flex-1"
              >
                <Button
                  size="sm"
                  className="h-7 w-full text-[11px]"
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-500 hover:bg-slate-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionOrdersGrid;
