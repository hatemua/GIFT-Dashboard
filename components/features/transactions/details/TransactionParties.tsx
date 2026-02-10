"use client";

import React from "react";
import { TransactionDetails } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface TransactionPartiesProps {
  transaction: TransactionDetails;
}

export const TransactionParties: React.FC<TransactionPartiesProps> = ({
  transaction,
}) => {
  const { initiator, counterparty } = transaction.parties;

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-500" />
          Parties
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Initiator */}
        <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
            <User className="h-5 w-5 text-emerald-600" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-900">Initiator</span>
              <Badge variant="outline" className="text-xs">
                Sender
              </Badge>
            </div>

            <div className="flex flex-col gap-1 text-xs text-slate-500">
              <div>
                <span className="font-medium text-slate-700">GIC:</span>{" "}
                <AddressDisplay
                  address={initiator.gic}
                  truncate
                  startChars={3}
                  endChars={3}
                />
              </div>
              <div>
                <span className="font-medium text-slate-700">IGAN:</span>{" "}
                <AddressDisplay
                  address={initiator.igan}
                  truncate
                  startChars={3}
                  endChars={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Counterparty */}
        <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-900">Counterparty</span>
              <Badge variant="outline" className="text-xs">
                Receiver
              </Badge>
            </div>

            <div className="flex flex-col gap-1 text-xs text-slate-500">
              <div>
                <span className="font-medium text-slate-700">GIC:</span>{" "}
                <AddressDisplay
                  address={counterparty.gic}
                  truncate
                  startChars={3}
                  endChars={3}
                />
              </div>
              <div>
                <span className="font-medium text-slate-700">IGAN:</span>{" "}
                <AddressDisplay
                  address={counterparty.igan}
                  truncate
                  startChars={3}
                  endChars={3}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
