"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Factory,
  Calendar,
  Hash,
  Scale,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { formatDate, isValidUrl } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";

export function AssetOverviewCard({ asset }: { asset: any }) {
  const meta = asset.metadata;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Package className="h-4 w-4 text-blue-500" />
          Asset Specifications
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ================= BASIC INFO ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem label="Product Type">{meta.gold_product_type_id}</InfoItem>

          <InfoItem label="Serial Number" mono>
            {meta.serial_number}
          </InfoItem>

          <InfoItem label="Refiner" icon={<Factory className="h-3 w-3" />}>
            {meta.refiner_name}
          </InfoItem>

          {meta.manufacture_date && (
            <InfoItem
              label="Manufacture Date"
              icon={<Calendar className="h-3 w-3" />}
            >
              {formatDate(meta.manufacture_date, "short")}
            </InfoItem>
          )}
        </div>

        {/* ================= WEIGHT & FINENESS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t">
          <InfoItem label="Total Weight" icon={<Scale className="h-3 w-3" />}>
            {meta.weight_grams} g
          </InfoItem>

          <InfoItem label="Fine Weight" icon={<Scale className="h-3 w-3" />}>
            {(meta.fine_weight_grams / 1000).toFixed(3)} g
          </InfoItem>

          <InfoItem label="Fineness">
            <Badge variant="secondary">{meta.fineness}</Badge>
          </InfoItem>
        </div>

        {/* ================= TRACEABILITY ================= */}
        <div className="space-y-3 pt-2 border-t">
          <InfoItem
            label="Traceability GIC"
            icon={<ShieldCheck className="h-3 w-3" />}
          >
            <AddressDisplay
              address={meta.traceability_gic}
              truncate
              startChars={4}
              endChars={4}
              className="font-medium text-slate-700"
            />
          </InfoItem>

          <InfoItem
            label="Certificate Origin Hash"
            icon={<Hash className="h-3 w-3" />}
            mono
          >
            <span className="break-all text-xs">
              {meta.certificate_origin_hash}
            </span>
          </InfoItem>
          {meta.certificate_url && isValidUrl(meta.certificate_url) && (
            <InfoItem
              label="Certificate URL"
              icon={<FileCheck className="h-3 w-3" />}
              mono
            >
              <a
                href={meta.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-xs text-primary hover:underline"
              >
                View Certificate
              </a>
            </InfoItem>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ================= SMALL HELPER COMPONENT ================= */

function InfoItem({
  label,
  children,
  icon,
  mono = false,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className={mono ? "font-mono" : ""}>{children}</span>
      </div>
    </div>
  );
}
