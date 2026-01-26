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
  const { createTransaction, loading } = useTransaction();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
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
        message: err?.message ?? "Something went wrong",
        variant: "error",
      });
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-6xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Details */}
          <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">
                Transaction Details
              </CardTitle>
              <p className="text-sm text-slate-500">
                Basic information about the transaction
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                {...register("transaction_reference", { required: true })}
                placeholder="PO-2025-8901"
                label="Transaction Reference"
                error={
                  errors.transaction_reference
                    ? "Transaction reference is required"
                    : ""
                }
                className="mt-1"
              />

              <Controller
                control={control}
                name="transaction_type"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select transaction type"
                    label="Transaction Type"
                    error={
                      errors.transaction_type
                        ? "Transaction type is required"
                        : ""
                    }
                  >
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  </Select>
                )}
              />
              <Input
                {...register("counterparty_gic", { required: true })}
                placeholder="GIC-2025-0002"
                label="Counterparty GIC"
                error={
                  errors.counterparty_gic ? "Counterparty GIC is required" : ""
                }
                className="mt-1"
              />
            </CardContent>
          </Card>

          {/* Valuation */}
          <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">
                Valuation
              </CardTitle>
              <p className="text-sm text-slate-500">
                Financial details of the transaction
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Controller
                control={control}
                name="valuation_date"
                rules={{ required: "Valuation date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Valuation Date"
                    placeholder="Select valuation date"
                    error={errors.valuation_date?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="valuation_currency"
                render={({ field }) => (
                  <Select
                    label="Currency"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select currency"
                    error={
                      errors.valuation_currency
                        ? "Valuation currency is required"
                        : ""
                    }
                  >
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                  </Select>
                )}
              />

              <Input
                type="number"
                {...register("transaction_value", {
                  required: true,
                  min: 1,
                  valueAsNumber: true,
                })}
                placeholder="Enter amount"
                label="Transaction Value"
                error={
                  errors.transaction_value
                    ? "Enter a valid transaction value"
                    : ""
                }
                className="mt-1"
              />
            </CardContent>
          </Card>
        </div>

        {/* Requested Assets */}
        <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Requested Assets
            </CardTitle>
            <p className="text-sm text-slate-500">
              Select one or more assets involved in this transaction
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Controller
              control={control}
              name="requested_assets"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  multiple
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Choose assets"
                  error={
                    errors.requested_assets ? "Select at least one asset" : ""
                  }
                >
                  <SelectItem value="asset-2024-001">asset-2024-001</SelectItem>
                  <SelectItem value="asset-2024-002">asset-2024-002</SelectItem>
                  <SelectItem value="asset-2024-003">asset-2024-003</SelectItem>
                </Select>
              )}
            />
          </CardContent>
        </Card>

        {/* Sticky Footer */}
        <div className="bottom-0 pt-2 flex justify-end">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={loading}
            className="min-w-[220px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Creating transaction…" : "Create Transaction"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
