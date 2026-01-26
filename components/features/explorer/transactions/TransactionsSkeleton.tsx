import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function TransactionsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="space-y-3 p-4">
            <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-slate-200 animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
