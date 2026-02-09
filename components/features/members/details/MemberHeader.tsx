"use client";
import {
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Activity } from "lucide-react";

interface MemberHeaderProps {
  memberData: any;
}

export function MemberHeader({ memberData }: MemberHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-start gap-2">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            {memberData?.member_gic || "Unnamed Member"}
          </CardTitle>
          <CardDescription className="text-slate-500 mt-1">
            Member since{" "}
            {new Date(memberData?.createdAt || "").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </CardDescription>
        </div>
      </div>
      <Badge
        variant={memberData?.status === "active" ? "success" : "error"}
        className="px-4 py-2 rounded-lg text-sm font-semibold shadow-sm"
      >
        <Activity className="w-3 h-3 mr-2" />
        {memberData?.status.toUpperCase()}
      </Badge>
    </div>
  );
}
