"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AuditStatusCardProps {
  vault: any;
}

export function AuditStatusCard({ vault }: AuditStatusCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          Audit Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Audit</p>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3" />
              {new Date(
                vault.audit_and_compliance.last_audit_date,
              ).toLocaleDateString()}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Next Due</p>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3" />
              {new Date(
                vault.audit_and_compliance.next_audit_due,
              ).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Audit Frequency</p>
          <Badge variant="outline" className="text-sm">
            {vault.audit_and_compliance.audit_frequency}
          </Badge>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 mb-1">Documentation</p>
          <p className="text-sm font-mono text-gray-700">
            {vault.audit_and_compliance.audit_documentation_sod_id ?? "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
