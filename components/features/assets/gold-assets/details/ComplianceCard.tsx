"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Shield, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ComplianceCard({ asset }: { asset: any }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="h-4 w-4 text-purple-500" />
          Compliance & Certification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-rows-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Certification Framework
            </p>
            <Badge variant="success" className="text-xs">
              {asset.compliance.certification_framework}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Audit</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-gray-400" />
              <p className="text-sm font-medium text-gray-900">
                {formatDate(asset.compliance.last_audit, "short")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-3">
          <div
            className={`p-3 rounded-lg flex items-center justify-between ${
              asset.compliance.certified ? "bg-emerald-50" : "bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium">Certified</span>
            {asset.compliance.certified ? (
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <div
            className={`p-3 rounded-lg flex items-center justify-between ${
              asset.compliance.conflict_free ? "bg-emerald-50" : "bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium">Conflict Free</span>
            {asset.compliance.conflict_free ? (
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
