"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import MultiSelectAssets from "@/components/features/common/MultiSelectAssets";
import { Layers } from "lucide-react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { Transaction } from "@/types/transaction";
import { Badge } from "@/components/ui/badge";

export const TransactionAssetsForm: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Transaction>();

  // Watch the requested_assets field
  const selectedAssets = useWatch({
    control,
    name: "requested_assets",
    defaultValue: [],
  });

  return (
    <Card className="border-l-4 border-l-gold-500 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Layers className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Requested Assets</CardTitle>
              <CardDescription>
                Select one or more assets for this transaction
              </CardDescription>
            </div>
          </div>

          {/* Selected assets count */}
          <div className="text-sm font-medium text-gray-700">
            <Badge variant={"info"}>
              {selectedAssets?.length || 0} selected
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Controller
          control={control}
          name="requested_assets"
          rules={{
            validate: (value) =>
              value && value.length > 0
                ? true
                : "Please select at least one asset",
          }}
          render={({ field }) => <MultiSelectAssets {...field} />}
        />
        {/* Show error message */}
        {errors.requested_assets && (
          <p className="mt-2 text-sm text-red-600">
            {errors.requested_assets.message as string}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
