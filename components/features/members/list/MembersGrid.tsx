"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import {
  Calendar,
  ExternalLink,
  ShieldCheck,
  Ban,
  MoreVertical,
  UserCheck,
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
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { ChangeMemberRoleModal } from "./ChangeMemberRoleModal";
import { BlacklistConfirmModal } from "./BlacklistConfirmModal";

interface MembersGridProps {
  members: Member[];
  onRemove?: (id: string) => void;
  onAdd?: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-red-50 text-red-700 border-red-200",
};

export default function MembersGrid({
  members,
  onAdd,
  onRemove,
}: MembersGridProps) {
  const { isAdmin } = useAuthStore();
  const [isOpen, setIsOpenModal] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [blacklistModal, setBlacklistModal] = useState<{
    open: boolean;
    action: "add" | "remove";
    memberGic: string;
  }>({ open: false, action: "add", memberGic: "" });
  const [blacklistLoading, setBlacklistLoading] = useState(false);

  const openBlacklistConfirm = (action: "add" | "remove", memberGic: string) => {
    setBlacklistModal({ open: true, action, memberGic });
  };

  const closeBlacklistConfirm = () => {
    setBlacklistModal((prev) => ({ ...prev, open: false }));
  };

  const handleBlacklistConfirm = async () => {
    setBlacklistLoading(true);
    try {
      if (blacklistModal.action === "add" && onAdd) {
        await onAdd(blacklistModal.memberGic);
      } else if (blacklistModal.action === "remove" && onRemove) {
        await onRemove(blacklistModal.memberGic);
      }
    } finally {
      setBlacklistLoading(false);
      closeBlacklistConfirm();
    }
  };
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card
          key={member.member_hash ?? member.member_gic}
          className="z-1 group relative overflow-visible rounded-2xl border bg-background/60 backdrop-blur-md"
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

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="cursor-pointer h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-slate-100">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="z-50 min-w-[180px] rounded-lg border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg py-1 animate-slide-down-fade"
                >
                  {/* View Details */}
                  <Link href={`/members/${member.member_gic}`}>
                    <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                      View Details
                    </DropdownMenuItem>
                  </Link>

                                    {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedMember(member);
                        setIsOpenModal(true);
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <UserCheck className="h-4 w-4 text-slate-500" />
                      Change Role
                    </DropdownMenuItem>
                  )}

                  {/* Add to Blacklist */}
                  {onAdd && isAdmin && (
                    <DropdownMenuItem
                      onClick={() => openBlacklistConfirm("add", member.member_gic)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Ban className="h-4 w-4 text-red-500" />
                      Block
                    </DropdownMenuItem>
                  )}

                  {/* Remove */}
                  {onRemove && isAdmin && (
                    <DropdownMenuItem
                      onClick={() => openBlacklistConfirm("remove", member.member_gic)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4 text-red-500" />
                      Unblock
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
                    ROLE_COLORS[role] ??
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

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-4">
              {/* Left: Creation Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4 text-slate-400" />
                <time dateTime={member.createdAt.toString()}>
                  {formatDate(member.createdAt, "short")}
                </time>
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
          </CardContent>
        </Card>
      ))}
      {selectedMember && (
        <ChangeMemberRoleModal
          open={isOpen}
          onClose={() => {
            setIsOpenModal(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
        />
      )}

      <BlacklistConfirmModal
        open={blacklistModal.open}
        onClose={closeBlacklistConfirm}
        onConfirm={handleBlacklistConfirm}
        action={blacklistModal.action}
        memberGic={blacklistModal.memberGic}
        loading={blacklistLoading}
      />
    </div>
  );
}
