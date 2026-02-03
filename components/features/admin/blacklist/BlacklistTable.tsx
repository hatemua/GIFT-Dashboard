"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Shield, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlacklistedMember } from "@/types/member";

interface BlacklistTableProps {
  members: BlacklistedMember[];
  onRemove?: (id: string) => void;
}

export default function BlacklistTable({
  members,
  onRemove,
}: BlacklistTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-t border-gray-100 bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="h-12 font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Member
              </div>
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Blacklisted At
              </div>
            </TableHead>
            <TableHead className="h-12 font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </div>
            </TableHead>
            <TableHead className="h-12 text-right font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {members.map((member, index) => (
            <TableRow
              key={member.member_gic}
              className={cn(
                "group hover:bg-gray-50/80 transition-colors",
                index !== members.length - 1 && "border-b border-gray-100",
              )}
            >
              {/* Member */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <UserX className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 border-gray-200 font-mono hover:bg-gray-200"
                    >
                      {member.member_gic}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Restricted</p>
                  </div>
                </div>
              </TableCell>

              {/* Date */}
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">
                    {new Date(member.blacklisted_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(member.blacklisted_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Admin */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {member.created_by_admin}
                  </span>
                </div>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemove?.(member.member_gic)}
                  className="border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all group/button"
                >
                  <span className="group-hover/button:scale-105 transition-transform">
                    Remove
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
