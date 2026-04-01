import React from "react";
import { PipelineStorageEntry } from "@/lib/pipelineStorage";

export interface PipelineData {
  transaction_reference: string;
  assets: string[];         // token IDs
  sender_igan: string;
  receiver_igan: string;
  counterparty_gic: string;
}

export interface PipelineModalProps {
  isOpen: boolean;
  data: PipelineData;
  onDone: (ref: string) => void;
  /** When resuming from transaction details, pass the saved state to skip detection */
  resume?: PipelineStorageEntry;
}

export type StepStatus = "pending" | "running" | "success" | "error" | "waiting";

export interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  kind: "auto" | "form";
  status: StepStatus;
  error?: string;
}
