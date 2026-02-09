"use client";

import { useMember } from "@/hooks/useMember";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Building } from "lucide-react";

export default function MemberAccounts() {
  const { memberAccounts, accountsLoading } = useMember();

  return (
    <>
      {" "}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Gold Accounts
          </h3>
          <p className="text-slate-500 text-sm">
            Accounts associated with this member
          </p>
        </div>
      </div>
      {accountsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-slate-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : memberAccounts?.goldAccounts?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memberAccounts.goldAccounts.map((account) => (
            <Card
              key={account.igan}
              className="overflow-hidden border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`h-2 ${
                  account.active
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                    : "bg-gradient-to-r from-slate-400 to-slate-300"
                }`}
              ></div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                  </div>
                  <Badge
                    variant={account.active ? "success" : "secondary"}
                    className="px-3 py-1"
                  >
                    {account.active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      IGAN
                    </p>
                    <p className="font-mono text-sm font-semibold text-slate-900 mt-1">
                      {account.igan}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Purpose</p>
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {account.gold_account_purpose}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Vault</p>
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        <p className="text-sm font-medium text-slate-800">
                          {account.vault_site_id || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2">
            No Gold Accounts
          </h4>
          <p className="text-slate-500 max-w-sm mx-auto">
            This member doesn't have any gold accounts attached yet.
          </p>
        </div>
      )}
    </>
  );
}
