import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/data-display/status-badge";
import {
  Calendar,
  User as UserIcon,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { UserItem } from "@/types/user";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { capitalizeFirstLetter, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UsersGridProps {
  users: UserItem[];
}

export default function UsersGrid({ users }: UsersGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <Card
          key={user.user_id}
          className="group relative overflow-hidden rounded-2xl border border-muted/40 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          {/* Accent line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-200 via-gray-200 to-slate-200" />

          {/* Header */}
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <UserIcon className="h-5 w-5" />
                </div>

                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    <AddressDisplay
                      address={user.user_id}
                      truncate
                      startChars={3}
                      endChars={3}
                    />
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {user.entity_type}
                  </p>
                </div>
              </div>

              <StatusBadge status={capitalizeFirstLetter(user.status)} />
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Member */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-xs text-slate-600">
              <span>Member</span>

              {user.member_gic ? (
                <AddressDisplay
                  address={user.member_gic}
                  truncate
                  startChars={4}
                  endChars={4}
                  className="font-medium text-slate-700"
                />
              ) : (
                <span className="text-muted-foreground">Not linked</span>
              )}
            </div>

            {/* Capabilities */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              {user.can_sign_transactions
                ? "Can sign transactions"
                : "Read-only access"}
            </div>

            {/* Footer */}
            {/* Footer with creation date */}
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={user.created_at.toString()}>
                  {formatDate(user.created_at, "short")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Details
                </Button>
              </div>
            </div>
            
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
