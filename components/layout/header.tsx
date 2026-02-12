"use client";

import { Search, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useKPIs } from "@/hooks/useKpi";
import { useEffect } from "react";

export function Header() {
  const { goldPrice, goldPriceLoading, fetchGoldPrice } = useKPIs();

  useEffect(() => {
    fetchGoldPrice();
  }, []);
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div>
          <Input
            icon={
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            }
            type="search"
            placeholder="Search transactions, assets, members..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button> */}
        {/* <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button> */}

        {/* Gold Price Ticker */}
        {/* Gold Price Ticker */}
        {goldPriceLoading ? (
          <GoldPriceSkeleton />
        ) : goldPrice?.price_of_one_ounce ? (
          <div className="ml-4 flex items-center gap-2 rounded-lg bg-gold-50 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-xs font-medium text-slate-600">Gold Price</p>
              <p className="text-sm font-bold text-gold-700">
                ${goldPrice.price_of_one_ounce.toLocaleString()} / oz
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function GoldPriceSkeleton() {
  return (
    <div className="ml-4 flex items-center gap-2 rounded-lg bg-gold-50 px-4 py-2 animate-pulse">
      <div className="h-2 w-2 rounded-full bg-slate-300" />
      <div className="space-y-1">
        <div className="h-3 w-16 bg-slate-300 rounded" />
        <div className="h-4 w-20 bg-slate-300 rounded" />
      </div>
    </div>
  );
}
