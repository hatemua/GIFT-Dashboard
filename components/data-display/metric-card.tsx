import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Sparkline } from "@/components/charts/sparkline";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  sparklineData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  sparklineData,
  icon,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-gold-50 flex items-center justify-center text-gold-600">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {value}
            </div>
            {change && (
              <div
                className={cn(
                  "flex items-center text-xs font-medium mt-1",
                  change.trend === "up" ? "text-emerald-600" : "text-red-500"
                )}
              >
                {change.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(change.value)}%
              </div>
            )}
          </div>
          {sparklineData && (
            <Sparkline
              data={sparklineData}
              className="h-10 w-20"
              color={change?.trend === "up" ? "#10B981" : "#EF4444"}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
