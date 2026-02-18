"use client";

import { useForm, Controller } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { UpdateStatusRequest, AssetStatus } from "@/types/asset";
import { useAsset } from "@/hooks/useAsset";
import { ASSET_CONDITION_LABELS } from "@/constants/assets";
import { fileToDataURL } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/providers/toast-provider";

interface UpdateStatusFormValues {
  new_status?: AssetStatus;
  reason: string;
  effective_date: string;
  supporting_document: File;
}

interface UpdateAssetStatusModalProps {
  tokenId: string;
  currentStatus: AssetStatus;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export const UpdateAssetStatusModal = ({
  tokenId,
  currentStatus,
  isOpen,
  onClose,
  onUpdate
}: UpdateAssetStatusModalProps) => {
  const { showToast } = useToast();
  const { loadingAction: loading, updateStatus } = useAsset();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateStatusFormValues>({
    defaultValues: {
      new_status: undefined,
      reason: "",
      effective_date: "",
      supporting_document: undefined,
    },
  });

  const submitHandler = async (values: UpdateStatusFormValues) => {
    if (!values.new_status) return;

    try {
      let supportingDocumentBase64: string | undefined;

      if (values.supporting_document) {
        supportingDocumentBase64 = await fileToDataURL(
          values.supporting_document,
        );
      }

      const payload: UpdateStatusRequest = {
        token_id: tokenId,
        new_status: values.new_status,
        reason: values.reason,
        effective_date: values.effective_date,
        supporting_document: supportingDocumentBase64,
      };

      await updateStatus(tokenId, payload);
      if (onUpdate) onUpdate();
      showToast({
        title: "Success",
        message: `Status updated to "${values.new_status}" successfully.`,
        variant: "success",
      });

      reset();
      onClose();
    } catch (error: any) {
      showToast({
        title: "Error",
        message:
          error?.response?.data?.error_description ||
          "Failed to update status. Please try again.",
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
      title="Update Asset Status"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Grid: 2 columns for status and date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* New status */}
          <Controller
            control={control}
            name="new_status"
            rules={{ required: "New status is required" }}
            render={({ field }) => (
              <Select
                label="New asset status"
                required
                value={field.value}
                onChange={field.onChange}
                error={errors.new_status?.message}
                placeholder="Select new status"
                displayLabel={(value) =>
                  ASSET_CONDITION_LABELS[
                    value as keyof typeof ASSET_CONDITION_LABELS
                  ]
                }
              >
                {Object.entries(ASSET_CONDITION_LABELS)
                  .filter(([status]) => status !== currentStatus)
                  .map(([status, label]) => (
                    <SelectItem key={status} value={status}>
                      {label}
                    </SelectItem>
                  ))}
              </Select>
            )}
          />

          {/* Effective date */}
          <Controller
            control={control}
            name="effective_date"
            rules={{ required: "Effective date is required" }}
            render={({ field }) => (
              <DatePicker
                required
                label="Effective date"
                value={field.value}
                onChange={field.onChange}
                error={errors.effective_date?.message}
              />
            )}
          />
        </div>

        {/* Reason (full row) */}
        <div className="sm:col-span-2">
          <Input
            label="Reason for status change"
            required
            multiline
            rows={6}
            placeholder="Explain why the asset status is changing"
            error={errors.reason?.message}
            {...register("reason", {
              required: "Reason is required",
            })}
          />
        </div>

        {/* Supporting document (full row) */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Supporting document <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="supporting_document"
            rules={{ required: "Supporting document is required" }}
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                maxSize={10}
                accept="application/pdf"
              />
            )}
          />
          {errors.supporting_document && (
            <p className="text-xs text-red-600">
              {errors.supporting_document.message}
            </p>
          )}
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
            {loading || isSubmitting ? "Updating status..." : "Update status"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
