"use client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockMembers } from "@/lib/mock-data";
import { Users, Plus, Mail, Phone, Globe } from "lucide-react";
import { use, useState } from "react";
import CreateMemberModal from "@/components/features/members/new/CreateMemberModal";

export default function MembersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <DashboardShell>
      <PageHeader
        title="GIFT Members"
        description="Network of gold ecosystem participants"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Members" },
        ]}
        action={
          <Button variant="gold" onClick={handleOpenModal}>
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMembers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMembers.filter((m) => m.current_member_status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockMembers.map((m) => m.country)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Refineries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMembers.filter((m) => m.type_member === "Refinery").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockMembers.map((member) => (
          <Card
            key={member.member_gic}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{member.entity_name}</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    {member.type_member}
                  </p>
                </div>
                <StatusBadge status={member.current_member_status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* GIC Code */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-500">GIC Code</span>
                <span className="font-mono font-semibold text-sm text-slate-900">
                  {member.member_gic}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{member.city}, {member.country}</span>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-1.5">
                {member.member_roles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role.replace("ROLE_", "")}
                  </Badge>
                ))}
              </div>

              {/* Contact Info */}
              {member.contact_email && (
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs truncate">{member.contact_email}</span>
                  </div>
                  {member.contact_phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs">{member.contact_phone}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Member Since */}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-400">
                  Member since{" "}
                  {new Date(member.membership_effective_date).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long" }
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
            {/* Create Member Modal */}
      <CreateMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </DashboardShell>
  );
}
