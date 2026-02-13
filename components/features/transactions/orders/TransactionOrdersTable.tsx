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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface Props {
  transactions: TransactionItem[];
}

// Status styles
const statusStyles: Record<TransactionItem["status"], { label: string; className: string }> = {
  EXECUTED: { label: "Executed", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  PENDING_EXECUTION: { label: "Pending execution", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  PENDING_COUNTERPARTY: { label: "Pending counterparty", className: "bg-sky-50 text-sky-700 ring-sky-200" },
  PENDING_SIGNATURE: { label: "Pending signature", className: "bg-sky-50 text-sky-700 ring-sky-200" },
};

// Transaction type styles
const transactionTypeStyles: Record<TransactionItem["transaction_type"], { label: string; icon: React.ReactNode; className: string }> = {
  TRANSFER: { label: "Transfer", icon: <ArrowLeftRight className="h-3 w-3" />, className: "bg-slate-100 text-slate-700 ring-slate-200" },
  SALE: { label: "Sale", icon: <ShoppingCart className="h-3 w-3" />, className: "bg-indigo-50 text-indigo-700 ring-indigo-200" },
  PURCHASE: { label: "Purchase", icon: <CreditCard className="h-3 w-3" />, className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  COLLATERAL: { label: "Collateral", icon: <ShieldCheck className="h-3 w-3" />, className: "bg-amber-50 text-amber-700 ring-amber-200" },
};

const TransactionOrdersTable = ({ transactions }: Props) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide">Ref</TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide">Status</TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide">Type</TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide">Counterparty</TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide">Initiator</TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-right">Value</TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide">Date</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => {
            const status = statusStyles[transaction.status];
            const type = transactionTypeStyles[transaction.transaction_type];

            return (
              <TableRow key={transaction.transaction_reference} className="group transition-colors hover:bg-amber-50/20">
                {/* Reference */}
                <TableCell className="py-1.5 text-[11px] font-medium text-slate-900 truncate">
                  {transaction.transaction_reference}
                </TableCell>

                {/* Status */}
                <TableCell className="py-1.5">
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 whitespace-nowrap",
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </TableCell>

                {/* Transaction type */}
                <TableCell className="py-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ring-1",
                      type.className
                    )}
                  >
                    {type.icon}
                    {type.label}
                  </span>
                </TableCell>

                {/* Counterparty */}
                <TableCell className="py-1.5 text-[11px]">
                  <AddressDisplay address={transaction.counterparty_gic} truncate startChars={3} endChars={3} />
                </TableCell>

                {/* Initiator */}
                <TableCell className="py-1.5 text-[11px]">
                  <AddressDisplay address={transaction.initiator_gic} truncate startChars={3} endChars={3} />
                </TableCell>

                {/* Value */}
                <TableCell className="py-1.5 text-right text-[11px] font-semibold text-slate-900">
                  {transaction.transaction_value
                    ? transaction.transaction_value.toLocaleString() + " " + transaction.valuation_currency
                    : "—"}
                </TableCell>

                {/* Date */}
                <TableCell className="py-1.5 text-[11px] text-slate-600 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions */}
                <TableCell className="py-1.5 text-right">
                  <Link href={`/transactions/orders/${transaction.transaction_reference}`}>
                    <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 inline-flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionOrdersTable;
