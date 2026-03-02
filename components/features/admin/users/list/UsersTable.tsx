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
import { capitalizeFirstLetter, formatDate } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Eye,
  MoreVertical,
  ExternalLink,
  UserMinus,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/authStore";

interface UsersTableProps {
  users: UserItem[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const { updateUserStatus } = useUser();
  const { isAdmin } = useAuthStore();

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
                {user.can_sign_transactions ? "Can sign" : "Read-only"}
              </div>
            </TableCell>

            {/* Created */}
            <TableCell className="text-muted-foreground">
              {formatDate(user.created_at, "short")}
            </TableCell>

            {/* Action */}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="cursor-pointer h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-slate-100">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="z-50 min-w-[180px] rounded-lg border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg py-1 animate-slide-down-fade"
                >
                  {isAdmin && (
                    <>
                      {" "}
                      {user.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() =>
                            updateUserStatus({
                              user_id: user.user_id,
                              action: "deactivate",
                            })
                          }
                          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <UserMinus className="h-4 w-4 text-red-500" />
                          Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            updateUserStatus({
                              user_id: user.user_id,
                              action: "activate",
                            })
                          }
                          className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        >
                          <UserPlus className="h-4 w-4 text-green-500" />
                          Activate
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
