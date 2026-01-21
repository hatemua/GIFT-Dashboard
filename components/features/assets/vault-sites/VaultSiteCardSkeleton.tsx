import { Card, CardContent, CardHeader } from "@/components/ui/card";

const VaultSiteCardSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
              </div>
              <div className="h-5 w-16 rounded-full bg-slate-100 animate-pulse" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
                <div className="h-3 w-8 rounded bg-slate-100 animate-pulse" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 animate-pulse" />
            </div>

            {/* Action button */}
            <div className="h-9 w-full rounded-button bg-slate-100 animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VaultSiteCardSkeleton;
