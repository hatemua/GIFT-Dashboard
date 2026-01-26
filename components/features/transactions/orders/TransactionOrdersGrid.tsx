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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {transactions.map(transaction => (
        <Card
          key={transaction.transaction_reference}
          className="hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {transaction.transaction_reference}
                </h3>
                <p className="text-sm text-slate-500 capitalize">
                  {transaction.transaction_type}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                Pending
              </span>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Counterparty</p>
                <p className="font-medium">
                  {transaction.counterparty_gic}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Assets</p>
                <p className="font-medium">
                  {transaction.requested_assets.length}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Currency</p>
                <p className="font-medium">
                  {transaction.valuation_currency}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Value</p>
                <p className="font-medium">
                  {transaction.transaction_value?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Link href={`/transactions/orders/${transaction.transaction_reference}`}>
                <Button size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </Link>

              <Button variant="outline" size="icon">
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
