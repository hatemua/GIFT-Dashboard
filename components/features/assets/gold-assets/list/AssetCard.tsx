"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, User, DollarSign, Scale, Calendar } from "lucide-react";
import { formatDate, formatWeight, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/data-display/status-badge";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { getAssetStatusLabel } from "@/lib/assets";
import { Asset, AssetStatus } from "@/types/asset";
import { GoldAccountAsset } from "@/types/goldAccount";
import Link from "next/link";

interface AssetCardProps {
  asset: Asset | GoldAccountAsset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const a = normalizeAsset(asset);

  return (
    <Link href={`/assets/${a.tokenId}`}>
      <Card className="group hover:shadow-lg transition-shadow cursor-pointer rounded-xl border border-slate-200 overflow-hidden bg-white">
        {/* Header */}
        <div className="relative h-24 bg-gradient-to-r from-gold-100 to-amber-100">
          <div className="absolute top-2 right-2">
            <StatusBadge status={a.productType} />
          </div>
          <div className="absolute top-2 left-2">
            <StatusBadge status={getAssetStatusLabel(a.status)} />
          </div>
          <div className="h-full flex items-center justify-center p-2">
            <Package className="h-10 w-10 text-gold-600" />
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Serial */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                SERIAL
              </p>
              <p className="text-sm font-semibold truncate">{a.serialNumber}</p>
            </div>

            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                TOKEN
              </p>
              <span className="text-xs font-mono text-slate-400">
                <AddressDisplay
                  address={a.tokenId}
                  truncate
                  startChars={2}
                  endChars={2}
                />
              </span>
            </div>
          </div>

          {/* Owner */}
          {a.ownerIgan && (
            <div className="flex items-center gap-2 text-xs">
              <User className="h-3 w-3 text-slate-400" />
              <span className="truncate">{a.ownerIgan}</span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1.5">
              <Scale className="h-3 w-3 text-slate-500" />
              <div>
                <p className="text-xs text-slate-400">Weight</p>
                <p className="text-xs font-medium">
                  {formatWeight(a.weightGrams)}
                </p>
              </div>
            </div>

            {a.value !== undefined && (
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-gold-600" />
                <div>
                  <p className="text-xs text-slate-400">Value</p>
                  <p className="text-xs font-semibold text-gold-700">
                    {formatCurrency(a.value)}
                  </p>
                </div>
              </div>
            )}

            <div className="text-right">
              <p className="text-xs text-slate-400">Fineness</p>
              <p className="text-xs font-medium">{a.fineness}‰</p>
            </div>
          </div>

          {/* Date */}
          {a.createdAt && (
            <div className="flex items-center justify-between text-xs pt-2 border-t">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span className="text-slate-500">Created At</span>
              </div>
              <span className="font-medium">
                {formatDate(a.createdAt, "short")}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function isStandardAsset(asset: Asset | GoldAccountAsset): asset is Asset {
  return "status" in asset;
}

interface NormalizedAsset {
  tokenId: string;
  serialNumber: string;
  productType: string;
  status: AssetStatus;
  ownerIgan?: string;
  weightGrams: number;
  fineness: number;
  fineWeightGrams?: number;
  value?: number;
  manufactureDate?: string;
  createdAt: string;
}
function normalizeAsset(asset: Asset | GoldAccountAsset): NormalizedAsset {
  if (isStandardAsset(asset)) {
    return {
      tokenId: asset.token_id,
      serialNumber: asset.serial_number,
      productType: asset.gold_product_type_id,
      status: asset.status,
      ownerIgan: asset.owner_igan,
      weightGrams: asset.weight_grams,
      fineness: asset.fineness,
      fineWeightGrams: undefined,
      value: asset.assetValueInDollar,
      manufactureDate: asset.manufacture_date,
      createdAt: asset.createdAt,
    };
  }

  return {
    tokenId: asset.token_id,
    serialNumber: asset.serial_number,
    productType: asset.gold_product_type_id,
    status: asset.asset_status,
    weightGrams: asset.weight_grams,
    fineness: asset.fineness,
    fineWeightGrams: asset.fine_weight_grams,
    manufactureDate: asset.created_on_chain_at,
    createdAt: asset.created_on_chain_at,
  };
}
