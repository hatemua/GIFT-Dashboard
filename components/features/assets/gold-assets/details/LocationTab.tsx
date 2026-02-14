"use client";

import { LocationHistoryItem } from "@/types/asset";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface Props {
  data: LocationHistoryItem[];
}

const formatDate = (date?: string | null) => {
  if (!date) return "Present";
  return dayjs(date).format("MMM D, YYYY");
};

export const LocationTab = ({ data }: Props) => {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-md">
          <MapPin className="h-7 w-7 text-primary" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-muted-foreground">
          No location history available
        </h3>
        <p className="mt-1 text-xs text-muted-foreground text-center max-w-xs">
          Once locations are tracked, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <Card className="mt-4 p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Location History</h2>
          <p className="text-xs text-muted-foreground">
            Chain of vault locations
          </p>
        </div>
        <Badge variant="outline" className="h-6 px-2 text-xs gap-1">
          <MapPin className="h-3 w-3" />
          {data.length}
        </Badge>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/40 via-border to-border" />

        <div className="space-y-3">
          {data.map((loc, index) => {
            const isCurrent = loc.is_current_location;

            return (
              <div
                key={`${loc.vault_id}-${loc.from_date}`}
                className="relative group"
              >
                {/* Timeline dot */}
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
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      ) : (
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="ml-10">
                  <Card
                    className={cn(
                      "rounded-lg border p-3 transition-all",
                      isCurrent
                        ? "border-emerald-200 bg-emerald-50/30 shadow-sm"
                        : "border-border bg-card hover:border-primary/30",
                    )}
                  >
                    {/* Row 1: Vault site + Vault ID + Current badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-muted-foreground shrink-0">
                          Vault Site
                        </span>
                        <span className="font-medium text-sm">
                          {loc.vault_site_id}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground px-1.5 py-0.5 rounded">
                          {loc.vault_id}
                        </span>
                        {isCurrent && (
                          <Badge className="h-5 bg-emerald-500 hover:bg-emerald-600 text-white px-1.5 text-[10px] gap-0.5 shrink-0">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Dates */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span>{formatDate(loc.from_date)}</span>
                        <span>→</span>
                        <span className="font-medium text-foreground">
                          {formatDate(loc.to_date)}
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Active
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
