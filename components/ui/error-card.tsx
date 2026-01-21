"use client";

import { Card, CardContent } from "./card";
import { AlertTriangle } from "lucide-react";

interface ErrorCardProps {
  error?: string | null;
  className?: string;
}

export function ErrorCard({ error, className }: ErrorCardProps) {
  return (
    <div className="flex-1 overflow-auto w-full">
      <div className="container mx-auto flex items-start justify-center min-h-[60vh]">
        <Card className={` w-full text-center ${className}`}>
          <CardContent className="py-12 space-y-6">
            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <AlertTriangle className="h-7 w-7" />
            </div>

            {/* Text */}
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Something went wrong
              </h2>
              <p className="text-sm text-slate-500">
                We couldn’t load the data right now. This might be temporary.
              </p>
            </div>

            {/* Optional technical hint (safe for dev) */}
            {process.env.NODE_ENV === "development" && error && (
              <p className="text-xs text-red-500 break-all">{error}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
