import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VaultSitesSkeletonProps {
  view?: "grid" | "table";
}

const VaultSitesSkeleton = ({ view = "grid" }: VaultSitesSkeletonProps) => {
  if (view === "table") {
    // Table skeleton
    return (
      <div className="overflow-x-auto w-full rounded-lg border border-slate-200 shadow-sm">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50">
            <TableRow>
              {["Vault Site", "Location", "Vaults", "Gold Stored", "Status", "Last Audit", "Action"].map(
                (_, idx) => (
                  <TableHead key={idx} className="px-6 py-4">
                    <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {[...Array(6)].map((_, i) => (
              <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                {[...Array(7)].map((_, j) => (
                  <TableCell key={j} className="px-6 py-4">
                    <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Grid skeleton
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden animate-pulse">
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-100" />
              </div>
              <div className="h-5 w-16 rounded-full bg-slate-100" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-full rounded bg-slate-100" />
            </div>

            {/* Gold Progress */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-24 rounded bg-slate-100" />
                <div className="h-3 w-8 rounded bg-slate-100" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100" />
            </div>

            {/* Action Button */}
            <div className="h-9 w-full rounded bg-slate-100" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VaultSitesSkeleton;
