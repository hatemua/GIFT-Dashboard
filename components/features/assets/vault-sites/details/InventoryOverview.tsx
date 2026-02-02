"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Shield,
  Scale,
  Users,
  Package,
  BarChart3,
  Building,
  AlertCircle,
  Database,
} from "lucide-react";
import RealSkeleton from "@/components/ui/real-skeleton";
import { useVaultSite } from "@/hooks/useVaultSite";

/* ------------------ Color Constants ------------------ */
const CHART_COLORS = {
  gold: ["#D4AF37", "#E6C45C", "#F59E0B", "#D97706", "#B8860B", "#8B5A2B"],
  amber: ["#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F", "#451A03"],
  brown: ["#8B5A2B", "#B8860B", "#D4AF37", "#E6C45C", "#F59E0B", "#D97706"],
};

/* ------------------ Helpers ------------------ */
const fmtWeight = (g: number) => `${(g / 1000).toFixed(0)} kg`;
const fmtCurrency = (amt: number) => `$${(amt / 1_000_000).toFixed(1)}M`;
const fmtCompactNumber = (num: number) => num.toLocaleString();

/* ------------------ Color Assignment ------------------ */
const getProductTypeColor = (index: number) =>
  CHART_COLORS.gold[index % CHART_COLORS.gold.length];
const getOwnerColor = (index: number) =>
  CHART_COLORS.amber[index % CHART_COLORS.amber.length];
const getVaultColor = (index: number) =>
  CHART_COLORS.brown[index % CHART_COLORS.brown.length];

/* ------------------ Chart Data Prep ------------------ */
const prepareProductTypeData = (productTypes: any[] = []) =>
  productTypes.map((item, index) => ({
    ...item,
    asset_count: Number(item.asset_count),
    total_weight_grams: Number(item.total_weight_grams),
    total_fine_weight_grams: Number(item.total_fine_weight_grams),
    color: getProductTypeColor(index),
  }));

const prepareOwnerData = (owners: any[] = []) =>
  owners.map((item, index) => ({ ...item, color: getOwnerColor(index) }));

const prepareVaultData = (vaults: any[] = []) =>
  vaults.map((item, index) => ({ ...item, color: getVaultColor(index) }));

/* ------------------ Main Component ------------------ */
export function InventoryOverview() {
  const {
    vaultSiteDetails,
    inventorySummary,
    inventoryByOwner,
    inventoryByProductType,
    inventoryByVault,
    fetchVaultSiteInventory,
    loading,
  } = useVaultSite();

  const vaultSiteId = vaultSiteDetails?.vault_site_id;

  // Fetch summary and grouped data
  useEffect(() => {
    if (!vaultSiteId) return;

    // Fetch summary
    fetchVaultSiteInventory(vaultSiteId);

    // Fetch grouped data
    fetchVaultSiteInventory(vaultSiteId, "owner");
    fetchVaultSiteInventory(vaultSiteId, "product_type");
    fetchVaultSiteInventory(vaultSiteId, "vault_id");
  }, [vaultSiteId]);

  if (loading || !inventorySummary) {
    return (
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-600" />
            Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <SkeletonStatCard key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonSection title="Asset Types" />
            <SkeletonSection title="Assets by Vault" />
            <SkeletonSection title="Weight by Owner" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasData = {
    summary:
      inventorySummary.total_assets > 0 ||
      inventorySummary.total_weight_grams > 0 ||
      inventorySummary.total_valuation?.amount > 0,
    productTypes: inventoryByProductType?.length > 0,
    owners: inventoryByOwner?.length > 0,
    vaults: inventoryByVault?.length > 0,
  };

  const productTypeData = prepareProductTypeData(inventoryByProductType ?? []);
  const ownerData = prepareOwnerData(inventoryByOwner);
  const vaultData = prepareVaultData(inventoryByVault);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-amber-600" />
          Inventory Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats */}
        {hasData.summary ? (
          <div className="grid grid-cols-3 gap-2">
            <CompactStatCard
              icon={<Package className="h-3.5 w-3.5" />}
              label="Assets"
              value={fmtCompactNumber(inventorySummary.total_assets)}
              subtext="items"
            />
            <CompactStatCard
              icon={<Scale className="h-3.5 w-3.5" />}
              label="Weight"
              value={fmtWeight(inventorySummary.total_weight_grams)}
            />
            <CompactStatCard
              icon={<Users className="h-3.5 w-3.5" />}
              label="Value"
              value={fmtCurrency(inventorySummary.total_valuation.amount)}
            />
          </div>
        ) : (
          <EmptyStateCard
            title="No Inventory Data"
            description="No assets found in this vault site"
            icon={<Database className="h-8 w-8" />}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Asset Types */}
          <CompactSection
            title="Asset Types"
            icon={<BarChart3 className="h-3.5 w-3.5" />}
          >
            {hasData.productTypes ? (
              /* Example usage in component */
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={productTypeData}
                    dataKey="asset_count"
                    nameKey="gold_product_type_id"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                  >
                    {productTypeData.map((entry, index) => (
                      <Cell
                        key={`slice-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;

                      const entry = payload[0].payload;
                      const color = entry.color || "#F59E0B";

                      return (
                        <div className="relative bg-white shadow-xl border border-gray-100 rounded-lg overflow-hidden min-w-[200px]">
                          {/* Colored top bar */}
                          <div
                            className="h-1 w-full"
                            style={{ backgroundColor: color }}
                          ></div>

                          {/* Content */}
                          <div className="p-3 space-y-1">
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              {entry.gold_product_type_id}
                            </div>

                            <div className="flex flex-col space-y-0.5 text-xs text-gray-600">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">
                                  Assets:
                                </span>
                                <span>{entry.asset_count}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">
                                  Weight:
                                </span>
                                <span>
                                  {(entry.total_weight_grams / 1000).toFixed(2)}{" "}
                                  kg
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">
                                  Fine Weight:
                                </span>
                                <span>
                                  {(
                                    entry.total_fine_weight_grams / 1000
                                  ).toFixed(2)}{" "}
                                  kg
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Optional small pointer */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border border-gray-100"></div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyStateChart
                title="No Asset Types"
                description="No product type data available"
              />
            )}
          </CompactSection>

          {/* Assets by Vault */}
          <CompactSection
            title="Assets by Vault"
            icon={<Building className="h-3.5 w-3.5" />}
          >
            {hasData.vaults ? (
              <ResponsiveContainer width="100%" height={150}>
                <BarChart
                  data={vaultData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="vault_id"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    width={30}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;

                      const entry = payload[0].payload;

                      return (
                        <div className="bg-white shadow-xl border border-gray-100 rounded-lg overflow-hidden min-w-[220px]">
                          {/* Top color bar */}
                          <div
                            className="h-1 w-full"
                            style={{
                              backgroundColor: entry.color || "#8B5A2B",
                            }}
                          ></div>

                          <div className="p-3 space-y-1">
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              Vault: {entry.vault_id}
                            </div>

                            <div className="flex flex-col space-y-0.5 text-xs text-gray-600">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">
                                  Assets:
                                </span>
                                <span>{entry.asset_count}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">
                                  Weight:
                                </span>
                                <span>
                                  {(entry.total_weight_grams / 1000).toFixed(2)}{" "}
                                  kg
                                </span>
                              </div>
                              {entry.total_fine_weight_grams && (
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">
                                    Fine Weight:
                                  </span>
                                  <span>
                                    {(
                                      entry.total_fine_weight_grams / 1000
                                    ).toFixed(2)}{" "}
                                    kg
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Optional pointer */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border border-gray-100"></div>
                        </div>
                      );
                    }}
                  />

                  <Bar
                    dataKey="asset_count"
                    radius={[4, 4, 0, 0]}
                    background={{ fill: "#f3f4f6", radius: 4 }}
                  >
                    {vaultData.map((entry, index) => (
                      <Cell key={`vault-cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyStateChart
                title="No Vault Data"
                description="No assets distributed across vaults"
              />
            )}
          </CompactSection>

          {/* Weight by Owner */}
          <CompactSection
            title="Weight by Owner"
            icon={<Scale className="h-3.5 w-3.5" />}
          >
            {hasData.owners ? (
              <ResponsiveContainer width="100%" height={150}>
                <BarChart
                  data={ownerData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="igan"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                    width={30}
                  />
                  <Tooltip
                    formatter={(value: any, name: any) =>
                      name === "total_weight_grams"
                        ? [`${value / 1000} kg`, "Weight"]
                        : [value, "Assets"]
                    }
                  />
                  <Bar
                    dataKey="total_weight_grams"
                    radius={[4, 4, 0, 0]}
                    background={{ fill: "#f3f4f6", radius: 4 }}
                  >
                    {ownerData.map((entry, index) => (
                      <Cell key={`owner-cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyStateChart
                title="No Owner Data"
                description="No assets assigned to owners"
              />
            )}
          </CompactSection>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------ Skeleton & Sub Components ------------------ */
const SkeletonStatCard = () => (
  <div className="text-center p-2.5 border border-gray-200 rounded-lg">
    <RealSkeleton className="h-6 w-6 rounded-full mx-auto mb-1" />
    <RealSkeleton className="h-3 w-16 mx-auto mb-1" />
    <RealSkeleton className="h-5 w-20 mx-auto" />
  </div>
);

const SkeletonSection = ({ title }: { title: string }) => (
  <div className="space-y-2.5 p-3 border border-gray-200 rounded-lg bg-white h-full">
    <div className="flex items-center gap-1.5">
      <RealSkeleton className="h-4 w-4 rounded" />
      <RealSkeleton className="h-4 w-24" />
    </div>
    <div className="space-y-2">
      <RealSkeleton className="h-32 w-full rounded" />
    </div>
  </div>
);

const CompactStatCard = ({
  icon,
  label,
  value,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
}) => (
  <div className="text-center p-2.5 border border-gray-200 rounded-lg bg-gradient-to-b from-white to-gray-50/50 hover:from-gray-50 hover:to-gray-100 transition-colors">
    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-700 mx-auto mb-1">
      {icon}
    </div>
    <div className="text-xs font-medium text-gray-600 mb-0.5">{label}</div>
    <div className="text-base font-bold text-gray-900 leading-tight">
      {value}
    </div>
    {subtext && <div className="text-xs text-gray-500 mt-0.5">{subtext}</div>}
  </div>
);

const CompactSection = ({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}) => (
  <div className="space-y-2.5 p-3 border border-gray-200 rounded-lg bg-white h-full">
    <div className="flex items-center gap-1.5">
      {icon && <div className="text-gray-500">{icon}</div>}
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="text-sm">{children}</div>
  </div>
);

const EmptyStateCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) => (
  <div className="col-span-3 text-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
      {icon || <AlertCircle className="h-6 w-6" />}
    </div>
    <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

const EmptyStateChart = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center h-32 border border-dashed border-gray-300 rounded-lg bg-gray-50">
    <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
    <p className="text-xs font-medium text-gray-600 mb-0.5">{title}</p>
    <p className="text-xs text-gray-500 text-center px-4">{description}</p>
  </div>
);
