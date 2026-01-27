"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, Clipboard, Layers } from "lucide-react";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Tooltip } from "@/components/ui/tooltip";
import { GoldAccount } from "@/types/goldAccount";

interface AccountsGridProps {
  accounts: GoldAccount[];
}

export default function AccountsGrid({ accounts }: AccountsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {accounts.map((acc) => (
        <Card
          key={acc.igan}
          className="hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer rounded-xl"
        >
          <CardHeader className="px-4 pt-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-gold-500" />
                <Tooltip content={acc.igan} placement="top">
                  <CardTitle className="text-lg font-semibold truncate max-w-[150px] sm:max-w-[120px] cursor-help">
                    {acc.igan}
                  </CardTitle>
                </Tooltip>
              </div>
              <StatusBadge status={acc.active ? "Active" : "Inactive"} />
            </div>
          </CardHeader>

          <CardContent className="space-y-3 px-4 pb-4">
            {/* IGAN Code */}
            <div className="flex justify-between items-center p-2 sm:p-3 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clipboard className="h-3.5 w-3.5 text-slate-400" />
                IGAN
              </span>
              <Tooltip content={acc.igan} placement="top">
                <span className="font-mono font-medium text-sm text-slate-900 truncate max-w-[120px] sm:max-w-[150px] cursor-help">
                  {acc.igan}
                </span>
              </Tooltip>
            </div>

            {/* Account Purpose */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Archive className="h-3.5 w-3.5 text-slate-400" />
                Purpose
              </span>
              <Tooltip content={acc.gold_account_purpose} placement="top">
                <span className="text-sm text-slate-900 truncate cursor-help">
                  {acc.gold_account_purpose}
                </span>
              </Tooltip>
            </div>

            {/* Member */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Member</span>
              <Tooltip content={acc.member_gic} placement="top">
                <span className="text-sm text-slate-900 truncate cursor-help">
                  {acc.member_gic}
                </span>
              </Tooltip>
            </div>

            {/* Vault */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Vault</span>
              <Tooltip content={acc.vault_site_id} placement="top">
                <span className="text-sm text-slate-900 truncate cursor-help">
                  {acc.vault_site_id}
                </span>
              </Tooltip>
            </div>

            {/* Created At */}
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                Created: {new Date(acc.created_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
