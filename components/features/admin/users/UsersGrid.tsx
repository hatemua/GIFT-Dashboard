import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Badge } from "@/components/ui/badge";
import { Calendar, Link2 } from "lucide-react";

interface UsersGridProps {
  users: any[];
}

export default function UsersGrid({ users }: UsersGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.user_id}>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">{user.user_id}</CardTitle>
                <p className="text-xs text-slate-500">
                  Created by {user.created_by_admin}
                </p>
              </div>
              <StatusBadge status={user.status} />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-xs text-slate-500">Member</span>
              {user.member_linked ? (
                <Badge variant="secondary">
                  <Link2 className="h-3 w-3 mr-1" />
                  {user.member_gic}
                </Badge>
              ) : (
                <Badge variant="outline">Not linked</Badge>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4 text-slate-400" />
              {new Date(user.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
