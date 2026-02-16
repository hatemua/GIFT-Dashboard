"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RealSkeleton from "@/components/ui/real-skeleton";
import {
  Wallet,
  Users,
  Gem,
  CreditCard,
  RefreshCw,
  Trash2,
  Archive,
} from "lucide-react";
import { useActivity } from "@/hooks/useActivity";
import { ActivityLog } from "@/types/activity";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

/* -----------------------------
   Activity Configuration
------------------------------*/

const activityConfig = {
  new_member_added: {
    icon: Users,
    title: "New Member Joined",
    color: "text-purple-600",
    bg: "bg-purple-100",
    path: (id: string) => `/members/${id}`,
  },
  new_user_added: {
    icon: Wallet,
    title: "New User Created",
    color: "text-amber-600",
    bg: "bg-amber-100",
    path: (id: string) => `/users/${id}`,
  },
  new_asset_minted: {
    icon: Gem,
    title: "New Asset Minted",
    color: "text-green-600",
    bg: "bg-green-100",
    path: (id: string) => `/assets/${id}`,
  },
  new_gold_account_added: {
    icon: CreditCard,
    title: "New Gold Account Added",
    color: "text-blue-600",
    bg: "bg-blue-100",
    path: (id: string) => `/gold-accounts/${id}`,
  },
  asset_status_change: {
    icon: RefreshCw,
    title: "Asset status changed",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    path: (id: string) => `/assets/${id}`,
  },
  asset_burned: {
    icon: Trash2,
    title: "Asset burned",
    color: "text-red-600",
    bg: "bg-red-100",
    path: (id: string) => `/assets/${id}`,
  },
  asset_custody_change: {
    icon: Archive,
    title: "Asset custody changed",
    color: "text-teal-600",
    bg: "bg-teal-100",
    path: (id: string) => `/assets/${id}`,
  },
} as const;

/* -----------------------------
   Helpers
------------------------------*/

function truncateId(id?: string, chars = 6) {
  if (!id) return "";

  if (id.length <= chars * 2 + 1) return id;

  return `${id.slice(0, chars)}…${id.slice(-chars)}`;
}

function renderDescription(activity: ActivityLog) {
  switch (activity.event) {
    case "new_member_added":
      return { label: "Member GIC", value: activity.member_gic };
    case "new_user_added":
      return { label: "User ID", value: activity.user_id };
    case "new_gold_account_added":
      return { label: "IGAN", value: activity.igan };
    case "new_asset_minted":
    case "asset_status_change":
    case "asset_burned":
    case "asset_custody_change":
      return { label: "Token ID", value: activity.token_id };
    default:
      return null;
  }
}

function ActivitySkeletonItem() {
  return (
    <div className="flex gap-3">
      <RealSkeleton className="h-8 w-8 rounded-lg" />
      <div className="flex-1 space-y-1">
        <RealSkeleton className="h-3 w-40" />
        <RealSkeleton className="h-3 w-56" />
        <RealSkeleton className="h-2 w-24" />
      </div>
    </div>
  );
}

/* -----------------------------
   Component
------------------------------*/

export default function ActivityFeed() {
  const { activities, loading, error } = useActivity();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ActivitySkeletonItem key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && <p className="text-sm text-red-500">{error}</p>}

        {/* Empty */}
        {!loading && !error && activities.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 p-12 border border-dashed border-slate-300 rounded-xl bg-slate-50">
            <Users className="h-12 w-12 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900">
              No Recent Activity
            </h3>
            <p className="text-sm text-slate-500 max-w-xs text-center">
              There have been no actions or events recorded in the system yet.
              Recent activity, such as new members, asset updates, and
              transactions, will appear here once they occur.
            </p>
          </div>
        )}

        {/* Activity List */}
        {!loading && !error && activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.event];
              const Icon = config.icon;
              const description = renderDescription(activity);

              return (
                <div key={index} className="flex gap-3">
                  {/* Icon */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg} ${config.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {config.title}
                    </p>

                    {description && config.path && description.value && (
                      <div className="mt-0.5 flex flex-wrap items-center gap-1 text-xs">
                        <span className="text-slate-400">
                          {description.label}:
                        </span>
                        <Link
                          href={config.path(description.value)}
                          className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded hover:bg-slate-200"
                          title={description.value}
                        >
                          {truncateId(description.value)}
                        </Link>
                      </div>
                    )}

                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatDate(activity.created_at, "relative")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
