"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FileText,
  DollarSign,
  Hash,
  Building2,
  Plus,
} from "lucide-react";
import { Select, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/types/transaction";
import { useToast } from "@/providers/toast-provider";
import MultiSelectAssets from "@/components/features/common/MultiSelectAssets";
import { StepperWizard } from "@/components/ui/stepper";

export default function NewTransactionPage() {
  const { createTransaction, loading } = useTransaction();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [selectedAssets, setSelectedAssets] = useState<
    Transaction["requested_assets"]
  >([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Transaction>({
    mode: "onChange",
  });

  /* ---------------- Step navigation ---------------- */

  const handleNextStep = () => {
    const values = getValues();

    if (
      !values.transaction_reference ||
      !values.transaction_type ||
      !values.counterparty_gic ||
      !values.valuation_date ||
      !values.transaction_value
    ) {
      showToast({
        title: "Incomplete Form",
        message: "Please fill all required fields before proceeding",
        variant: "error",
      });
      return;
    }

    setStep(2);
  };

  const handlePreviousStep = () => setStep(1);

  const onSubmit = async (data: Transaction) => {
    if (selectedAssets.length === 0) {
      showToast({
        title: "No Assets Selected",
        message: "Please select at least one asset",
        variant: "error",
      });
      return;
    }

    try {
      await createTransaction({
        ...data,
        requested_assets: selectedAssets,
      });

      showToast({
        title: "Transaction Created",
        message: "Your transaction has been successfully submitted",
        variant: "success",
      });

      reset();
      setSelectedAssets([]);
      setStep(1);
    } catch (err: any) {
      showToast({
        title: "Creation Failed",
        message:
          err?.message ?? "Unable to create transaction. Please try again.",
        variant: "error",
      });
    }
  };

  /* ---------------- Render ---------------- */

  return (
    <DashboardShell>
      <PageHeader
        title="New Transaction"
        description="Create and submit a new asset transaction"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transactions", href: "/transactions/orders" },
          { label: "New" },
        ]}
      />

      <Card className="p-6 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepperWizard
            currentStep={step}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={loading}
            variant="compact"
            steps={[
              {
                title: "Details",
                subtitle: "Transaction info",
                content: (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Transaction Details */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Transaction Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <Input
                          {...register("transaction_reference", {
                            required: true,
                          })}
                          label="Transaction Reference"
                          icon={<Hash className="h-4 w-4" />}
                          error={errors.transaction_reference && "Required"}
                        />

                        <Controller
                          control={control}
                          name="transaction_type"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              label="Transaction Type"
                              placeholder="Select type"
                              error={errors.transaction_type && "Required"}
                            >
                              <SelectItem value="transfer">
                                Transfer
                              </SelectItem>
                              <SelectItem value="sale">Sale</SelectItem>
                              <SelectItem value="purchase">
                                Purchase
                              </SelectItem>
                            </Select>
                          )}
                        />

                        <Input
                          {...register("counterparty_gic", {
                            required: true,
                          })}
                          label="Counterparty GIC"
                          icon={<Building2 className="h-4 w-4" />}
                          error={errors.counterparty_gic && "Required"}
                        />
                      </CardContent>
                    </Card>

                    {/* Valuation */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Valuation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <Controller
                          control={control}
                          name="valuation_date"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              label="Valuation Date"
                              error={
                                errors.valuation_date && "Required"
                              }
                            />
                          )}
                        />

                        <Input
                          type="number"
                          {...register("transaction_value", {
                            required: true,
                          })}
                          label="Transaction Value"
                          icon={<DollarSign className="h-4 w-4" />}
                          error={errors.transaction_value && "Required"}
                        />
                      </CardContent>
                    </Card>
                  </div>
                ),
              },
              {
                title: "Assets",
                subtitle: "Select instruments",
                content: (
                  <Card>
                    <CardHeader className="flex items-center justify-between">
                      <CardTitle>Requested Assets</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        Selected: {selectedAssets.length}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <MultiSelectAssets
                      />
                    </CardContent>
                  </Card>
                ),
              },
            ]}
          />
        </form>
      </Card>
    </DashboardShell>
  );
}
