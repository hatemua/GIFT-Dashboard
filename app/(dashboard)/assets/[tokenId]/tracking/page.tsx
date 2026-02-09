"use client";

import React, { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { useAsset } from "@/hooks/useAsset";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Gem, 
  Package, 
  Users, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  MoveVertical, 
  History,
  DollarSign,
  Scale,
  Fingerprint,
  Building,
  UserCheck,
  FileCheck,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";

interface assetTrackingPageProps {
  params: Promise<{ tokenId: string }>;
}

// Event type mapping for icons and colors
const eventTypeConfig = {
  registration: { icon: Fingerprint, color: "bg-blue-500", text: "text-blue-500" },
  custody_change: { icon: Shield, color: "bg-purple-500", text: "text-purple-500" },
  status_change: { icon: Clock, color: "bg-amber-500", text: "text-amber-500" },
  vault_movement: { icon: MoveVertical, color: "bg-emerald-500", text: "text-emerald-500" },
  audit: { icon: FileCheck, color: "bg-green-500", text: "text-green-500" },
  transfer: { icon: Users, color: "bg-indigo-500", text: "text-indigo-500" },
  valuation: { icon: DollarSign, color: "bg-rose-500", text: "text-rose-500" },
};

export default function assetTrackingPage({ params }: assetTrackingPageProps) {
  const { tokenId } = React.use(params);
  const { assetTracking, fetchAssetTracking, loading } = useAsset();

  useEffect(() => {
    if (tokenId) fetchAssetTracking(tokenId);
  }, [tokenId, fetchAssetTracking]);


  // Format currency helper
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (loading) {
    return (
      <DashboardShell>
        <PageHeader
          className="mb-6"
          title="Loading Asset Details..."
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Assets", href: "/assets" },
            { label: tokenId },
          ]}
        />
        <div className="space-y-6">
          {/* <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" /> */}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <PageHeader
        className="mb-6"
        title="Asset Tracking Details"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Assets", href: "/assets" },
          { label: tokenId },
        ]}
      />

      <div className="space-y-6">
        {/* Asset Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <Gem className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{tokenId}</h1>
                  <p className="text-muted-foreground">Serial: {assetTracking?.asset_summary.serial_number}</p>
                </div>
              </div>
              <Badge variant={assetTracking?.asset_summary.current_status === "stationary" ? "success" : "warning"}>
                {assetTracking?.asset_summary.current_status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Scale className="h-4 w-4" />
                  <span>Weight</span>
                </div>
                <p className="font-semibold">{assetTracking?.asset_summary.weight_grams}g</p>
                <p className="text-sm text-muted-foreground">
                  Fine: {assetTracking?.asset_summary.fine_weight_grams}g ({assetTracking?.asset_summary?.fineness ?? 0 * 100}%)
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <p className="font-semibold">{assetTracking?.asset_summary.current_vault_id}</p>
                <p className="text-sm text-muted-foreground">
                  {assetTracking?.asset_summary.current_vault_site_id}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4" />
                  <span>Owner</span>
                </div>
                <p className="font-semibold">{assetTracking?.asset_summary.current_owner_igan}</p>
                <p className="text-sm text-muted-foreground">
                  {assetTracking?.asset_summary.current_custody_party_type}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Current Value</span>
                </div>
                <p className="font-semibold">
                  {formatCurrency(assetTracking?.tracking_events[assetTracking.tracking_events.length - 1]?.valuation_snapshot?.asset_value || 0)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Rate: ${assetTracking?.tracking_events[assetTracking.tracking_events.length - 1]?.valuation_snapshot?.gold_rate}/g
                </p>
              </div>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{assetTracking?.lifecycle_timeline.total_events}</p>
                <p className="text-sm text-muted-foreground">Total Events</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{assetTracking?.lifecycle_timeline.total_transfers}</p>
                <p className="text-sm text-muted-foreground">Transfers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{assetTracking?.lifecycle_timeline.total_vault_movements}</p>
                <p className="text-sm text-muted-foreground">Vault Moves</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{assetTracking?.lifecycle_timeline.total_status_changes}</p>
                <p className="text-sm text-muted-foreground">Status Changes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tracking Events Timeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center space-x-2">
                    <History className="h-5 w-5" />
                    <span>Tracking Timeline</span>
                  </h2>
                  <Badge variant="outline">
                    {formatDate(assetTracking?.lifecycle_timeline.first_event || "", "long")} - {formatDate(assetTracking?.lifecycle_timeline.last_event || "")}
                  </Badge>
                </div>

                <div className="space-y-6">
                  {assetTracking?.tracking_events.map((event, index) => {
                    const config = eventTypeConfig[event.event_type as keyof typeof eventTypeConfig];
                    const EventIcon = config?.icon || History;
                    
                    return (
                      <div key={event.event_id} className="relative pl-8">
                        {/* Timeline line */}
                        {index < (assetTracking.tracking_events.length - 1) && (
                          <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-border" />
                        )}
                        
                        {/* Timeline dot */}
                        <div className={`absolute left-0 top-2 h-4 w-4 rounded-full ${config?.color} border-4 border-background`}>
                          <EventIcon className="h-2 w-2 text-white" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={config?.text}>
                                {event.event_type.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {event.event_id}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(event.timestamp)}
                            </span>
                          </div>
                          
                          <p className="font-medium">{event.description}</p>
                          
                          {/* Details */}
                          {event.details && Object.keys(event.details).length > 0 && (
                            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                              {Object.entries(event.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground capitalize">
                                    {key.replace(/_/g, ' ')}:
                                  </span>
                                  <span className="font-medium">{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Valuation snapshot */}
                          {event.valuation_snapshot && (
                            <div className="bg-amber-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-amber-900">
                                    {formatCurrency(event.valuation_snapshot.asset_value)}
                                  </p>
                                  <p className="text-sm text-amber-700">
                                    Rate: ${event.valuation_snapshot.gold_rate}/g
                                  </p>
                                </div>
                                <DollarSign className="h-5 w-5 text-amber-600" />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Block: {event.block_number}</span>
                            <span>Transaction: {event.transaction_hash.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Chains & History */}
          <div className="space-y-6">
            {/* Ownership Chain */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Ownership Chain</span>
                </h3>
                <div className="space-y-4">
                  {assetTracking?.ownership_chain.map((owner, index) => (
                    <div key={owner.owner_igan} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{owner.owner_igan}</p>
                          <p className="text-sm text-muted-foreground">GIC: {owner.owner_gic}</p>
                        </div>
                        {owner.is_current_owner && (
                          <Badge variant="success">Current</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>From: {formatDate(owner.from_date)}</p>
                        <p>To: {owner.to_date ? formatDate(owner.to_date) : 'Present'}</p>
                        <p>Duration: {owner.duration_days} days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custody Chain */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Custody Chain</span>
                </h3>
                <div className="space-y-4">
                  {assetTracking?.custody_chain.map((custodian, index) => (
                    <div key={custodian.custody_party_id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium capitalize">{custodian.custody_party_type.replace('_', ' ')}</p>
                          <p className="text-sm text-muted-foreground">{custodian.custody_party_id}</p>
                        </div>
                        {custodian.is_current_custodian && (
                          <Badge variant="success">Current</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>From: {formatDate(custodian.from_date)}</p>
                        <p>To: {custodian.to_date ? formatDate(custodian.to_date) : 'Present'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location History */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location History</span>
                </h3>
                <div className="space-y-4">
                  {assetTracking?.location_history.map((location, index) => (
                    <div key={location.vault_id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{location.vault_id}</p>
                          <p className="text-sm text-muted-foreground">{location.vault_site_id}</p>
                        </div>
                        {location.is_current_location && (
                          <Badge variant="success">Current</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>From: {formatDate(location.from_date)}</p>
                        <p>To: {location.to_date ? formatDate(location.to_date) : 'Present'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Valuation History */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Valuation History</span>
              </h2>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {formatCurrency(assetTracking?.tracking_events[assetTracking.tracking_events.length - 1]?.valuation_snapshot?.asset_value || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Current Value</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Date</th>
                    <th className="text-left py-3 font-medium">Event</th>
                    <th className="text-left py-3 font-medium">Value</th>
                    <th className="text-left py-3 font-medium">Gold Rate</th>
                    <th className="text-left py-3 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {assetTracking?.tracking_events
                    .filter(event => event.valuation_snapshot)
                    .map((event, index, arr) => {
                      const prevValue = index > 0 ? arr[index - 1]?.valuation_snapshot?.asset_value : null;
                      const change = prevValue ? event.valuation_snapshot!.asset_value - prevValue : 0;
                      const changePercent = prevValue ? (change / prevValue) * 100 : 0;
                      
                      return (
                        <tr key={event.event_id} className="border-b hover:bg-muted/50">
                          <td className="py-3">{formatDate(event.timestamp)}</td>
                          <td className="py-3">
                            <Badge variant="outline" className="capitalize">
                              {event.event_type.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="py-3 font-semibold">
                            {formatCurrency(event.valuation_snapshot!.asset_value)}
                          </td>
                          <td className="py-3">${event.valuation_snapshot!.gold_rate}/g</td>
                          <td className={`py-3 ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : ''}`}>
                            {change !== 0 && (
                              <>
                                {change > 0 ? '+' : ''}{formatCurrency(change)} ({changePercent.toFixed(2)}%)
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link href="/assets">
              Back to Assets
            </Link>
          </Button>
          <Button>
            <FileCheck className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}