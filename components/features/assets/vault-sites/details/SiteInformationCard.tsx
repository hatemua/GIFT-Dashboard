"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Clock,
  Globe,
  Hash,
  Home,
  Building,
  Package,
  Scale,
  PieChart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { vaultSiteDetails } from "@/types/vault-site";

export function SiteInformationCard({ vault }: { vault: vaultSiteDetails }) {
  const statusColors: Record<string, string> = {
    active:
      "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200",
    inactive:
      "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-600 border-slate-200",
    under_audit:
      "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200",
    suspended:
      "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200",
  };

  const InfoSection = ({
    title,
    value,
    icon: Icon,
    color = "text-blue-600",
    bgColor = "bg-blue-50",
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color?: string;
    bgColor?: string;
  }) => (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 transition-colors">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-md ${bgColor}`}
      >
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-medium text-slate-500 truncate">
          {title}
        </div>
        <div className="text-sm font-semibold text-slate-900 truncate">
          {value}
        </div>
      </div>
    </div>
  );

  const StatCard = ({
    label,
    value,
    unit,
    trend,
    icon: Icon,
  }: {
    label: string;
    value: string | number;
    unit?: string;
    trend?: string;
    icon: React.ComponentType<any>;
  }) => (
    <div className="flex flex-col p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
          <Icon className="h-4 w-4 text-blue-600" />
        </div>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-900">{value}</span>
        {unit && <span className="text-sm text-slate-500">{unit}</span>}
      </div>
      {trend && (
        <div className="mt-2 text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium inline-block">
          {trend}
        </div>
      )}
    </div>
  );

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500 mb-1">
                Vault Details
              </div>
              <div className="text-xl font-bold text-slate-900">
                {vault.vault_site_name}
              </div>
            </div>
          </CardTitle>
          <Badge
            className={`px-3 py-1.5 rounded-lg border ${statusColors[vault.status]} font-semibold text-sm`}
          >
            <div className="flex items-center gap-1.5">
              <div
                className={`h-2 w-2 rounded-full ${
                  vault.status === "active"
                    ? "bg-emerald-500"
                    : vault.status === "inactive"
                      ? "bg-slate-500"
                      : vault.status === "under_audit"
                        ? "bg-amber-500"
                        : "bg-red-500"
                }`}
              ></div>
              {vault.status.replace("_", " ").toUpperCase()}
            </div>
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-slate-400" />
            <span>
              Member:{" "}
              <span className="font-semibold text-slate-800">
                {vault.member_gic}
              </span>
            </span>
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>
              Created:{" "}
              <span className="font-semibold text-slate-800">
                {new Date(vault.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Location Information */}
        <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Location Details</h3>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection
              title="Location Name"
              value={vault.location.location_name ?? "N/A"}
              icon={Home}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <InfoSection
              title="City & Country"
              value={
                vault?.location?.city && vault?.location?.country
                  ? `${vault.location.city}, ${vault.location.country}`
                  : "N/A"
              }
              icon={Globe}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <InfoSection
              title="State / Province"
              value={vault.location.state_or_province ?? "N/A"}
              icon={MapPin}
              color="text-emerald-600"
              bgColor="bg-emerald-50"
            />
            <InfoSection
              title="Postal Code"
              value={vault.location.postal_code ?? "N/A"}
              icon={Hash}
              color="text-purple-600"
              bgColor="bg-purple-50"
            />
            <InfoSection
              title="Registered Address"
              value={vault.location.registered_address ?? "N/A"}
              icon={Building}
              color="text-yellow-600"
              bgColor="bg-yellow-50"
            />
            <InfoSection
              title="Operational Address"
              value={vault.location.operational_address ?? "N/A"}
              icon={Building}
              color="text-purple-600"
              bgColor="bg-purple-50"
            />
            <InfoSection
              title="GPS Coordinates"
              value={vault.location.gps_coordinates ?? "N/A"}
              icon={MapPin}
              color="text-emerald-600"
              bgColor="bg-emerald-50"
            />
            <InfoSection
              title="Timezone"
              value={vault.location.timezone ?? "N/A"}
              icon={Globe}
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            />
            <InfoSection
              title="Opening Hours"
              value={vault.opening_hours ?? "N/A"}
              icon={Clock}
              color="text-pink-600"
              bgColor="bg-pink-50"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total Assets"
            value={vault.total_assets}
            unit="items"
            icon={Package}
          />
          <StatCard
            label="Total Weight"
            value={(vault.total_weight_grams / 1000).toFixed(2)}
            unit="kg"
            icon={Scale}
          />
          <StatCard
            label="Maximum Weight"
            value={vault.storage_capacity.maximum_weight_in_gold_kg}
            unit="kg"
            icon={Scale} // or another icon if you want
          />
          <StatCard
            label="Utilization"
            value={vault.storage_capacity.utilization_percent}
            unit="%"
            icon={PieChart} // you can choose a chart icon here
          />
        </div>

        {/* Additional Information */}
        <div className="rounded-lg bg-gradient-to-r from-slate-50 to-blue-50/50 p-4 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">
                  Active Since:
                </span>
                <span className="text-sm font-semibold text-slate-900 ml-auto">
                  {new Date(vault.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">
                  Vault ID:
                </span>
                <span className="text-sm font-semibold text-slate-900 ml-auto font-mono">
                  {vault.vault_site_id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
