"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GoldAccount } from "@/types/goldAccount";

interface AccountsTableProps {
  accounts: GoldAccount[];
}

export default function AccountsTable({ accounts }: AccountsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>IGAN</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Member GIC</TableHead>
          <TableHead>Vault Site</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {accounts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4 text-slate-500">
              No gold accounts found.
            </TableCell>
          </TableRow>
        ) : (
          accounts.map((acc) => (
            <TableRow key={acc.igan}>
              <TableCell className="font-mono">{acc.igan}</TableCell>
              <TableCell>{acc.gold_account_purpose}</TableCell>
              <TableCell>{acc.member_gic}</TableCell>
              <TableCell>{acc.vault_site_id}</TableCell>
              <TableCell>
                <Badge variant={acc.active ? "success" : "outline"}>
                  {acc.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-slate-600">{new Date(acc.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
