"use client";

import { OwnershipChainItem } from "@/types/asset";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, Crown, User, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAsset } from "@/hooks/useAsset";

interface Props {
  data: OwnershipChainItem[];
}

const formatDate = (date?: string | null) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDuration = (days: number) => {
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.floor(days / 30)}mo`;
  const years = Math.floor(days / 365);
  return `${years}y`;
};

export const OwnershipTab = ({ data }: Props) => {
  const { assetDetails } = useAsset();
  const sortedData = [...data].sort(
    (a, b) => new Date(b.from_date).getTime() - new Date(a.from_date).getTime(),
  );

  if (!sortedData.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-md">
          <User className="h-7 w-7 text-primary" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-muted-foreground">
          No ownership history available.
        </h3>
      </div>
    );
  }

  return (
    <Card className="mt-4 space-y-5 p-4 pb-8">
      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Ownership History</h2>
          <p className="text-xs text-muted-foreground">
            Chain of legal ownership
          </p>
        </div>
        <Badge variant="outline" className="h-6 px-2 text-xs gap-1">
          <User className="h-3 w-3" />
          {sortedData.length}
        </Badge>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Slim vertical line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/40 via-border to-border" />

        <div className="space-y-3">
          {sortedData.map((owner) => {
            const isCurrent =
              owner.owner_igan === assetDetails?.ownership.current_owner_igan;

            return (
              <div
                key={`${owner.owner_igan}-${owner.from_date}`}
                className="relative group"
              >
                {/* Compact dot */}
                <div className="absolute left-0 top-2 flex items-center justify-center">
                  <div className={cn("relative", isCurrent && "animate-pulse")}>
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all",
                        isCurrent
                          ? "bg-emerald-500 border-emerald-200 shadow-sm shadow-emerald-500/20"
                          : "bg-background border-muted group-hover:border-primary/40",
                      )}
                    >
                      {isCurrent ? (
                        <Crown className="h-3 w-3 text-white" />
                      ) : (
                        <User className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Compact content card */}
                <div className="ml-10">
                  <div
                    className={cn(
                      "rounded-lg border p-3 transition-all",
                      isCurrent
                        ? "border-emerald-200 bg-emerald-50/30"
                        : "border-border bg-card hover:border-primary/30",
                    )}
                  >
                    {/* Row 1: Owner + Current Badge + Duration */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-muted-foreground shrink-0">
                          Owner
                        </span>
                        <AddressDisplay
                          address={owner.owner_igan}
                          truncate
                          startChars={6}
                          endChars={4}
                          className="font-mono text-xs font-medium px-1.5 py-0.5 rounded shrink min-w-0"
                        />
                        {isCurrent && (
                          <Badge className="h-5 bg-emerald-500 hover:bg-emerald-600 text-white px-1.5 text-[10px] gap-0.5 shrink-0">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0",
                          isCurrent
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Calendar className="h-2.5 w-2.5" />
                        <span>{formatDuration(owner.duration_days)}</span>
                      </div>
                    </div>

                    {/* Row 2: GIC */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground shrink-0">
                        GIC
                      </span>
                      <AddressDisplay
                        address={owner.owner_gic}
                        truncate
                        startChars={6}
                        endChars={4}
                        className="font-mono text-xs text-muted-foreground px-1.5 py-0.5 rounded"
                      />
                    </div>

                    {/* Row 3: Period */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="text-[10px]">
                          {formatDate(owner.from_date)}
                        </span>
                        <span className="text-[10px]">→</span>
                        <span className="text-[10px] font-medium text-foreground">
                          {formatDate(owner.to_date)}
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
