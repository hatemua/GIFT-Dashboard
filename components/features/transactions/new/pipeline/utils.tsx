import React from "react";
import { Lock, Truck, Warehouse, ArrowRightLeft, UserCheck, PackageCheck } from "lucide-react";
import { Step } from "./types";

export const today = () => new Date().toISOString().split("T")[0];

export function extractError(e: any): string {
  return (
    e?.response?.data?.error_description ||
    e?.response?.data?.message ||
    e?.message ||
    "Unknown error"
  );
}

export function buildSteps(pipelineCase: "case1" | "case2"): Step[] {
  const base: Step[] = [
    { id: "lock", label: "Lock assets", icon: <Lock />, kind: "auto", status: "pending" },
  ];

  if (pipelineCase === "case1") {
    base.push(
      { id: "transit",     label: "Set to in transit",    icon: <Truck />,        kind: "auto", status: "pending" },
      { id: "custody_lsp", label: "Update custody → LSP", icon: <PackageCheck />, kind: "form", status: "pending" },
    );
  }

  base.push(
    { id: "sign",  label: "Sign as counterparty", icon: <UserCheck />,      kind: "auto", status: "pending" },
    { id: "vault", label: "Set to in vault",       icon: <Warehouse />,      kind: "auto", status: "pending" },
  );

  if (pipelineCase === "case1") {
    base.push(
      { id: "custody_cp", label: "Update custody → counterparty", icon: <PackageCheck />, kind: "form", status: "pending" },
    );
  }

  base.push(
    { id: "transfer", label: "Transfer assets", icon: <ArrowRightLeft />, kind: "form", status: "pending" },
  );

  return base;
}
