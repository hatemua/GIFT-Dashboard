"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/toast-provider";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionDetails } from "@/types/transaction";
import { generateAddress } from "@/lib/utils";

interface SignTransactionModalProps {
  transaction: TransactionDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const SignTransactionModal = ({
  transaction,
  isOpen,
  onClose,
}: SignTransactionModalProps) => {
  const { showToast } = useToast();
  const { signTransaction, fetchTransactionByReference, signing } =
    useTransaction();

  const submitHandler = async () => {
    try {
      const signature = generateAddress(transaction.parties.counterparty.gic);

      await signTransaction(
        transaction.transaction_reference,
        signature,
        "counterparty",
      );

      await fetchTransactionByReference(transaction.transaction_reference);

      showToast({
        title: "Success",
        message: "Transaction signed successfully!",
        variant: "success",
      });
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title="Sign Transaction"
    >
      <div className="space-y-5">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to sign this transaction?
        </p>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={signing}
          >
            Cancel
          </Button>

          <Button onClick={submitHandler} disabled={signing}>
            {signing ? "Signing..." : "Sign"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
