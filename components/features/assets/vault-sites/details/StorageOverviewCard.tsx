"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";

interface StorageOverviewCardProps {
  vault: any;
}

export function StorageOverviewCard({ vault }: StorageOverviewCardProps) {

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Scale className="h-4 w-4 text-gold-500" />
          Storage Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Site Utilization</span>
            <span className="font-semibold text-gray-900">
              {vault.storage_capacity.utilization_percent}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gold-500 transition-all"
              style={{
                width: `${vault.storage_capacity.utilization_percent}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current Weight</span>
            <span className="font-medium text-gray-900">
              {vault.storage_capacity.current_weight_in_gold_kg} kg
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Max Capacity</span>
            <span className="font-medium text-gray-900">
              {vault.storage_capacity.maximum_weight_in_gold_kg} kg
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available</span>
            <span className="font-medium text-emerald-600">
              {vault.storage_capacity.maximum_weight_in_gold_kg -
                vault.storage_capacity.current_weight_in_gold_kg}{" "}
              kg
            </span>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Assets</span>
            <span className="font-semibold text-gray-900">
              {vault.total_assets}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Total Weight</span>
            <span className="font-semibold text-gray-900">
              {(vault.total_weight_grams / 1000).toFixed(1)} kg
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
