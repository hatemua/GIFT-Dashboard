
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Transaction } from "@/types/transaction";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
  transactions: Transaction[];
}

const TransactionOrdersTable = ({ transactions }: Props) => {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Assets</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map(transaction => (
            <TableRow
              key={transaction.transaction_reference}
              className="hover:bg-slate-50"
            >
              <TableCell className="font-medium">
                {transaction.transaction_reference}
              </TableCell>

              <TableCell className="capitalize">
                {transaction.transaction_type}
              </TableCell>

              <TableCell>
                {transaction.counterparty_gic}
              </TableCell>

              <TableCell>
                {transaction.requested_assets.length}
              </TableCell>

              <TableCell>
                {transaction.valuation_currency}
              </TableCell>

              <TableCell className="text-right font-medium">
                {transaction.transaction_value?.toLocaleString()}
              </TableCell>

              <TableCell className="text-right">
                <Link
                  href={`/transactions/orders/${transaction.transaction_reference}`}
                >
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
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
