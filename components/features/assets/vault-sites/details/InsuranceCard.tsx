"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calendar } from "lucide-react";

interface InsuranceCardProps {
  vault: any;
}

export function InsuranceCard({ vault }: InsuranceCardProps) {
  const insurance = vault.insurance_coverage;

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
        <div className="flex flex-col items-start gap-2 justify-between text-sm">
          <div>
            <p className="text-xs text-gray-500">Expires</p>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              {new Date(insurance.expiration_date).toLocaleDateString()}
            </div>
          </div>
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">Documentation</p>
            <p className="text-sm font-mono text-gray-700">
              {insurance.documentation_sod_id ?? "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
