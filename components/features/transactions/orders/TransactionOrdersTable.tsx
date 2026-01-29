import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Transaction } from "@/types/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  transactions: Transaction[];
}

const TransactionOrdersTable = ({ transactions }: Props) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="text-xs font-semibold uppercase tracking-wide">
              Reference
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">
              Type
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">
              Counterparty
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-center">
              Assets
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">
              Currency
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
              Value
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.transaction_reference}
              className="
                group
                transition-colors
                hover:bg-amber-50/40
              "
            >
              {/* Reference */}
              <TableCell className="py-3">
                <div className="font-medium text-slate-900 text-sm">
                  {transaction.transaction_reference}
                </div>
              </TableCell>

              {/* Type */}
              <TableCell className="py-3">
                <span className="text-sm capitalize text-slate-600">
                  {transaction.transaction_type}
                </span>
              </TableCell>

              {/* Counterparty */}
              <TableCell className="py-3">
                <span className="text-sm text-slate-700">
                  {transaction.counterparty_gic}
                </span>
              </TableCell>

              {/* Assets */}
              <TableCell className="py-3 text-center">
                <span className="inline-flex items-center justify-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {transaction.requested_assets.length}
                </span>
              </TableCell>

              {/* Currency */}
              <TableCell className="py-3 text-sm text-slate-600">
                {transaction.valuation_currency}
              </TableCell>

              {/* Value */}
              <TableCell className="py-3 text-right">
                <span className="font-semibold text-slate-900 text-sm">
                  {transaction.transaction_value
                    ? transaction.transaction_value.toLocaleString()
                    : "—"}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="py-3 text-right">
                <Link
                  href={`/transactions/orders/${transaction.transaction_reference}`}
                  className="
      inline-flex items-center gap-1.5
      rounded-md
      px-2.5 py-1.5
      text-xs font-medium
      text-slate-600
      transition-all
      hover:bg-amber-100/60
      hover:text-amber-700
      group-hover:opacity-100
    "
                >
                  <Eye className="h-4 w-4" />
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionOrdersTable;
