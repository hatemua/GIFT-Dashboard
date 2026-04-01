import React from "react";
import { Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetStatus } from "@/types/asset";
import { Step } from "./types";
import { AutoStepContent } from "./AutoStepContent";
import {
  LspCustodyForm, CounterpartyCustodyForm, TransferForm,
  LspFormValues, CounterpartyCustodyFormValues, TransferFormValues,
} from "./PipelineForms";

interface PipelineCurrentStepProps {
  step: Step;
  currentIdx: number;
  assets: { tokenId: string; status: AssetStatus }[];
  hasCounterpartySignature: boolean;
  counterparty_gic: string;
  transactionRef: string;
  onRunAutoStep: (id: string) => void;
  onDone: (ref: string) => void;
  onLspSubmit: (values: LspFormValues) => void;
  onCpSubmit: (values: CounterpartyCustodyFormValues) => void;
  onTransferSubmit: (values: TransferFormValues) => void;
}

function StepContent({ step, assets, hasCounterpartySignature, counterparty_gic, transactionRef, onRunAutoStep, onDone, onLspSubmit, onCpSubmit, onTransferSubmit }: Omit<PipelineCurrentStepProps, "currentIdx">) {
  if (step.status === "running") {
    return (
      <div className="flex items-center gap-3 py-6 text-blue-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm font-medium">Executing {step.label}…</span>
      </div>
    );
  }

  if (step.status === "error") {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{step.error}</p>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => onDone(transactionRef)}>
            Go to Transaction
          </Button>
        </div>
      </div>
    );
  }

  if (step.kind === "auto") {
    return (
      <AutoStepContent
        stepId={step.id}
        assets={assets}
        hasCounterpartySignature={hasCounterpartySignature}
        counterparty_gic={counterparty_gic}
        onExecute={() => onRunAutoStep(step.id)}
      />
    );
  }

  if (step.id === "custody_lsp") return <LspCustodyForm onSubmit={onLspSubmit} />;
  if (step.id === "custody_cp")  return <CounterpartyCustodyForm onSubmit={onCpSubmit} />;
  if (step.id === "transfer")    return <TransferForm onSubmit={onTransferSubmit} />;

  return null;
}

export function PipelineCurrentStep({ step, currentIdx, ...rest }: PipelineCurrentStepProps) {
  return (
    <div className="rounded-xl border-2 border-amber-200 bg-amber-50/40 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-amber-600">{step.icon}</div>
        <p className="font-semibold text-amber-800">
          Step {currentIdx + 1} — {step.label}
        </p>
      </div>
      <div className="pl-6">
        <StepContent step={step} {...rest} />
      </div>
    </div>
  );
}
