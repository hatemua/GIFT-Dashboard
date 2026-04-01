"use client";

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmptyState from "@/components/features/common/EmptyState";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionHeader } from "@/components/features/transactions/details/TransactionHeader";
import { TransactionAssets } from "@/components/features/transactions/details/TransactionAssets";
import { TransactionValuation } from "@/components/features/transactions/details/TransactionValuation";
import { TransactionSignatures } from "@/components/features/transactions/details/TransactionSignatures";
import { TransactionParties } from "@/components/features/transactions/details/TransactionParties";
import { TransactionEvents } from "@/components/features/transactions/details/TransactionEvents";
import { LoadingSkeleton } from "@/components/features/assets/gold-assets/details/LoadingSkeleton";
import { Activity, Gem, LayoutDashboard, PlayCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pipelineStorage, PipelineStorageEntry, inferCompletedSteps } from "@/lib/pipelineStorage";
import { goldAccountService } from "@/services/goldAccountService";
import { TransactionPipelineModal } from "@/components/features/transactions/new/TransactionPipelineModal";

interface TransactionOrderDetailsPageProps {
  params: Promise<{ transactionReference: string }>;
}

export default function TransactionOrderDetailsPage({
  params,
}: TransactionOrderDetailsPageProps) {
  const { transactionReference } = React.use(params);
  const { transactionDetails, fetchTransactionByReference, loading } =
    useTransaction();
  const [hasFetched, setHasFetched] = useState(false);
  const [pendingPipeline, setPendingPipeline] = useState<PipelineStorageEntry | null>(null);
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    if (transactionReference) {
      setHasFetched(true);
      fetchTransactionByReference(transactionReference);
      setPendingPipeline(pipelineStorage.load(transactionReference));
    }
  }, [transactionReference, fetchTransactionByReference]);

  /**
   * Called when localStorage is gone but the transaction is not executed.
   * Fetches fresh asset data to infer which steps were already completed.
   */
  const handleRecover = async () => {
    if (!transactionDetails) return;
    setRecovering(true);
    try {
      const [initiatorAccount, counterpartyAccount] = await Promise.all([
        goldAccountService.getAccountByIgan(transactionDetails.parties.initiator.igan),
        goldAccountService.getAccountByIgan(transactionDetails.parties.counterparty.igan),
      ]);

      const pipelineCase =
        initiatorAccount.vault_id !== counterpartyAccount.vault_id ? "case1" : "case2";

      const hasCounterpartySignature = transactionDetails.signatures.some(
        (s) => s.signing_role === "counterparty",
      );
      const isExecuted = transactionDetails.status === "EXECUTED";

      // Use the asset statuses already available from the transaction details response
      const completedSteps = inferCompletedSteps(
        pipelineCase,
        transactionDetails.assets,
        hasCounterpartySignature,
        isExecuted,
      );

      const recovered: PipelineStorageEntry = { pipeline_case: pipelineCase, completed_steps: completedSteps };
      setPendingPipeline(recovered);
      setPipelineOpen(true);
    } finally {
      setRecovering(false);
    }
  };

  return (
    <DashboardShell>
      <PageHeader
        className="mb-6"
        title=""
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transaction Orders", href: "/transactions/orders" },
          { label: `${transactionReference} (Reference)` },
        ]}
      />

      {/* Banner: localStorage present — resume directly */}
      {pendingPipeline && !pipelineOpen && (
        <div className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <PlayCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Pipeline incomplete</p>
              <p className="text-xs text-amber-600 mt-0.5">
                Some steps were not finished. Resume to complete the transaction pipeline.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white shrink-0"
            onClick={() => setPipelineOpen(true)}
          >
            Resume Pipeline
          </Button>
        </div>
      )}

      {/* Banner: localStorage gone but transaction not executed — recover */}
      {!pendingPipeline && !pipelineOpen && hasFetched && transactionDetails &&
        transactionDetails.status !== "EXECUTED" && (
        <div className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-orange-800">Transaction not yet executed</p>
              <p className="text-xs text-orange-600 mt-0.5">
                The pipeline may have been interrupted. Click to analyse the current state and resume.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            disabled={recovering}
            className="bg-orange-500 hover:bg-orange-600 text-white shrink-0"
            onClick={handleRecover}
          >
            {recovering ? (
              <><Loader2 className="h-3 w-3 animate-spin mr-1.5" />Analysing…</>
            ) : (
              "Recover Pipeline"
            )}
          </Button>
        </div>
      )}

      {loading || !hasFetched ? (
        <LoadingSkeleton />
      ) : transactionDetails ? (
        <Card className="p-4 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
          <TransactionHeader transaction={transactionDetails} />

          <Tabs defaultValue="overview" className="space-y-4 mt-3">
            <TabsList className="bg-slate-100 p-1 rounded-xl w-fit gap-1">
              <TabsTrigger
                value="overview"
                className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </TabsTrigger>

              <TabsTrigger
                value="assets"
                className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <Gem className="w-4 h-4" />
                Assets
              </TabsTrigger>

              <TabsTrigger
                value="events"
                className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TransactionParties transaction={transactionDetails} />
                <TransactionValuation transaction={transactionDetails} />
                <TransactionSignatures transaction={transactionDetails} />
              </div>
            </TabsContent>

            {/* ASSETS TAB */}
            <TabsContent value="assets" className="space-y-4">
              <TransactionAssets transaction={transactionDetails} />
            </TabsContent>

            {/* EVENTS TAB */}
            <TabsContent value="events" className="space-y-4">
              <TransactionEvents transactionReference={transactionReference} />
            </TabsContent>
          </Tabs>
        </Card>
      ) : (
        <EmptyState type="transaction" />
      )}
      {/* Resume pipeline modal */}
      {pipelineOpen && transactionDetails && (
        <TransactionPipelineModal
          isOpen
          resume={pendingPipeline ?? undefined}
          data={{
            transaction_reference: transactionReference,
            assets: transactionDetails.assets.map((a) => a.token_id),
            sender_igan: transactionDetails.parties.initiator.igan,
            receiver_igan: transactionDetails.parties.counterparty.igan,
            counterparty_gic: transactionDetails.parties.counterparty.gic,
          }}
          onDone={() => {
            setPipelineOpen(false);
            setPendingPipeline(null);
            fetchTransactionByReference(transactionReference);
          }}
        />
      )}
    </DashboardShell>
  );
}
