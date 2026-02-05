"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { Calendar, ExternalLink } from "lucide-react";
import { Member } from "@/types/member";
import {
  COMPLIANCE_LEVELS,
  ENTITY_TYPES,
  ROLE_COLORS,
  ROLES,
} from "@/constants/member";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { Button } from "@/components/ui/button";

interface MembersGridProps {
  members: Member[];
}

const statusStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-red-50 text-red-700 border-red-200",
};

export default function MembersGrid({ members }: MembersGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card
          key={member.member_hash ?? member.member_gic}
          className="group relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur-md transition-transform hover:-translate-y-1 hover:shadow-xl"
        >
          <CardContent className="space-y-4 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Member GIC
                </p>

                <AddressDisplay
                  address={member.member_gic}
                  truncate
                  startChars={4}
                  endChars={4}
                />
              </div>

              <Badge
                variant="outline"
                className={cn(
                  "capitalize px-2 py-1 text-xs",
                  statusStyles[member.status?.toLowerCase()] ??
                    "bg-slate-50 text-slate-700 border-slate-200",
                )}
              >
                {member.status}
              </Badge>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">
                  Entity Type
                </span>
                <span className="font-medium">
                  {ENTITY_TYPES.find((e) => e.value === member.entity_type)
                    ?.label || member.entity_type}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">
                  Compliance
                </span>
                <span className="font-medium">
                  {COMPLIANCE_LEVELS.find(
                    (c) => c.value === member.compliance_level,
                  )?.label || member.compliance_level}
                </span>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground font-semibold">Roles</p>
              <div className="flex flex-wrap gap-1">
                {member.roles.map((role) => {
                  const roleLabel =
                    ROLES.find((r) => r.value === role)?.label ||
                    role.replace("ROLE_", "");
                  const color =
                    ROLE_COLORS[role] ||
                    "bg-slate-50 text-slate-700 border-slate-200";

                  return (
                    <Badge
                      key={role}
                      variant="outline"
                      className={cn("text-xs px-2 py-1", color)}
                      title={roleLabel}
                    >
                      {roleLabel}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Footer with creation date */}
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={member.createdAt.toString()}>
                  {formatDate(member.createdAt, "short")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
