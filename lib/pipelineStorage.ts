import { AssetStatus } from "@/types/asset";

const KEY_PREFIX = "gift_pipeline_";

/** Minimal asset shape needed by inferCompletedSteps — satisfied by both
 *  the full Asset type and the lighter asset objects returned inside TransactionDetails. */
export interface AssetStatusSnapshot {
  status: AssetStatus;
  /** From full Asset type (fetched individually) */
  custody_party_type?: string | null;
  custody_party_id?: string | null;
  /** From TransactionDetails.assets */
  curent_cusdoty_party_id?: string | null;
  current_custody_type?: string | null; // "lsp" | "owner" | null — same semantic as custody_party_type
}

export interface PipelineStorageEntry {
  pipeline_case: "case1" | "case2";
  completed_steps: string[];
}

/**
 * Infers which pipeline steps are completed from current asset state +
 * transaction signatures. Used when localStorage has been cleared.
 *
 * Step completion rules:
 *  lock        → all assets are locked or in_transit, OR counterparty signed
 *  transit     → all assets are in_transit, OR (signed + all stationary)     (case1)
 *  custody_lsp → counterparty signed (sign comes after custody_lsp)
 *                OR all in_transit AND all have a non-null custody party id   (case1)
 *  sign        → counterparty signature exists
 *  vault       → counterparty signed AND all assets are stationary
 *  custody_cp  → cannot be inferred from TransactionDetails alone (custody
 *                party type "lsp" vs "owner" not exposed); requires full
 *                Asset type (custody_party_type === "owner")                  (case1)
 *  transfer    → transaction is EXECUTED
 */
export function inferCompletedSteps(
  pipelineCase: "case1" | "case2",
  assets: AssetStatusSnapshot[],
  hasCounterpartySignature: boolean,
  isExecuted: boolean,
): string[] {
  const done: string[] = [];

  const allStatuses = assets.map((a) => a.status);
  const allLockedOrInTransit = allStatuses.every((s) => s === "locked" || s === "in_transit");
  const allInTransit = allStatuses.every((s) => s === "in_transit");
  const allStationary = allStatuses.every((s) => s === "stationary");
  // current_custody_type ("lsp" | "owner") is the authoritative discriminator from TransactionDetails.
  // custody_party_type is a fallback for when only the full Asset type is passed (no current_custody_type).
  const custodyType = (a: AssetStatusSnapshot) => a.current_custody_type ?? a.custody_party_type;
  const allLspCustody   = assets.every((a) => custodyType(a) === "lsp");
  const allOwnerCustody = assets.every((a) => custodyType(a) === "owner");

  if (isExecuted) {
    // All steps done
    if (pipelineCase === "case1") {
      return ["lock", "transit", "custody_lsp", "sign", "vault", "custody_cp", "transfer"];
    }
    return ["lock", "sign", "vault", "transfer"];
  }

  // transfer not done — infer the rest
  // lock: all assets are locked or in_transit (or counterparty already signed, implying lock happened)
  const lockDone = allLockedOrInTransit || hasCounterpartySignature;
  if (lockDone) done.push("lock");

  if (pipelineCase === "case1") {
    // transit: all assets are in_transit (or vault already done which implies transit happened)
    const transitDone = allInTransit || (hasCounterpartySignature && allStationary);
    if (transitDone) done.push("transit");

    // custody_lsp: current_custody_type === "lsp" for all assets
    // fallback: sign (step 4) comes after custody_lsp (step 3), so if signed → done
    if (allLspCustody || hasCounterpartySignature) done.push("custody_lsp");
  }

  if (hasCounterpartySignature) done.push("sign");

  // vault: signed + now stationary
  if (hasCounterpartySignature && allStationary) done.push("vault");

  // custody_cp: current_custody_type === "owner" for all assets (set exclusively by this step)
  if (pipelineCase === "case1" && allOwnerCustody) {
    done.push("custody_cp");
  }

  return done;
}

export const pipelineStorage = {
  save(transaction_reference: string, entry: PipelineStorageEntry) {
    try {
      localStorage.setItem(KEY_PREFIX + transaction_reference, JSON.stringify(entry));
    } catch {}
  },

  load(transaction_reference: string): PipelineStorageEntry | null {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + transaction_reference);
      return raw ? (JSON.parse(raw) as PipelineStorageEntry) : null;
    } catch {
      return null;
    }
  },

  clear(transaction_reference: string) {
    try {
      localStorage.removeItem(KEY_PREFIX + transaction_reference);
    } catch {}
  },
};
