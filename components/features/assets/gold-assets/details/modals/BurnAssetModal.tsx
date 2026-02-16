"use client";

import { useForm, Controller } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useAsset } from "@/hooks/useAsset";
import { fileToBase64 } from "@/lib/utils";

interface BurnAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenId: string;
}

interface BurnAssetFormValues {
  burn_reason: string;
  authorized_by: string;
  justification_document: File | null;
  irreversible: boolean;
}

export const BurnAssetModal = ({
  isOpen,
  onClose,
  tokenId,
}: BurnAssetModalProps) => {
  const { loading, burnAsset } = useAsset();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BurnAssetFormValues>({
    defaultValues: {
      burn_reason: "",
      authorized_by: "",
      justification_document: null,
      irreversible: false,
    },
  });

  const irreversible = watch("irreversible");

  /* ---------------- Submit ---------------- */
  const submitHandler = async (values: BurnAssetFormValues) => {
    if (!values.justification_document) return;

    const base64 = await fileToBase64(values.justification_document);

    await burnAsset(tokenId, {
      token_id: tokenId,
      burn_reason: values.burn_reason,
      authorized_by: values.authorized_by,
      justification_document: base64,
      irreversible: values.irreversible,
    });

    reset();
    onClose();
  };

  const isDisabled = loading || isSubmitting || !irreversible;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="md"
      title="Burn Asset"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Burn reason */}
        <Input
          label="Burn reason"
          required
          multiline={true}
          rows={6}
          placeholder="Explain why this asset must be burned"
          error={errors.burn_reason?.message}
          {...register("burn_reason", {
            required: "Burn reason is required",
            minLength: {
              value: 10,
              message: "Burn reason must be at least 10 characters",
            },
          })}
        />

        {/* Authorized by */}
        <Input
          label="Authorized by"
          required
          placeholder="Name of authorizing officer"
          error={errors.authorized_by?.message}
          {...register("authorized_by", {
            required: "Authorizing officer is required",
          })}
        />

        {/* Justification document */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Justification document <span className="text-red-500">*</span>
          </label>

          <Controller
            control={control}
            name="justification_document"
            rules={{
              required: "Justification document is required",
            }}
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                maxSize={10}
                accept="application/pdf"
              />
            )}
          />

          {errors.justification_document && (
            <p className="text-xs text-red-600">
              {errors.justification_document.message}
            </p>
          )}
        </div>

        {/* Irreversible confirmation */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            {...register("irreversible", {
              required: "You must confirm this action is irreversible",
            })}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
          />
          <span className="text-sm text-slate-700">
            I confirm that this burn operation is legally authorized and
            irreversible.
          </span>
        </label>

        {errors.irreversible && (
          <p className="text-xs text-red-600">{errors.irreversible.message}</p>
        )}

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

          <Button type="submit" variant="destructive" disabled={isDisabled}>
            {loading || isSubmitting ? "Burning asset..." : "Burn asset"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
