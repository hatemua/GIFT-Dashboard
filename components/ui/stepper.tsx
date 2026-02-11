"use client";

import React from "react";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface StepperWizardProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
  showStepNumbers?: boolean;
  variant?: "default" | "compact" | "vertical";
  className?: string;
}

const GOLD = "#c5a225";
const GOLD_HOVER = "#b4931f";
const GOLD_SOFT = "#f5efd8";

export function StepperWizard({
  steps,
  currentStep,
  onNext,
  onBack,
  onSubmit,
  isNextDisabled,
  isSubmitting,
  showStepNumbers = true,
  variant = "default",
  className,
}: StepperWizardProps) {
  const isLastStep = currentStep === steps.length;

  /* ---------------------------- VERTICAL VARIANT ---------------------------- */
  if (variant === "vertical") {
    return (
      <div className={cn("flex gap-8", className)}>
        {/* Stepper */}
        <div className="w-64 space-y-6">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;

            return (
              <div key={stepNumber} className="relative flex gap-4">
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-4 top-8 bottom-0 w-0.5"
                    style={{ backgroundColor: GOLD_SOFT }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full transition-all duration-300"
                      style={{
                        height: isCompleted ? "100%" : "0%",
                        backgroundColor: GOLD,
                      }}
                    />
                  </div>
                )}

                {/* Circle */}
                <div
                  className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isCompleted
                      ? GOLD
                      : isActive
                        ? "#fff"
                        : "#f3f4f6",
                    color: isCompleted
                      ? "#fff"
                      : isActive
                        ? GOLD
                        : "#9ca3af",
                    border: isActive ? `1px solid ${GOLD}` : "none",
                    boxShadow: isActive
                      ? `0 0 0 4px ${GOLD_SOFT}`
                      : "none",
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : showStepNumbers ? (
                    stepNumber
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Labels */}
                <div className="pb-6">
                  <h3
                    className="font-semibold"
                    style={{
                      color: isActive
                        ? GOLD
                        : isCompleted
                          ? "#111827"
                          : "#6b7280",
                    }}
                  >
                    {step.title}
                  </h3>
                  {step.subtitle && (
                    <p className="mt-1 text-sm text-gray-500">
                      {step.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8">
          {steps[currentStep - 1]?.content}

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={currentStep === 1}
              className="min-w-24"
            >
              Back
            </Button>

            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>

            {!isLastStep ? (
              <Button
                onClick={onNext}
                disabled={isNextDisabled}
                className="min-w-24 text-white"
                style={{
                  backgroundColor: GOLD,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = GOLD_HOVER)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = GOLD)
                }
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="min-w-24 text-white"
                style={{ backgroundColor: GOLD }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------- HORIZONTAL DEFAULT --------------------------- */
  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="relative">
        <div
          className="absolute top-4 left-0 right-0 h-1.5 rounded-full"
          style={{ backgroundColor: GOLD_SOFT }}
        />

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;

            return (
              <div key={stepNumber} className="z-10 flex flex-col items-center">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all"
                  style={{
                    borderColor: isCompleted || isActive ? GOLD : "#e5e7eb",
                    backgroundColor: isCompleted ? GOLD : "#fff",
                    color: isCompleted
                      ? "#fff"
                      : isActive
                        ? GOLD
                        : "#9ca3af",
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : showStepNumbers ? (
                    stepNumber
                  ) : (
                    step.icon
                  )}
                </div>

                <div className="mt-3 max-w-[140px] text-center">
                  <span
                    className="block text-sm font-semibold"
                    style={{
                      color: isActive
                        ? GOLD
                        : isCompleted
                          ? "#111827"
                          : "#6b7280",
                    }}
                  >
                    {step.title}
                  </span>
                  {step.subtitle && (
                    <span className="mt-1 block text-xs text-gray-500">
                      {step.subtitle}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress fill */}
        <div
          className="absolute top-4 left-0 h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            backgroundColor: GOLD,
          }}
        />
      </div>

      {/* Content */}
      <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
        {steps[currentStep - 1]?.content}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1}
          className="min-w-24"
        >
          Back
        </Button>

        <span className="text-sm text-gray-500">
          Step {currentStep} of {steps.length}
        </span>

        {!isLastStep ? (
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className="min-w-24 text-white"
            style={{ backgroundColor: GOLD }}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="min-w-24 text-white"
            style={{ backgroundColor: GOLD }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </div>

      {/* Mobile dots */}
      <div className="flex justify-center gap-2 sm:hidden">
        {steps.map((_, index) => {
          const isActive = currentStep === index + 1;
          return (
            <div
              key={index}
              className="h-2 rounded-full transition-all"
              style={{
                width: isActive ? 16 : 8,
                backgroundColor: isActive ? GOLD : "#d1d5db",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function CompactStepperWizard(props: StepperWizardProps) {
  return <StepperWizard {...props} variant="compact" />;
}
