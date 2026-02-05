"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import RealSkeleton from "@/components/ui/real-skeleton";
import { Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MembersSkeletonProps {
  view: "grid" | "table";
  count?: number;
}

export const MembersSkeleton: React.FC<MembersSkeletonProps> = ({
  view,
  count = 6,
}) => {
  if (view === "grid") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <Card
            key={idx}
            className="overflow-hidden rounded-2xl border bg-background/60 backdrop-blur-md animate-pulse"
          >
            <CardContent className="space-y-4 p-5">
              {/* Header */}
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0 space-y-1">
                  <RealSkeleton className="h-3 w-20" /> {/* Label */}
                  <RealSkeleton className="h-4 w-28" /> {/* Member GIC */}
                </div>
                <RealSkeleton className="h-5 w-12 rounded-full" />{" "}
                {/* Status Badge */}
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between">
                  <RealSkeleton className="h-3 w-20" /> {/* Entity Label */}
                  <RealSkeleton className="h-3 w-16" /> {/* Entity Value */}
                </div>
                <div className="flex justify-between">
                  <RealSkeleton className="h-3 w-20" /> {/* Compliance Label */}
                  <RealSkeleton className="h-3 w-16" /> {/* Compliance Value */}
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-1">
                <RealSkeleton className="h-3 w-20" /> {/* Roles Label */}
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <RealSkeleton key={i} className="h-3 w-14 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t pt-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <RealSkeleton className="h-3 w-20" />
                </div>
                <RealSkeleton className="h-8 w-20 rounded-md" /> {/* Button */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (view === "table") {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              {/* Header (real headers, not skeletons) */}
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Member GIC</TableHead>
                  <TableHead>Entity Type</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>

              {/* Body Skeleton */}
              <TableBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="max-w-[160px]">
                      <RealSkeleton className="w-full h-3" />
                    </TableCell>

                    <TableCell>
                      <RealSkeleton className="w-10 h-3" />
                    </TableCell>

                    <TableCell>
                      <RealSkeleton className="w-16 h-3" />
                    </TableCell>

                    <TableCell>
                      <RealSkeleton className="w-20 h-3" />
                    </TableCell>

                    <TableCell>
                      <RealSkeleton className="w-full h-3" />
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

  return null;
};
