"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const EmptyAccounts = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center py-14 space-y-5">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <CreditCard className="h-7 w-7" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">
            No gold accounts yet
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Gold accounts represent accounts for members or platforms to hold
            and transact gold assets.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyAccounts;
