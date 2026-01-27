"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";

import { useToast } from "@/providers/toast-provider";
import { MintAssetForm } from "@/types/asset";

export default function MintAssetPage() {
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MintAssetForm>({
    defaultValues: {
      gold_product_type_id: "bar",
      fineness: 0.9999,
      weight_grams: 1000,
      certified: true,
      certificate_file: null,
    },
  });

  const onSubmit = async (data: MintAssetForm) => {
    try {
      let certificate_base64 = "";

      if (data.certificate_file) {
        certificate_base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(data.certificate_file!);
        });
      }

      const payload = {
        ...data,
        certificate_base64,
      };

      console.log("Mint payload:", payload);

      showToast({
        title: "Success",
        message: "Asset minted successfully",
        variant: "success",
      });

      reset();
    } catch (err: any) {
      showToast({
        title: "Error",
        message: err?.message || "Failed to mint asset",
        variant: "error",
      });
    }
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Mint New Asset"
        description="Register and mint a new gold-backed asset"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Assets", href: "/assets" },
          { label: "Mint" },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative space-y-8"
      >
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              Asset Details
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Core information about the physical gold asset
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Main grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Serial Number"
                placeholder="REF-2026-001"
                className="h-11"
                error={errors.serial_number && "Required"}
                {...register("serial_number", { required: true })}
              />

              <Input
                label="Refiner Name"
                placeholder="Swiss Refinery AG"
                className="h-11"
                error={errors.refiner_name && "Required"}
                {...register("refiner_name", { required: true })}
              />

              <Input
                type="number"
                label="Weight (grams)"
                className="h-11"
                {...register("weight_grams", { required: true, min: 1 })}
              />

              <Input
                type="number"
                step="0.0001"
                label="Fineness"
                className="h-11"
                {...register("fineness", { required: true })}
              />

              <Controller
                control={control}
                name="gold_product_type_id"
                render={({ field }) => (
                  <Select label="Product Type" {...field}>
                    <SelectItem value="bar">Gold Bar</SelectItem>
                    <SelectItem value="coin">Gold Coin</SelectItem>
                    <SelectItem value="ingot">Ingot</SelectItem>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="manufacture_date"
                rules={{ required: "Manufacture date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Manufacture Date"
                    placeholder="Select date"
                    error={errors.manufacture_date?.message}
                  />
                )}
              />

              <Input
                label="Traceability GIC"
                placeholder="GIC-2025-0001"
                className="h-11"
                {...register("traceability_gic", { required: true })}
              />

              <Input
                label="Initial Owner IGAN"
                placeholder="IGAN-2025-12345"
                className="h-11"
                {...register("initial_owner_igan", { required: true })}
              />

              <Input
                label="Certification Framework"
                placeholder="LBMA / ISO 17025"
                className="h-11"
                {...register("certification_framework")}
              />
            </div>

            {/* Certificate upload */}
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-medium mb-2">
                Certification Document
              </p>

              <Controller
                control={control}
                name="certificate_file"
                render={({ field }) => (
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    accept="application/pdf"
                  />
                )}
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Upload the official certification document (PDF only)
              </p>
            </div>

            {/* Certified toggle */}
            <label className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Certified Asset</p>
                <p className="text-xs text-muted-foreground">
                  Confirms this asset meets certification standards
                </p>
              </div>

              <input
                type="checkbox"
                className="h-4 w-4 accent-yellow-500"
                {...register("certified")}
              />
            </label>
          </CardContent>
        </Card>

        {/* Sticky action bar */}
        <div className="sticky bottom-0 z-10 flex justify-end gap-3 border-t bg-white px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="gold"
            className="px-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Minting..." : "Mint Asset"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}