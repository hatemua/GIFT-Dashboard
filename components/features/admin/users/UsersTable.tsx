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

interface UsersTableProps {
  users: any[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Admin</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.user_id}>
            <TableCell className="font-mono">{user.user_id}</TableCell>
            <TableCell>
              <StatusBadge status={user.status} />
            </TableCell>
            <TableCell>
              {user.member_linked ? (
                <Badge variant="secondary">{user.member_gic}</Badge>
              ) : (
                <Badge variant="outline">—</Badge>
              )}
            </TableCell>
            <TableCell>
              {new Date(user.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>{user.created_by_admin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
