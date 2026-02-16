"use client";

import { useForm, Controller } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { UpdateCustodyRequest } from "@/types/asset";
import { useAsset } from "@/hooks/useAsset";
import { fileToBase64 } from "@/lib/utils";

interface UpdateCustodyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenId: string;
}

interface UpdateCustodyFormValues {
  custody_party_type: string;
  custody_party_id: string;
  vault_site_id: string;
  vault_id: string;
  custody_type: string;
  custody_agreement_ref: File | null;
}

export const UpdateCustodyModal = ({
  isOpen,
  onClose,
  tokenId,
}: UpdateCustodyModalProps) => {
  const { loading, updateCustody } = useAsset();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCustodyFormValues>({
    defaultValues: {
      custody_party_type: "",
      custody_party_id: "",
      vault_site_id: "",
      vault_id: "",
      custody_type: "",
      custody_agreement_ref: null,
    },
  });

  /* ---------------- Submit handler ---------------- */
  const submitHandler = async (values: UpdateCustodyFormValues) => {
    let base64File = "";
    if (values.custody_agreement_ref) {
      base64File = await fileToBase64(values.custody_agreement_ref);
    }

    const payload: UpdateCustodyRequest = {
      token_id: tokenId,
      custody_party_type: values.custody_party_type,
      custody_party_id: values.custody_party_id,
      vault_site_id: values.vault_site_id,
      vault_id: values.vault_id,
      custody_type: values.custody_type,
      custody_agreement_ref: base64File,
    };

    await updateCustody(tokenId, payload);

    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="md"
      title="Update Custody"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        {/* Custody party type */}
        <Input
          label="Custody Party Type"
          required
          placeholder="Type of custody party"
          error={errors.custody_party_type?.message}
          {...register("custody_party_type", {
            required: "Custody party type is required",
          })}
        />

        {/* Custody party ID */}
        <Input
          label="Custody Party ID"
          required
          placeholder="ID of custody party"
          error={errors.custody_party_id?.message}
          {...register("custody_party_id", {
            required: "Custody party ID is required",
          })}
        />

        {/* Vault site ID */}
        <Input
          label="Vault Site ID"
          required
          placeholder="Vault site identifier"
          error={errors.vault_site_id?.message}
          {...register("vault_site_id", {
            required: "Vault site ID is required",
          })}
        />

        {/* Vault ID */}
        <Input
          label="Vault ID"
          required
          placeholder="Vault identifier"
          error={errors.vault_id?.message}
          {...register("vault_id", {
            required: "Vault ID is required",
          })}
        />

        {/* Custody type */}
        <Input
          label="Custody Type"
          required
          placeholder="Type of custody"
          error={errors.custody_type?.message}
          {...register("custody_type", {
            required: "Custody type is required",
          })}
        />

        {/* Custody agreement reference */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Custody Agreement Reference
          </label>
          <Controller
            control={control}
            name="custody_agreement_ref"
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                maxSize={10}
                accept="application/pdf"
              />
            )}
          />
          {errors.custody_agreement_ref && (
            <p className="text-xs text-red-600">
              {errors.custody_agreement_ref.message}
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

          <Button
            type="submit"
            variant="destructive"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? "Updating..." : "Update Custody"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
