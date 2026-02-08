"use client";

import { useForm, Controller } from "react-hook-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/providers/toast-provider";
import { MintAssetForm } from "@/types/asset";
import { Building, Shield, Upload } from "lucide-react";
import { useMemo } from "react";
import { SingleDocumentUpload } from "@/components/features/common/SingleDocumentUpload";

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
      serial_number: "",
      refiner_name: "",
      gold_product_type_id: "",
      fineness: undefined,
      weight_grams: undefined,
      certified: true,
      manufacture_date: "",
      traceability_gic: "",
      initial_owner_igan: "",
      certification_framework: "",
      auto_verify_hash: true,
      certificate_base64: "",
      certificate_path: undefined
    },
  });

  const docId = useMemo(() => crypto.randomUUID(), []);
  const sodId = useMemo(() => crypto.randomUUID(), []);

  const onSubmit = async (data: MintAssetForm) => {
    try {
      // Exclude certificate file; handled separately by SingleDocumentUpload
      const payload = { ...data };

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
        className="space-y-6 max-w-6xl mx-auto mt-6"
      >
        {/* ASSET DETAILS */}
        <Card className="border-l-4 border-l-gold-500 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Asset Details</CardTitle>
                <CardDescription>
                  Core information about the physical gold asset
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              required
              label="Serial Number"
              placeholder="REF-2026-001"
              error={errors.serial_number?.message}
              {...register("serial_number", { required: "Required" })}
              className="bg-gray-50/50"
            />

            <Input
              required
              label="Refiner Name"
              placeholder="Swiss Refinery AG"
              error={errors.refiner_name?.message}
              {...register("refiner_name", { required: "Required" })}
              className="bg-gray-50/50"
            />

            <Input
              required
              label="Product Type"
              placeholder="Gold Bar / Coin / Ingot"
              error={errors.gold_product_type_id?.message}
              {...register("gold_product_type_id", { required: "Required" })}
              className="bg-gray-50/50"
            />

            <Input
              required
              type="number"
              label="Weight (grams)"
              placeholder="e.g. 1000"
              error={errors.weight_grams?.message}
              {...register("weight_grams", { required: "Required", min: 1 })}
              className="bg-gray-50/50"
            />

            <Input
              required
              type="number"
              step="0.0001"
              label="Fineness"
              placeholder="e.g. 0.9999"
              error={errors.fineness?.message}
              {...register("fineness", { required: "Required" })}
              className="bg-gray-50/50"
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
              required
              label="Traceability GIC"
              placeholder="GIC-2025-0001"
              error={errors.traceability_gic?.message}
              {...register("traceability_gic", { required: "Required" })}
              className="bg-gray-50/50"
            />

            <Input
              required
              label="Initial Owner IGAN"
              placeholder="IGAN-2025-12345"
              error={errors.initial_owner_igan?.message}
              {...register("initial_owner_igan", { required: "Required" })}
              className="bg-gray-50/50"
            />

            <Input
              label="Certification Framework"
              placeholder="LBMA / ISO 17025"
              {...register("certification_framework")}
              className="bg-gray-50/50"
            />
          </CardContent>
        </Card>

        {/* CERTIFICATION & COMPLIANCE */}
        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Certification & Compliance</CardTitle>
                <CardDescription>
                  Certification status and supporting documentation
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Certified Asset */}
            <label className="flex items-center justify-between rounded-lg border p-4 bg-gray-50/40">
              <div>
                <p className="text-sm font-medium text-gray-900">Certified Asset</p>
                <p className="text-xs text-muted-foreground">
                  Confirms this asset meets certification standards
                </p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 accent-gold-500"
                {...register("certified")}
              />
            </label>

            {/* Auto Verify Hash */}
            <label className="flex items-center justify-between rounded-lg border p-4 bg-gray-50/40">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto Verify Hash</p>
                <p className="text-xs text-muted-foreground">
                  Automatically verify certificate hash against blockchain record
                </p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 accent-gold-500"
                {...register("auto_verify_hash")}
              />
            </label>

            {/* Single Document Upload */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Certification Document (PDF)
              </label>

              <SingleDocumentUpload
                sod_id={""}
                document_id={docId}
                document_type="certificate"
                auto_verify_hash
              />

              <p className="text-xs text-muted-foreground">
                Upload and verify the official certification document
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ACTION BAR */}
        <div className="sticky bottom-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Review all information before submission</p>
              <p className="text-xs mt-1">All fields marked with * are required</p>
            </div>

            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset
              </Button>

              <Button type="submit" variant="gold" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Mint Asset"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}
