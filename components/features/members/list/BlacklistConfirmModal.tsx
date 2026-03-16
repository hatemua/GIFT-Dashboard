"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Ban, ShieldCheck } from "lucide-react";
import { truncateAddress } from "@/lib/utils";

interface BlacklistConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "add" | "remove";
  memberGic: string;
  loading?: boolean;
}

export const BlacklistConfirmModal: React.FC<BlacklistConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  action,
  memberGic,
  loading = false,
}) => {
  const isAdd = action === "add";

  return (
    <Modal isOpen={open} onClose={onClose} title="" size="sm">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${
            isAdd ? "bg-red-100" : "bg-emerald-100"
          }`}
        >
          {isAdd ? (
            <Ban className="w-7 h-7 text-red-500" />
          ) : (
            <ShieldCheck className="w-7 h-7 text-emerald-500" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900">
          {isAdd ? "Add to Blacklist?" : "Remove from Blacklist?"}
        </h3>

        {/* Description */}
        <div className="text-sm text-slate-500 space-y-1">
          <p>
            {isAdd
              ? "This member will be restricted from accessing the platform and performing transactions."
              : "This member will regain access to the platform and be able to perform transactions."}
          </p>
          <p className="font-mono text-xs bg-slate-100 rounded px-2 py-1 text-slate-700">
            {truncateAddress(memberGic, 6, 6)}
          </p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700 w-full text-left">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>This action can be reversed later by an administrator.</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className={`flex-1 text-white ${
              isAdd
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            } disabled:opacity-50`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-1">
                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing...
              </span>
            ) : isAdd ? (
              "Add to Blacklist"
            ) : (
              "Remove from Blacklist"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
