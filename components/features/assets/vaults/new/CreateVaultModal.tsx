"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/providers/toast-provider";
import { CreateVaultPayload } from "@/types/vault";
import { useVault } from "@/hooks/useVault";
import { useVaultSite } from "@/hooks/useVaultSite";
import { VAULT_STATUSES } from "@/constants/vault";
import { DatePicker } from "@/components/ui/date-picker";

export default function CreateVaultModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { vaultSiteDetails } = useVaultSite();

  const { showToast } = useToast();
  const { createVault, fetchVaultsByVaultSiteId } = useVault();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateVaultPayload>({
    defaultValues: {
      vault_site_id: vaultSiteDetails?.vault_site_id,
      vault_id: undefined,
      member_internal_vault_id: "",
      vault_dimensions: "",
      vault_gold_capacity_kg: 0,
      vault_status: "UNUSED",
      last_audit_date: "",
    },
  });

  const onSubmit = async (data: CreateVaultPayload) => {
    try {
      await createVault({
        ...data,
        vault_gold_capacity_kg: Number(data.vault_gold_capacity_kg),
      });
      if (vaultSiteDetails?.vault_site_id)
        await fetchVaultsByVaultSiteId(vaultSiteDetails?.vault_site_id);

      showToast({
        title: "Success",
        message: "Vault created successfully!",
        variant: "success",
      });

      reset();
      onClose();
    } catch (err: any) {
      showToast({
        title: "Error",
        message:
          err?.response?.data?.error_description ||
          err?.message ||
          "Failed to create vault",
        variant: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Vault" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="vault_id"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Vault ID"
                placeholder="VAULT-001"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="member_internal_vault_id"
            control={control}
            rules={{
              required: "Member internal vault ID is required",
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Member Internal Vault ID"
                placeholder="INT-VAULT-001"
                error={fieldState.error?.message}
                required
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="vault_dimensions"
            control={control}
            rules={{
              required: "Vault dimensions are required",
              pattern: {
                value: /^\d{1,3}-\d{1,3}-\d{1,3}$/,
                message: "Format must be width-depth-height (e.g., 40-50-60)",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Vault Dimensions (cm)"
                placeholder="40-50-60"
                error={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="vault_gold_capacity_kg"
            rules={{
              required: "Gold capacity is required",
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min={0}
                label="Gold Capacity (kg)"
                placeholder="1000"
                error={errors.vault_gold_capacity_kg?.message}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value),
                  )
                }
                className="bg-gray-50/50"
                required
              />
            )}
          />

          <Controller
            name="vault_status"
            control={control}
            render={({ field }) => (
              <Select
                required
                label="Vault Status"
                value={field.value}
                onChange={field.onChange}
                displayLabel={(val) =>
                  VAULT_STATUSES.find((s) => s.value === val)?.label || val
                }
              >
                {VAULT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="last_audit_date"
            rules={{ required: "Last audit date is required" }}
            render={({ field }) => (
              <DatePicker
                required
                label="Last Audit Date"
                value={field.value}
                onChange={field.onChange}
                error={errors.last_audit_date?.message}
              />
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gold-300 text-gold-700 hover:bg-gold-50"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-gold-400 to-gold-600 text-white hover:from-gold-500 hover:to-gold-700"
          >
            {isSubmitting ? "Creating..." : "Create Vault"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
