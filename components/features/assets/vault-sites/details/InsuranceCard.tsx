"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InsuranceCardProps {
  vault: any;
}

export function InsuranceCard({ vault }: InsuranceCardProps) {
  const insurance = vault.insurance_coverage;
  const sodId = insurance.documentation_sod_id;

 const sodBadge = sodId
  ? { label: `SOD: ${sodId}`, variant: "outline" as const }
  : { label: "Missing", variant: "warning" as const };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-500" />
          Insurance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Insurer */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Insurer</p>
          <p className="text-sm font-medium text-gray-900">
            {insurance.name_of_insurer}
          </p>
        </div>

        {/* Coverage */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Coverage Amount</p>
          <p className="text-lg font-bold text-emerald-700">
            {insurance.coverage_amount.toLocaleString()}{" "}
            {insurance.coverage_currency}
          </p>
        </div>

        {/* Expiry + SOD */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-xs text-gray-500">Expires</p>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              {new Date(insurance.expiration_date).toLocaleDateString()}
            </div>
          </div>

          <Badge variant={sodBadge.variant} className="text-xs">
            {sodBadge.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
