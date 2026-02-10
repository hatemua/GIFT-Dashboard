"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, CheckCircle, ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransaction } from "@/hooks/useTransaction";

interface TransactionEventsProps {
  transactionReference: string;
}

export const TransactionEvents: React.FC<TransactionEventsProps> = ({
  transactionReference,
}) => {
  const {
    transactionEvents,
    loadingEvents,
    fetchTransactionEvents,
  } = useTransaction();

  // Fetch events on mount
  useEffect(() => {
    if (transactionReference) fetchTransactionEvents(transactionReference);
  }, [transactionReference, fetchTransactionEvents]);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-500" />
          History
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {loadingEvents && (
          <>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 animate-pulse rounded-lg border border-slate-200 bg-slate-100 p-4"
              >
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </>
        )}

        {!loadingEvents && transactionEvents?.events?.length === 0 && (
          <div className="text-sm text-slate-500 text-center py-4">
            No events for this transaction.
          </div>
        )}

        {!loadingEvents &&
          transactionEvents?.events?.map((event) => (
            <div
              key={event.event_id}
              className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md"
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  event.event_type === "created"
                    ? "bg-emerald-50 text-emerald-600"
                    : event.event_type === "signed"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-indigo-50 text-indigo-600"
                )}
              >
                {event.event_type === "created" && <CheckCircle className="w-5 h-5" />}
                {event.event_type === "signed" && <User className="w-5 h-5" />}
                {event.event_type === "executed" && <ArrowRight className="w-5 h-5" />}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-900">
                  <span>{event.event_type.toUpperCase()}</span>
                  <span className="text-xs text-slate-500">
                    by {event.actor}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(event.timestamp).toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  Block: {event.block_number} | TxHash:{" "}
                  <span className="truncate">{event.transaction_hash}</span>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
