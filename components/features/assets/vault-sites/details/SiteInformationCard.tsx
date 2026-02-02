"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";

export function SiteInformationCard({ vault }: { vault: any }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          Site Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">
              {vault.location.city}, {vault.location.country}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Operational Address</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {vault.location.operational_address}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Opening Hours</p>
            <p className="text-sm font-medium text-gray-900">
              {vault.opening_hours}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Created</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="h-3 w-3" />
              {new Date(vault.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
