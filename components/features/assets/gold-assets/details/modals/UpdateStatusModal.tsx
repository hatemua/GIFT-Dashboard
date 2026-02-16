"use client";

import { useForm, Controller } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import {
  UpdateStatusRequest,
  AssetStatus,
} from "@/types/asset";
import { useAsset } from "@/hooks/useAsset";
import { ASSET_STATUS_LABELS } from "@/constants/assets";
import { fileToBase64 } from "@/lib/utils";

interface UpdateStatusFormValues {
  new_status?: AssetStatus;
  reason: string;
  effective_date: string;
  supporting_document?: File;
}

interface UpdateAssetStatusModalProps {
  tokenId: string;
  currentStatus: AssetStatus;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateAssetStatusModal = ({
  tokenId,
  currentStatus,
  isOpen,
  onClose,
}: UpdateAssetStatusModalProps) => {
  const { loading, updateStatus } = useAsset();

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

  /* ---------------- Submit ---------------- */
  const submitHandler = async (values: UpdateStatusFormValues) => {
    if (!values.new_status) return;

    let supportingDocumentBase64: string | undefined;

    if (values.supporting_document) {
      supportingDocumentBase64 = await fileToBase64(
        values.supporting_document
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

    reset();
    onClose();
  };

  const isDisabled = loading || isSubmitting;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="md"
      title="Update Asset Status"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
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
                ASSET_STATUS_LABELS[value as AssetStatus]
              }
            >
              {Object.entries(ASSET_STATUS_LABELS)
                .filter(([status]) => status !== currentStatus)
                .map(([status, label]) => (
                  <SelectItem key={status} value={status}>
                    {label}
                  </SelectItem>
                ))}
            </Select>
          )}
        />

        {/* Reason */}
        <Input
          label="Reason for status change"
          required
          placeholder="Explain why the asset status is changing"
          error={errors.reason?.message}
          {...register("reason", {
            required: "Reason is required",
            minLength: {
              value: 10,
              message: "Reason must be at least 10 characters",
            },
          })}
        />

        {/* Effective date */}
        <Input
          type="date"
          label="Effective date"
          required
          error={errors.effective_date?.message}
          {...register("effective_date", {
            required: "Effective date is required",
          })}
        />

        {/* Supporting document */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Supporting document (optional)
          </label>

          <Controller
            control={control}
            name="supporting_document"
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                maxSize={10}
                accept="application/pdf"
              />
            )}
          />
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
