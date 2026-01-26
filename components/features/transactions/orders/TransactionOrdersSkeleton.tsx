import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TransactionOrdersSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          {/* Header */}
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                {/* Transaction reference */}
                <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
                {/* Transaction type */}
                <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
              </div>

              {/* Status badge */}
              <div className="h-5 w-20 rounded-full bg-slate-100 animate-pulse" />
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
            </div>

            {/* Amount */}
            <div className="h-5 w-32 rounded bg-slate-100 animate-pulse" />

            {/* Divider */}
            <div className="h-px w-full bg-slate-100" />

            {/* Action buttons */}
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
