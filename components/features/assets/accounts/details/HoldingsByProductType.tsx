"use client";

import React, { useEffect } from "react";
import { Gem, Coins, Calendar, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGoldAccount } from "@/hooks/useGoldAccount";

interface HoldingsByProductTypeProps {
  igan: string;
}

const HoldingsByProductType: React.FC<HoldingsByProductTypeProps> = ({
  igan,
}) => {
  const { accountBalance, fetchAccountBalance } = useGoldAccount();

  useEffect(() => {
    if (igan) fetchAccountBalance(igan);
  }, [igan]);

  if (!accountBalance || accountBalance?.by_product_type?.length === 0)
    return null;

  const { by_product_type, valuation } = accountBalance;

  const asOfDate = new Date(valuation.as_of).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="border border-gray-100 mt-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-amber-50 flex items-center justify-center">
            <Layers className="h-3.5 w-3.5 text-amber-600" />
          </div>
          Holdings by Product Type
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* PRODUCT TYPES */}
        <div className="space-y-2">
          {by_product_type.map((item: any) => {
            const estimatedValue =
              item.fine_weight_grams * valuation.spot_price;

            return (
              <div
                key={item.gold_product_type_id}
                className="flex items-center justify-between p-3 rounded-lg border bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Gem className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium capitalize">
                      {item.gold_product_type_id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.asset_count} assets
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {(item.weight_grams / 1000).toFixed(2)} kg
                  </p>
                  <p className="text-xs text-gray-500">
                    Fine: {(item.fine_weight_grams / 1000).toFixed(2)} kg
                  </p>
                  <p className="text-xs text-gray-400">
                    ≈ {estimatedValue.toLocaleString()} {valuation.currency}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SPOT PRICE CONTEXT */}
        <div className="pt-3 border-t flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4" />
            Spot price: {valuation.spot_price} {valuation.currency}/g
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {asOfDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoldingsByProductType;