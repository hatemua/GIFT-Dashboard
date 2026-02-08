"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RealSkeleton from "@/components/ui/real-skeleton";
import { Wallet, Users } from "lucide-react";
import { useActivity } from "@/hooks/useActivity";
import { ActivityLog } from "@/types/activity";
import { formatDate } from "@/lib/utils";

const activityConfig = {
  new_member_added: {
    icon: Users,
    title: "New member joined",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  new_user_added: {
    icon: Wallet,
    title: "New user created",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
} as const;

/* -----------------------------
   Helpers
------------------------------*/

function renderDescription(activity: ActivityLog) {
  switch (activity.event) {
    case "new_member_added":
      return activity.member_gic;

    case "new_user_added":
      return activity.user_id;

    default:
      return "";
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
        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ActivitySkeletonItem key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && <p className="text-sm text-red-500">{error}</p>}

        {/* Empty state */}
        {!loading && !error && activities.length === 0 && (
          <p className="text-sm text-slate-500">No recent activity</p>
        )}

        {/* Activity list */}
        {!loading && !error && activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.event];
              const Icon = config.icon;

              return (
                <div key={index} className="flex gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg} ${config.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {config.title}
                    </p>

                    <p className="text-xs text-slate-500">
                      {renderDescription(activity)}
                    </p>

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
