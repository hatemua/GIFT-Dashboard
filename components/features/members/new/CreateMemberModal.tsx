"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";

interface CreateMemberFormValues {
  member_gic: string;
  entity_type: "company" | "individual";
  compliance_level: "basic" | "standard" | "enhanced";
  roles: string[];
}

const ROLES = [
  { label: "Refiner", value: "ROLE_REFINER" },
  { label: "Minter", value: "ROLE_MINTER" },
  { label: "Vault", value: "ROLE_VAULT" },
];

interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMember?: (data: CreateMemberFormValues) => void;
}

export default function CreateMemberModal({
  isOpen,
  onClose,
  onSubmitMember,
}: CreateMemberModalProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateMemberFormValues>({
    defaultValues: {
      entity_type: "company",
      compliance_level: "enhanced",
      roles: [],
    },
  });

  const onSubmit = (data: CreateMemberFormValues) => {
    if (onSubmitMember) onSubmitMember(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Member" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Member GIC */}
        <Controller
          name="member_gic"
          control={control}
          rules={{ required: "Member GIC is required" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Member GIC"
              placeholder="GIC-2025-0001"
              error={fieldState.error?.message}
              className="border-gold-300 focus:border-gold-500 focus:ring-gold-100"
            />
          )}
        />

        {/* Entity Type */}
        <Controller
          name="entity_type"
          control={control}
          render={({ field }) => (
            <Select
              label="Entity Type"
              value={field.value}
              onChange={field.onChange}
            >
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
            </Select>
          )}
        />

        {/* Compliance Level */}
        <Controller
          name="compliance_level"
          control={control}
          render={({ field }) => (
            <Select
              label="Compliance Level"
              value={field.value}
              onChange={field.onChange}
            >
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="enhanced">Enhanced</SelectItem>
            </Select>
          )}
        />

        {/* Roles */}
        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <Select
              label="Roles"
              multiple
              value={field.value}
              placeholder="Select member roles"
              onChange={field.onChange}
            >
              {ROLES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="border-gold-300 text-gold-700 hover:bg-gold-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-gold-400 to-gold-600 text-white hover:from-gold-500 hover:to-gold-700"
          >
            {isSubmitting ? "Creating..." : "Create Member"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
