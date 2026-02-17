"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

type AssetsView = "grid" | "table";

interface AssetsSkeletonProps {
  view: AssetsView;
}

export default function AssetsSkeleton({ view }: AssetsSkeletonProps) {
  if (view === "table") {
    return <AssetsTableSkeleton />;
  }

  return <AssetsGridSkeleton />;
}

function AssetsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 overflow-hidden animate-pulse bg-white"
        >
          {/* Header */}
          <div className="h-24 bg-slate-200" />

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="h-4 w-1/2 bg-slate-200 rounded" />
            <div className="h-3 w-2/3 bg-slate-200 rounded" />

            <div className="flex justify-between pt-2">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>

            <div className="h-3 w-1/3 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function AssetsTableSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden animate-pulse">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableHead key={i}>
                <div className="h-4 w-20 bg-slate-200 rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, row) => (
            <TableRow key={row}>
              {Array.from({ length: 5 }).map((_, col) => (
                <TableCell key={col}>
                  <div className="h-4 w-full bg-slate-200 rounded" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
