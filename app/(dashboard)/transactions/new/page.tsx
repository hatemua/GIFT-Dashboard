"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { StepperWizard } from "@/components/ui/stepper";
import { CreateTransactionInput } from "@/types/transaction";
import { useTransaction } from "@/hooks/useTransaction";
import { useToast } from "@/providers/toast-provider";
import { TransactionDetailsForm } from "@/components/features/transactions/new/TransactionDetailsForm";
import { TransactionAssetsForm } from "@/components/features/transactions/new/TransactionAssetsForm";
import { useAsset } from "@/hooks/useAsset";

export default function NewTransactionPage() {
  const { createTransaction, loading } = useTransaction();
  const { showToast } = useToast();
  const { setFilters, resetFilters } = useAsset();
  const [step, setStep] = useState(1);

  const methods = useForm<CreateTransactionInput>({
    mode: "onChange",
    defaultValues: {
      transaction_reference: "",
      transaction_type: undefined,
      counterparty_gic: "",
      initiator_gic: "",
      valuation_date: undefined,
      transaction_value: 0,
      valuation_currency: "",
      requested_assets: [],
    },
  });

  const { handleSubmit, reset } = methods;

  /* ---------------- Step navigation ---------------- */

  const handleNextStep = async () => {
    if (step === 1) {
      // Only validate step 1 fields
      const valid = await methods.trigger([
        "transaction_reference",
        "transaction_type",
        "counterparty_gic",
        "initiator_gic",
        "valuation_date",
        "transaction_value",
        "valuation_currency",
      ]);

      if (!valid) return;

      setStep(2);
    }
  };

  const handlePreviousStep = () => setStep(1);

  /* ---------------- Final Submit ---------------- */

  const onSubmit = async (data: CreateTransactionInput) => {
    if (!data.requested_assets || data.requested_assets.length === 0) {
      showToast({
        title: "No Assets Selected",
        message: "Please select at least one asset",
        variant: "error",
      });
      return;
    }

    try {
      await createTransaction(data);

      showToast({
        title: "Transaction Created",
        message: "Your transaction has been successfully submitted",
        variant: "success",
      });

      reset();
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

  useEffect(() => {
    setFilters({ status: "stationary" });

    return () => {
      resetFilters();
    };
  }, []);

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

      <FormProvider {...methods}>
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
              content: <TransactionDetailsForm />,
            },
            {
              title: "Assets",
              subtitle: "Select instruments",
              content: <TransactionAssetsForm />,
            },
          ]}
        />
      </FormProvider>
    </DashboardShell>
  );
}
