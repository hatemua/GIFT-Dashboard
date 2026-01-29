import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionOrdersSkeletonProps {
  view: "grid" | "table";
}

const TransactionOrdersSkeleton = ({
  view,
}: TransactionOrdersSkeletonProps) => {
  /* -------------------------------------------------------------------------- */
  /*                                   TABLE                                    */
  /* -------------------------------------------------------------------------- */
  if (view === "table") {
    return (
      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Assets</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 w-32 rounded bg-slate-100 animate-pulse" />
                </TableCell>

                <TableCell>
                  <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
                </TableCell>

                <TableCell>
                  <div className="h-4 w-24 rounded bg-slate-100 animate-pulse" />
                </TableCell>

                <TableCell>
                  <div className="h-4 w-10 rounded bg-slate-100 animate-pulse" />
                </TableCell>

                <TableCell>
                  <div className="h-4 w-12 rounded bg-slate-100 animate-pulse" />
                </TableCell>

                <TableCell className="text-right">
                  <div className="ml-auto h-4 w-20 rounded bg-slate-100 animate-pulse" />
                </TableCell>

                <TableCell className="text-right">
                  <div className="ml-auto h-8 w-16 rounded bg-slate-100 animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                    GRID                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          {/* Header */}
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
              </div>

              <div className="h-5 w-20 rounded-full bg-slate-100 animate-pulse" />
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
            </div>

            <div className="h-5 w-32 rounded bg-slate-100 animate-pulse" />

            <div className="h-px w-full bg-slate-100" />

            <div className="flex gap-3">
              <div className="h-9 flex-1 rounded-button bg-slate-100 animate-pulse" />
              <div className="h-9 w-9 rounded-button bg-slate-100 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionOrdersSkeleton;