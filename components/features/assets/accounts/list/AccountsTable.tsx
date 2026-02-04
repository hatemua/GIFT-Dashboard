"use client";

import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoldAccount } from "@/types/goldAccount";
import { GOLD_ACCOUNT_PURPOSES } from "@/constants/goldAccount";
import { AddressDisplay } from "@/components/blockchain/address-display";

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
          <TableHead>Vault</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead> {/* New column */}
        </TableRow>
      </TableHeader>

      <TableBody>
        {accounts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4 text-slate-500">
              No gold accounts found.
            </TableCell>
          </TableRow>
        ) : (
          accounts.map((acc) => (
            <TableRow key={acc.igan}>
              <TableCell className="font-mono">
                {" "}
                <AddressDisplay
                  address={acc.igan}
                  truncate
                  startChars={4}
                  endChars={4}
                />
              </TableCell>
              <TableCell>
                {GOLD_ACCOUNT_PURPOSES.find(
                  (p) => p.value === acc.gold_account_purpose,
                )?.shortLabel || acc.gold_account_purpose}
              </TableCell>
              <TableCell>
                {" "}
                <AddressDisplay
                  address={acc.member_gic}
                  truncate
                  startChars={4}
                  endChars={4}
                />
              </TableCell>
              <TableCell>{acc.vault_id}</TableCell>
              <TableCell>
                <Badge variant={acc.active ? "success" : "outline"}>
                  {acc.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-slate-600">
                {new Date(acc.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                <Link href={`/assets/accounts/${acc.igan}`}>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
