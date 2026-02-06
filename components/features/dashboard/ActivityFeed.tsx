"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ArrowLeftRight, Wallet, Users, Plus } from "lucide-react";

export default function ActivityFeed() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: Package,
                title: "New asset minted",
                description: "VALCAMBY-SN-100240",
                time: "2 hours ago",
                color: "text-emerald-600",
              },
              {
                icon: ArrowLeftRight,
                title: "Transaction settled",
                description: "TX-A1B2C completed",
                time: "5 hours ago",
                color: "text-blue-600",
              },
              {
                icon: Users,
                title: "New member joined",
                description: "Tokyo Gold Trading",
                time: "1 day ago",
                color: "text-purple-600",
              },
              {
                icon: Wallet,
                title: "Account created",
                description: "GIFT-CH-GOLDBNK1-010-0001",
                time: "2 days ago",
                color: "text-amber-600",
              },
            ].map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 ${activity.color}`}
                >
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {activity.description}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
