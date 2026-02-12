"use client";

import React, { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { GoldAccountBasicInfo } from "@/components/features/assets/accounts/details/GoldAccountBasicInfo";
import { useGoldAccount } from "@/hooks/useGoldAccount";
import HoldingsByProductType from "@/components/features/assets/accounts/details/HoldingsByProductType";
import { GoldAccountAssets } from "@/components/features/assets/accounts/details/GoldAccountAssets";
import GoldAccountMovements from "@/components/features/assets/accounts/details/GoldAccountMovements";
import ErrorState from "@/components/features/assets/accounts/details/ErrorState";

interface GoldAccountDetailsPageProps {
  params: Promise<{ igan: string }>;
}

export default function GoldAccountDetailsPage({
  params,
}: GoldAccountDetailsPageProps) {
  const { igan } = React.use(params);

  const { error, fetchAccountByIgan, resetSelectedAccount } = useGoldAccount();

  useEffect(() => {
    if (igan) {
      fetchAccountByIgan(igan);
    }
    return () => {
      resetSelectedAccount();
    };
  }, [igan]);

  return (
    <DashboardShell>
      <PageHeader
        className="mb-3"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Gold Accounts", href: "/assets/accounts" },
          { label: igan },
        ]}
      />

      {/* ───── Error State ───── */}
      {error && <ErrorState />}

      {/* ───── Success State ───── */}
      {!error && (
        <>
          <GoldAccountBasicInfo />
          <HoldingsByProductType igan={igan} />
          <GoldAccountAssets igan={igan} />
          <GoldAccountMovements igan={igan} />
        </>
      )}
    </DashboardShell>
  );
}
