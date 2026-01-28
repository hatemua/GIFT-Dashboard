import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "@/components/ui/real-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionsSkeletonProps {
  view: "grid" | "table";
}

export default function TransactionsSkeleton({
  view,
}: TransactionsSkeletonProps) {
  if (view === "table") {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              {/* Header (real headers, not skeletons) */}
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Tx Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Asset</TableHead>
                  <TableHead className="hidden xl:table-cell">From</TableHead>
                  <TableHead className="hidden xl:table-cell">To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Timestamp
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Body Skeleton */}
              <TableBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    {/* Hash */}
                    <TableCell className="max-w-[160px]">
                      <Skeleton className="w-full h-3" />
                    </TableCell>

                    {/* Block */}
                    <TableCell>
                      <Skeleton className="w-10 h-3" />
                    </TableCell>

                    {/* Type */}
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="w-16 h-3" />
                    </TableCell>

                    {/* Asset */}
                    <TableCell className="hidden lg:table-cell">
                      <Skeleton className="w-20 h-3" />
                    </TableCell>

                    {/* From */}
                    <TableCell className="hidden xl:table-cell max-w-[180px]">
                      <Skeleton className="w-full h-3" />
                    </TableCell>

                    {/* To */}
                    <TableCell className="hidden xl:table-cell max-w-[180px]">
                      <Skeleton className="w-full h-3" />
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </TableCell>

                    {/* Timestamp */}
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="w-24 h-3" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  // GRID VIEW
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="rounded-2xl border bg-muted/40">
          <CardContent className="space-y-4 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Block */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-10" />
            </div>

            {/* Asset */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* From */}
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-40" />
            </div>

            {/* To */}
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-40" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
