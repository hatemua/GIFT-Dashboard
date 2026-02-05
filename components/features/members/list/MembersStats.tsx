"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMembers } from "@/lib/mock-data";

export default function MembersStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">
            Total Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockMembers.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">
            Active Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {
              mockMembers.filter((m) => m.current_member_status === "Active")
                .length
            }
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">
            Countries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Set(mockMembers.map((m) => m.country)).size}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">
            Refineries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mockMembers.filter((m) => m.type_member === "Refinery").length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
