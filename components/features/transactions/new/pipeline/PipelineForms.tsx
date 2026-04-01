"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { TRANSFER_REASONS, CUSTODY_ARRANGEMENTS } from "@/constants/assets";

/* ------------------------------------------------------------------ */
/*  LSP Custody Form                                                    */
/* ------------------------------------------------------------------ */

export interface LspFormValues {
  lsp_id: string;
  custody_type: string;
  custody_agreement_ref: File | null;
}

export function LspCustodyForm({ onSubmit }: { onSubmit: (data: LspFormValues) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm<LspFormValues>({
    defaultValues: { lsp_id: "", custody_type: "", custody_agreement_ref: null },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Provide the logistics service provider details for custody during transit.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="lsp_id"
          control={control}
          rules={{ required: "LSP ID is required" }}
          render={({ field }) => (
            <Input {...field} required label="LSP ID" placeholder="Logistics service provider ID" error={errors.lsp_id?.message} />
          )}
        />
        <Controller
          name="custody_type"
          control={control}
          rules={{ required: "Custody type is required" }}
          render={({ field }) => (
            <Select {...field} required label="Custody Type" placeholder="Select type" error={errors.custody_type?.message}
              displayLabel={(v) => CUSTODY_ARRANGEMENTS.find((a) => a.value === v)?.label ?? ""}
            >
              {CUSTODY_ARRANGEMENTS.map(({ value, label, description }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{label}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Custody Agreement Document <span className="text-red-500">*</span>
        </label>
        <Controller
          name="custody_agreement_ref"
          control={control}
          rules={{ required: "Custody agreement document is required" }}
          render={({ field }) => (
            <FileUpload value={field.value} onChange={(file: File | null) => field.onChange(file)} maxSize={10} accept="application/pdf" />
          )}
        />
        {errors.custody_agreement_ref && (
          <p className="text-xs text-red-600">{errors.custody_agreement_ref.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="gold">Execute Step</Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Counterparty Custody Form                                           */
/* ------------------------------------------------------------------ */

export interface CounterpartyCustodyFormValues {
  custody_party_id: string;
  vault_site_id: string;
  vault_id: string;
  custody_type: string;
  custody_agreement_ref: File | null;
}

export function CounterpartyCustodyForm({ onSubmit }: { onSubmit: (data: CounterpartyCustodyFormValues) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm<CounterpartyCustodyFormValues>({
    defaultValues: { custody_party_id: "", vault_site_id: "", vault_id: "", custody_type: "", custody_agreement_ref: null },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Provide the counterparty custody and vault details.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller name="custody_party_id" control={control} rules={{ required: "Custody party ID is required" }}
          render={({ field }) => <Input {...field} required label="Custody Party ID" placeholder="Counterparty custody ID" error={errors.custody_party_id?.message} />}
        />
        <Controller name="custody_type" control={control} rules={{ required: "Custody type is required" }}
          render={({ field }) => (
            <Select {...field} required label="Custody Type" placeholder="Select type" error={errors.custody_type?.message}
              displayLabel={(v) => CUSTODY_ARRANGEMENTS.find((a) => a.value === v)?.label ?? ""}
            >
              {CUSTODY_ARRANGEMENTS.map(({ value, label, description }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{label}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller name="vault_site_id" control={control} rules={{ required: "Vault site ID is required" }}
          render={({ field }) => <Input {...field} required label="Vault Site ID" placeholder="Vault site identifier" error={errors.vault_site_id?.message} />}
        />
        <Controller name="vault_id" control={control} rules={{ required: "Vault ID is required" }}
          render={({ field }) => <Input {...field} required label="Vault ID" placeholder="Vault identifier" error={errors.vault_id?.message} />}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Custody Agreement Document <span className="text-red-500">*</span>
        </label>
        <Controller
          name="custody_agreement_ref"
          control={control}
          rules={{ required: "Custody agreement document is required" }}
          render={({ field }) => (
            <FileUpload value={field.value} onChange={(file: File | null) => field.onChange(file)} maxSize={10} accept="application/pdf" />
          )}
        />
        {errors.custody_agreement_ref && (
          <p className="text-xs text-red-600">{errors.custody_agreement_ref.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="gold">Execute Step</Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Transfer Form                                                       */
/* ------------------------------------------------------------------ */

export interface TransferFormValues {
  transfer_reason: string;
}

export function TransferForm({ onSubmit }: { onSubmit: (data: TransferFormValues) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm<TransferFormValues>({
    defaultValues: { transfer_reason: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select the reason for this asset transfer to complete the pipeline.
      </p>
      <Controller
        name="transfer_reason"
        control={control}
        rules={{ required: "Transfer reason is required" }}
        render={({ field }) => (
          <Select {...field} required label="Transfer Reason" placeholder="Select reason" error={errors.transfer_reason?.message}>
            {TRANSFER_REASONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </Select>
        )}
      />
      <div className="flex justify-end">
        <Button type="submit" variant="gold">Execute Transfer</Button>
      </div>
    </form>
  );
}
