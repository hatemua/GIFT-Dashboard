"use client";

import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Member, MemberRole } from "@/types/member";
import { ROLE_COLORS, ROLES } from "@/constants/member";
import { useMember } from "@/hooks/useMember";
import { UserPlus, UserMinus, Shield, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/providers/toast-provider";

interface ChangeMemberRoleModalProps {
  open: boolean;
  onClose: () => void;
  member: Member;
}

interface FormValues {
  member_role: MemberRole | null;
  action: "assign" | "revoke";
}

export const ChangeMemberRoleModal: React.FC<ChangeMemberRoleModalProps> = ({
  open,
  onClose,
  member,
}) => {
  const { showToast } = useToast();

  const { control, handleSubmit, watch, reset, setValue } = useForm<FormValues>(
    {
      defaultValues: { member_role: null, action: "assign" },
    },
  );

  const { changeMemberRole, actionLoading, actionError } = useMember();
  const action = watch("action");
  const selectedRole = watch("member_role");

  const availableRoles = useMemo(() => {
    return action === "assign"
      ? ROLES.filter((r) => !member.roles.includes(r.value))
      : ROLES.filter((r) => member.roles.includes(r.value));
  }, [action, member.roles]);

  const onSubmit = async (data: FormValues) => {
    if (!data.member_role) return;
    try {
      await changeMemberRole(member.member_gic, data.member_role, data.action);
      showToast({
        title: "Success",
        message: `Role "${selectedRole}" ${action === "assign" ? "assigned" : "revoked"} successfully.`,
        variant: "success",
      });
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Change Member Role">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
        {/* Action toggle */}
        <div>
          <label className="flex items-center gap-1 mb-1 text-gray-600">
            <Shield className="w-3 h-3" />
            <span>Action</span>
          </label>
          <Controller
            name="action"
            control={control}
            render={({ field }) => (
              <div className="flex p-0.5 bg-gray-50 rounded-md gap-1">
                {[
                  { value: "assign", label: "Assign", icon: UserPlus },
                  { value: "revoke", label: "Revoke", icon: UserMinus },
                ].map((act) => {
                  const Icon = act.icon;
                  const isActive = field.value === act.value;
                  return (
                    <button
                      key={act.value}
                      type="button"
                      onClick={() => {
                        field.onChange(act.value);
                        setValue("member_role", null);
                      }}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1 cursor-pointer px-2 py-1 rounded text-xs transition-colors",
                        isActive
                          ? act.value === "assign"
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-400 text-white"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white",
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{act.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        {/* Role selection */}
        <div>
          <label className="block mb-1 text-gray-600">
            Select Role to {action === "assign" ? "Assign" : "Revoke"}
          </label>

          {action === "assign" && member.roles.length === ROLES.length ? (
            <p className="text-xs text-gray-500 italic mb-1">
              Member already has all roles.
            </p>
          ) : (
            <Controller
              name="member_role"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-1">
                  {availableRoles.map((role) => {
                    const isSelected = selectedRole === role.value;
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => field.onChange(role.value)}
                        className={cn(
                          "flex items-center justify-between cursor-pointer p-2 rounded border text-xs transition-all",
                          isSelected
                            ? action === "assign"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-rose-400 bg-rose-50 text-rose-700"
                            : "border-gray-200 bg-white hover:border-gray-300 text-gray-700",
                        )}
                      >
                        <span>{role.label}</span>
                        {isSelected && (
                          <Check
                            className={cn(
                              "w-3 h-3",
                              action === "assign"
                                ? "text-emerald-600"
                                : "text-rose-600",
                            )}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          )}
        </div>

        {/* Current roles */}
        <div className="bg-gray-50 rounded p-2">
          <p className="text-xs text-gray-500 mb-1">Current Roles</p>
          <div className="flex flex-wrap gap-1">
            {member.roles.map((roleValue) => {
              const role = ROLES.find((r) => r.value === roleValue);
              const color =
                ROLE_COLORS[roleValue] ??
                "bg-slate-50 text-slate-700 border-slate-200";
              return (
                <span
                  key={roleValue}
                  className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium border",
                    color,
                  )}
                >
                  {role?.label || roleValue}
                </span>
              );
            })}
          </div>
        </div>

        {/* Error message */}
        {actionError && (
          <div className="bg-rose-50 border border-rose-200 rounded p-2 text-xs text-rose-600">
            {actionError}
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={actionLoading || !selectedRole}
            size="sm"
            className={cn(
              action === "assign"
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-rose-400 hover:bg-rose-500",
              "disabled:opacity-50 min-w-[70px] text-xs",
            )}
          >
            {actionLoading ? (
              <Loader2 className="w-3 h-3 animate-spin mx-auto" />
            ) : action === "assign" ? (
              "Assign"
            ) : (
              "Revoke"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
