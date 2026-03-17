"use client";

import React, { useEffect, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { FileText, DollarSign, Users, Loader2 } from "lucide-react";
import { TRANSACTION_TYPE_OPTIONS2 } from "@/constants/transactionOrders";
import { CreateTransactionFormValues } from "@/app/(dashboard)/transactions/new/page";
import { useGoldAccount } from "@/hooks/useGoldAccount";
import { useDebounce } from "@/hooks/useDebounce";
import { useMember } from "@/hooks/useMember";
import { useMemberStore } from "@/store/memberStore";

export const TransactionDetailsForm: React.FC = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<CreateTransactionFormValues>();

  const { fetchAccountByIgan } = useGoldAccount();
  const { fetchMemberByGic } = useMember();

  /* ---------------- Watch IGANs ---------------- */
  const senderIgan = useWatch({ control, name: "sender_igan" });
  const receiverIgan = useWatch({ control, name: "reciever_igan" });

  const debouncedSenderIgan = useDebounce(senderIgan);
  const debouncedReceiverIgan = useDebounce(receiverIgan);

  const [loadingSender, setLoadingSender] = useState(false);
  const [loadingReceiver, setLoadingReceiver] = useState(false);

  /* ---------------- Fetch Initiator ---------------- */
  useEffect(() => {
    if (!debouncedSenderIgan) {
      setValue("initiator_gic", "");
      setValue("initiator_signature", "");
      return;
    }

    const load = async () => {
      setLoadingSender(true);
      try {
        const account = await fetchAccountByIgan(debouncedSenderIgan);
        const gic = account?.member_gic ?? "";
        setValue("initiator_gic", gic, { shouldValidate: true });

        if (gic) {
          await fetchMemberByGic(gic);
          const member = useMemberStore.getState().selectedMember;
          setValue("initiator_signature", member?.member.member_hash ?? "", {
            shouldValidate: true,
          });
        }
      } catch {
        setValue("initiator_gic", "");
        setValue("initiator_signature", "");
      } finally {
        setLoadingSender(false);
      }
    };

    load();
  }, [debouncedSenderIgan, fetchAccountByIgan, setValue]);

  /* ---------------- Fetch Counterparty ---------------- */
  useEffect(() => {
    if (!debouncedReceiverIgan) {
      setValue("counterparty_gic", "");
      return;
    }

    const load = async () => {
      setLoadingReceiver(true);
      try {
        const account = await fetchAccountByIgan(debouncedReceiverIgan);

        setValue("counterparty_gic", account?.member_gic ?? "", {
          shouldValidate: true,
        });
      } catch {
        setValue("counterparty_gic", "");
      } finally {
        setLoadingReceiver(false);
      }
    };

    load();
  }, [debouncedReceiverIgan, fetchAccountByIgan, setValue]);

  return (
    <div className="space-y-6">
      {/* Section 1: Basic Information */}
      <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>
                Core transaction details and reference
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="transaction_reference"
            control={control}
            rules={{ required: "Transaction Reference is required" }}
            render={({ field }) => (
              <Input
                required
                {...field}
                label="Transaction Reference"
                placeholder="PO-2025-8901"
                error={errors.transaction_reference?.message}
                className="bg-gray-50/50"
              />
            )}
          />

          <Controller
            name="transaction_type"
            control={control}
            rules={{ required: "Transaction Type is required" }}
            render={({ field }) => (
              <Select
                required
                {...field}
                label="Transaction Type"
                placeholder="Select type"
                error={errors.transaction_type?.message}
                className="bg-gray-50/50"
              >
                {TRANSACTION_TYPE_OPTIONS2.filter(
                  (option) => option.value !== "",
                ).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4 text-gray-500" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </CardContent>
      </Card>

      {/* Section 2: Parties Involved */}
      <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Parties Involved</CardTitle>
              <CardDescription>
                GICs and IGANs for counterparty and initiator
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Initiator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="sender_igan"
              control={control}
              rules={{ required: "Initiator IGAN is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  label="Initiator IGAN"
                  placeholder="IGAN-54321"
                  error={errors.sender_igan?.message}
                />
              )}
            />

            <Controller
              name="initiator_gic"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  disabled
                  label="Initiator GIC"
                  rightIcon={
                    loadingSender ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null
                  }
                />
              )}
            />
          </div>

          {/* Counterparty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="reciever_igan"
              control={control}
              rules={{ required: "Counterparty IGAN is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  label="Counterparty IGAN"
                  placeholder="IGAN-12345"
                  error={errors.reciever_igan?.message}
                />
              )}
            />

            <Controller
              name="counterparty_gic"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  disabled
                  label="Counterparty GIC"
                  rightIcon={
                    loadingReceiver ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null
                  }
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Financial Details */}
      <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Financial Details</CardTitle>
              <CardDescription>
                Valuation and currency information
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Controller
            name="valuation_date"
            control={control}
            rules={{ required: "Valuation Date is required" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                required
                label="Valuation Date"
                placeholder="Select date"
                error={errors.valuation_date?.message}
              />
            )}
          />

          <Controller
            name="transaction_value"
            control={control}
            rules={{
              required: "Transaction Value is required",
              validate: (value) =>
                Number(value) > 0 || "Transaction Value must be positive",
            }}
            render={({ field }) => (
              <Input
                {...field}
                required
                type="number"
                min={0}
                label="Transaction Value"
                placeholder="e.g. 10000"
                error={errors.transaction_value?.message}
                className="bg-gray-50/50"
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === "" ? "" : val);
                }}
              />
            )}
          />

          <Controller
            name="valuation_currency"
            control={control}
            rules={{ required: "Valuation Currency is required" }}
            render={({ field }) => (
              <Select
                {...field}
                required
                label="Valuation Currency"
                placeholder="Select currency"
                error={errors.valuation_currency?.message}
                className="bg-gray-50/50"
              >
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="CHF">CHF</SelectItem>
              </Select>
            )}
          />
        </CardContent>
      </Card>

    </div>
  );
};