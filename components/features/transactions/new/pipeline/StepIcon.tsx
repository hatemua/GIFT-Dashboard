import React from "react";
import { Loader2, CheckCircle2, XCircle, Circle } from "lucide-react";
import { StepStatus } from "./types";

export function StepIcon({ status, icon }: { status: StepStatus; icon: React.ReactNode }) {
  if (status === "running") return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
  if (status === "success") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "error")   return <XCircle className="h-4 w-4 text-red-500" />;
  if (status === "waiting") return <div className="h-4 w-4 text-amber-500">{icon}</div>;
  return <Circle className="h-4 w-4 text-gray-300" />;
}
