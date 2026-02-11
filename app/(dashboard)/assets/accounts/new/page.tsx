"use client";

import { useForm, Controller } from "react-hook-form";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

import { useToast } from "@/providers/toast-provider";
import { useGoldAccount } from "@/hooks/useGoldAccount";
import { CreateGoldAccountPayload } from "@/types/goldAccount";
import { GOLD_ACCOUNT_PURPOSES } from "@/constants/goldAccount";

export default function NewGoldAccountPage() {
  const { showToast } = useToast();
  const { loading, createAccount } = useGoldAccount();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateGoldAccountPayload>({
    defaultValues: { gold_account_purpose: "trading" },
  });

  const onSubmit = async (data: CreateGoldAccountPayload) => {
    try {
      await createAccount({
        ...data,
        initial_deposit: data.initial_deposit
          ? Number(data.initial_deposit)
          : undefined,
      });

      showToast({
        title: "Success",
        message: "Gold account created successfully",
        variant: "success",
      });

      reset();
    } catch (err: any) {
      showToast({
        title: "Error",
        message: err?.message || "Failed to create gold account",
        variant: "error",
      });
    }
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Create Account"
        description="Create a new gold account for holding gold assets"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Gold Accounts", href: "/assets/accounts" },
          { label: "New" },
        ]}
        className="mb-4"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border border-amber-100 shadow-sm rounded-lg">
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Member GIC */}
              <div className="space-y-1.5">
                <Input
                  required
                  label="Member GIC"
                  placeholder="GIC-2025-0001"
                  error={errors.member_gic?.message}
                  className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100"
                  {...register("member_gic", {
                    required: "Member GIC is required",
                  })}
                />
              </div>

              {/* IGAN */}
              <div className="space-y-1.5">
                <Input
                  required
                  label="IGAN"
                  placeholder="IGAN-2025-12345"
                  error={errors.igan?.message}
                  className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100"
                  {...register("igan", {
                    required: "IGAN is required",
                  })}
                />
              </div>

              {/* Vault ID */}
              <div className="space-y-1.5">
                <Input
                  required
                  label="Vault ID"
                  placeholder="VAULT-001"
                  error={errors.vault_id?.message}
                  className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100"
                  {...register("vault_id", {
                    required: "Vault ID is required",
                  })}
                />
              </div>

              {/* Guarantee Deposit Account */}
              <div className="space-y-1.5">
                <Input
                  required
                  label="Guarantee Deposit Account"
                  placeholder="GDA-2025-00001"
                  error={errors.guarantee_deposit_account?.message}
                  className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100"
                  {...register("guarantee_deposit_account", {
                    required: "Guarantee Deposit Account is required",
                  })}
                />
              </div>

              {/* Account Purpose */}
              <div className="space-y-1.5">
                <Controller
                  control={control}
                  name="gold_account_purpose"
                  rules={{ required: "Account purpose is required" }}
                  render={({ field }) => (
                    <Select
                      label="Account Purpose"
                      required={true}
                      error={errors.gold_account_purpose?.message}
                      className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100"
                      {...field}
                      displayLabel={(val) =>
                        GOLD_ACCOUNT_PURPOSES.find((t) => t.value === val)
                          ?.label || val
                      }
                    >
                      {GOLD_ACCOUNT_PURPOSES.map((purpose) => (
                        <SelectItem key={purpose.value} value={purpose.value}>
                          {purpose.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>

              {/* Initial Deposit */}
              <div className="space-y-1.5">
                <Input
                  label="Initial Deposit"
                  type="number"
                  placeholder="0.00"
                  prefix="$"
                  error={errors.initial_deposit?.message}
                  className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100 pl-8"
                  {...register("initial_deposit", {
                    min: {
                      value: 0,
                      message: "Initial deposit cannot be negative",
                    },
                  })}
                />
              </div>

              {/* Certificate Absence Reason */}
              <div className="space-y-1.5 md:col-span-2">
                <Input
                  required
                  label="Certificate Absence Reason"
                  error={errors.certificate_absence_reason?.message}
                  placeholder="Regulatory exemption, Document in process, etc."
                  className="h-11 rounded-md border-gray-200 focus:border-amber-500 focus:ring-amber-100"
                  {...register("certificate_absence_reason", {
                    required: "Certificate Absence Reason is required",
                  })}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span className="text-red-500">*</span>
                <span>Required field</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-md px-4 py-2 h-9 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-sm transition-colors"
                  onClick={() => reset()}
                  disabled={isSubmitting || loading}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  variant="gold"
                  className="px-5 py-2 h-9 rounded-md font-medium transition-all text-sm"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </DashboardShell>
  );
}
