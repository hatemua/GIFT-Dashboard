"use client";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/toast-provider";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionDetails } from "@/types/transaction";

interface SignTransactionModalProps {
  transaction: TransactionDetails;
  isOpen: boolean;
  onClose: () => void;
}

interface SignTransactionFormValues {
  signature: string;
}

export const SignTransactionModal = ({
  transaction,
  isOpen,
  onClose,
}: SignTransactionModalProps) => {
  const { showToast } = useToast();
  const { signTransaction, fetchTransactionByReference, signing } =
    useTransaction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignTransactionFormValues>({
    defaultValues: {
      signature: "",
    },
  });

  const submitHandler = async (values: SignTransactionFormValues) => {
    try {
      await signTransaction(
        transaction.transaction_reference,
        values.signature,
        "counterparty",
      );

      await fetchTransactionByReference(transaction.transaction_reference);

      showToast({
        title: "Success",
        message: "Transaction signed successfully!",
        variant: "success",
      });
      reset();
      onClose();
    } catch (error: any) {
      showToast({
        title: "Error",
        message:
          error?.response?.data?.error_description ||
          error?.message ||
          "Failed to sign transaction. Please try again.",
        variant: "error",
      });
    }
  };

  const isDisabled = signing || isSubmitting;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="sm"
      title="Sign Transaction"
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <Input
          label="Signature"
          placeholder="Enter counterparty signature"
          required
          error={errors.signature?.message}
          {...register("signature", { required: "Signature is required" })}
        />

        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              onClose();
            }}
            disabled={signing}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isDisabled}>
            {signing || isSubmitting ? "Signing..." : "Sign"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
