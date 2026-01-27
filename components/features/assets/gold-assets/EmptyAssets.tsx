"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const EmptyAssets = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center py-14 space-y-5">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <CreditCard className="h-7 w-7" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">No assets found</h3>
          <p className="text-sm text-muted-foreground">
            Gold assets will appear here once created.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyAssets;
