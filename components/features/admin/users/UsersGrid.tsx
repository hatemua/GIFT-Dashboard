import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Calendar, Link2, User as UserIcon } from "lucide-react";
import { User } from "@/types/user";

interface UsersGridProps {
  users: User[];
}

export default function UsersGrid({ users }: UsersGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card
          key={user.user_id}
          className="group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          {/* Header */}
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold tracking-tight">
                  {user.user_id}
                </CardTitle>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <UserIcon className="h-3 w-3" />
                  Created by {user.created_by_admin}
                </p>
              </div>

              <StatusBadge status={user.status} />
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Member */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2">
              <span className="text-xs text-muted-foreground">
                Member linkage
              </span>

              {user.member_linked ? (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  {user.member_gic}
                </Badge>
              ) : (
                <Badge variant="outline">Not linked</Badge>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(user.created_at).toLocaleDateString()}
              </div>

              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                View →
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
