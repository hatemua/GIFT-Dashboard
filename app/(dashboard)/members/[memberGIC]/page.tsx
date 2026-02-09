"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import EmptyState from "@/components/features/common/EmptyState";
import { useMember } from "@/hooks/useMember";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Wallet } from "lucide-react";
import { QuickStats } from "@/components/features/members/details/QuickStats";
import { MemberHeader } from "@/components/features/members/details/MemberHeader";
import MemberDetails from "@/components/features/members/details/MemberDetails";
import MemberAccounts from "@/components/features/members/details/MemberAccounts";
import { MemberDetailsPageSkeleton } from "@/components/features/members/details/MemberDetailsPageSkeleton";

interface MemberDetailsPageProps {
  params: Promise<{ memberGIC: string }>;
}

export default function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  const { memberGIC } = React.use(params);
  const {
    selectedMember,
    memberAccounts,
    fetchMemberByGic,
    fetchMemberAccounts,
    loading,
  } = useMember();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (memberGIC) {
      setHasFetched(true);
      fetchMemberByGic(memberGIC);
      fetchMemberAccounts(memberGIC);
    }
  }, [memberGIC, fetchMemberByGic, fetchMemberAccounts]);

  const memberData = selectedMember?.member;

  return (
    <DashboardShell>
      <PageHeader
        className="mb-6"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Members", href: "/members" },
          { label: `${memberGIC}` },
        ]}
      />

      <div className="space-y-6">
        {loading || !hasFetched ? (
          <MemberDetailsPageSkeleton />
        ) : selectedMember ? (
          <>
            {/* Member Overview Card */}
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16"></div>
              <MemberHeader memberData={memberData} />

              <CardContent>
                <Tabs defaultValue="details" className="space-y-2">
                  <TabsList className="bg-slate-100/50 p-1 rounded-xl w-fit">
                    <TabsTrigger
                      value="details"
                      className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="accounts"
                      className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Accounts ({memberAccounts?.goldAccounts?.length ?? 0})
                    </TabsTrigger>
                  </TabsList>

                  {/* DETAILS TAB */}
                  <TabsContent value="details" className="space-y-6">
                    <MemberDetails />
                  </TabsContent>

                  {/* ACCOUNTS TAB */}
                  <TabsContent value="accounts" className="space-y-6">
                    <MemberAccounts />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <QuickStats
              memberData={memberData}
              memberAccounts={memberAccounts}
            />
          </>
        ) : (
          <EmptyState type="member" />
        )}
      </div>
    </DashboardShell>
  );
}
