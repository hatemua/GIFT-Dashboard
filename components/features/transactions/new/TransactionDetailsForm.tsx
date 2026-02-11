"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
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
import { CreateTransactionInput } from "@/types/transaction";
import { FileText, DollarSign } from "lucide-react";
import { TRANSACTION_TYPE_OPTIONS2 } from "@/constants/transactionOrders";

export const TransactionDetailsForm: React.FC = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<CreateTransactionInput>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Transaction Details */}
      <Card className="border-l-4 border-l-gold-500 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Transaction Details</CardTitle>
              <CardDescription>
                Core information about the transaction
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      {TRANSACTION_TYPE_OPTIONS2
        .filter((option) => option.value !== "")
        .map((option) => (
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


          <Controller
            name="counterparty_gic"
            control={control}
            rules={{ required: "Counterparty GIC is required" }}
            render={({ field }) => (
              <Input
                required
                {...field}
                label="Counterparty GIC"
                placeholder="GIC-2025-0002"
                error={errors.counterparty_gic?.message}
                className="bg-gray-50/50"
              />
            )}
          />

          <Controller
            name="initiator_gic"
            control={control}
            rules={{ required: "Initiator GIC is required" }}
            render={({ field }) => (
              <Input
                required
                {...field}
                label="Initiator GIC"
                placeholder="GIC-2025-0001"
                error={errors.initiator_gic?.message}
                className="bg-gray-50/50"
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Valuation */}
      <Card className="border-l-4 border-l-gold-500 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Valuation</CardTitle>
              <CardDescription>
                Value and currency details for the transaction
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              min: {
                value: 0.01,
                message: "Transaction Value must be positive",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                required
                type="number"
                label="Transaction Value"
                placeholder="e.g. 10000"
                error={errors.transaction_value?.message}
                className="bg-gray-50/50"
                {...register("transaction_value", {
                  valueAsNumber: true,
                })}
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
