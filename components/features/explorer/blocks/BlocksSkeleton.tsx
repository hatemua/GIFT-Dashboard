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

interface BlocksSkeletonProps {
  view: "grid" | "table";
}

export default function BlocksSkeleton({ view }: BlocksSkeletonProps) {
  if (view === "table") {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Height</TableHead>
                  <TableHead>Block Hash</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Producer
                  </TableHead>
                  <TableHead>Txs</TableHead>
                  <TableHead className="hidden lg:table-cell">Size</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Timestamp
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="w-10 h-3" />
                    </TableCell>

                    <TableCell className="max-w-[180px]">
                      <Skeleton className="w-full h-3" />
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="w-full h-3" />
                    </TableCell>

                    <TableCell>
                      <Skeleton className="h-5 w-12 rounded-full" />
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <Skeleton className="w-16 h-3" />
                    </TableCell>

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
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>

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
