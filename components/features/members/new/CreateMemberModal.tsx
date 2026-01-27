"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { COMPLIANCE_LEVELS, ENTITY_TYPES, ROLES } from "@/constants/member";
import { create } from 'zustand';
import { useMemberStore } from "@/store/memberStore";
import { CreateMemberInput } from "@/types/member";
import { useToast } from "@/providers/toast-provider";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function CreateMemberModal({
  isOpen,
  onClose,
}: CreateMemberModalProps) {
  const { showToast } = useToast();
  const { createMember } = useMemberStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateMemberInput>({
    defaultValues: {
      member_gic: "",
      entity_type: "company",
      compliance_level: "enhanced",
      roles: [],
    },
  });

const onSubmit = async (data: CreateMemberInput) => {
  try {
    await createMember(data);
    showToast({
      title: "Success",
      message: "Member created successfully!",
      variant: "success",
    });
    reset();
    onClose();
  } catch (err: any) {
    console.error("Error creating member:", err);
    showToast({
      title: "Error",
      message: err?.message || "Failed to create member",
      variant: "error",
    });
  }
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
              {ENTITY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{type.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {type.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
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
              {COMPLIANCE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{level.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {level.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
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
                  <div className="flex flex-col">
                    <span className="font-medium">{role.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {role.description}
                    </span>
                  </div>
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
