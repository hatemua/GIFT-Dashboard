"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlacklistedMember } from "@/types/member";
import { User, Shield, UserX, Calendar, AlertCircle } from "lucide-react";

interface BlacklistGridProps {
  members: BlacklistedMember[];
  onRemove?: (id: string) => void;
}

export default function BlacklistGrid({
  members,
  onRemove,
}: BlacklistGridProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {members.map((member) => (
          <div
            key={member.member_gic}
            className="group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:border-gray-300"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <UserX className="h-5 w-5 text-gray-700" />
                </div>

                <div>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 border-gray-200 font-mono text-xs hover:bg-gray-200"
                  >
                    {member.member_gic}
                  </Badge>

                  <div className="flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    <span className="text-[11px] font-medium text-red-600">
                      Restricted Access
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-3">
              {/* Blacklisted Date */}
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-gray-50/50">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>

                <div>
                  <div className="text-[11px] text-gray-500">
                    Blacklisted On
                  </div>
                  <div className="font-medium text-sm text-gray-900">
                    {new Date(member.blacklisted_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {new Date(member.blacklisted_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* Admin */}
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-gray-50/50">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>

                <div>
                  <div className="text-[11px] text-gray-500">
                    Restricted By
                  </div>
                  <div className="font-medium text-sm text-gray-900 flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-3 w-3 text-blue-600" />
                    </div>
                    {member.created_by_admin}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRemove?.(member.member_gic)}
                className="w-full text-xs border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all"
              >
                Remove Restriction
              </Button>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-14 h-14 overflow-hidden">
              <div className="absolute top-[-14px] right-[-14px] w-28 h-28 bg-gradient-to-br from-red-50/20 to-transparent rotate-45" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
