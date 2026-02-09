"use client";

import React from "react";
import { TransactionDetails } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TransactionValuationProps {
  transaction: TransactionDetails;
}

export const TransactionValuation: React.FC<TransactionValuationProps> = ({
  transaction,
}) => {
  const { currency, amount, spot_price_reference, date } =
    transaction.valuation;

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-slate-500" />
          Valuation
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount highlight */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <div className="text-xs text-slate-500">Transaction Amount</div>
              <div className="text-xl font-semibold text-slate-900">
                {formatCurrency(amount, currency)}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>

            <div className="flex-1">
              <div className="text-xs text-slate-500">
                Spot price reference
              </div>
              <div className="text-sm font-medium text-slate-900">
                {spot_price_reference}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <Calendar className="h-4 w-4 text-slate-600" />
            </div>

            <div className="flex-1">
              <div className="text-xs text-slate-500">Valuation date</div>
              <div className="text-sm font-medium text-slate-900">
                {new Date(date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
