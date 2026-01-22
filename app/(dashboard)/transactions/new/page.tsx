"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { Select, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useTransaction } from "@/hooks/useTransaction";
import { Transaction } from "@/types/transaction";
import { useToast } from "@/providers/toast-provider";

export default function NewTransactionPage() {
  const { createTransaction, loading, error } = useTransaction();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: {
      transaction_reference: "",
      transaction_type: "",
      counterparty_gic: "",
      requested_assets: [],
      valuation_date: "",
      valuation_currency: "",
      transaction_value: null,
    },
  });

  const onSubmit = async (data: Transaction) => {
    try {
      await createTransaction(data);
      showToast({
        title: "Success",
        message: "Transaction created successfully",
        variant: "success",
      });
      reset();
    } catch (err: any) {
      showToast({
        title: "Error",
        message: err.message,
        variant: "error",
      });
    }
  };

  const selectedAssets = watch("requested_assets");

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                Transaction Reference
              </label>
              <Input
                {...register("transaction_reference", { required: true })}
                placeholder="PO-2025-8901"
              />
              {errors.transaction_reference && (
                <p className="text-red-500 text-sm">
                  Transaction reference is required
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Transaction Type</label>
              <Controller
                control={control}
                name="transaction_type"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select transaction type"
                  >
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  </Select>
                )}
              />
              {errors.transaction_type && (
                <p className="text-red-500 text-sm">
                  Transaction type is required
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Counterparty GIC</label>
              <Input
                {...register("counterparty_gic", { required: true })}
                placeholder="GIC-2025-0002"
              />
              {errors.counterparty_gic && (
                <p className="text-red-500 text-sm">
                  Counterparty GIC is required
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Requested Assets */}
        <Card>
          <CardHeader>
            <CardTitle>Requested Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Assets</label>
              <Controller
                control={control}
                name="requested_assets"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    multiple
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Choose one or more assets"
                  >
                    <SelectItem value="asset-2024-001">
                      asset-2024-001
                    </SelectItem>
                    <SelectItem value="asset-2024-002">
                      asset-2024-002
                    </SelectItem>
                    <SelectItem value="asset-2024-003">
                      asset-2024-003
                    </SelectItem>
                  </Select>
                )}
              />
              {errors.requested_assets && (
                <p className="text-red-500 text-sm">
                  Select at least one asset
                </p>
              )}
              {selectedAssets?.length > 0 && (
                <p className="mt-1 text-sm text-slate-500">
                  Selected: {selectedAssets.join(", ")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Valuation */}
        <Card>
          <CardHeader>
            <CardTitle>Valuation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Valuation Date</label>
              <Controller
                control={control}
                name="valuation_date"
                rules={{ required: true }}
                render={({ field }) => <DatePicker {...field} />}
              />
              {errors.valuation_date && (
                <p className="text-red-500 text-sm">
                  Valuation date is required
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Currency</label>
              <Controller
                control={control}
                name="valuation_currency"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select currency"
                  >
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Transaction Value
              </label>
              <Input
                type="number"
                {...register("transaction_value", {
                  required: true,
                  min: 1,
                  valueAsNumber: true,
                })}
                placeholder="Enter amount"
              />
              {errors.transaction_value && (
                <p className="text-red-500 text-sm">
                  Enter a valid transaction value
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" variant="gold">
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create Transaction"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
