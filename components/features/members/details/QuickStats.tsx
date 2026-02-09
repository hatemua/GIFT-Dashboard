"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Activity, Shield, User } from "lucide-react";
import { MemberAccount } from "@/types/member";

export function QuickStats({
  memberData,
  memberAccounts,
}: {
  memberData: any;
  memberAccounts: any;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Accounts</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {memberAccounts?.goldAccounts?.length || 0}
              </p>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Wallet className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Accounts</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {memberAccounts?.goldAccounts?.filter(
                  (acc: MemberAccount) => acc.active,
                ).length || 0}
              </p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Compliance</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {memberData?.compliance_level || "N/A"}
              </p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Member Since</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                {new Date(memberData?.createdAt || "").getFullYear()}
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
