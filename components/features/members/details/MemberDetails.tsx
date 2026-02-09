"use client";

import { useMember } from "@/hooks/useMember";
import { Hash, Calendar, Layers, Shield } from "lucide-react";
import { ROLE_COLORS, ROLES } from "@/constants/member";
import { AddressDisplay } from "@/components/blockchain/address-display";

export default function MemberDetails() {
  const { selectedMember } = useMember();

  const memberData = selectedMember?.member;
  const roles = selectedMember?.roles;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* GIC Number */}
        <div className="flex items-center gap-3 p-3 bg-indigo-50/30 rounded-lg">
          <Hash className="w-5 h-5 text-indigo-600" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">
              Member GIC
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {" "}
              <AddressDisplay
                address={memberData?.member_gic ?? ""}
                truncate
                startChars={4}
                endChars={4}
                className="font-medium text-slate-700"
              />
            </span>
          </div>
        </div>

        {/* Member Hash */}
        <div className="flex items-center gap-3 p-3 bg-slate-100/50 rounded-lg">
          <Hash className="w-5 h-5 text-slate-700" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">
              Member Hash
            </span>
            <span className="text-sm font-semibold text-slate-900">
              <AddressDisplay
                address={memberData?.member_hash || "N/A"}
                truncate
                startChars={4}
                endChars={4}
                className="font-medium text-slate-700"
              />
            </span>
          </div>
        </div>

        {/* Entity Type */}
        <div className="flex items-center gap-3 p-3 bg-emerald-50/30 rounded-lg">
          <Layers className="w-5 h-5 text-emerald-600" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">
              Entity Type
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {memberData?.entity_type || "N/A"}
            </span>
          </div>
        </div>

        {/* Compliance Level */}
        <div className="flex items-center gap-3 p-3 bg-amber-50/30 rounded-lg">
          <Shield className="w-5 h-5 text-amber-600" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">
              Compliance Level
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {memberData?.compliance_level}
            </span>
          </div>
        </div>
      </div>

      {/* Roles */}
      {roles && (
        <div className="mt-4">
          <span className="text-xs text-slate-500 font-medium">Roles</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {roles.map((role) => {
              const roleLabel =
                ROLES.find((r) => r.value === role)?.label ||
                role.replace("ROLE_", "");
              const color =
                ROLE_COLORS[role] ??
                "bg-slate-100 text-slate-700 border border-slate-200";
              return (
                <span
                  key={role}
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${color}`}
                  title={roleLabel}
                >
                  {roleLabel}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="mt-6 border-t border-slate-200 pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Created", date: memberData?.createdAt },
          {
            label: "Last Updated",
            date: memberData?.updatedAt,
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <div className="flex flex-col text-xs">
              <span className="text-slate-500">{item.label}</span>
              <span className="text-slate-900 font-medium">
                {new Date(item.date || "").toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
