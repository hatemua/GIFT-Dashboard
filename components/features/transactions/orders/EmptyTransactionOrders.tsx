import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

const EmptyTransactionOrders = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center py-14 space-y-5">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <FileText className="h-7 w-7" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">
            No transaction orders yet
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Transaction orders allow you to manage transfers, deposits, and
            withdrawals of assets across vault sites.
          </p>
        </div>

        {/* Action */}
        <Link href="/transactions/orders/new">
          <Button variant="gold">
            <Plus className="h-4 w-4" />
            Create Transaction
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EmptyTransactionOrders;
