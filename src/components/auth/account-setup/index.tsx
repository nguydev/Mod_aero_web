"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { ConfigProvider, theme } from "antd";
import logo from "@/assets/logo.svg";

import Step1Identity from "./identity";
import Step2Organizer from "./organizer";
import Step3LegalAuth from "./legal-auth";
import Step4Insurance from "./insurance";
import Step5Review from "./review";
import { AccountSetupFormData, initialAccountSetupFormData } from "./types";
import ApplicationUnderReview from "./under-review";

const stepsMeta = [
  { id: 0, label: "Identity" },
  { id: 1, label: "Organizer" },
  { id: 2, label: "Legal Auth" },
  { id: 3, label: "Insurance" },
  { id: 4, label: "Review" },
];

export default function AccountSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [maxReachedStep, setMaxReachedStep] = useState(0);
  const [formData, setFormData] = useState<AccountSetupFormData>(
    initialAccountSetupFormData
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Purely inline validation - No toast / notifications
  const validateCurrentStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.frontIdFile)
        newErrors.frontIdFile = "Front ID document is required";
      if (!formData.backIdFile)
        newErrors.backIdFile = "Back ID document is required";
      if (!formData.legalFirstName.trim())
        newErrors.legalFirstName = "Legal first name is required";
      if (!formData.legalLastName.trim())
        newErrors.legalLastName = "Legal last name is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.selfieFile)
        newErrors.selfieFile = "Selfie with ID is required";
    } else if (step === 1) {
      if (!formData.organizerName.trim())
        newErrors.organizerName = "Organizer / Business / Club name is required";
      if (!formData.organizerType.trim())
        newErrors.organizerType = "Please select an organizer type";
      if (!formData.website.trim())
        newErrors.website = "Business/Organization website is required";
      if (!formData.socialProfile.trim())
        newErrors.socialProfile = "Social media profile is required";
      if (!formData.publicContact.trim())
        newErrors.publicContact = "Public contact email / phone is required";
      if (!formData.historyDescription.trim())
        newErrors.historyDescription =
          "Organization / event history description is required";
    } else if (step === 2) {
      if (formData.eventTypes.length === 0) {
        newErrors.eventTypes =
          "Please select at least one event type you plan to host.";
      }
      if (formData.venueTypes.length === 0) {
        newErrors.venueTypes =
          "Please select at least one venue type you will use.";
      }
    } else if (step === 3) {
      const requiresInsurance = formData.eventTypes.some((t) =>
        [
          "Large Meet (500+)",
          "Autocross",
          "Track Day",
          "Racing Event",
          "Driving Competition",
          "Road Closure Event",
        ].includes(t)
      );
      if (requiresInsurance && !formData.coiFile) {
        newErrors.coiFile =
          "Certificate of Insurance (COI) document is required for selected high-risk event types.";
      }
    } else if (step === 4) {
      if (
        !formData.checkAccurate ||
        !formData.checkTerms ||
        !formData.checkReview ||
        !formData.checkEmailNotification
      ) {
        newErrors.beforeSubmit =
          "Please review and agree to all statements before submitting your application.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 4) {
      if (!validateCurrentStep(4)) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
      return;
    }

    if (validateCurrentStep(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxReachedStep((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep > currentStep) {
      if (!validateCurrentStep(currentStep)) return;
      if (targetStep > maxReachedStep + 1) return;
    }
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return <ApplicationUnderReview formData={formData} />;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgContainer: "#141416",
          colorBorder: "#26262B",
          colorText: "#FFFFFF",
          colorTextPlaceholder: "#5A5A60",
          colorPrimary: "#FF2E86",
          borderRadius: 9999,
        },
      }}
    >
      <div className="min-h-screen w-full bg-[#0D0D0F] text-white flex flex-col justify-between">
        {/* Top Header Bar */}
        <div>
          {/* Progress Line */}
          <div className="w-full h-1 bg-[#1C1C20]">
            <div
              className="h-full bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
            />
          </div>

          <header className="border-b border-[#1E1E22] bg-[#0D0D0F]/90 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
              {/* Left Logo */}
              <Link
                href="/"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src={logo}
                  alt="Velocity"
                  width={90}
                  height={40}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </Link>

              {/* Center Title */}
              <div className="text-center">
                <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Creator Verification
                </h1>
                <p className="text-[11px] text-[#8E8E93]">
                  Step {currentStep + 1} of 5
                </p>
              </div>

              {/* Right Application ID */}
              <div className="text-right">
                <span className="text-[10px] text-[#8E8E93] uppercase tracking-wider block">
                  Application
                </span>
                <span className="text-xs font-mono text-[#CCCCCC] font-semibold">
                  #VEL-2025-8707
                </span>
              </div>
            </div>
          </header>
        </div>

        {/* Main Content Area */}
        <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 flex-1">
          {/* Horizontal Step Indicator Bar */}
          <div className="flex items-center justify-between max-w-xl mx-auto px-2">
            {stepsMeta.map((step, idx) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const isClickable = step.id <= maxReachedStep || isCompleted;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Circle & Label */}
                  <div
                    onClick={() => isClickable && handleStepClick(step.id)}
                    className={`flex flex-col items-center gap-1.5 ${isClickable
                      ? "cursor-pointer group"
                      : "cursor-not-allowed opacity-60"
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isCompleted
                        ? "bg-[#FF2E86] text-white shadow-sm shadow-pink-500/20"
                        : isCurrent
                          ? "border-2 border-[#FF2E86] bg-[#FF2E86] text-white"
                          : "bg-[#1C1C20] text-[#8E8E93] border border-[#2E2E34]"
                        }`}
                    >
                      {isCompleted ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        step.id + 1
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-semibold transition-colors ${isCurrent || isCompleted
                        ? "text-[#FF2E86]"
                        : "text-[#8E8E93]"
                        }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connecting Line between steps */}
                  {idx < stepsMeta.length - 1 && (
                    <div
                      className={`flex-1 h-[2px] mx-2 -mt-5 transition-all duration-300 ${currentStep > idx ? "bg-[#FF2E86]" : "bg-[#26262B]"
                        }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Dynamic Step Body */}
          <div className="animate-fadeIn">
            {currentStep === 0 && (
              <Step1Identity
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}

            {currentStep === 1 && (
              <Step2Organizer
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}

            {currentStep === 2 && (
              <Step3LegalAuth
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}

            {currentStep === 3 && (
              <Step4Insurance
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}

            {currentStep === 4 && (
              <Step5Review
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </div>

          {/* Step 5 Main Action Button */}
          {currentStep === 4 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#FF2E86] via-[#FF5A26] to-[#FF7A1A] hover:opacity-95 shadow-xl shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={16} />
                <span>
                  {loading
                    ? "Submitting Application..."
                    : "Submit Application for Review"}
                </span>
              </button>
            </div>
          )}

          {/* Bottom Navigation Bar */}
          <div className="pt-4 border-t border-[#1E1E22] flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#CCCCCC] hover:text-white bg-[#141416] hover:bg-[#1C1C20] border border-[#26262B] transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />
              <span>Back</span>
            </button>

            {/* Dots in center */}
            <div className="flex items-center gap-1.5">
              {stepsMeta.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentStep === idx
                    ? "w-5 bg-[#FF2E86]"
                    : "w-1.5 bg-[#26262B]"
                    }`}
                />
              ))}
            </div>

            {/* Continue Button for Steps 0-3 */}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="py-3 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>Continue</span>
                <ChevronRight size={15} />
              </button>
            ) : (
              <div className="w-20" />
            )}
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}