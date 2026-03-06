"use client";

import React from "react";
import { GoldAccountDetails } from "@/types/goldAccount";
import { Calendar, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ValuationAnalysisProps {
  account?: GoldAccountDetails;
}

export const ValuationAnalysis: React.FC<ValuationAnalysisProps> = ({
  account,
}) => {
  if (!account) return null;

  const { total_holdings } = account;

  const valueChange =
    total_holdings.current_valuation_amount -
    total_holdings.total_valuation_amount;

  const valueChangePercent =
    total_holdings.total_valuation_amount > 0
      ? ((valueChange / total_holdings.total_valuation_amount) * 100).toFixed(1)
      : "0.0";

  const purity =
    total_holdings.total_weight_grams > 0
      ? (
          (total_holdings.total_fine_weight_grams /
            total_holdings.total_weight_grams) *
          100
        ).toFixed(1)
      : "0.0";

  const isPositive = valueChange >= 0;

  return (
    <Card className="border border-gray-100 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
              <BarChart3 className="h-3.5 w-3.5 text-amber-600" />
            </div>
            Valuation Analysis
          </CardTitle>
          <div className="text-xs font-medium text-gray-500">
            Price per gram
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* RATE COMPARISON */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-md bg-blue-100 flex items-center justify-center">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Minting Rate
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ${total_holdings.gold_rate_at_minting}
            </p>
            <p className="text-xs text-gray-500">per gram</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-25 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-md bg-amber-100 flex items-center justify-center">
                <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-amber-700">
                Current Rate
              </span>
            </div>
            <p className="text-lg font-bold text-amber-800">
              ${total_holdings.current_gold_rate}
            </p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}
              >
                {isPositive ? "+" : ""}
                {valueChangePercent}% change
              </span>
            </div>
          </div>
        </div>

        {/* VALUE BREAKDOWN */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Minted Value</p>
              <p className="text-xs text-gray-500">Initial investment</p>
            </div>
            <p className="text-base font-semibold text-gray-900">
              {total_holdings.total_valuation_currency}{" "}
              {total_holdings.total_valuation_amount.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-amber-25 border border-amber-100 rounded-lg">
            <div>
              <p className="text-sm font-medium text-amber-700">
                Current Value
              </p>
              <p className="text-xs text-amber-600">Real-time valuation</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-amber-800">
                {total_holdings.total_valuation_currency}{" "}
                {total_holdings.current_valuation_amount.toLocaleString()}
              </p>
              <div
                className={`text-xs font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}
              >
                {isPositive ? "+" : ""}
                {total_holdings.current_valuation_amount -
                  total_holdings.total_valuation_amount}{" "}
                {isPositive ? "gain" : "loss"}
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL METRICS */}
        <div className="pt-3 border-t">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Gold Assets</p>
              <p className="text-lg font-semibold text-gray-900">
                {total_holdings.total_gold_assets}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Purity Level</p>
              <p className="text-lg font-semibold text-gray-900">{total_holdings.total_fine_weight_grams}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
