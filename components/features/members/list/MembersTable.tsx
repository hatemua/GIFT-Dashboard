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
import {
  Calendar,
  MoreVertical,
  ExternalLink,
  Trash2,
  Plus,
} from "lucide-react";
import { Member } from "@/types/member";
import {
  COMPLIANCE_LEVELS,
  ENTITY_TYPES,
  ROLE_COLORS,
  ROLES,
} from "@/constants/member";
import { AddressDisplay } from "@/components/blockchain/address-display";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface MembersTableProps {
  members: Member[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function MembersTable({
  members,
  onAdd,
  onRemove,
}: MembersTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full overflow-x-auto">
          <Table className="min-w-[950px]">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Member GIC</TableHead>
                <TableHead>Entity Type</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[60px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.member_hash ?? member.member_gic}
                  className="group hover:bg-muted/30 transition"
                >
                  {/* Member GIC */}
                  <TableCell className="max-w-[180px] font-mono text-xs">
                    <AddressDisplay
                      address={member.member_gic}
                      truncate
                      startChars={4}
                      endChars={4}
                    />
                  </TableCell>

                  {/* Entity Type */}
                  <TableCell className="font-medium">
                    {ENTITY_TYPES.find((t) => t.value === member.entity_type)
                      ?.label || member.entity_type}
                  </TableCell>

                  {/* Compliance */}
                  <TableCell className="font-medium">
                    {COMPLIANCE_LEVELS.find(
                      (c) => c.value === member.compliance_level,
                    )?.label || member.compliance_level}
                  </TableCell>

                  {/* Roles */}
                  <TableCell className="max-w-[240px]">
                    <div className="flex flex-wrap gap-1">
                      {member.roles.map((role) => {
                        const label =
                          ROLES.find((r) => r.value === role)?.label ||
                          role.replace("ROLE_", "");
                        const color =
                          ROLE_COLORS[role] ||
                          "bg-slate-50 text-slate-700 border-slate-200";

                        return (
                          <Badge
                            key={role}
                            variant="outline"
                            className={cn("text-[11px] px-2 py-0.5", color)}
                            title={label}
                          >
                            {label}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={member.createdAt.toString()}>
                        {formatDate(member.createdAt, "relative")}
                      </time>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="cursor-pointer h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-slate-100">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="min-w-[180px] rounded-lg border bg-white shadow-md"
                      >
                        {/* View */}
                        <DropdownMenuItem
                          onClick={() => console.log("View", member.member_gic)}
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4 text-slate-500" />
                          View Details
                        </DropdownMenuItem>

                        {/* Add to Blacklist */}
                        {onAdd && (
                          <DropdownMenuItem
                            onClick={() => onAdd(member.member_gic)}
                            className="flex items-center gap-2 text-red-600 focus:text-red-600"
                          >
                            <Plus className="h-4 w-4" />
                            Add to Blacklist
                          </DropdownMenuItem>
                        )}

                        {/* Remove */}
                        {onRemove && (
                          <DropdownMenuItem
                            onClick={() => onRemove(member.member_gic)}
                            className="flex items-center gap-2 text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
