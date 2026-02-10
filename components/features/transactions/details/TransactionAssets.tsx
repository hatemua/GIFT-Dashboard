"use client";

import React from "react";
import { TransactionDetails } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Gem, Layers } from "lucide-react";
import { formatWeight } from "@/lib/utils";

interface TransactionAssetsProps {
  transaction: TransactionDetails;
}

export const TransactionAssets: React.FC<TransactionAssetsProps> = ({
  transaction,
}) => {
  if (transaction.assets.length === 0)
    return (
      <div className="text-center py-10 px-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-50 to-yellow-100">
          <Gem className="w-8 h-8 text-yellow-500" />
        </div>

        <h4 className="text-lg font-semibold text-slate-800 mb-1">
          No Gold Assets Found
        </h4>

        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          This transaction currently has no gold assets attached.
        </p>
      </div>
    );
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-slate-500" />
          Assets
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {transaction.assets.map((asset, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            {/* Token ID */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Token ID:
              </span>
              <p className="font-medium text-slate-900 truncate">
                {asset.token_id}
              </p>
            </div>

            {/* Asset details */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              {/* Weight */}
              <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1">
                <Scale className="w-4 h-4 text-slate-500" />
                <span>{formatWeight(asset.weight_grams)}</span>
              </div>

              {/* Fine weight */}
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1">
                <Gem className="w-4 h-4 text-amber-600" />
                <span>{asset.fine_weight_grams}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
