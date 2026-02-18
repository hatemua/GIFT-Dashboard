"use client";

import { Controller, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAsset } from "@/hooks/useAsset";
import { useToast } from "@/providers/toast-provider";
import { Select, SelectItem } from "@/components/ui/select";
import { TRANSFER_REASONS } from "@/constants/assets";
import { useTransaction } from "@/hooks/useTransaction";

interface TransferAssetFormValues {
  transfer_reason: string;
  compliance_check: boolean;
}

interface TransferAssetModalProps {
  tokenId: string;
  isOpen: boolean;
  onClose: () => void;
  from_igan: string;
  to_igan: string;
  transaction_reference: string;
}

export const TransferAssetModal = ({
  tokenId,
  isOpen,
  onClose,
  from_igan,
  to_igan,
  transaction_reference,
}: TransferAssetModalProps) => {
  const { showToast } = useToast();
  const { transferAsset, loadingAction: loading } = useAsset();
  const { fetchTransactionByReference } = useTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransferAssetFormValues>({
    defaultValues: {
      transfer_reason: "",
      compliance_check: true,
    },
  });

  const submitHandler = async (values: TransferAssetFormValues) => {
    try {
      const payload = {
        token_id: tokenId,
        from_igan,
        to_igan,
        quantity: 1,
        transaction_reference,
        transfer_reason: values.transfer_reason,
        compliance_check: values.compliance_check,
      };

      await transferAsset(payload);
      await fetchTransactionByReference(transaction_reference);

      showToast({
        title: "Success",
        message: `Asset transferred successfully!`,
        variant: "success",
      });

      reset();
      onClose();
    } catch (error: any) {
      showToast({
        title: "Error",
        message:
          error?.response?.data?.error_description ||
          "Failed to transfer asset. Please try again.",
        variant: "error",
      });
    }
  };

  const isDisabled = loading || isSubmitting;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="lg"
      title="Transfer Asset"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Transfer Reason */}
        <Controller
          control={control}
          name="transfer_reason"
          rules={{ required: "Transfer reason is required" }}
          render={({ field }) => (
            <Select
              label="Transfer Reason"
              value={field.value}
              onChange={field.onChange}
              required
              error={errors.transfer_reason?.message}
            >
              {TRANSFER_REASONS.map((reason) => (
                <SelectItem key={reason.value} value={reason.value}>
                  {reason.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        {/* Compliance check */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="compliance_check"
            {...control.register("compliance_check")}
            defaultChecked
            disabled={loading}
          />
          <label htmlFor="compliance_check" className="text-sm text-slate-700">
            Compliance check passed
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              onClose();
            }}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isDisabled}>
            {loading || isSubmitting ? "Transferring..." : "Transfer Asset"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
