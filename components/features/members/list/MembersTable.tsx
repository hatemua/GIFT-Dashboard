"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Member } from "@/types/member";
import {
  COMPLIANCE_LEVELS,
  ENTITY_TYPES,
  ROLE_COLORS,
  ROLES,
} from "@/constants/member";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface MembersTableProps {
  members: Member[];
}

export default function MembersTable({ members }: MembersTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Horizontal scroll wrapper */}
        <div className="relative w-full overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="whitespace-nowrap">Member GIC</TableHead>
                <TableHead className="whitespace-nowrap">Entity Type</TableHead>
                <TableHead className="whitespace-nowrap">Compliance</TableHead>
                <TableHead className="whitespace-nowrap">Roles</TableHead>
                <TableHead className="whitespace-nowrap">Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.member_hash ?? member.member_gic}
                  className="transition hover:bg-muted/30"
                >
                  {/* Member GIC */}
                  <TableCell
                    className="max-w-[180px] font-mono text-xs whitespace-nowrap"
                    title={member.member_gic}
                  >
                    <AddressDisplay
                      address={member.member_gic}
                      truncate
                      startChars={4}
                      endChars={4}
                    />
                  </TableCell>

                  {/* Entity Type */}
                  <TableCell className="font-medium whitespace-nowrap">
                    {ENTITY_TYPES.find(
                      (type) => type.value === member.entity_type,
                    )?.label || member.entity_type}
                  </TableCell>

                  {/* Compliance */}
                  <TableCell className="font-medium whitespace-nowrap">
                    {COMPLIANCE_LEVELS.find(
                      (level) => level.value === member.compliance_level,
                    )?.label || member.compliance_level}
                  </TableCell>

                  {/* Roles */}
                  {/* Roles */}
                  <TableCell className="max-w-[220px] text-[10px] whitespace-normal">
                    <div className="flex flex-wrap gap-0.5">
                      {member.roles.map((role) => {
                        const roleLabel =
                          ROLES.find((r) => r.value === role)?.label ||
                          role.replace("ROLE_", "");
                        const roleColor =
                          ROLE_COLORS[role] ||
                          "bg-slate-50 text-slate-700 border-slate-200";
                        return (
                          <Badge
                            key={role}
                            variant="outline"
                            className={cn(
                              "text-[12px] px-1.5 py-0.5",
                              roleColor,
                            )}
                            title={roleLabel} // tooltip on hover
                          >
                            {roleLabel}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={member.createdAt.toString()}>
                        {formatDate(member.createdAt, "relative")}
                      </time>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
