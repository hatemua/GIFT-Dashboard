"use client";

import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { ArrowRight, CalendarDays, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SearchResultItem, SourceType } from "@/types/search";
import {
  UserCircle,
  Package,
  Receipt,
  Tag,
  BadgeCheck,
  Fingerprint,
  Shield,
  CircleDollarSign,
} from "lucide-react";

interface Props {
  item: SearchResultItem;
  onClick: () => void;
}

export const SearchResultCard: React.FC<Props> = ({ item, onClick }) => {
  const iconConfig = getIconConfig(item.source_type);
  const IconComponent = iconConfig.icon;

  const primaryLabel = getPrimaryLabel(item);
  const secondaryInfo = getSecondaryInfo(item);
  const metadata = getMetadata(item);

  return (
    <Link
      href={`/${item.source_type}s/${encodeURIComponent(primaryLabel)}`}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-lg"
      onClick={onClick}
    >
      <Card className="rounded-lg border border-muted/10 bg-white/80 backdrop-blur-sm">
        <CardHeader className="p-3">
          <div className="flex items-start gap-2.5">
            {/* Icon */}
            <div
              className={cn(
                "p-2 rounded-lg border bg-gradient-to-br flex-shrink-0",
                iconConfig.bg,
                iconConfig.border,
              )}
            >
              <IconComponent className={cn("h-3.5 w-3.5", iconConfig.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Primary Row */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <CardTitle className="text-xs font-semibold truncate">
                    {primaryLabel}
                  </CardTitle>

                  <Badge
                    variant="outline"
                    className="text-[8px] px-1 py-0 h-4 capitalize bg-muted/5 border-muted/20 text-muted-foreground/70 font-normal"
                  >
                    {item.source_type.replace("_", " ")}
                  </Badge>
                </div>

                {item.createdAt && (
                  <span className="flex items-center text-[8px] text-muted-foreground/40 whitespace-nowrap">
                    <CalendarDays className="h-2.5 w-2.5 mr-0.5" />
                    {dayjs(item.createdAt).format("MMM D")}
                  </span>
                )}
              </div>

              {/* Secondary Info */}
              {secondaryInfo.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 mb-1">
                  {secondaryInfo.map((info, idx) =>
                    info.badge ? (
                      <Badge
                        key={idx}
                        className={cn(
                          "text-[8px] px-1.5 py-0 h-4 font-normal border",
                          info.color,
                        )}
                      >
                        <info.icon className="h-2 w-2 mr-0.5" />
                        {info.value}
                      </Badge>
                    ) : (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-[8px] text-muted-foreground/60 bg-muted/10 px-1.5 py-0 rounded-full"
                      >
                        <info.icon className="h-2 w-2" />
                        <span>{info.value}</span>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* Metadata */}
              {metadata.length > 0 && (
                <div className="flex items-center gap-2">
                  {metadata.map((meta, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-[7px] text-muted-foreground/40"
                    >
                      <meta.icon className="h-2 w-2" />
                      <span>{meta.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Arrow */}
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/20 group-hover:text-primary/40 group-hover:translate-x-0.5 transition-all" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

/* -------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------- */

const getIconConfig = (type: SourceType) => {
  const configs = {
    member: {
      icon: UserCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    gold_asset: {
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    transaction_order: {
      icon: Receipt,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  };

  return configs[type] || configs.gold_asset;
};

const getStatusColor = (status: string = "") => {
  const statusMap: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    default: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return statusMap[status.toLowerCase()] || statusMap.default;
};

const getPrimaryLabel = (item: SearchResultItem) => {
  switch (item.source_type) {
    case "member":
      return item.member_gic || "N/A";
    case "gold_asset":
      return item.serial_number || item.token_id || "N/A";
    case "transaction_order":
      return item.transaction_reference || "N/A";
    default:
      return "N/A";
  }
};

const getSecondaryInfo = (item: SearchResultItem) => {
  const info: any[] = [];

  switch (item.source_type) {
    case "member":
      if (item.entity_type)
        info.push({
          value: item.entity_type,
          icon: UserCircle,
        });

      if (item.roles?.length)
        info.push({
          value: item.roles.join(", "),
          icon: Shield,
        });

      break;

    case "gold_asset":
      if (item.gold_product_type_id)
        info.push({
          value: item.gold_product_type_id,
          icon: Tag,
        });

      if (item.asset_status)
        info.push({
          value: item.asset_status,
          icon: BadgeCheck,
          badge: true,
          color: getStatusColor(item.asset_status),
        });

      if (item.token_id)
        info.push({
          value: item.token_id,
          icon: Fingerprint,
        });

      break;

    case "transaction_order":
      if (item.transaction_type)
        info.push({
          value: item.transaction_type,
          icon: CircleDollarSign,
        });

      if (item.transation_status)
        info.push({
          value: item.transation_status,
          icon: BadgeCheck,
          badge: true,
          color: getStatusColor(item.transation_status),
        });

      break;
  }

  return info;
};

const getMetadata = (item: SearchResultItem) => {
  const metadata: any[] = [];

  if (item.createdAt) {
    metadata.push({
      icon: CalendarDays,
      value: dayjs(item.createdAt).format("MMM D, YYYY"),
    });
  }

  metadata.push({
    icon: Layers,
    value: item.source_type.replace("_", " "),
  });

  return metadata;
};
