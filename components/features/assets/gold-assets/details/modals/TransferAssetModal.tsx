"use client";

import { Controller, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAsset } from "@/hooks/useAsset";
import { useToast } from "@/providers/toast-provider";
import { Select, SelectItem } from "@/components/ui/select";
import { TRANSFER_REASONS } from "@/constants/assets";

interface TransferAssetFormValues {
  from_igan: string;
  to_igan: string;
  quantity: number;
  transaction_reference: string;
  transfer_reason: string;
  compliance_check: boolean;
}

interface TransferAssetModalProps {
  tokenId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TransferAssetModal = ({
  tokenId,
  isOpen,
  onClose,
}: TransferAssetModalProps) => {
  const { showToast } = useToast();
  const { transferAsset, loadingAction: loading } = useAsset();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransferAssetFormValues>({
    defaultValues: {
      from_igan: "",
      to_igan: "",
      quantity: 1,
      transaction_reference: "",
      transfer_reason: "",
      compliance_check: true,
    },
  });

  const submitHandler = async (values: TransferAssetFormValues) => {
    try {
      const payload = {
        token_id: tokenId,
        from_igan: values.from_igan,
        to_igan: values.to_igan,
        quantity: values.quantity,
        transaction_reference:
          values.transaction_reference || `TXN-${Date.now()}`,
        transfer_reason: values.transfer_reason,
        compliance_check: values.compliance_check,
      };

      const response = await transferAsset(payload);

      showToast({
        title: "Success",
        message: `Asset transferred successfully! TX: ${response.blockchain_tx}`,
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
  {/* Grid container for two inputs per row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Source IGAN */}
    <Input
      label="Source IGAN"
      placeholder="Enter source IGAN"
      required
      error={errors.from_igan?.message}
      {...register("from_igan", { required: "Source IGAN is required" })}
    />

    {/* Recipient IGAN */}
    <Input
      label="Recipient IGAN"
      placeholder="Enter recipient IGAN"
      required
      error={errors.to_igan?.message}
      {...register("to_igan", { required: "Recipient IGAN is required" })}
    />

    {/* Quantity */}
    <Input
      label="Quantity"
      type="number"
      min={1}
      required
      error={errors.quantity?.message}
      {...register("quantity", {
        required: "Quantity is required",
        min: 1,
      })}
    />

    {/* Transaction Reference */}
    <Input
      label="Transaction Reference"
      placeholder="Enter transaction reference (optional)"
      error={errors.transaction_reference?.message}
      {...register("transaction_reference")}
    />
  </div>

  {/* Transfer Reason */}
  <Controller
    control={control}
    name="transfer_reason"
    render={({ field }) => (
      <Select
        label="Transfer Reason"
        value={field.value}
        onChange={field.onChange}
        required
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
      {...register("compliance_check")}
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
