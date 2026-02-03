"use client";

import React from "react";
import { GoldAccountDetails } from "@/types/goldAccount";
import {
  Activity,
  CreditCard,
  Building,
  Calendar,
  Target,
  Copy,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccountDetailsProps {
  account?: GoldAccountDetails;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  if (!account) return null;

  const {
    igan,
    member_gic,
    vault_site_id,
    gold_account_purpose,
    creation_date,
    last_activity,
  } = account;

  const createdAt = new Date(creation_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const lastActive = new Date(last_activity).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-amber-50 flex items-center justify-center">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
          </div>
          Account Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Identifiers */}
        <div className="space-y-3">
          <SimpleInfoRow
            label="IGAN"
            value={igan}
            icon={<CreditCard className="h-4 w-4 text-blue-500" />}
          />
          <SimpleInfoRow
            label="Member Institution"
            value={member_gic}
            icon={<Building className="h-4 w-4 text-indigo-500" />}
          />
          <SimpleInfoRow
            label="Vault Site"
            value={vault_site_id}
            icon={<Building className="h-4 w-4 text-purple-500" />}
            badge
          />
        </div>

        {/* Purpose Badge */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Account Purpose
              </span>
            </div>
            <Badge variant="secondary" className="font-medium">
              {gold_account_purpose}
            </Badge>
          </div>
        </div>

        {/* Timeline */}
        <div className="pt-2 border-t space-y-2">
          <SimpleTimelineRow
            label="Created"
            value={createdAt}
            icon={<Calendar className="h-3.5 w-3.5 text-gray-500" />}
          />
          <SimpleTimelineRow
            label="Last Active"
            value={lastActive}
            icon={<Activity className="h-3.5 w-3.5 text-gray-500" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

/* ───────────────── REUSABLE COMPONENTS ───────────────── */

interface SimpleInfoRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  copyable?: boolean;
  badge?: boolean;
}

const SimpleInfoRow = ({
  label,
  value,
  icon,
  copyable,
  badge,
}: SimpleInfoRowProps) => (
  <div className="flex items-start justify-between py-1.5">
    <div className="flex items-center gap-2.5">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge ? (
        <Badge variant="secondary" className="text-xs font-medium">
          {value}
        </Badge>
      ) : (
        <span className="text-sm font-medium text-gray-900 text-right">
          {value}
        </span>
      )}
      {copyable && (
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          className="ml-1 p-1 hover:bg-gray-100 rounded"
        >
          <Copy className="h-3.5 w-3.5 text-gray-400" />
        </button>
      )}
    </div>
  </div>
);

interface SimpleTimelineRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const SimpleTimelineRow = ({ label, value, icon }: SimpleTimelineRowProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-medium text-gray-700">{value}</span>
  </div>
);