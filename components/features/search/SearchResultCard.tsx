"use client";

import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  CalendarDays,
  Layers,
  UserCircle,
  Package,
  ArrowLeftRight,
  CircleDollarSign,
  ChevronRight,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { SearchResultItem } from "@/types/search";
import { getAssetStatusLabel } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface Props {
  item: SearchResultItem;
  onClick: () => void;
}

export const SearchResultCard: React.FC<Props> = ({ item, onClick }) => {
  switch (item.source_type) {
    case "member":
      return <MemberCard item={item} onClick={onClick} />;
    case "gold_asset":
      return <AssetCard item={item} onClick={onClick} />;
    case "transaction_order":
      return <TransactionCard item={item} onClick={onClick} />;
    default:
      return null;
  }
};

/* ----------------------------- */
/* COMMON CARD LAYOUT WRAPPER */
/* ----------------------------- */
const CardWrapper: React.FC<{
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, icon, children, onClick }) => {
  return (
    <Link href={href} onClick={onClick} className="block">
      <Card className="group flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 transition-all duration-200 rounded-lg">
        {/* Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="flex-1 min-w-0">{children}</div>

          {/* Chevron */}
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
        </div>
      </Card>
    </Link>
  );
};

/* ----------------------------- */
/* MEMBER CARD */
/* ----------------------------- */
const MemberCard: React.FC<Props> = ({ item, onClick }) => {
  return (
    <CardWrapper
      href={`/members/${item.member_gic}`}
      icon={<UserCircle className="h-4 w-4 text-emerald-600" />}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {item.member_gic && (
            <AddressDisplay
              address={item.member_gic}
              truncate
              startChars={4}
              endChars={4}
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {item.entity_type && <span>{item.entity_type}</span>}
          {item.created_at && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {dayjs(item.created_at).format("MMM D, YYYY")}
            </span>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

/* ----------------------------- */
/* ASSET CARD */
/* ----------------------------- */
const AssetCard: React.FC<Props> = ({ item, onClick }) => {
  return (
    <CardWrapper
      href={`/assets/${item.token_id}`}
      icon={<Package className="h-4 w-4 text-amber-600" />}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 truncate">
            {item.serial_number || "N/A"}
          </span>
          {item.asset_status && (
            <StatusBadge
              status={getAssetStatusLabel(item.asset_status)}
              className="scale-75 origin-left"
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {item.token_id && (
            <AddressDisplay
              address={item.token_id}
              truncate
              startChars={4}
              endChars={4}
            />
          )}
          {item.created_at && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {dayjs(item.created_at).format("MMM D, YYYY")}
            </span>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

/* ----------------------------- */
/* TRANSACTION CARD */
/* ----------------------------- */
const TransactionCard: React.FC<Props> = ({ item, onClick }) => {
  const iconBgClass = getStatusColor(item.transation_status);

  return (
    <CardWrapper
      href={`/transactions/${item.transaction_reference}`}
      icon={<ArrowLeftRight className={`h-4 w-4 ${iconBgClass.text}`} />}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-xs font-medium text-gray-900 truncate">
            {item.transaction_reference || "N/A"}
          </CardTitle>
          {item.transation_status && (
            <StatusBadge
              status={item.transation_status}
              className="text-[10px] px-2 py-0.5"
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {item.transaction_type && (
            <span className="inline-flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded">
              <CircleDollarSign className="h-3 w-3" />
              {item.transaction_type}
            </span>
          )}
          {item.created_at && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {dayjs(item.created_at).format("MMM D, YYYY")}
            </span>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

/* ----------------------------- */
/* UTILITIES */
/* ----------------------------- */
const getStatusColor = (status: string = "") => {
  const statusMap: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    executed: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
    pending_execution: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
    },
    pending_counterparty: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    pending_signature: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "border-violet-200",
    },
    default: {
      bg: "bg-gray-50",
      text: "text-gray-600",
      border: "border-gray-200",
    },
  };

  return statusMap[status.toLowerCase()] || statusMap.default;
};
