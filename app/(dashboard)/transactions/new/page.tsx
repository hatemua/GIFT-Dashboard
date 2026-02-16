"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { TransactionType } from "@/types/transaction";
import { useTransaction } from "@/hooks/useTransaction";
import { useToast } from "@/providers/toast-provider";
import { TransactionDetailsForm } from "@/components/features/transactions/new/TransactionDetailsForm";
import { TransactionAssetsForm } from "@/components/features/transactions/new/TransactionAssetsForm";
import { useAsset } from "@/hooks/useAsset";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { UpdateStatusRequest } from "@/types/asset";

export interface CreateTransactionFormValues {
  transaction_reference: string;
  transaction_type: TransactionType;
  counterparty_gic: string;
  initiator_gic: string;
  requested_assets: string[];
  valuation_date: string;
  valuation_currency: string;
  transaction_value: number;
  reciever_igan: string;
  sender_igan: string;
  initiator_signature: string;
  counterparty_signature: string;
}

export default function NewTransactionPage() {
  const { createTransaction, signTransaction, signing, loading } =
    useTransaction();
  const { showToast } = useToast();
  const { updateStatus, setFilters, resetFilters } = useAsset();

  const methods = useForm<CreateTransactionFormValues>({
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
      reciever_igan: "",
      sender_igan: "",
      initiator_signature: "",
      counterparty_signature: "",
    },
  });

  const { handleSubmit, reset } = methods;

  /* ---------------- Final Submit ---------------- */

  const onSubmit = async (data: CreateTransactionFormValues) => {
    try {
      const requestedAssets = data.requested_assets;
      const { counterparty_signature, ...transactionData } = data;

      const res = await createTransaction(transactionData);

      const transactionRef = res?.transaction_reference;
      if (!transactionRef) {
        throw new Error("Transaction reference not returned from server");
      }
      if (requestedAssets && requestedAssets.length > 0) {
        await Promise.all(
          requestedAssets.map(async (tokenId) => {
            const payload: UpdateStatusRequest = {
              token_id: tokenId,
              new_status: "in_transit",
              reason: "some reason",
              effective_date: new Date().toISOString(),
              supporting_document: undefined,
            };

            await updateStatus(tokenId, payload);
          }),
        );
      }
      await signTransaction(
        transactionRef,
        counterparty_signature,
        "counterparty",
      );
      showToast({
        title: "Transaction Created",
        message: "Your transaction has been successfully submitted",
        variant: "success",
      });

      reset();
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
    return () => resetFilters();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="mb-2">
              <h2 className="text-lg font-semibold">
                Step 1: Transaction Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Provide the main details of your transaction
              </p>
            </div>
            <TransactionDetailsForm />
          </div>

          {/* Step 2 */}
          <div>
            <div className="mb-2">
              <h2 className="text-lg font-semibold">Step 2: Select Assets</h2>
              <p className="text-sm text-gray-500 mt-1">
                Choose the assets you want to include in this transaction
              </p>
            </div>
            <TransactionAssetsForm />
          </div>

          <div className="sticky bottom-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p className="font-medium">
                  Review all information before submission
                </p>
                <p className="text-xs mt-1">
                  All fields marked with * are required
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 px-6"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Submit Transaction
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </DashboardShell>
  );
}
