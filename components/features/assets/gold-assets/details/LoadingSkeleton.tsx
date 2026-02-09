"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Asset Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl" />
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="h-5 bg-gray-200 rounded w-1/3"></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="h-5 bg-gray-200 rounded w-1/2"></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="h-5 bg-gray-200 rounded w-1/3"></CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-32 bg-gray-200 rounded"></div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
