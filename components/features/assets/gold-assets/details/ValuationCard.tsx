"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { AssetDetails } from "@/types/asset";

export function ValuationCard({ asset }: { asset: AssetDetails }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Valuation & Pricing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-emerald-700 font-semibold mb-1">
                Current Market Value
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {asset.valuation.asset_value}
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {asset.valuation.currency}
                </span>
              </div>
            </div>
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Gold Rate</p>
            <p className="text-sm font-semibold text-gray-900">
              {asset.valuation.gold_rate} {asset.valuation.currency}/g
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valuation Date</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-gray-400" />
              <p className="text-sm font-medium text-gray-900">
                {formatDate(asset.valuation.as_of, "short")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
