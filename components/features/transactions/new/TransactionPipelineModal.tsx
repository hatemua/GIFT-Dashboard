"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { AssetStatus } from "@/types/asset";
import { fileToBase64 } from "@/lib/utils";
import { useDocument } from "@/hooks/useDocument";
import { assetService } from "@/services/assetService";
import { transactionService } from "@/services/transactionService";
import { goldAccountService } from "@/services/goldAccountService";
import { useMemberStore } from "@/store/memberStore";
import { useTransactionStore } from "@/store/transactionStore";
import { pipelineStorage, inferCompletedSteps } from "@/lib/pipelineStorage";

import { PipelineData, PipelineModalProps, Step, StepStatus } from "./pipeline/types";
import { extractError, today, buildSteps } from "./pipeline/utils";
import { LspFormValues, CounterpartyCustodyFormValues, TransferFormValues } from "./pipeline/PipelineForms";
import { PipelineCaseBadge, PipelineProgressBar, PipelineStepChips } from "./pipeline/PipelineStepList";
import { PipelineCurrentStep } from "./pipeline/PipelineCurrentStep";

export type { PipelineData };

export const TransactionPipelineModal = ({ isOpen, data, onDone, resume }: PipelineModalProps) => {
  const { uploadDocument } = useDocument();
  const transactionDetails        = useTransactionStore((s) => s.transactionDetails);
  const fetchTransactionByReference = useTransactionStore((s) => s.fetchTransactionByReference);

  const [pipelineCase, setPipelineCase] = useState<"case1" | "case2" | null>(resume?.pipeline_case ?? null);
  const [detecting, setDetecting]      = useState(!resume);
  const [detectError, setDetectError]  = useState<string | null>(null);
  const [steps, setSteps]              = useState<Step[]>([]);
  const [currentIdx, setCurrentIdx]    = useState(0);
  const [finished, setFinished]        = useState(false);
  const autoRunRef = useRef(false);

  /** Ref used inside the auto-skip effect so it always sees the latest transaction details
   *  without needing transactionDetails in the effect's dep array (which would cause
   *  the stale-autoRunRef bug). */
  const txDetailsRef = useRef(transactionDetails);
  useEffect(() => { txDetailsRef.current = transactionDetails; }, [transactionDetails]);

  /* ── On open: detect pipeline case (skipped when resuming) ── */
  useEffect(() => {
    if (!isOpen || resume) return;
    const detect = async () => {
      setDetecting(true);
      setDetectError(null);
      try {
        const [initiator, counterparty] = await Promise.all([
          goldAccountService.getAccountByIgan(data.sender_igan),
          goldAccountService.getAccountByIgan(data.receiver_igan),
        ]);
        setPipelineCase(initiator.vault_id !== counterparty.vault_id ? "case1" : "case2");
      } catch (e: any) {
        setDetectError(extractError(e));
      } finally {
        setDetecting(false);
      }
    };
    detect();
  }, [isOpen]);

  /* ── Build steps; derive completed steps from actual transaction state ──
   *  When transactionDetails is available, inferCompletedSteps is the source of truth —
   *  this prevents stale localStorage data (e.g. custody_cp saved as done but API still
   *  shows lsp custody) from pushing currentIdx past steps that need re-execution. */
  useEffect(() => {
    if (!pipelineCase) return;
    const built = buildSteps(pipelineCase);

    const tx = txDetailsRef.current;
    if (tx) {
      const hasSig     = tx.signatures.some((s) => s.signing_role === "counterparty");
      const isExecuted = tx.status === "EXECUTED";
      const actualDone = new Set(inferCompletedSteps(pipelineCase, tx.assets, hasSig, isExecuted));
      built.forEach((s) => { if (actualDone.has(s.id)) s.status = "success"; });
    } else if (resume?.completed_steps?.length) {
      // Fallback: no tx details yet (e.g. new transaction flow)
      const completedSet = new Set(resume.completed_steps);
      built.forEach((s) => { if (completedSet.has(s.id)) s.status = "success"; });
    }

    const firstIncomplete = built.findIndex((s) => s.status !== "success");
    setCurrentIdx(firstIncomplete === -1 ? built.length - 1 : firstIncomplete);
    setSteps(built);
    autoRunRef.current = false;
  }, [pipelineCase]);

  /* ── Auto-skip steps already done ──
   *  Reads txDetailsRef (not transactionDetails state) so the effect only re-runs
   *  when currentIdx/steps change, preventing stale-autoRunRef issues. */
  useEffect(() => {
    if (!steps.length) return;
    const step = steps[currentIdx];
    if (!step || autoRunRef.current) return;
    autoRunRef.current = true;

    const tx = txDetailsRef.current;
    if (!tx) return;

    const assetStatus = (t: string) => tx.assets.find((a) => a.token_id === t)?.status;
    const custodyType = (t: string) => tx.assets.find((a) => a.token_id === t)?.current_custody_type;
    const hasSig      = tx.signatures.some((s) => s.signing_role === "counterparty");

    const statuses = data.assets.map(assetStatus).filter((s): s is AssetStatus => !!s);
    if (statuses.length === 0) return;

    const allLspCustody   = data.assets.every((t) => custodyType(t) === "lsp");
    const allOwnerCustody = data.assets.every((t) => custodyType(t) === "owner");

    let alreadyDone = false;
    if      (step.id === "lock")        alreadyDone = statuses.every((s) => s === "locked" || s === "in_transit");
    else if (step.id === "transit")     alreadyDone = statuses.every((s) => s === "in_transit");
    else if (step.id === "sign")        alreadyDone = hasSig;
    else if (step.id === "vault")       alreadyDone = hasSig && statuses.every((s) => s === "stationary");
    else if (step.id === "custody_lsp") alreadyDone = allLspCustody || hasSig;
    else if (step.id === "custody_cp")  alreadyDone = allOwnerCustody;
    else if (step.id === "transfer")    alreadyDone = data.assets.every(
      (t) => tx.assets.find((a) => a.token_id === t)?.current_owner === data.receiver_igan,
    );

    if (alreadyDone) { patch(step.id, "success"); advance(); }
  }, [currentIdx, steps]);

  /* ── Patch step status + persist to localStorage ── */
  const patch = useCallback((id: string, status: StepStatus, error?: string) => {
    setSteps((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, status, error } : s));
      if (status === "success" && pipelineCase) {
        pipelineStorage.save(data.transaction_reference, {
          pipeline_case: pipelineCase,
          completed_steps: next.filter((s) => s.status === "success").map((s) => s.id),
        });
      }
      return next;
    });
  }, [pipelineCase, data.transaction_reference]);

  /* ── Advance to next step ── */
  const advance = useCallback(() => {
    setCurrentIdx((i) => {
      const next = i + 1;
      autoRunRef.current = false;
      if (next >= steps.length) {
        pipelineStorage.clear(data.transaction_reference);
        setFinished(true);
        return i;
      }
      return next;
    });
  }, [steps.length]);

  /* ── Auto-step executor (button-triggered) ── */
  const handleRunAutoStep = async (id: string) => {
    patch(id, "running");
    try {
      const { transaction_reference, assets, counterparty_gic } = data;
      if (id === "lock") {
        await Promise.all(assets.map((tokenId) =>
          assetService.updateStatus(tokenId, { token_id: tokenId, new_status: "locked", reason: "Transaction initiated", effective_date: today() }),
        ));
      } else if (id === "transit") {
        await Promise.all(assets.map((tokenId) =>
          assetService.updateStatus(tokenId, { token_id: tokenId, new_status: "in_transit", reason: "Asset in transit to counterparty", effective_date: today() }),
        ));
      } else if (id === "sign") {
        await useMemberStore.getState().fetchMemberByGic(counterparty_gic);
        const member = useMemberStore.getState().selectedMember;
        await transactionService.signTransaction(transaction_reference, {
          signature: member?.member?.member_hash ?? counterparty_gic,
          signing_role: "counterparty",
        });
      } else if (id === "vault") {
        await Promise.all(assets.map((tokenId) =>
          assetService.updateStatus(tokenId, { token_id: tokenId, new_status: "stationary", reason: "Asset delivered to vault", effective_date: today() }),
        ));
      }
      patch(id, "success");
      await fetchTransactionByReference(data.transaction_reference);
      advance();
    } catch (e: any) {
      patch(id, "error", extractError(e));
    }
  };

  /* ── Form step handlers ── */
  const handleLspForm = async (values: LspFormValues) => {
    patch("custody_lsp", "running");
    try {
      const docId  = `CA-LSP-${crypto.randomUUID()}`;
      const base64 = await fileToBase64(values.custody_agreement_ref!);
      await uploadDocument({ document_id: docId, document_type: "agreement", document_url: "https://url_of_the_document", document_base64: base64 });
      await Promise.all(data.assets.map((tokenId) =>
        assetService.updateCustody(tokenId, { token_id: tokenId, custody_party_type: "lsp", lsp_id: values.lsp_id, custody_type: values.custody_type, custody_agreement_ref: docId }),
      ));
      patch("custody_lsp", "success");
      await fetchTransactionByReference(data.transaction_reference);
      advance();
    } catch (e: any) { patch("custody_lsp", "error", extractError(e)); }
  };

  const handleCpForm = async (values: CounterpartyCustodyFormValues) => {
    patch("custody_cp", "running");
    try {
      const docId  = `CA-CP-${crypto.randomUUID()}`;
      const base64 = await fileToBase64(values.custody_agreement_ref!);
      await uploadDocument({ document_id: docId, document_type: "agreement", document_url: "https://url_of_the_document", document_base64: base64 });
      await Promise.all(data.assets.map((tokenId) =>
        assetService.updateCustody(tokenId, { token_id: tokenId, custody_party_type: "owner", custody_party_id: values.custody_party_id, vault_site_id: values.vault_site_id, vault_id: values.vault_id, custody_type: values.custody_type, custody_agreement_ref: docId }),
      ));
      patch("custody_cp", "success");
      await fetchTransactionByReference(data.transaction_reference);
      advance();
    } catch (e: any) { patch("custody_cp", "error", extractError(e)); }
  };

  const handleTransferForm = async (values: TransferFormValues) => {
    patch("transfer", "running");
    try {
      const currentStatus = useTransactionStore.getState().transactionDetails?.status;
      if (currentStatus !== "EXECUTED") {
        await Promise.all(data.assets.map((tokenId) =>
          assetService.transferAsset({ token_id: tokenId, from_igan: data.sender_igan, to_igan: data.receiver_igan, quantity: 1, transaction_reference: data.transaction_reference, transfer_reason: values.transfer_reason, compliance_check: true }),
        ));
      }
      patch("transfer", "success");
      pipelineStorage.clear(data.transaction_reference);
      setFinished(true);
    } catch (e: any) { patch("transfer", "error", extractError(e)); }
  };

  /* ── Derived values ── */
  const currentStep    = steps[currentIdx];
  const completedCount = steps.filter((s) => s.status === "success").length;
  const progress       = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  const assetList = data.assets.map((tokenId) => ({
    tokenId,
    status: transactionDetails?.assets.find((a) => a.token_id === tokenId)?.status ?? ("stationary" as AssetStatus),
  }));

  const hasCounterpartySignature =
    transactionDetails?.signatures.some((s) => s.signing_role === "counterparty") ?? false;


  /* ── Render ── */
  return (
    <Modal isOpen={isOpen} onClose={() => onDone(data.transaction_reference)} size="lg" title="Transaction Pipeline">
      <div className="space-y-5">

        {detecting ? (
          <div className="flex items-center gap-3 py-6 text-blue-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Detecting pipeline case…</span>
          </div>
        ) : detectError ? (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700">Failed to detect pipeline case</p>
              <p className="text-xs text-red-500 mt-0.5">{detectError}</p>
            </div>
          </div>
        ) : pipelineCase ? (
          <>
            <PipelineCaseBadge pipelineCase={pipelineCase} />
            <PipelineProgressBar completedCount={completedCount} total={steps.length} progress={progress} />
            <PipelineStepChips steps={steps} currentIdx={currentIdx} />

            {!finished && currentStep && (
              <PipelineCurrentStep
                step={currentStep}
                currentIdx={currentIdx}
                assets={assetList}
                hasCounterpartySignature={hasCounterpartySignature}
                counterparty_gic={data.counterparty_gic}
                transactionRef={data.transaction_reference}
                onRunAutoStep={handleRunAutoStep}
                onDone={onDone}
                onLspSubmit={handleLspForm}
                onCpSubmit={handleCpForm}
                onTransferSubmit={handleTransferForm}
              />
            )}

            {finished && (
              <div className="flex items-center justify-between pt-2 border-t">
                <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  Pipeline completed successfully
                </p>
                <Button onClick={() => onDone(data.transaction_reference)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  View Transaction
                </Button>
              </div>
            )}
          </>
        ) : null}

      </div>
    </Modal>
  );
};
