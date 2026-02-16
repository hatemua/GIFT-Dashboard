"use client";

import { useForm, Controller } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { UpdateCustodyRequest } from "@/types/asset";
import { useAsset } from "@/hooks/useAsset";
import { fileToBase64 } from "@/lib/utils";
import { CUSTODY_PARTY_TYPES, CUSTODY_ARRANGEMENTS } from "@/constants/assets";
import { useToast } from "@/providers/toast-provider";
import { useDocument } from "@/hooks/useDocument";

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
  const { showToast } = useToast();
  const { loadingAction, updateCustody } = useAsset();
  const { uploadDocument } = useDocument();

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
    try {
      if (!values.custody_agreement_ref) {
        throw new Error("Custody agreement is required");
      }

      // Convert file to base64 and upload
      const base64File = await fileToBase64(values.custody_agreement_ref);
      const document_id = `CA-${crypto.randomUUID()}`;

      await uploadDocument({
        document_id,
        document_type: "agreement",
        document_url: "https://url_of_the_document",
        document_base64: base64File,
      });

      // Build payload with document_id
      const payload: UpdateCustodyRequest = {
        token_id: tokenId,
        custody_party_type: values.custody_party_type,
        custody_party_id: values.custody_party_id,
        vault_site_id: values.vault_site_id,
        vault_id: values.vault_id,
        custody_type: values.custody_type,
        custody_agreement_ref: document_id,
      };

      await updateCustody(tokenId, payload);

      showToast({
        title: "Success",
        message: "Custody updated successfully",
        variant: "success",
      });

      reset();
      onClose();
    } catch (error: any) {
      console.error("Error updating custody:", error);
      showToast({
        title: "Error",
        message:
          error?.response?.data?.error_description ||
          error?.message ||
          "Failed to update custody. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="lg"
      title="Update Custody"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Custody party type */}
          <Controller
            control={control}
            name="custody_party_type"
            rules={{ required: "Custody party type is required" }}
            render={({ field }) => (
              <Select
                label="Custody Party Type"
                required
                value={field.value}
                onChange={field.onChange}
                error={errors.custody_party_type?.message}
                placeholder="Select custody party type"
                displayLabel={(value) =>
                  CUSTODY_PARTY_TYPES.find((item) => item.value === value)
                    ?.label || ""
                }
              >
                {CUSTODY_PARTY_TYPES.map(({ value, label, description }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">
                        {description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
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

          {/* Custody type / arrangement */}
          <Controller
            control={control}
            name="custody_type"
            rules={{ required: "Custody type is required" }}
            render={({ field }) => (
              <Select
                label="Custody Type"
                required
                value={field.value}
                onChange={field.onChange}
                error={errors.custody_type?.message}
                placeholder="Select custody type"
                displayLabel={(value) =>
                  CUSTODY_ARRANGEMENTS.find((item) => item.value === value)
                    ?.label || ""
                }
              >
                {CUSTODY_ARRANGEMENTS.map(({ value, label, description }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">
                        {description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>

        {/* Custody agreement reference */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Custody Agreement Document <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="custody_agreement_ref"
            rules={{ required: "Custody agreement document is required" }}
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={(file: File | null) => field.onChange(file)}
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
            disabled={loadingAction}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="gold"
            disabled={loadingAction || isSubmitting}
          >
            {loadingAction || isSubmitting ? "Updating..." : "Update Custody"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
