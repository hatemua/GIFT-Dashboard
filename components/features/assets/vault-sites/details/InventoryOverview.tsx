"use client";

import React from "react";
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
import RealSkeleton from "@/components/ui/real-skeleton"; // Assuming you have a Skeleton component

/* ------------------ Color Constants ------------------ */
const CHART_COLORS = {
  gold: ["#D4AF37", "#E6C45C", "#F59E0B", "#D97706", "#B8860B", "#8B5A2B"],
  amber: ["#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F", "#451A03"],
  brown: ["#8B5A2B", "#B8860B", "#D4AF37", "#E6C45C", "#F59E0B", "#D97706"],
};

/* ------------------ Mock Data (API-like format) ------------------ */
const mockData = {
  vault_site_id: "VSZH0001",
  vault_site_name: "Zurich Gold Vault",
  total_assets: 150,
  total_weight_grams: 150000,
  total_valuation: 9750000,
  by_product_type: [
    { type: "Bars", count: 100 },
    { type: "Coins", count: 50 },
  ],
  by_owner: [
    { owner: "IGAN-00001", weight: 50000, assets: 50 },
    { owner: "IGAN-00002", weight: 100000, assets: 100 },
    { owner: "IGAN-00003", weight: 50000, assets: 50 },
    { owner: "IGAN-00004", weight: 100000, assets: 100 },
    { owner: "IGAN-00005", weight: 50000, assets: 50 },
    { owner: "IGAN-00006", weight: 100000, assets: 100 },
  ],
  by_vault: [
    { vault: "VZH001A", assets: 50 },
    { vault: "VZH001B", assets: 100 },
    { vault: "VZH001C", assets: 50 },
    { vault: "VZH001D", assets: 100 },
    { vault: "VZH001E", assets: 50 },
    { vault: "VZH001F", assets: 100 },
  ],
};

/* ------------------ Type Definitions ------------------ */
interface VaultSiteData {
  vault_site_id: string;
  vault_site_name: string;
  total_assets: number;
  total_weight_grams: number;
  total_valuation: number;
  by_product_type: Array<{ type: string; count: number }>;
  by_owner: Array<{ owner: string; weight: number; assets: number }>;
  by_vault: Array<{ vault: string; assets: number }>;
}

interface InventoryOverviewProps {
  data?: VaultSiteData;
  isLoading?: boolean;
}

/* ------------------ Helpers ------------------ */
const fmtWeight = (g: number) => `${(g / 1000).toFixed(0)} kg`;
const fmtCurrency = (amt: number) => `$${(amt / 1_000_000).toFixed(1)}M`;
const fmtCompactNumber = (num: number) => num.toLocaleString();

/* ------------------ Color Assignment Functions ------------------ */
const getProductTypeColor = (index: number, type: string) => {
  // Assign colors based on product type
  if (type.toLowerCase().includes("bar")) return CHART_COLORS.gold[0];
  if (type.toLowerCase().includes("coin")) return CHART_COLORS.gold[1];
  return CHART_COLORS.gold[index % CHART_COLORS.gold.length];
};

const getOwnerColor = (index: number) => {
  return CHART_COLORS.amber[index % CHART_COLORS.amber.length];
};

const getVaultColor = (index: number) => {
  return CHART_COLORS.brown[index % CHART_COLORS.brown.length];
};

/* ------------------ Prepare Chart Data Functions ------------------ */
const prepareProductTypeData = (
  productTypes: Array<{ type: string; count: number }>,
) => {
  return productTypes.map((item, index) => ({
    ...item,
    color: getProductTypeColor(index, item.type),
  }));
};

const prepareOwnerData = (
  owners: Array<{ owner: string; weight: number; assets: number }>,
) => {
  return owners.map((item, index) => ({
    ...item,
    color: getOwnerColor(index),
  }));
};

const prepareVaultData = (vaults: Array<{ vault: string; assets: number }>) => {
  return vaults.map((item, index) => ({
    ...item,
    color: getVaultColor(index),
  }));
};

/* ------------------ Check for Empty Data ------------------ */
const checkData = (data: VaultSiteData) => ({
  summary:
    data.total_assets > 0 ||
    data.total_weight_grams > 0 ||
    data.total_valuation > 0,
  productTypes: data.by_product_type?.length > 0,
  owners: data.by_owner?.length > 0,
  vaults: data.by_vault?.length > 0,
});

/* ------------------ Main Component ------------------ */
export function InventoryOverview({
  data = mockData,
  isLoading = false,
}: InventoryOverviewProps) {
  // Prepare data with colors
  const productTypeData = prepareProductTypeData(data.by_product_type);
  const ownerData = prepareOwnerData(data.by_owner);
  const vaultData = prepareVaultData(data.by_vault);

  const hasData = checkData(data);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-600" />
            <span>Inventory Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary Stats Skeleton */}
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <SkeletonStatCard key={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Asset Types Skeleton */}
            <SkeletonSection title="Asset Types" />

            {/* Assets by Vault Skeleton */}
            <SkeletonSection title="Assets by Vault" />

            {/* Weight by Owner Skeleton */}
            <SkeletonSection title="Weight by Owner" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-600" />
            <span>Inventory Overview</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats - Compact Grid */}
        {hasData.summary ? (
          <div className="grid grid-cols-3 gap-2">
            <CompactStatCard
              icon={<Package className="h-3.5 w-3.5" />}
              label="Assets"
              value={fmtCompactNumber(data.total_assets)}
              subtext="items"
            />
            <CompactStatCard
              icon={<Scale className="h-3.5 w-3.5" />}
              label="Weight"
              value={fmtWeight(data.total_weight_grams)}
            />
            <CompactStatCard
              icon={<Users className="h-3.5 w-3.5" />}
              label="Value"
              value={fmtCurrency(data.total_valuation)}
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
          {/* Asset Types - Compact Pie Chart */}
          <CompactSection
            title="Asset Types"
            icon={<BarChart3 className="h-3.5 w-3.5" />}
          >
            {hasData.productTypes ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full h-40 sm:h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productTypeData}
                        dataKey="count"
                        nameKey="type"
                        innerRadius={35}
                        outerRadius={50}
                        paddingAngle={1}
                      >
                        {productTypeData.map((entry) => (
                          <Cell
                            key={entry.type}
                            fill={entry.color}
                            stroke="#fff"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [value, "Assets"]}
                        contentStyle={{ fontSize: "12px", padding: "4px 6px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <EmptyStateChart
                title="No Asset Types"
                description="No product type data available"
              />
            )}
          </CompactSection>

          {/* Assets by Vault - Compact Vertical Bar Chart */}
          <CompactSection
            title="Assets by Vault"
            icon={<Building className="h-3.5 w-3.5" />}
          >
            {hasData.vaults ? (
              <div className="space-y-3">
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vaultData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <XAxis
                        dataKey="vault"
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
                        formatter={(value) => [`${value} assets`, ""]}
                        labelFormatter={(label) => `Vault ${label}`}
                        contentStyle={{ fontSize: "12px", padding: "4px 6px" }}
                      />
                      <Bar
                        dataKey="assets"
                        radius={[4, 4, 0, 0]}
                        background={{ fill: "#f3f4f6", radius: 4 }}
                      >
                        {vaultData.map((entry, index) => (
                          <Cell
                            key={`vault-cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <EmptyStateChart
                title="No Vault Data"
                description="No assets distributed across vaults"
              />
            )}
          </CompactSection>

          {/* Weight by Owner - Compact Vertical Bar Chart */}
          <CompactSection
            title="Weight by Owner"
            icon={<Scale className="h-3.5 w-3.5" />}
          >
            {hasData.owners ? (
              <div className="space-y-3">
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ownerData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <XAxis
                        dataKey="owner"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => `${value / 1000}k`}
                        width={30}
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "weight")
                            return [`${(value as number) / 1000} kg`, "Weight"];
                          return [value, "Assets"];
                        }}
                        contentStyle={{ fontSize: "12px", padding: "4px 6px" }}
                      />
                      <Bar
                        dataKey="weight"
                        radius={[4, 4, 0, 0]}
                        background={{ fill: "#f3f4f6", radius: 4 }}
                      >
                        {ownerData.map((entry, index) => (
                          <Cell
                            key={`owner-cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
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

/* ------------------ Skeleton Components ------------------ */
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

/* ------------------ Enhanced Sub Components ------------------ */
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

/* ------------------ Empty State Components ------------------ */
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