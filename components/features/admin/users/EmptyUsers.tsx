import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function UsersEmpty() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="h-10 w-10 text-slate-400 mb-3" />
        <h3 className="text-sm font-medium">No users found</h3>
        <p className="text-xs text-slate-500 mt-1">
          There are no users to display at the moment.
        </p>
      </CardContent>
    </Card>
  );
}
