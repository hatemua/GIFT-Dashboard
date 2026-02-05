import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { UserItem } from "@/types/user";
import {
  capitalizeFirstLetter,
  formatDate,
} from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Eye,
} from "lucide-react";

interface UsersTableProps {
  users: UserItem[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Access</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.user_id}>
            {/* User ID */}
            <TableCell className="font-mono text-sm">
              <AddressDisplay
                address={user.user_id}
                truncate
                startChars={3}
                endChars={3}
              />
            </TableCell>

            {/* Entity type */}
            <TableCell className="text-muted-foreground">
              {capitalizeFirstLetter(user.entity_type)}
            </TableCell>

            {/* Status */}
            <TableCell>
              <StatusBadge status={capitalizeFirstLetter(user.status)} />
            </TableCell>

            {/* Member */}
            <TableCell>
              {user.member_gic ? (
                <AddressDisplay
                  address={user.member_gic}
                  truncate
                  startChars={3}
                  endChars={3}
                />
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            {/* Access */}
            <TableCell className="text-muted-foreground">
              <div className="flex items-center gap-1.5 text-xs">
                <ShieldCheck className="h-4 w-4" />
                {user.can_sign_transactions
                  ? "Can sign"
                  : "Read-only"}
              </div>
            </TableCell>

            {/* Created */}
            <TableCell className="text-muted-foreground">
              {formatDate(user.created_at, "short")}
            </TableCell>

            {/* Action */}
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
