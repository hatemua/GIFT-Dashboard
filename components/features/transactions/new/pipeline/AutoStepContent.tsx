import React from "react";
import { Button } from "@/components/ui/button";
import { AssetStatus } from "@/types/asset";
import { StatusBadge } from "./StatusBadge";

export interface AutoStepContentProps {
  stepId: string;
  assets: { tokenId: string; status: AssetStatus }[];
  hasCounterpartySignature: boolean;
  counterparty_gic: string;
  onExecute: () => void;
}

const STEP_DESCRIPTIONS: Record<string, { desc: string; arrow?: string }> = {
  lock:    { desc: "Lock all assets to initiate the transaction.",                      arrow: "stationary → locked" },
  transit: { desc: "Mark assets as in transit to the counterparty vault.",              arrow: "locked → in transit" },
  sign:    { desc: "Sign the transaction as the counterparty." },
  vault:   { desc: "Mark assets as delivered and stationary in the destination vault.", arrow: "in transit → stationary" },
};

export function AutoStepContent({ stepId, assets, hasCounterpartySignature, counterparty_gic, onExecute }: AutoStepContentProps) {
  const info = STEP_DESCRIPTIONS[stepId];
  const showAssetStatuses = ["lock", "transit", "vault"].includes(stepId);

  return (
    <div className="space-y-3">
      {info?.desc && <p className="text-sm text-muted-foreground">{info.desc}</p>}
      {info?.arrow && <p className="text-xs font-mono text-slate-400">Status change: {info.arrow}</p>}

      {showAssetStatuses && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Current asset statuses</p>
          <div className="divide-y divide-slate-100 rounded-lg border bg-white">
            {assets.map(({ tokenId, status }) => (
              <div key={tokenId} className="flex items-center justify-between px-3 py-1.5 text-xs">
                <span className="font-mono text-slate-500 truncate max-w-[60%]">{tokenId}</span>
                <StatusBadge status={status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {stepId === "sign" && (
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs">
          <span className="text-slate-500">Counterparty GIC:</span>
          <span className="font-mono font-medium">{counterparty_gic}</span>
          <span className="ml-auto">
            {hasCounterpartySignature
              ? <span className="text-emerald-600 font-medium">Signed</span>
              : <span className="text-amber-600 font-medium">Not signed</span>}
          </span>
        </div>
      )}

      <div className="flex justify-end">
        <Button variant="gold" onClick={onExecute}>Execute Step</Button>
      </div>
    </div>
  );
}
