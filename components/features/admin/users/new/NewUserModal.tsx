"use client";

import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/providers/toast-provider";
import { useUser } from "@/hooks/useUser";
import { CreateUserForm } from "@/types/user";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { showToast } = useToast();
  const { createUser } = useUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateUserForm>({
    defaultValues: {
      offchain_user_id: "",
      member_gic: "",
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await createUser({
        member_gic: data.member_gic,
        offchain_user_id: data.offchain_user_id,
      });
      showToast({
        title: "Success",
        message: "User created successfully!",
        variant: "success",
      });
      reset();
      onClose();
    } catch (err: any) {
      console.error("Error creating user:", err);
      showToast({
        title: "Error",
        message: err?.message || "Failed to create user",
        variant: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create User" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Offchain User ID */}
        <Controller
          name="offchain_user_id"
          control={control}
          rules={{ required: "Offchain User ID is required" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              required
              label="Offchain User ID"
              placeholder="Enter Offchain User ID"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Member GIC */}
        <Controller
          name="member_gic"
          control={control}
          rules={{ required: "Member GIC is required" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              required
              label="Member GIC"
              placeholder="GIC-2025-0001"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
