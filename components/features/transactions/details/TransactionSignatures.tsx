"use client";

import React from "react";
import { TransactionDetails } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TransactionSignaturesProps {
  transaction: TransactionDetails;
}

export const TransactionSignatures: React.FC<TransactionSignaturesProps> = ({
  transaction,
}) => {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-slate-500" />
          Signatures
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {transaction.signatures.map((sig, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-slate-900">
                  {sig.signer}
                </span>

                <Badge
                  variant="outline"
                  className="text-xs capitalize"
                >
                  {sig.signing_role}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {new Date(sig.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
