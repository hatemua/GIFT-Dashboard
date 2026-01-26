"use client";

import React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function ExplorerBlocksPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Block Explorer"
        description="Browse blockchain blocks and their associated transactions."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Explorer", href: "/explorer" },
          { label: "Blocks" },
        ]}
      />
    </DashboardShell>
  );
}
