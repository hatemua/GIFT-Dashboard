"use client";
import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, MapPin, Shield, FileText, Upload } from "lucide-react";

interface VaultSiteFormValues {
  vault_site_id: string;
  vault_site_name: string;
  member_gic: string;
  location_name: string;
  registered_address: string;
  operational_address: string;
  city: string;
  state_or_province: string;
  postal_code: string;
  country: string;
  timezone: string;
  gps_coordinates: string;
  number_of_vaults: number;
  maximum_weight_in_gold_kg: number;
  opening_hours: string;
  insurance_coverage_name_of_insurer: string;
  insurance_coverage_expiration_date: string;
  insurance_coverage_documentation: File | null;
  audit_documentation: File | null;
  last_audit_date: string;
}

export default function NewVaultSitePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<VaultSiteFormValues>({
    defaultValues: {
      vault_site_id: "",
      vault_site_name: "",
      member_gic: "",
      location_name: "",
      registered_address: "",
      operational_address: "",
      city: "",
      state_or_province: "",
      postal_code: "",
      country: "",
      timezone: "",
      gps_coordinates: "",
      number_of_vaults: 0,
      maximum_weight_in_gold_kg: 0,
      opening_hours: "",
      insurance_coverage_name_of_insurer: "",
      insurance_coverage_expiration_date: "",
      insurance_coverage_documentation: null,
      audit_documentation: null,
      last_audit_date: "",
    },
  });

  const onSubmit = async (data: VaultSiteFormValues) => {
    console.log("Vault Site Data:", data);
    // TODO: handle API submission
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Vault Site Registration"
        description="Complete all required fields to register a new secure vault facility"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Vault Sites", href: "/assets/vault-sites" },
          { label: "New Vault Site" },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-6xl mx-auto mt-6"
      >
        {/* Main Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vault Identification Card */}
            <Card className="border-l-4 border-l-gold-500 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold-50 rounded-lg">
                    <Building className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Vault Identification
                    </CardTitle>
                    <CardDescription>
                      Core identifying information for the vault site
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Vault Site ID"
                    placeholder="VS001"
                    error={errors.vault_site_id?.message}
                    {...register("vault_site_id", {
                      required: "Vault Site ID is required",
                      pattern: {
                        value: /^VS\d{3}$/,
                        message: "Must be in format VS001",
                      },
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="Vault Site Name"
                    placeholder="Zurich Main Vault"
                    error={errors.vault_site_name?.message}
                    {...register("vault_site_name", {
                      required: "Vault Site Name is required",
                      minLength: {
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="Member GIC"
                    placeholder="MEMBER001"
                    error={errors.member_gic?.message}
                    {...register("member_gic", {
                      required: "Member GIC is required",
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="Location Name"
                    placeholder="Zurich City Center Branch"
                    error={errors.location_name?.message}
                    {...register("location_name", {
                      required: "Location Name is required",
                    })}
                    className="bg-gray-50/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Details Card */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Location Details</CardTitle>
                    <CardDescription>
                      Physical location and address information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Registered Address"
                      placeholder="Bahnhofstrasse 45"
                      error={errors.registered_address?.message}
                      {...register("registered_address", {
                        required: "Registered Address is required",
                      })}
                      className="bg-gray-50/50"
                    />
                  </div>
                  <Input
                    label="Operational Address"
                    placeholder="Limmatstrasse 12"
                    error={errors.operational_address?.message}
                    {...register("operational_address", {
                      required: "Operational Address is required",
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="City"
                    placeholder="Zurich"
                    error={errors.city?.message}
                    {...register("city", { required: "City is required" })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="State/Province"
                    placeholder="Canton of Zurich"
                    error={errors.state_or_province?.message}
                    {...register("state_or_province", {
                      required: "State/Province is required",
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="Postal Code"
                    placeholder="8001"
                    error={errors.postal_code?.message}
                    {...register("postal_code", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^\d{4,6}$/,
                        message: "Invalid postal code format",
                      },
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="Country"
                    placeholder="CH"
                    error={errors.country?.message}
                    {...register("country", {
                      required: "Country is required",
                      minLength: {
                        value: 2,
                        message: "Use 2-letter country code",
                      },
                      maxLength: {
                        value: 2,
                        message: "Use 2-letter country code",
                      },
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="GPS Coordinates"
                    placeholder="47.3769,8.5417"
                    error={errors.gps_coordinates?.message}
                    {...register("gps_coordinates", {
                      required: "GPS Coordinates are required",
                      pattern: {
                        value: /^-?\d+\.\d+,\s*-?\d+\.\d+$/,
                        message: "Format: latitude,longitude",
                      },
                    })}
                    className="bg-gray-50/50"
                  />
                  <Input
                    label="Timezone"
                    placeholder="Europe/Zurich"
                    error={errors.timezone?.message}
                    {...register("timezone", {
                      required: "Timezone is required",
                    })}
                    className="bg-gray-50/50"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Operational & Security */}
          <div className="space-y-6">
            {/* Operational Details Card */}
            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Operational Details
                    </CardTitle>
                    <CardDescription>
                      Capacity and operating hours
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="number"
                  label="Number of Vaults"
                  error={errors.number_of_vaults?.message}
                  {...register("number_of_vaults", {
                    required: "Number of Vaults is required",
                    min: {
                      value: 1,
                      message: "Minimum 1 vault required",
                    },
                  })}
                  className="bg-gray-50/50"
                />
                <Input
                  type="number"
                  label="Maximum Gold Capacity (kg)"
                  error={errors.maximum_weight_in_gold_kg?.message}
                  {...register("maximum_weight_in_gold_kg", {
                    required: "Maximum Weight is required",
                    min: {
                      value: 100,
                      message: "Minimum 100 kg capacity required",
                    },
                  })}
                  className="bg-gray-50/50"
                />
                <div className="md:col-span-2">
                  <Controller
                    control={control}
                    name="opening_hours"
                    render={({ field }) => (
                      <OpeningHours
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.opening_hours?.message}
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security & Compliance Card */}
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Security & Compliance
                    </CardTitle>
                    <CardDescription>
                      Insurance and audit documentation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Insurance Company"
                  error={errors.insurance_coverage_name_of_insurer?.message}
                  {...register("insurance_coverage_name_of_insurer")}
                  className="bg-gray-50/50"
                />
                <Controller
                  control={control}
                  name="insurance_coverage_expiration_date"
                  render={({ field }) => (
                    <DatePicker
                      label="Insurance Expiration"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.insurance_coverage_expiration_date?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="last_audit_date"
                  render={({ field }) => (
                    <DatePicker
                      label="Last Audit Date"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.last_audit_date?.message}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Documentation Card */}
        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>Upload required documents</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-2 space-y-4">
            <Controller
              control={control}
              name="insurance_coverage_documentation"
              render={({ field }) => (
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Insurance Documentation
                  </label>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    accept="application/pdf,image/*"
                    className="border-2 border-dashed border-gray-300 hover:border-gold-500 transition-colors rounded-lg"
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="audit_documentation"
              render={({ field }) => (
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Audit Documentation
                  </label>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    accept="application/pdf,image/*"
                    className="border-2 border-dashed border-gray-300 hover:border-gold-500 transition-colors rounded-lg"
                  />
                </div>
              )}
            />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="sticky bottom-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                Review all information before submission
              </p>
              <p className="text-xs mt-1">
                All fields marked with * are required
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 px-6"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Building className="h-4 w-4" />
                    Create Vault Site
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}

interface OpeningHoursProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  error?: string;
}

export const OpeningHours: React.FC<OpeningHoursProps> = ({
  value,
  onChange,
  className,
  label = "Opening Hours",
  error,
}) => {
  // Parse the value into from/to times
  const parseTimes = React.useMemo(() => {
    if (!value) return { from: "", to: "" };

    // Try to parse different formats
    const match = value.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
    if (match) {
      return { from: match[1], to: match[2] };
    }

    // Try 24-hour format without separator
    const split = value.split(/[-–]/);
    if (split.length === 2) {
      return { from: split[0].trim(), to: split[1].trim() };
    }

    return { from: "", to: "" };
  }, [value]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value;
    const newValue =
      newFrom && parseTimes.to ? `${newFrom} - ${parseTimes.to}` : "";
    onChange(newValue);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value;
    const newValue =
      parseTimes.from && newTo ? `${parseTimes.from} - ${newTo}` : "";
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <Clock className="h-4 w-4 text-gold-600" />
          {label}
        </label>
        <span className="text-xs text-gray-500">24-hour format</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label htmlFor="opening-from" className="text-xs text-gray-600">
            From
          </label>
          <div className="relative">
            <Input
              id="opening-from"
              type="time"
              value={parseTimes.from}
              onChange={handleFromChange}
              className={cn(
                "w-full pl-10",
                error &&
                  "border-red-300 focus:ring-red-200 focus:border-red-400",
              )}
              placeholder="09:00"
              step="900" // 15-minute intervals
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="opening-to" className="text-xs text-gray-600">
            To
          </label>
          <div className="relative">
            <Input
              id="opening-to"
              type="time"
              value={parseTimes.to}
              onChange={handleToChange}
              className={cn(
                "w-full pl-10",
                error &&
                  "border-red-300 focus:ring-red-200 focus:border-red-400",
              )}
              placeholder="17:00"
              step="900"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Display formatted value */}
      {value && (
        <div className="mt-2 rounded-lg bg-gray-50 border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gold-100 flex items-center justify-center">
                <Clock className="h-3 w-3 text-gold-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {parseTimes.from} - {parseTimes.to}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Use 24-hour format (e.g., 13:30 for 1:30 PM)</p>
      </div>
    </div>
  );
};